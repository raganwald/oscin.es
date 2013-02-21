{shuffle, B, C, D, E, F, G, H, I, J, K, L, M, M2, O, Q, Q1, Q3, R, S, T, U, V, W, W1} = require '../lib/oscin.es.js'

  # validate 'Hxyz = xyzy'
  # validate 'Jxyzw = xy(xwz)'
  # validate 'Kxy = x'
  # validate 'Lxy = x(yy)'
  # validate 'Mx = xx'
  # validate 'M2xy = xy(xy)'
  # validate 'Oxy = y(xy)'
  # validate 'Qxyz = y(xz)'
  # validate 'Q1xyz = x(zy)'
  # validate 'Q3xyz = z(xy)'
  # validate 'Rxyz = yzx'
  #   # Sage Bird!?
  # validate 'Sxyz = xz(yz)'
  # validate 'Txy = yx'
  # validate 'Uxy = y(xxy)'
  # validate 'Vxyz = zxy'
  # validate 'Wxy = xyy'
  # validate 'W1xy = yxx'

describe "converting an eager proper combinator to a shuffle", ->
	
	it "should handle I", ->
  	# validate 'Ix = x'
		expect( shuffle(I) ).toEqual({
			order: 1,
			reduction: [0]
		})
		
	it "should handle duplication", ->
		expect( shuffle(M) ).toEqual({
			order: 1,
			reduction: [0, 0]
		})
  	# validate 'Wxy = xyy'
		expect( shuffle(W) ).toEqual({
			order: 2,
			reduction: [0, 1, 1]
		})
  	# validate 'W1xy = yxx'
		expect( shuffle(W1) ).toEqual({
			order: 2,
			reduction: [1, 0, 0]
		})
	
	it "should handle straight shuffling", ->
  	# validate 'Cxyz = xzy'
		expect( shuffle(C) ).toEqual({
			order: 3,
			reduction: [0, 2, 1]
		})
  	# validate 'Fxyz = zyx'
		expect( shuffle(F) ).toEqual({
			order: 3,
			reduction: [2, 1, 0]
		})
		expect( shuffle(R) ).toEqual({
			order: 3,
			reduction: [1, 2, 0]
		})
		expect( shuffle(V) ).toEqual({
			order: 3,
			reduction: [2, 0, 1]
		})
		expect( shuffle(T) ).toEqual({
			order: 2,
			reduction: [1, 0]
		})
		
	it "should handle erasing", ->
		expect( shuffle(K) ).toEqual({
			order: 2,
			reduction: [0]
		})
		
	it "shoudl handle some grouping", ->
  	# validate 'Bxyz = x(yz)'
		expect( shuffle(B) ).toEqual({
			order: 3,
			reduction: [0, [1, 2]]
		})
  	# validate 'Dxyzw = xy(zw)'
		expect( shuffle(D) ).toEqual({
			order: 4,
			reduction: [0, 1, [2, 3]]
		})
  	# validate 'Exyzwv = xy(zwv)'
		expect( shuffle(E) ).toEqual({
			order: 5,
			reduction: [0, 1, [2, 3, 4]]
		})
  	# validate 'Gxyzw = xw(yz)'
		expect( shuffle(G) ).toEqual({
			order: 4,
			reduction: [0, 3, [1, 2]]
		})
		