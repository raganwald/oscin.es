# Boolean Logic with Combinators

## Preamble

A *combinator* is a function that takes one argument and returns one argument. Combinators are pure functions, they are not stateful in any way. Combinators may be equivalent to the curried form of closed over functions. For example, the combinator known as "K" is equivalent to:

    function K (x) {
      return function (y) { return x }
    }

There are a few interesting things about combinators. First, it has been repeatedly established that [with just a few "axiomatic" combinators, one can derive all of the combinators every discovered][skbase]. For example, given the combinators S and K, one can derive I, and from there derive all others. Thus, logicians speak of the "SK Base" or the "SKI Base." There is even a "one-point base" featuring the combinator X. From X, one can derive S and K, and therefore derive all of the combinators again. The Iota programming language has X as its *only* combinator.

[skbase]: https://en.wikipedia.org/wiki/Combinatory_logic#Completeness_of_the_S-K_basis

Church's thesis is that combinatory can be combined to become equivalent to any lambda term, and therefore combinators can compute anything computable. That being said, doing all of your computation with X would be a very deep dive into the Turing Tar Pit.

## Boolean Logic

One simple exercise with combinators is to replicate boolean logic. Since we're working with JavaScript, we'll replicate JavaScript's "not," "or," and "and" operations (`!`, `||`, and `&&`). We'll need the Idiot, Kestrel, Robin, Thrush, and Vireo (I, K, R, T, and V) combinators to accomplish this.

Let's review what each combinator of the combinators we've chosen does, using fairly simple notation:

    Ia -> a
    Kab -> a
    Rabc -> bca
    Tab -> ba
    Vabc -> cab
    
We read this as saying:

1. I followed by any combinator denoted as a is equivalent to a by itself.
2. K followed by two combinators denoted a and b is equivalent to a by itself.
3. R followed by three combinators denoted a, b and c is equivalent to b followed by c followed by a.
3. T followed by two combinators denoted a,and is equivalent to b followed by a.
3. V followed by three combinators denoted a, b and c is equivalent to c followed by a followed by b.

We can play with these using the oscin.es `.apply` function:

    O = require('oscin.es')
    O.apply(O.I, 'true')
      //=> 'true'
    O.apply(O.K, 'true', 'false')
      //=> 'true'
    O.apply(O.K, O.I, 'true', 'false')
      //=> 'false'
      
All of those Os are annoying, so presuming we're just playing and not worried about polluting the global namespace:

    O = require('oscin.es')
    var K = O.K,
        I = O.I,
        R = O.R,
        T = O.T,
        V = O.V,
        apply = O.apply;
    apply(I, 'true')
      //=> true
    apply(K, 'true', 'false')
      //=> true
    apply(K, I, 'true', 'false')
      //=> 'false'
      
Study the last example, it's important to grasp that the "apply" function is left-associative. `KIab` is equivalent to `((KI)a)b` and therefore to `(KIa)b`. We know that Kxy -> x, so KIa -> I. Therefore (KIa)b -> Ib, and since Ix -> x, (I)b -> b, and KIab -> b.

## True, False, and Not

We now have the basis of true and false. In raw JavaScript, these are like symbols, dumb data that you act upon with functions, operators, ternaries, and if statements. But we don't have any of those things, so we will make true and false combinators. True will be `K`, false will be `KI`. That way, when we want to print out whether something is true or false, we apply it so:

    var t = K,
        f = apply(K, I);
        
    apply(t, 'true', 'false')
      //=> 'true'
        
    apply(f, 'true', 'false')
      //=> 'false'
      
Our `t` and `f` are combinators that choose the first or second of two items. They compose:

    apply(t, t, f, 'true', 'false')
      //=> 'true'
    apply(f, t, f, 'true', 'false')
      //=> 'false'
      
Our initial `t` or `f` chooses a `t` or `f` which in turn chooses `true` or `false`. This is an interesting line: postfixing `tf` after a logical combinator is an identity operation. It has wires that go "straight through." (Or "gayly forward" if you prefer, we are fabulous-positive programmers here.)

What happens if we reverse these?

    apply(f, f, t, 'true', 'false')
      //=> 'true'
    apply(t, f, t, 'true', 'false')
      //=> 'false'
      
Now `f` chooses `t` and `t` chooses `f`. We have created a logical negation. The only trouble is, it's awkward to use like all the other combinators that operate as prefixes. So what we want is to turn an expression that looks like this:

    xft

into this:

    ftx
   
Let's rename them and see if they look familiar:

    abc -> cab
    
TODO: Explain shuffles and vireos

Look no further than our Vireo, the Vireo is very handy for making things that look like if statements out of logical combinators:

    Vabc -> cab
    
Let's try it:

    apply(V, f, t, t, 'true', 'false')
      //=> 'false'
    apply(V, f, t, f, 'true', 'false')
      //=> 'true'
      
So now we have derived a "not" combinator:

    var not = apply(V, f, t)

    apply(not, t, 'true', 'false')
      //=> 'false'
    apply(not, f, 'true', 'false')
      //=> 'true'
    
