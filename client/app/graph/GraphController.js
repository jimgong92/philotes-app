(function () {
  'use strict';
  
  angular
    .module('app.graph')
    .controller('GraphCtrl', GraphCtrl);

  function GraphCtrl(GraphFactory, NetworkFactory) {
    var vm = this;
    GraphFactory.initialize();
  }
  
})();