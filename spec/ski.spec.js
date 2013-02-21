new function () {

  var O = require('../lib/oscin.es.js'),
      K = O.K,
      I = O.I,
			S = O.S;

  describe("I", function () {
    it("should return its argument", function () {
      expect( I('a') ).toEqual('a')
    })
  });

  describe("K and KI", function () {
    it ("should return its first argument", function () {
      expect( K('a')('b') ).toEqual('a')
    });
    it ("should return return the second argument from KI", function () {
      expect( K(I)('a')('b') ).toEqual('b')
    });
  });

	describe("S", function () {
		function timesTwo (x) { return x * 2 }
		function adder (x) { return function (y) { return x + y } }
		
		it("should ac(bc)", function () {
			expect( S(adder)(timesTwo)(1) ).toEqual(3)
		})
	});

}