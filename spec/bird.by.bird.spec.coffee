{reduce} = require('../lib/oscin.es')

validate = (equality) ->
  [expressions..., result] = equality.split(' = ')
  it equality, ->
  	for expression in expressions
      expect( reduce(expression) ).toEqual(result)

describe "head-normal reduction", ->

	describe "The Standard Combinators", ->
	  validate 'Bxyz = x(yz)'
	  validate 'Cxyz = xzy'
	  validate 'Dxyzw = xy(zw)'
	  validate 'Exyzwv = xy(zwv)'
	  validate 'Fxyz = zyx'
	  validate 'Gxyzw = xw(yz)'
	  validate 'Hxyz = xyzy'
	  validate 'Ix = x'
	  validate 'Jxyzw = xy(xwz)'
	  validate 'Kxy = x'
	  validate 'Lxy = x(yy)'
	  validate 'Mx = xx'
	  validate 'M2xy = xy(xy)'
	  validate 'Oxy = y(xy)'
	  validate 'Qxyz = y(xz)'
	  validate 'Q1xyz = x(zy)'
	  validate 'Q3xyz = z(xy)'
	  validate 'Rxyz = yzx'
	  validate 'Sxyz = xz(yz)'
	  validate 'Txy = yx'
	  validate 'Uxy = y(xxy)'
	  validate 'Vxyz = zxy'
	  validate 'Wxy = xyy'
	  validate 'W1xy = yxx'

	describe "The Starred Birds", ->
	  validate 'C*xyzw = xywz'
	  validate 'C**xyzwv = xyzvw'
	  validate 'W*xyz = xyzz'
	  validate 'W**xyzw = xyzww'

	describe "The Derivations", ->
  
	  describe "from Bluebirds", ->
	    validate 'Dxyzw = BBxyzw = xy(zw)'
	    validate 'Exyzwv = B(BBB)xyzwv = xy(zwv)'
    
	  describe "from Bluebirds and Thrushes", ->
	    validate 'Rxyz = BBTxyz = yzx'
	    validate 'Cxyz = RRRxyz = B(T(BBT))(BBT)xyz = xzy'
	    validate 'Fxyz = ETTETxyz = B(TT)(B(BBB)T)xyz = zyx'
	    validate 'Vxyz = BCTxyz = CFxyz = zxy'
	    validate 'Qxyz = CBxyz = y(xz)'
	    validate 'Q1xyz = BCBxyz = x(zy)'
	    validate 'Q3xyz = BTxyz = z(xy)'
	    validate 'Gxyzw = BBCxyzw = xw(yz)'
    
	  describe "from Bluebirds, Thrushes, and Mockingbirds", ->
	    validate 'M2xy = BMxy = xy(xy)'
	    validate 'Lxy = QMxy = x(yy)'
	    validate 'Wxy = C(BMR)xy = xyy'
	    validate 'W1xy = BMRxy = CWxy = yxx'
	    validate 'Hxyz = BW(BC)xyz = xyzy'
	    validate 'Sxyz = B(BW)(BBC)xyz = xz(yz)'
	    validate 'Oxy = QQWxy = BWQxy = SIxy = y(xy)'
	    validate 'Uxy = LOxy = L(SI)xy = L(BWQ)xy = L(QQW)xy = y(xxy)'
    
	  describe "Starred Birds", ->
	    validate 'C*xyzw = BCxyzw = xywz'
	    validate 'C**xyzwv = BC*xyzwv = xyzvw'
	    validate 'W*xyz = BWxyz = xyzz'
	    validate 'W**xyzw = BW*xyzw = xyzww'