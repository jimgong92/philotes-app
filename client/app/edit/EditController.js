(function () {
  'use strict';
  
  angular
    .module('app.edit')
    .controller('EditCtrl', EditCtrl);

  function EditCtrl(GraphFactory, NetworkFactory) {
    var vm = this;
      
    vm.addNode = addNode;
    vm.addFriend = addFriend;


    function addNode(label){
      // NetworkFactory
      // .addNode({label: label});
      GraphFactory.addNode();
      console.log('added node!');
    }

    /**
     * Adds link between d3-selected node and targetNode
     */
    function addFriend(targetNode){
      GraphFactory.addLink();

    }
  }
  
})();