(function() {

  angular
    .module('app.core')
    .factory('NodeFactory', NodeFactory);
  /*
    Contains the logic for loading nodes and connections to the graph
    -The Graph Controller merely creates the graph
  */
  function NodeFactory($http){

    var NodeFactory = {
      id: null,
      friends: [],
      averageGeodesic: null,
      setID: setID,
      addFriend: addFriend
    };

    return NodeFactory;

    /*
      G
    */
    function getNode(id){
      
    }
    function addFriend(id) {
      NodeFactory.friends.push(id);
    }

    function setID(id) {
      NodeFactory.id = id;
    }
    function getFriends(){
      return NodeFactory.friends;
    }
    function createNode(node){
      return $http({
        method: 'POST',
        url: '/api/node',
        data: JSON.stringify(node)
      });
    }
  }
})();


