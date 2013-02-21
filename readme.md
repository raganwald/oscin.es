# `oscin.es`

The [oscin.es] library contains nearly all of the standard combinators from combinatorial logic implemented in JavaScript.

### installing oscin.es

Installing [oscin.es] is a breeze with [npm]:

    npm install oscin.es
    
You can run the tests if you like:

    npm install jasmine-node
    npm install oscin.es
    npm test

One day there may be a nice interactive REPL, or better still a browser playground, but for now let's use node:

    node
    
We can load any of the standard combinators as functions and try them:

```javascript
O = require('oscines')
var S = O.S,
    K = O.K,
    I = O.I;

K('foo')('bar')
  //=> 'foo'
```

### what are the combinators and what do they do?

If you don't remember all the combinators' letters and what they do, you might want to look at [bird.by.bird.spec.coffee]. Even if you don't care for CoffeeScript, the tests are in a particularly easy-to-read format:

```coffeescript
describe "The Standard Combinators", ->
  validate 'Bxyz = x(yz)'
  validate 'Cxyz = xzy'
  validate 'Dxyzw = xy(zw)'
  validate 'Exyzwv = xy(zwv)'
  validate 'Fxyz = zyx'
  validate 'Gxyzw = xw(yz)'
```

This portion says that the B Combinator (or "Bluebird") performs composition. CL is left-associative, so `xyz` is equivalent to `x(y)(z)` in JavaScript. But `Bxyz` is equivalent to `x(y(z))`, analogous to `compose` in the [allong.es] library and most other FP libraries for JavaScript.

[oscin.es]: http://oscin.es
[allong.es]: http://allong.es
[npm]: hpmjs.org
[bird.by.bird.spec.coffee]: https://github.com/oscin-es/oscin-es.github.com/blob/master/spec/bird.by.bird.spec.coffee
[mock]: http://www.amazon.com/gp/product/0192801422?ie=UTF8&tag=raganwald001-20&linkCode=as2&camp=1789&creative=9325&creativeASIN=0192801422

