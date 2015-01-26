'use strict';

describe('Service: ProductServices', function () {

  // load the service's module
  beforeEach(module('bountyfarmerApp'));

  // instantiate service
  var ProductServices;
  beforeEach(inject(function (_ProductServices_) {
    ProductServices = _ProductServices_;
  }));

  it('should do something', function () {
    expect(!!ProductServices).toBe(true);
  });

});
