# Oenanthe is the file containing the CL applyer

A = require 'allong.es'
O = require '../lib/oscin.es.js'
{ tokenize, shape, dereference, parse, evaluate, apply, flatten, stringify } = O
{ a, b, c, d, e, x, y, z, w, v } = O
{ K, I, X, B, V, S, T, E } = O

describe "Tokenizing", ->

  it "should split all caps", ->
    expect( tokenize("ABC") ).toEqual(['A', 'B', 'C'])

  it "should split parentheses and asterixes", ->
    expect( tokenize("(T(T))") ).toEqual(['(', 'T', '(', 'T', ')', ')'])

  it "should handle multi-char names", ->
    expect( tokenize("TB1TK1C(R_R)") ).toEqual(['T', 'B1', 'T', 'K1', 'C', '(', 'R_', 'R', ')'])
    
  it "should handle starred birds", ->
    expect( tokenize('C*W**C**W*') ).toEqual(['C*', 'W**', 'C**', 'W*'])

describe "Dereferencing", ->

  it "should dereference tokens", ->
    expect( dereference(['(', ')']) ).toEqual(['(', ')'])

  it "should dereference string constants", ->
    expect( dereference(['"yes"', "'no'"]) ).toEqual(["yes", 'no'])

  it "should dereference constants from the library", ->
    expect( dereference(['K', 'I'], O)).toEqual([K, I])


describe "Shaping", ->

  it "should handle the basic cases", ->
    expect( shape([]) ).toEqual([])
    expect( shape([1]) ).toEqual([1])
    expect( shape([1, 2]) ).toEqual([1, 2])

  it "should handle bogus cases", -> # helpful for testing
    expect( shape(['(', ')']) ).toEqual([[]])

  it "should handle some simple cases", ->
    expect( shape([1, '(', ')']) ).toEqual([1, []])
    expect( shape(['(', 1, ')']) ).toEqual([[1]])
    expect( shape(['(', ')', 1]) ).toEqual([[], 1])

  it "should handle some double dipping", ->
    expect( shape([1, '(', ')', '(', ')']) ).toEqual([1, [], []])
    expect( shape(['(', 1, ')', '(', ')']) ).toEqual([[1], []])
    expect( shape(['(', ')', 1, '(', ')']) ).toEqual([[], 1, []])
    expect( shape(['(', ')', '(', 1, ')']) ).toEqual([[], [1]])
    expect( shape(['(', ')', '(', ')', 1]) ).toEqual([[], [], 1])

describe 'shaping after dereferencing', ->

  it "should shape properly", ->
    expect( shape(dereference(['(', 'X', ')', 'K', '(', "K", 'I', ')'], O)) ).toEqual([[X], K, [K, I]])

  it "should handle a few obvious cases", ->
    expect( parse('VSK', O) ).toEqual([V, S, K])

  it "should handle deriving the Eagle from Bluebirds", ->
    expect( parse('B(BBB)xyzwv', O) ).toEqual([
      B, [B, B, B], x, y, z, w, v
    ])

describe "evaluation", ->

  it "should evaluate a linear sequence", ->
    expect( evaluate([O.bool.t, 'yes', 'no']) ).toEqual('yes')
    expect( evaluate([O.bool.f, 'yes', 'no']) ).toEqual('no')

  it "should handle nested expressions in first position", ->
    expect( evaluate([[K, I], 'yes', 'no']) ).toEqual('no')

  it "should handle nested expressions in second position", ->
    expect( evaluate([I, [K, I], 'yes', 'no']) ).toEqual('no')
    
describe "regression-testing deriving an eagle from bluebirds", ->

  timeser = (x) -> (y) -> x * y
  adder = (x) -> (y) -> x + y
  
  it "should evaluate an eagle mathematically", ->
    expect( evaluate([E, adder, 3, timeser, 2, 1]) ).toEqual(E(adder)(3)(timeser)(2)(1))
  
  it "should evaluate a derived eagle mathematically", ->
    expect( evaluate([B, [B, B, B], adder, 3, timeser, 2, 1]) ).toEqual(E(adder)(3)(timeser)(2)(1))

describe "flattening", ->

  it "shouldn't flatten obvious cases", ->
    expect( flatten([]) ).toEqual([])
    expect( flatten([1]) ).toEqual([1])
    expect( flatten([1, 2]) ).toEqual([1, 2])
    expect( flatten([1, 2, 3]) ).toEqual([1, 2, 3])

  it "should flatten spurious parentheses", ->
    expect( flatten([[1, 2], 3]) ).toEqual([1, 2, 3])
    expect( flatten([[[1, 2], 3], 4]) ).toEqual([1, 2, 3, 4])
    expect( flatten([[1, 2], 3, 4]) ).toEqual([1, 2, 3, 4])

  it "should flatten sub-lists", ->
    expect( flatten([1, [2, 3, 4], 5]) ).toEqual([1, [2, 3, 4], 5]) # null case
    expect( flatten([1, [[2, 3], 4], 5]) ).toEqual([1, [2, 3, 4], 5])
    expect( flatten([[1, 2], [3, 4], 5]) ).toEqual([1, 2, [3, 4], 5])

describe "stringification", ->
  it "should handle basic cases properly", ->
    expect( stringify('a') ).toEqual('a')
    expect( stringify(['a', 'b']) ).toEqual('(ab)')
    expect( stringify(['a', ['b', 'c']]) ).toEqual('(a(bc))')

describe "quines", ->

  it "should handle the atomic case", ->
    expect( evaluate([a])() ).toEqual('a')

  it "should handle linear cases", ->
    expect( evaluate([a, b])() ).toEqual(['a', 'b'])
    expect( evaluate([a, b, c])() ).toEqual([['a', 'b'], 'c'])

  it "should handle some shuffled linear cases", ->
    expect( evaluate([T, a, b])() ).toEqual(['b', 'a'])
    expect( evaluate([T, a, b, c])() ).toEqual([['b', 'a'], 'c'])

describe "REPL-ification", ->

  it "should handle plain text", ->
    expect( apply("I(KI) 'yes' 'no'", O) ).toEqual('no')

  it "should handle some simple quines", ->
    expect( apply('abc') ).toEqual('abc')
    expect( apply('a(bc)') ).toEqual('a(bc)')

  it "should handle a few obvious cases", ->
    expect( apply 'Ix' ).toEqual 'x'
    expect( apply 'Kxy' ).toEqual 'x'
    expect( apply 'KIxy' ).toEqual 'y'