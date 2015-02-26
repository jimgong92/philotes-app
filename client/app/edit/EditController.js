(function () {
  'use strict';
  
  angular
    .module('app.edit')
    .controller('EditCtrl', EditCtrl);

  function EditCtrl(NodeFactory, NetworkFactory) {
    var vm = this;
      

    vm.print = print;


    function createNode(id){
      console.log(id);
    }
  }
  
})();