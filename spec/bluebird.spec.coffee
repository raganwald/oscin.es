# This is an example of using a combinator in an idiomatic
# JavaScript way. Compare and contrast with specs that
# test the combinators in combinatorial ways.

{K, B, B1, B2, B3, E} = require('../lib/oscin.es.js')

timeser = (x) -> (y) -> x * y
adder = (x) -> (y) -> x + y

addOne = adder(1)
timesTwo = timeser(2)

describe "The Bluebird Family", ->

  describe "B", ->
    it "should a(b(c))", ->
      expect( B(timesTwo)(addOne)(42) ).toEqual(86)

  describe "B1", ->
    it "should a(b(c)(d))", ->
      expect( B1(timesTwo)(adder)(2)(1) ).toEqual(6)

  describe "B2", ->
    it "should a(b(c)(d)(e))", ->
      expect( B2(timesTwo)(K)(addOne)(timesTwo)(2) ).toEqual(6)

  describe "B3", ->
    it "should a(b(c(d)))", ->
      expect( B3(addOne)(timesTwo)(addOne)(42) ).toEqual(87)
      
describe "deriving an Eagle", ->
  
  it "should behave like an eagle explicitly", ->
    expect( B(B(B)(B))(adder)(3)(timeser)(2)(1) ).toEqual( E(adder)(3)(timeser)(2)(1) )
  
  it "should behave like an eagle when assigned to a variable", ->
    derivation = B(B(B)(B))
    expect( derivation(adder)(3)(timeser)(2)(1) ).toEqual( E(adder)(3)(timeser)(2)(1) )