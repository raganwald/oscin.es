(function (root) {

  var A = require('allong.es');
      Passeri = require('./passeri'),
      t   = Passeri.K,
      f   = Passeri.K(Passeri.I),
      not = Passeri.V(f)(t),
      and = Passeri.R(f),
      or  = Passeri.T(t);

  A.extend(root, {
    t: t,
    f: f,
    not: not,
    and: and,
    or: or
  });

})(this);