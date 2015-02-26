(function () {
  'use strict';
  
  angular
    .module('app.edit')
    .controller('EditCtrl', EditCtrl);

  function EditCtrl(NodeFactory, NetworkFactory) {
    var vm = this;
      

    vm.createNode = createNode;


    function createNode(label){
      console.log(label);
      NodeFactory
      .createNode({label: label});
    }

    function updateModel(node){
      var obj = angular.copy(node);

    }
  }
  
})();