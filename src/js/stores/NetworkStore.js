var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var $ = require('jquery');
var d3 = require('d3');

var graphUtils = require('../utils/d3-utils');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var NetworkConstants = require('../constants/NetworkConstants');

var CHANGE_EVENT = 'change';
var LINK_DISTANCE = 30;

var forceGraph = {},
    dom = {},
    sid = null,
    selectedNode = null,
    hoverNode = null;

function _mousedown(){
  selectedNode = hoverNode;
  console.log(selectedNode);
  // var point = d3.mouse(this),
  //     node = {x: point[0], y: point[1]};

  // forceGraph.nodes.forEach(function(target) {
  //   var x = target.x - node.x,
  //       y = target.y - node.y;
  //   if (Math.sqrt(x * x + y * y) < LINK_DISTANCE) {
  //     forceGraph.links.push({source: node, target: target});
  //   }
  // });

  // forceGraph.nodes.push(node);
  // update();
}
function _mouseover(d){
  hoverNode = d;
  console.log(hoverNode);
}
function _mouseout(d){
  hoverNode = null;
  console.log(hoverNode);
}
function _tick(){
  dom.links.attr("x1", function(d) { return d.source.x; })
      .attr("y1", function(d) { return d.source.y; })
      .attr("x2", function(d) { return d.target.x; })
      .attr("y2", function(d) { return d.target.y; });

  dom.nodes.attr("cx", function(d) { return d.x; })
      .attr("cy", function(d) { return d.y; })
      .on('mouseover', _mouseover)
      .on('mouseout', _mouseout);
}
function getRandCoordinates(nodeObj){
  nodeObj = nodeObj || {};
  var size = forceGraph.force.size();
  nodeObj['x'] = Math.random() * size[0];
  nodeObj['y'] = Math.random() * size[1];
  return nodeObj;
}
function update(){
  dom.links = dom.links.data(forceGraph.links);
  dom.links.enter().insert("line", ".node")
      .attr("class", "link");
  dom.links.exit().remove();

  dom.nodes = dom.nodes.data(forceGraph.nodes);
  dom.nodes.enter().insert("circle")
      .attr("class", "node")
      .attr("r", 10)
      .call(forceGraph.force.drag);
  dom.nodes.exit().remove();

  forceGraph.force.start();
}

var NetworkStore = assign({}, EventEmitter.prototype, {
  init: function(svgId){
    sid = window.localStorage.getItem('sid.philotes');
    var $graph = $('#' + svgId);
    var width = $graph.width(),
        height = $graph.height();
    var fill = d3.scale.category10();

    var force = d3.layout.force()
        .size([width, height])
        .nodes([])
        .links([])
        .linkDistance(LINK_DISTANCE)
        .charge(-60)
        .on("tick", _tick);
    var svg = d3.select('#' + svgId)
        .attr("width", width)
        .attr("height", height)
        .on("mousedown", _mousedown);

    forceGraph.force = force;
    forceGraph.nodes = force.nodes(),
    forceGraph.links = force.links(),
    dom.nodes = svg.selectAll(".node"),
    dom.links = svg.selectAll(".link");

    update();

    NetworkStore.get_all_nodes();
  },
  get_all_nodes: function(){
    if(sid){
      $.ajax({
        url: window.location.origin + '/api/network?sid=' + sid,
        type: 'GET',
        success: function(data){
          console.log("Successfully retrieved nodes");
          var nodes = data.nodes;
          for (var i = 0; i < nodes.length; i++){
            forceGraph.nodes.push(getRandCoordinates(nodes[i]));
            update();
          }
          this.emitChange();
        }.bind(this),
        error: function(err){
          console.error("Error in get_node");
          console.error(err);
        }
      });
    }
  },
  add_node: function(label, role, friends){
    var node = getRandCoordinates();
    forceGraph.nodes.push(node);
    update();
    if(sid){
      $.ajax({
        url: window.location.origin + '/api/node/add',
        type: 'POST',
        data: JSON.stringify({
          sid: sid,
          label: label,
          role: role,
          friends: friends
        }),
        contentType: 'application/json',
        success: function(data){
          console.log("Successfully added node");
          console.log(data);
          this.emitChange();
        }.bind(this),
        error: function(err){
          console.error("Error in add_node");
          console.error(err);
        }
      });
    }
  },
  edit_node: function(id, node){
    if(sid){
      $.ajax({
        url: window.location.origin + '/api/node/edit',
        type: 'POST',
        data: JSON.stringify({
          id: id,
          node: node
        }),
        contentType: 'application/json',
        success: function(data){
          console.log("Successful edited node");
          console.log(data);
          this.emitChange();
        }.bind(this),
        error: function(err){
          console.error("Error in edit_node");
          console.error(err);
        }
      });
    }
  },
  remove_node: function(){
    var remove_id = selectedNode.id;
    for (var i = 0; i < forceGraph.nodes.length; i++){
      if (forceGraph.nodes[i].id === remove_id){
        forceGraph.nodes.splice(i, 1);
      }
    }
    selectedNode = null;
    update();
    if(sid){
      $.ajax({
        url: window.location.origin + '/api/node/remove',
        type: 'POST',
        data: JSON.stringify({
          sid: sid,
          id: remove_id
        }),
        success: function(data){
          console.log("Successfully removed node");
          console.log(data);
          this.emitChange();
        }.bind(this),
        error: function(err){
          console.error("Error in remove_node");
          console.error(err);
        }
      });
    }
  },
  getSVG: function(id){
    return d3.select('#' + id);
  },
  getForce: function(){
    return forceGraph;
  },
  emitChange: function(){
    this.emit(CHANGE_EVENT);
  },
  addChangeListener: function(callback){
    this.on(CHANGE_EVENT, callback);
  },
  removeChangeListener: function(callback){
    this.removeListener(CHANGE_EVENT, callback);
  }
});

/**
 * Register callback to handle all updates
 */
AppDispatcher.register(function(action){
  switch(action.actionType){
    case NetworkConstants.INIT:
      NetworkStore.init(action.svgId);
      break;
    case NetworkConstants.ADD_NODE:
      NetworkStore.add_node(action.label, action.role, action.friends);
      break;
    case NetworkConstants.EDIT_NODE:
      NetworkStore.edit_node(action.id, action.node);
      break;
    case NetworkConstants.REMOVE_NODE:
      NetworkStore.remove_node();
      break;
    default: 
      //no op
  }
});

module.exports = NetworkStore;