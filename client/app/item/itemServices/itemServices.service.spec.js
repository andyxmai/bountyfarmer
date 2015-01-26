'use strict';

describe('Service: itemServices', function () {

  // load the service's module
  beforeEach(module('bountyfarmerApp'));

  // instantiate service
  var itemServices;
  beforeEach(inject(function (_itemServices_) {
    itemServices = _itemServices_;
  }));

  it('should do something', function () {
    expect(!!itemServices).toBe(true);
  });

});
