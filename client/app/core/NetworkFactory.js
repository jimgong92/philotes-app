(function() {

  angular
    .module('app.core')
    .factory('NetworkFactory', NetworkFactory);
  /*
    Contains the logic for loading nodes and connections to the graph
    -The Graph Controller merely creates the graph
    -Handles ajax requests
  */
  function NetworkFactory($http){

    var NetworkFactory = {
      getSize: getSize,
      addNode: addNode,
      averageGeodesic: null,
      nodes: []
    };

    return NetworkFactory;
    /**
     * Params: Node object, id of network to be added to
     */
    function addNode(node, networkID) {
      return $http({
        method: 'POST',
        url: '/api/network',
        data: JSON.stringify(node)
      })
      .success(function(data){
        console.log(data);
      })
      .error(function(){
        console.log("Could not add node to network");
      })
    }
    /**
     * Params: Node A and Node B
     * Adds bi-directional friendship between nodes
     */
    function addLink() {

    }
    //Params: Node
    //TODO: Return matrix where each index is filled with array of connections by path length
    function getNetworkByLength(node) {
      var res = [[node]]

    }
    function createNode(id) {
      return {_id: id};
    }
    function getSize(){
      return NetworkFactory.nodes.length;
    }
  }
})();


