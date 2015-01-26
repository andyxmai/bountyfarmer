'use strict';

angular.module('bountyfarmerApp')
  .controller('NavbarCtrl', function ($scope, $location) {
    $scope.menu = [{
      'title': "Andy's Farm",
      'link': '/'
    }];

    $scope.isCollapsed = true;

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });