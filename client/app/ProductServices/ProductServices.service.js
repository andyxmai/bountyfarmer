'use strict';

angular.module('bountyfarmerApp')
  .factory('ProductServices', function (Restangular, $http) {
    // Service logic

    var product = {};

    product.getProduct = function(id) {
      return Restangular.one('classes/Product/' + id).get();
    };

    product.getProductImage = function(id) {   
      return Restangular.one('classes/Product/' + id).get().then(function(product) {
        return product.imageUrl.url;
      });
    };

    return product;

  });
