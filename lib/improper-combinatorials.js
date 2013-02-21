(function(root) {

  var A = require('allong.es'),
			P = require('./passeri.js'),
			V = P.V,
			S = P.S,
			K = P.K,
			L = P.L;

  var Xenops = V(S)(K);

  function X (a) {
    return a(S)(K);
  }

  var Y = S(L)(L);

	A.extend(root, {
		Xenops: Xenops,
		X: X,
		Y: Y
	});

})(this);