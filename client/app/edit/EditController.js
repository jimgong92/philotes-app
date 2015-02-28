(function () {
  'use strict';
  
  angular
    .module('app.edit')
    .controller('EditCtrl', EditCtrl);

  function EditCtrl(NetworkFactory) {
    var vm = this;
      

    vm.createNode = createNode;


    function createNode(label){
      console.log(label);
      NetworkFactory
      .addNode({label: label});
    }

    function updateModel(node){
      var obj = angular.copy(node);

    }
  }
  
})();