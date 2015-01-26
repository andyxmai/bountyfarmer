'use strict';

angular.module('bountyfarmerApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ui.bootstrap',

  'restangular'
])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider, RestangularProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);

    RestangularProvider.setBaseUrl('https://api.parse.com/1');
    RestangularProvider.setDefaultHeaders({ 'X-Parse-Application-Id': 'zXVVVaInkfRHYT1A8SXnZK0uFhcC6a05ZUO0vVoQ',
                                            'X-Parse-REST-API-Key': 'NP0yr7PkLHSTLYDG0wYMnAmGe55j3EXcVzeQyfj9'});
    
    RestangularProvider.addResponseInterceptor(function(data, operation) {
      switch (operation) {
        case 'getList':
          return data.results;
        default:
          return data;
      }
    });
  });