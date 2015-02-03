;(function(){
'use strict';

angular
  .module('app.core')
  .config(config);

  function config($stateProvider, $urlRouterProvider, $httpProvider){

    $urlRouterProvider.otherwise('/');

    $stateProvider

    .state('compose', {
      abstract: true,
      url: '/',
      views: {
        'main' : {
          templateUrl: 'app/partials/compose.html'
        }
      }
    })
    .state('compose.subs',{
      url: '',
      views: {
        'graph@compose': {
          templateUrl: 'app/graph/graph.html',
          controller: 'GraphCtrl as vm'
        },
        'edit@compose': {
          templateUrl: 'app/edit/edit.html',
          controller: 'EditCtrl as vm',
        }
      }
    });

  }
}).call(this);
