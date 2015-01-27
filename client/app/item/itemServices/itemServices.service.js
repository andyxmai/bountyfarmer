'use strict';

angular.module('bountyfarmerApp')
  .factory('itemServices', function (Restangular) {
    // Service logic
    // ...

    var item = {};

    item.getCurrentItems = function() {
      var today = new Date();
      return Restangular.all('classes/ListItem').getList({
        'where': {'sellBy':{'$gte':{'__type': 'Date', 'iso': today.toISOString()}}},
        'order':'-createdAt'
      });
    };

    item.getPastItems = function() {
      var today = new Date();
      return Restangular.all('classes/ListItem').getList({
        'where': {'sellBy':{'$lt':{'__type': 'Date', 'iso': today.toISOString()}}},
        'order':'-createdAt'
      });
    };

    item.addItem = function(newItem) {
      var itemList = Restangular.all('classes/ListItem');

      return itemList.post(newItem);
    };

    return item;
  });
