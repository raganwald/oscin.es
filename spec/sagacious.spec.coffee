{reduce} = require('../lib/oscin.es')

validate = (equality) ->
  [expressions..., result] = equality.split(' = ')
  it equality, ->
  	for expression in expressions
      expect( reduce(expression) ).toEqual(result)

describe "Sage Birds", ->
	
	describe "intermediate forms", ->
		validate 'Lx(Lx) = x(Lx(Lx))'
		validate 'M(QMx) = x(M(QMx))'
		validate 'M(RMBx) = x(M(RMBx))'
		validate 'M(CBMx) = x(M(CBMx))'
		validate 'BWBx(BWBx) = x(BWBx(BWBx))'
		
	describe "true combinators", ->
		validate 'BMLx = x(Lx(Lx))'
		validate 'LO(LO)x = x(LO(LO)x)'
		validate 'BM(BWB)x = x(BWBx(BWBx))'
		
		validate 'Q(QM)Mx = x(M(QMx))'
		validate 'W(QL(QL))x = x(Lx(Lx))'
		validate 'BM(RMB)x = x(M(RMBx))'
		
		validate 'SLLx = x(Lx(Lx))'
		validate 'W(M(QL))x = x(Lx(Lx))'
		validate 'BM(CBM)x = x(M(CBMx))'
		
		validate 'UUx = x(UUx)'
		validate 'WS(BWB)x = x(BWBx(BWBx))'