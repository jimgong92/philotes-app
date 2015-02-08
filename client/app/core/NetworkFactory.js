(function() {

  angular
    .module('app.core')
    .factory('NetworkFactory', NetworkFactory);
  /*
    Contains the logic for loading nodes and connections to the graph
    -The Graph Controller merely creates the graph
  */
  function NetworkFactory($http, NodeFactory){

    var NetworkFactory = {
      nodes: []

    };

    return NetworkFactory;

    function addNode() {

    }
    function addLink() {

    }

    //Params: Node
    //TODO: Return matrix where each index is filled with array of connections by path length
    function getNetworkByLength(node) {
      var res = [[node]]

    }
    function createNode(id) {
      return {"id": id};
    }
  }
})();


