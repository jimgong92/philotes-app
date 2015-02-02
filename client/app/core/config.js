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
    });

  }
}).call(this);
