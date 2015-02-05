(function () {
  'use strict';
  
  angular
    .module('app.edit')
    .controller('EditCtrl', EditCtrl);

  function EditCtrl($scope) {
    var vm = this;
    vm.print = function(){
      console.log('hi');
    };
    // $scope.print() = function(){
    //   console.log('In Edit Controller');
    // };
  }
  
})();