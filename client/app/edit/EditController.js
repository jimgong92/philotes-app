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


    function addNode(label){
      // NetworkFactory
      // .addNode({label: label});
      console.log("added node with label:", label);
      GraphFactory.addNode(label);
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