It also says that the C Combinator ("Cardinal") is equivalent to `x(z)(y)` reversing two arguments, the D Combinator is a one-removed Bluebird, and so forth. This is the standard notation folks use (well, many would use a "." instead of "=", but that's another story.) Many standard derivations are shown and simultaneously tested as well, like:

```coffeescript
describe "The Derivations", ->
  
  describe "from Bluebirds", ->
    validate 'Dxyzw = BBxyzw = xy(zw)'
    validate 'Exyzwv = B(BBB)xyzwv = xy(zwv)'
    
  describe "from Bluebirds and Thrushes", ->
    validate 'Rxyz = BBTxyz = yzx'
    validate 'Cxyz = RRRxyz = B(T(BBT))(BBT)xyz = xzy'
```

This segment describes how to make a Dove out of two Bluebirds, an Eagle out of four Bluebirds and some parentheses, and so forth.

### using oscin.es

So we have [oscin.es] loaded into [node]. Let's solve a problem from [To Mock a Mockingbird][mock]. Smullyan puts it much more eloquently, but we start with the following basic rules:

1. We are given a forest of birds.
2. When you call out the name of some bird to a bird, the bird responds with the name of a bird. We write this as `Ax = y`, where `A` is the name of some bird we know (perhaps "Arthur"), and `x` and `y` could be any birds in the forest, possibly including Arthur.
3. Each bird always gives the same response to the same bird name.
4. The *Mockingbird* (or M Combinator) has the following property: The mockingbird's response to any bird is the same as that bird's response to its own name. We write this as: `Mx = xx`.

One of Smullyan's problems is this. Say that we are given that the forest contains the following two birds:

1. The *Identity Bird* (or I Combinator) has the following property: For any bird x, `Ix = x`.
2. The *Lark* (or L Combinator) has the following property: For any birds x and y, `Lxy = x(yy)`

**Prove that the forest contains a Mockingbird.**

Let's use the `reduce` function to work directly with CL expressions:

```javascript
var $ = O.reduce

$('Ix')
  //=> 'x'
$('Lxy')
  //=> 'x(yy)'
```

Is it just parroting? Let's throw it a curve:

```javascript
$('Lxy')
  //=> 'z'
```

Seems legit. Let's see, what we want is some bird "M" such that `Mx = xx`. We'll obviously need the Lark, it has a duplicative effect. Let's rewrite things to make it easier to see what we're doing:

```javascript
$('Lyx')
  //=> 'y(xx)'
```

So now we're reduced to the problem of "What bird `y` is such that y(xx) = xx?" I know a bird like that, the Identity Bird. Let's try it:

```javascript
$('I(xx)')
  //=> 'xx'
```
And now substitute `I` for `y`:

```javascript
$('LIx')
  //=> 'xx'
```

So, the Mockingbird is the bird named by the Lark when you call out "Identity Bird!" to it. Or in simple terms, `M = LI`. Since we actually found the bird, we have definitively proved that a forest containing a Lark and an Identity Bird also contains a Mockingbird!

The reduce function from [oscin.es] provides a simple tool for playing with problems like this. You can play with simple combinations of proper and true combinators (A proper combinator has a fixed order. i.e. It shuffles, duplicates, or erases its arguments but doesn't introduce anything. A true combinator can be constructed from proper combinators).

Reduce also works for fixed points ("Sage Birds"). For example:

```javascript
$('UUx')
  //=> 'x(UUx)'
  
$('LO(LO)x')
  //=> 'x(LO(LO)x)'
```

The first of those sage birds is attributed to Alan Matheson Turing.

Of course, you are free to use the combinators themselves in your JavaScript, if you look at the source code you'll find there's no weird special sauce in the definitions:

```javascript
function Lark (a, b) {
  return a.call(this, b.call(this, b))
}

function L (a) { return function _L (b) {
  return a(b(b))
}}
```

In general, the standard combinators have two versions. One, with the full name, skips around `this` so that you can use it to decorate methods if you so desire. It also is "uncurried." You can `curry` it with [allong.es] if you need. The second, "pure" version ignores `this` and is written in curried form.

(The lower-case letters from `a` to `z` have a special role as placeholders within the `reduce` function. They are not defined.)

### what else can I read?

There's more on the [ocin.es home page][oscin.es]

---

![](http://i.minus.com/iL337yTdgFj7.png)[![JavaScript Allongé](http://i.minus.com/iW2E1A8M5UWe6.jpeg)][ja]![](http://i.minus.com/iL337yTdgFj7.png)[![CoffeeScript Ristretto](http://i.minus.com/iMmGxzIZkHSLD.jpeg)](http://leanpub.com/coffeescript-ristretto "CoffeeScript Ristretto")![](http://i.minus.com/iL337yTdgFj7.png)[![Kestrels, Quirky Birds, and Hopeless Egocentricity](http://i.minus.com/ibw1f1ARQ4bhi1.jpeg)](http://leanpub.com/combinators "Kestrels, Quirky Birds, and Hopeless Egocentricity")

* [JavaScript Allongé](http://leanpub.com/javascript-allonge), [CoffeeScript Ristretto](http://leanpub.com/coffeescript-ristretto), [Kestrels, Quirky Birds, and Hopeless Egocentricity](http://leanpub.com/combinators), and [other books](http://leanpub.com/u/raganwald).
* [allong.es](http://allong.es), practical function combinators and decorators for JavaScript.
* [Method Combinators](https://github.com/raganwald/method-combinators), a CoffeeScript/JavaScript library for writing method decorators, simply and easily.
* [jQuery Combinators](http://github.com/raganwald/jquery-combinators), what else? A jQuery plugin for writing your own fluent, jQuery-like code. 

[ja]: http://leanpub.com/javascript-allonge "JavaScript Allongé"
[node]: http://nodejs.org

---

[Reg Braithwaite](http://braythwayt.com) | [@raganwald](http://twitter.com/raganwald)