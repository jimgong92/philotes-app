(function () {
  'use strict';
  
  angular
    .module('app.edit')
    .controller('EditCtrl', EditCtrl);

  function EditCtrl(NodeFactory, NetworkFactory) {
    var vm = this;
      

    vm.print = print;


    function print(id){
      console.log(id);
    }
  }
  
})();