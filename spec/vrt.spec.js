new function () {

  var O = require('../lib/oscin.es.js'),
      K = O.K,
      I = O.I,
      V = O.V,
      R = O.R,
      T = O.T;

  describe("V", function () {
	it("should abK", function () {
		expect( V('a')('b')(K) ).toEqual('a')
	})
	it("should ab(KI)", function () {
		expect( V('a')('b')(K(I)) ).toEqual('b')
	})
  });

  describe("R", function () {
	it("should bKa", function () {
		expect( R('b')(K)('a') ).toEqual('a')
	});
	it("should b(KI)a", function () {
		expect( R('b')(K(I))('a') ).toEqual('b')
	});
  });

  describe("T", function () {
    it("should reverse application of arguments", function () {
      expect( T('a')(I) ).toEqual('a')
    })
  });

}