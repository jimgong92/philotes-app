;(function(){
'use strict';

angular
  .module('app.core')
  .config(config);

  function config($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider){

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
