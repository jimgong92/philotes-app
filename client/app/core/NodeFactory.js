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
      setID: setID,
      addFriend: addFriend
    };

    return NodeFactory;

    function addFriend(id) {
      NodeFactory.friends.push(id);
    }

    function setID(id) {
      NodeFactory.id = id;
    }
  }
})();

