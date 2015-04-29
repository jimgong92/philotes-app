/**
 * Handles user input
 */
(function () {
  'use strict';
  
  angular
    .module('app.edit')
    .controller('EditCtrl', EditCtrl);

  function EditCtrl(GraphFactory, NetworkFactory) {
    var vm = this;
      
    vm.addNode = addNode;
    vm.addFriend = addFriend;
    vm.deleteNode = deleteNode;


    function addNode(id){
      // NetworkFactory
      // .addNode({id: id});
      console.log("added node with id:", id);
      GraphFactory.addNode(id);
    }

    /**
     * Adds link between d3-selected node and targetNode
     */
    function addFriend(targetNode){
      GraphFactory.addLink(targetNode);

    }

    function deleteNode(){
      GraphFactory.deleteNode();
    }
  }
  
})();