'use strict';

angular.module('bountyfarmerApp')
  .controller('MainCtrl', function ($scope, $modal, Restangular, itemServices, ProductServices, $state) {

  itemServices.getCurrentItems().then(function(currentItems) {
  	console.log(currentItems);
  	$scope.currentItems = currentItems;	
  });

  itemServices.getPastItems().then(function(pastItems) {
  	$scope.pastItems = pastItems;	
  });

	$scope.selected = undefined;
	
	Restangular.all('classes/Product').getList().then(function(products) {
		console.log(products)
		$scope.products = products;
	});

	$scope.dateFormat = 'MM/dd/yyyy';
	$scope.today = function() {
    $scope.dt = new Date();
  };

	$scope.minDate = new Date();

	 $scope.open = function($event) {
	 	console.log('opened');
    $event.preventDefault();
    $event.stopPropagation();

    $scope.opened = true;
  };

	$scope.dateOptions = {
    formatYear: 'yy',
    startingDay: 1
  };

  $scope.getProductImage = function(id) {
  	var imageUrl = null;
  	 _.forEach($scope.products, function(product) {
  	 		if (product.objectId == id) {
   	    	imageUrl = product.imageUrl; // My goal
   	   }
   	 });

  	return imageUrl.url;

  	return ProductServices.getProductImage(id);
  }
  // $scope.getProductImage('oZcNGW6dhW');

 	$scope.onSelect = function(item, model, label) {
 		var modalInstance = $modal.open({
      templateUrl: 'components/templates/postModalTemplate.html',
      controller: 'ModalInstanceCtrl',
      resolve: {
        item: function () {
          return item;
        }
      },
      scope: $scope
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
      $state.reload();
    }, function () {
      //$log.info('Modal dismissed at: ' + new Date());
    });
 	};
});

angular.module('bountyfarmerApp').controller('ModalInstanceCtrl', function ($scope, $modalInstance, item, itemServices) {

	$scope.ok = function (form, sellBy) {
		console.log(item);
		console.log(sellBy);

		var product = {
      '__type': 'Pointer',
      'className': 'Product',
      'objectId': item.objectId 
    };

		var newItem = {};
		newItem.price = Math.round(parseFloat(form.price)*100);
		newItem.weight = parseInt(form.weight);
		newItem.product = product;
		newItem.productType = item.type;
		newItem.productName = item.name;
		newItem.description = form.description;
		newItem.status = 'pending';
		newItem.sellBy = {
											  "__type": "Date",
											  "iso": sellBy.toISOString()
											};

		itemServices.addItem(newItem).then(function(res) {
			console.log(res);
		}, 	
		function(err) {
			console.log(err);
		});

	  $modalInstance.close(item);
	};

	$scope.cancel = function () {
		console.log(item);
	  $modalInstance.dismiss('cancel');
	};
});