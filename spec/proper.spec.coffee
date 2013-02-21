# Proper and Improper Combinators

{apply} = require('../lib/oscin.es.js')

validate = (equality) ->
  [expressions..., result] = equality.split(' = ')
  for expression in expressions
    it "#{expression} = #{result}", ->
      expect( apply(expression) ).toEqual(result)

describe "Proper Combinators", ->
  validate('ITxy = yx')

describe "Improper Combinators", ->
  validate('TIxy = xIy')