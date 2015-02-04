(function () {
  'use strict';
  
  angular
    .module('app.edit')
    .controller('EditCtrl', EditCtrl);

  function EditCtrl() {
    var vm = this;
    function print(){
      console.log('In Edit Controller');
    }
  }
  
})();