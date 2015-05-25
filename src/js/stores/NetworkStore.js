var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var $ = require('jquery');
var d3 = require('d3');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var NetworkConstants = require('../constants/NetworkConstants');

var CHANGE_EVENT = 'change';
var LINK_DISTANCE = 30;

var forceGraph = {},
    dom = {};

function mousedown() {
  var point = d3.mouse(this),
      node = {x: point[0], y: point[1]};

  // add links to any nearby nodes
  forceGraph.nodes.forEach(function(target) {
    var x = target.x - node.x,
        y = target.y - node.y;
    if (Math.sqrt(x * x + y * y) < LINK_DISTANCE) {
      forceGraph.links.push({source: node, target: target});
    }
  });

  forceGraph.nodes.push(node);
  update();
}
function tick() {
  dom.links.attr("x1", function(d) { return d.source.x; })
      .attr("y1", function(d) { return d.source.y; })
      .attr("x2", function(d) { return d.target.x; })
      .attr("y2", function(d) { return d.target.y; });

  dom.nodes.attr("cx", function(d) { return d.x; })
      .attr("cy", function(d) { return d.y; })
      .on('mouseover', function(d){
        console.log(d);
      })
      .on('mouseout', function(d){
        console.log('mouse out');
      });
}
function update(){
  dom.links = dom.links.data(forceGraph.links);

  dom.links.enter().insert("line", ".node")
      .attr("class", "link");

  dom.nodes = dom.nodes.data(forceGraph.nodes);

  dom.nodes.enter().insert("circle")
      .attr("class", "node")
      .attr("r", 10)
      .call(forceGraph.force.drag);

  forceGraph.force.start();
}
var NetworkStore = assign({}, EventEmitter.prototype, {
  init: function(svgId){
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
        .on("tick", tick);

    var svg = d3.select('#' + svgId)
        .attr("width", width)
        .attr("height", height)
        .on("mousedown", mousedown);

    forceGraph.force = force;
    forceGraph.nodes = force.nodes(),
    forceGraph.links = force.links(),
    dom.nodes = svg.selectAll(".node"),
    dom.links = svg.selectAll(".link");

    update();
  },
  add_node: function(node){
    $.ajax({
      url: window.location.origin + '/node/add',
      type: 'POST',
      data: JSON.stringify({
        node: node
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
  },
  edit_node: function(id, node){
    $.ajax({
      url: window.location.origin + '/node/edit',
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
  },
  remove_node: function(id){
    _user.username = null;
    $.ajax({
      url: window.location.origin + '/node/remove',
      type: 'POST',
      data: JSON.stringify({
        id: id
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
  },
  getSVG: function(id){
    return d3.select('#' + id)
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
  console.log(action);
  switch(action.actionType){
    case NetworkConstants.INIT:
      NetworkStore.init(action.svgId);
      break;
    case NetworkConstants.ADD_NODE:
      NetworkStore.add_node(action.node);
      break;
    case NetworkConstants.EDIT_NODE:
      NetworkStore.edit_node(action.id, action.node);
      break;
    case NetworkConstants.REMOVE_NODE:
      NetworkStore.remove_node(action.id);
      break;
    default: 
      //no op
  }
});

module.exports = NetworkStore;