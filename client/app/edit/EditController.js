(function () {
  'use strict';
  
  angular
    .module('app.edit')
    .controller('EditCtrl', EditCtrl);

  function EditCtrl(GraphFactory, NetworkFactory) {
    var vm = this;
      

    vm.addNode = addNode;


    function addNode(label){
      // NetworkFactory
      // .addNode({label: label});
      GraphFactory.addNode();
      console.log('added node!');
    }

    function updateModel(node){
      var obj = angular.copy(node);

    }
  }
  
})();