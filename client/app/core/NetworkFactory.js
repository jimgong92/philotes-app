(function() {

  angular
    .module('app.core')
    .factory('NetworkFactory', NetworkFactory);
  /*
    Contains the logic for loading nodes and connections to the graph
    -The Graph Controller merely creates the graph
  */
  function NetworkFactory($http){

    var NetworkFactory = {
      currentNetwork: [],
      selectedNode: 
    };

    return NetworkFactory;

    function selectNode() {

    }
    function addNode() {

    }
    function addFriendToNode() {

    }
  }
})();


