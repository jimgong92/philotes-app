(function () {
  'use strict';
  
  angular
    .module('app.edit')
    .controller('EditCtrl', EditCtrl);

  function EditCtrl(NetworkFactory) {
    var vm = this;
    vm.print = print;


    function print(value){
      console.log(value);
    }
  }
  
})();