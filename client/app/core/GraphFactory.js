(function() {

  angular
    .module('app.core')
    .factory('GraphFactory', GraphFactory);
  /*
    Contains the logic for the d3 force layout graph
  */
  function GraphFactory($http){
    var graph, force, cursor;
    var nodes, links, node, link;
    var xOffset;
    var selectedNode, selectedElement;
    var drag;

    var width = 960,
        height = 500;

    var GraphFactory = {
      initialize: initialize,
      addNode: addNode,
      addLink: addLink,
      isNodeSelected: isNodeSelected,
      deleteNode: deleteNode
    };

    return GraphFactory;

    function initialize(){
      xOffset = document.getElementsByClassName('fixed-side')[0].offsetWidth;
      
      force = d3.layout.force()
          .size([width, height])
          .nodes([{}]) // initialize with a single node
          .linkDistance(30)
          .charge(-60)
          .on("tick", tick);

      graph = d3.select("#graph-canvas").append("svg")
          .attr("width", width)
          .attr("height", height)
          .on("mousemove", mousemove)
          .on("mousedown", mousedown);

      nodes = force.nodes();
      links = force.links();
      node = graph.selectAll(".node");
      link = graph.selectAll(".link");
      cursor = graph.append("circle")
          .attr("r", 5)
          .attr("transform", "translate(-100,-100)")
          .attr("class", "cursor");
      drag = force.drag()
          .on("dragstart", dragstart);
      
      restart();
    }
    function mousemove() {
      cursor.attr("transform", "translate(" + d3.mouse(this) + ")");
    }

    function mousedown() {
    }
    /**
     * Adds node to D3 force layout graph
     */
    function addNode(id) {
      var point = [700,700],
          node = {x: point[0], y: point[1], id: id},
          n = nodes.push(node);
      restart();
    }

    /**
     * TODO:
     * Deletes selected node from nodes
     */
    function deleteNode(){
      nodes.splice(selectedNode.index, 1);
      node[0].splice(selectedNode.index, 1);
      restart();
    }

    /**
     * Adds link between target nodes
     */
    function addLink(targetID) {
      nodes.forEach(function(target) {
        if(target.id === targetID){
          links.push({source: selectedNode, target: target});
        }
      });
    }

    /**
     * Predicate: Return whether node selected
     */
    function isNodeSelected(){
      return !!selectedNode;
    }

    function tick() {
      link.attr("x1", function(d) { return d.source.x; })
          .attr("y1", function(d) { return d.source.y; })
          .attr("x2", function(d) { return d.target.x; })
          .attr("y2", function(d) { return d.target.y; });

      node.attr("cx", function(d) { return d.x; })
          .attr("cy", function(d) { return d.y; });
    }

    function restart() {
      link = link.data(links);

      link.enter().insert("line", ".node")
          .attr("class", "link");

      node = node.data(nodes);

      node.enter().append("g")
          .attr("class", "node")
          .call(drag);

      node.append("circle")
          .attr("r", 10)
          .on("click", click);
          
      node.append("text")
          .attr("dx", 12)
          .attr("dy", ".35em")
          .text(function(d) {
            return d.id;
          });

      force.start();
    }
    /**
     * Register click event on a node
     * Node selection
       -If node selected, flip hidden off for "Add friend" and on for "Add Node"
     */
    function click(d){
      if(selectedNode !== d || !selectedNode){
        selectedNode = d;
      }
      else if (selectedNode === d){
        selectedNode = undefined;
      }
      console.log(selectedNode);
    }

    function dragstart(d) {
      d3.select(this).classed("fixed", d.fixed = true);
    }
  }
})();


