{reduce} = require('../lib/oscin.es')

validate = (equality) ->
  [expressions..., result] = equality.split(' = ')
  it equality, ->
  	for expression in expressions
      expect( reduce(expression) ).toEqual(result)

# Update: We cannot reduce the Xenops because it is not a proper combinator
#         This will have to wait for alpha reduction ("macros")

# describe "deriving I from SK", ->
#   validate 'SKKx = Ix = x'
# 
# describe "The Xenops", ->
#   validate 'XXab = Kab = a'
#   validate 'X(XX)abc = Sabc = ac(bc)'
#   validate 'X(XX)XXXXx = SKKx = Ix = x'