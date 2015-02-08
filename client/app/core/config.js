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
          controller: 'EditCtrl as vm'
        }
      }
    })
    .state('analysis', {
      abstract: true,
      url: '/network/:id',
      views: {
        'main' : {
          templateUrl: 'app/partials/analysis.html'
        }
      }
    })
    .state('analysis.subs', {
      url: '',
      views: {
        'graph@analysis': {
          templateUrl: 'app/graph/graph.html',
          controller: 'GraphCtrl as vm'
        },
        'display@compose': {
          templateUrl: 'app/display/display.html',
          controller: 'DisplayCtrl as vm'
        }
      }
    });

  }
}).call(this);
