(function(root) {

  var A = require('allong.es')

  var curry = A.curry,
      variadic = A.variadic;

  // # oscin.es
  //
  // See the [home page](http://oscin.es)

  // ### The Bluebird family compose combinators

  function Bluebird (a, b, c) {
    return a.call(this, b.call(this, c))
  }

  function B (a) { return function __B (b) { return function _B (c) {
    return a(b(c))
  }}}

  function Blackbird (a, b, c, d) {
    return a.call(this, b.call(this, c).call(this, d))
  }

  function B1 (a) { return function ___B1 (b) { return function __B1 (c) { return function _B1 (d) {
    return a(b(c)(d))
  }}}}

  function Bunting (a, b, c, d, e) {
    return a.call(this, b.call(this, c).call(this, d).call(this, e))
  }

  function B2 (a) { return function ____B2 (b) { return function ___B2 (c) { return function __B2 (d) { return function _B2 (e) {
    return a(b(c)(d)(e))
  }}}}}

  function Becard (a, b, c, d) {
    return a.call(this, b.call(this, c.call(this, d)))
  }

  function B3 (a) { return function ___B3 (b) { return function __B3 (c) { return function _B3 (d) {
    return a(b(c(d)))
  }}}}

  function Cardinal (a, b, c) {
    return a.call(this, c).call(this, b)
  }

  function C (a) { return function __C (b) { return function _C (c) {
    return a(c)(b)
  }}}

  function Dove (a, b, c, d) {
    return a.call(this, b).call(c.call(this, d))
  }

  function D (a) { return function ___D (b) { return function __D (c) { return function _D (d) {
    return a(b)(c(d))
  }}}}

  function Dickcissel (a, b, c, d, e) {
    return a.call(this, b).call(this, c).call(d.call(this, e))
  }

  var D1 = curry(Dickcissel);

  function Dovekies (a, b, c, d, e) {
    return a.call(this, b.call(this, c)).call(d.call(this, e))
  }

  var D2 = curry(Dovekies);

  function Eagle (a, b, c, d, e) {
    return a.call(this, b).call(c.call(this, d).call(this, e))
  }

  function E (a) { return function ____E (b) { return function ___E (c) { return function __E (d) { return function _E (e) {
    return a(b)(c(d)(e))
  }}}}}

  function BaldEagle (a, b, c, d, e, f, g) {
    a.call(this, b.call(this, c).call(this, d).call(e.call(this, f).call(this,g)))
  }

  var Ê = curry(BaldEagle);

  function Finch (a, b, c) {
    return c.call(this, b).call(this, a)
  }

  function F (a) { return function __F (b) { return function _F (c) {
    return c(b)(a)
  }}}

  function Goldfinch (a, b, c, d) {
    return a.call(this, d).call(b.call(this, c))
  }

  function G (a) { return function ___G (b) { return function __G (c) { return function _G (d) {
    return a(d)(b(c))
  }}}}

  function Hummingbird (a, b, c) {
    return a.call(this, b).call(this, c).call(this, b)
  }

  var H = curry(Hummingbird);

  function Idiot (a) {
    return a
  }

  function I (a) {
    return a
  }

  function Identity (a) {
    return a
  }

  function Jay (a, b, c, d) {
    return a.call(this, b).call(a.call(this, d).call(this, c))
  }

  function J (x) { return function ___J (y) { return function __J (z) { return function _J (w) {
    return x(y)(x(w)(z))
  }}}}

  function Kestrel (a) { return function _Kestrel (b) {
      return a
  }}

  function K (a) { return function _K (b) {
     return a
  }}

  // Kite = KI

  function Kite (a) { return function _Kite (b) {
     return b
  }}

  function K1 (a) { return function _K1 (b) {
     return b
  }}

  function Lark (a, b) {
    return a.call(this, b.call(this, b))
  }

  function L (a) { return function _L (b) {
    return a(b(b))
  }}

  function Mockingbird (a) {
    return a.call(this, a)
  }

  function M (a) {
    return a(a)
  }

  function DoubleMockingbird (a, b) {
    return a.call(this, b).call(a.call(this, b))
  }

  function M2 (a) { return function _M2 (b) {
    return a(b)(a(b))
  }}

  function Owl (a, b) {
    return b.call(this, a.call(this, b))
  }

  function O (a) { return function _O (b) {
    return b(a(b))
  }}

  function QueerBird (a, b, c) {
    return b.call(this, a.call(this, c))
  }

  var Q = curry(QueerBird);

  function QuixoticBird (a, b, c) {
    return a.call(this, c.call(this, b))
  }

  var Q1 = curry(QuixoticBird);

  function QuizzicalBird (a, b, c) {
    return b.call(this, c.call(this, a))
  }

  var Q2 = curry(QuizzicalBird);

  function QuirkyBird (a, b, c) {
    return c.call(this, a.call(this, b))
  }

  var Q3 = curry(QuirkyBird);

  function QuackyBird (a, b, c) {
    return c.call(this, b.call(this, a))
  }

  var Q4 = curry(QuackyBird);

  function Robin (a, b, c) {
    return b.call(this, c).call(this, a)
  }

  function R (a) { return function __R (b) { return function _R (c) {
    return b(c)(a)
  }}}

  function Starling (a, b, c) {
    return a.call(this, c).call(this, b.call(this, c))
  }

  function S (a) { return function __S (b) { return function _S (c) {
    return a(c)(b(c))
  }}}

  function Thrush (a, b) {
    return b.call(this, a)
  }

  function T (a) { return function _T (b) {
    return b(a)
  }}

  function Turing (a, b) {
    return b.call(this, a.call(this, b).call(this, b))
  }

  function U (a) { return function _U (b) {
    return b(a(a)(b))
  }}

  function Vireo (a, b, c) {
    return c.call(this, a).call(this, b)
  }

  var Pairing = Vireo;

  function V (a) { return function __V (b) { return function _V (c) {
    return c(a)(b)
  }}}

  function Warbler (a, b) {
    return a.call(this, b).call(this, b)
  }

  function W (a) { return function _W (b) {
    return a(b)(b)
  }}

  function ConverseWarbler (a, b) {
    return b.call(this, a).call(this, a)
  }

  function W1 (x) { return function _W1 (y) {
    return y(x)(x)
  }}
  
  // Starred Birds
  
  function C_ (x) { return function ___C_ (y) { return function __C_ (z) { return function _C_ (w) {
    return x(y)(w)(z)
  }}}}
  
  function C__ (x) { return function ____C__ (y) { return function ___C__ (z) { return function __C__ (w) { return function _C__ (v) {
    return x(y)(z)(v)(w)
  }}}}}
  
  function W_ (x) { return function __W_ (y) { return function _W_ (z) {
    return x(y)(z)(z)
  }}}
  
  function W__ (x) { return function ___W__ (y) { return function __W__ (z) { return function _W__ (w) {
    return x(y)(z)(w)(w)
  }}}}

  var extend = variadic( function (consumer, providers) {
    var key,
        i,
        provider,
        except;

    for (i = 0; i < providers.length; ++i) {
      provider = providers[i];
      except = provider['except'] || []
      except.push('except')
      for (key in provider) {
        if (except.indexOf(key) < 0 && provider.hasOwnProperty(key)) {
          consumer[key] = provider[key]
        }
      }
    }
    return consumer
  });

  // ## Export the songbird and utility functions
  extend(root, {
    Bluebird: Bluebird,
    B: B,
    Blackbird: Blackbird,
    B1: B1,
    Bunting: Bunting,
    B2: B2,
    Becard: Becard,
    B3: B3,
    Cardinal: Cardinal,
    C: C,
    Dove: Dove,
    D: D,
    Dickcissel: Dickcissel,
    D1: D1,
    Dovekies: Dovekies,
    D2: D2,
    Eagle: Eagle,
    E: E,
    BaldEagle: BaldEagle,
    'Ê': Ê,
    Finch: Finch,
    F: F,
    Goldfinch: Goldfinch,
    G: G,
    Hummingbird: Hummingbird,
    H: H,
    Idiot: Idiot,
    Identity: Identity,
    I: I,
    Jay: Jay,
    J: J,
    Kestrel: Kestrel,
    K: K,
    Kite: Kite,
    K1: K1,
    Lark: Lark,
    L: L,
    Mockingbird: Mockingbird,
    M: M,
    DoubleMockingbird: DoubleMockingbird,
    M2: M2,
    Owl: Owl,
    O: O,
    QueerBird: QueerBird,
    Q: Q,
    QuixoticBird: QuixoticBird,
    Q1: Q1,
    QuizzicalBird: QuizzicalBird,
    Q2: Q2,
    QuirkyBird: QuirkyBird,
    Q3: Q3,
    QuackyBird: QuackyBird,
    Q4: Q4,
    Robin: Robin,
    R: R,
    Starling: Starling,
    S: S,
    Thrush: Thrush,
    T: T,
    Turing: Turing,
    U: U,
    Vireo: Vireo,
    Pairing: Pairing,
    V: V,
    Warbler: Warbler,
    W: W,
    ConverseWarbler: ConverseWarbler,
    W1: W1,
    'C*': C_,
    'C**': C__,
    'W*': W_,
    'W**': W__
  });

})(this);
