new function () {

  var O = require('../lib/oscin.es.js'),
      K = O.K,
      I = O.I,
      V = O.V,
      R = O.R,
      T = O.T,
			t = O.bool.t,
			f = O.bool.f,
			not = O.bool.not,
			or = O.bool.or,
			and = O.bool.and;

	describe("Boolean Operations", function () {
		
		describe("t and f", function () {
			it ("should tab", function () {
				expect( t('a')('b') ).toEqual('a')
			});
			it ("should fab", function () {
				expect( f('a')('b') ).toEqual('b')
			});
		});
		
		describe("not", function () {
			it ("should negate t and f", function () {
				expect( not(t)('a')('b') ).toEqual('b');
				expect( not(f)('a')('b') ).toEqual('a');
			});
			it ("should double-negate t and f", function () {
				expect( not(not(t))('a')('b') ).toEqual('a');
				expect( not(not(f))('a')('b') ).toEqual('b');
			});
		});
		
		describe("or", function () {
			it ("should have union semantics", function () {
				expect( or(f)(f)('a')('b') ).toEqual('b')
				expect( or(f)(t)('a')('b') ).toEqual('a')
				expect( or(t)(f)('a')('b') ).toEqual('a')
				expect( or(t)(t)('a')('b') ).toEqual('a')
			})
		});
		
		describe("and", function () {
			it ("should have intersection semantics", function () {
				expect( and(f)(f)('a')('b') ).toEqual('b')
				expect( and(f)(t)('a')('b') ).toEqual('b')
				expect( and(t)(f)('a')('b') ).toEqual('b')
				expect( and(t)(t)('a')('b') ).toEqual('a')
			})
		});
		
	});
}