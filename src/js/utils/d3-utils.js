var d3 = require('d3');
var $ = require('jquery');

var LINK_DISTANCE = 30;
var forceGraph = {},
    dom = {};

module.exports = {
  init: init
}
function init(locationId){
  locationId = '#' + locationId;
  var $graph = $(locationId);
  var width = $graph.width(),
      height = $graph.height();


  var fill = d3.scale.category10();

  var force = d3.layout.force()
      .size([width, height])
      .nodes([]) // initialize with a single node
      .linkDistance(LINK_DISTANCE)
      .charge(-60)
      .chargeDistance(120)
      .on("tick", tick);

  var svg = d3.select(locationId)
      .attr("width", width)
      .attr("height", height)
      .on("mousedown", mousedown);

  forceGraph.force = force;
  forceGraph.nodes = force.nodes(),
  forceGraph.links = force.links(),
  dom.nodes = svg.selectAll(".node"),
  dom.links = svg.selectAll(".link");

  update();

}

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

function update() {
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
