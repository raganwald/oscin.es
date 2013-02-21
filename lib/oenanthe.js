!(function (root) {

  var A = require('allong.es');
  var Passeri = require('./passeri');
  var __toString = Object.prototype.toString;

  var isArray = Array.isArray || (function (obj) {
    return __toString.call(obj) == '[object Array]';
  });

	function flatten_ (arr) {
		return arr.reduce(function (acc, element) {
			if (isArray(element)) {
				return acc.concat(flatten(element));
			}
			else return acc.concat([element]);
		}, [])
	};
	
	function deepMap (arr, fn) {
		return arr.map(function (element) {
			if (isArray(element)) {
				return deepMap(element, fn);
			}
			else return fn(element);
		});
	};

  function stringifyRoot (something) {
    if (isArray(something)) {
      return something.map(stringify).join('');
    }
    else return something.toString();
  }

  function stringify (something) {
    if (isArray(something)) {
      return '(' + stringifyRoot(something) + ')';
    }
    else return something.toString();
  }

  function shapeHelper (tokensToShape) {
    var firstOpen = tokensToShape.indexOf('('),
        firstClosed = tokensToShape.indexOf(')'),
        firstDip,
        secondDip;

    if (firstOpen < 0 && firstClosed < 0) {
      return {
        level: tokensToShape.slice(0),
        upOne: []
      }
    }
    else if (firstClosed < 0) {
      throw "parentheses unbalanced";
    }
    else if (firstOpen < 0 || firstOpen >= firstClosed) {

      return {
        level: tokensToShape.slice(0, firstClosed),
        upOne: tokensToShape.slice(firstClosed + 1)
      }
    }
    else { // (firstOpen < firstClosed)
      firstDip = shapeHelper(tokensToShape.slice(firstOpen + 1));
      secondDip = shapeHelper(firstDip.upOne);

      return {
        level: tokensToShape.slice(0, firstOpen).concat([firstDip.level]).concat(secondDip.level),
        upOne: secondDip.upOne
      }
    }

  }

  function tokenize (str) {
    return str.replace(/(\n+|"[^"]*"|'[^']*'|[()a-zA-Z])/g," $1").trim().split(/\s+/);
  }

  function shape (tokens) {
    var value = shapeHelper(tokens);

    if (value.upOne.length > 0) {
      throw "unbalanced parentheses";
    }
    else return value.level;
  }

  function dereference (tokens, environment) {
    environment || (environment = Passeri);

    return tokens.map(function (token) {
      if (token === '(' || token === ')') { // punctuation
        return token;
      }
      else if (token.match(/^('|")(.*)\1$/)) { // string constant, used for testing
        return token.match(/^('|")(.*)\1$/)[2];
      }
      else if (environment[token]) {
        return environment[token];
      }
      else throw "Don't recognize " + token;
    })
  };

  function parse (str, environment) {
    environment || (environment = Passeri);

    return root.shape(root.dereference(root.tokenize(str), environment));
  };

  function flatten (something) {
    if (isArray(something)) {
      if (isArray(something[0])) {
        return flatten( something[0].concat(something.slice(1)) );
      }
      else return something.map(flatten);
    }
    else return something;
  }

	// The applicative evaluator is used to convert a combinator to a
	// 'shuffle', e.g. Txy -> [1, 0]
	var APPLICATIVE = (function () {

	  function evaluate (something) {
	    if (isArray(something)) {
	      return (function () {
	        var first = evaluate(something[0]),
	            second = evaluate(something[1]),
	            butHeadAndSecond = something.slice(2);

	        if (second !== void 0) {
	          return evaluate([first(second)].concat(butHeadAndSecond));
	        }
	        else return first;
	      })();
	    }
	    else return something;
	  }

	  function defunctionalize (x) {
	    if (isArray(x)) {
	      var arr = A.splat(defunctionalize)(x);

	      return arr;
	    }
	    else if (!!x.shortName) {
	      return x.shortName;
	    }
	    else if (typeof(x) === 'function') {
	      return defunctionalize( x() );
	    }
	    else return x;
	  }

	  function composer (x) {
	    return function (y) {
	      if (y === void 0){
	        return defunctionalize( x );
	      }
	      else return composer([x, y]);
	    }
	  }
  
	  var LETTERS = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
	                'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
	
		var ARGUMENTS = LETTERS.map(function (letter) {
			var arg = composer(letter);
			
			arg.shortName = letter;
			return arg;
		});

	  var DEFAULT_ARGUMENTS = ARGUMENTS.reduce(
	        function (acc, arg) {
	          acc[arg.shortName] = arg;
	          return acc
	        }, {});
        
	  function wrap (env) {
	    var wrappedEnv = {},
	        fn,
	        i,
	        letter;
    
	    for (key in env) {
	      if (env.hasOwnProperty(key) && key.match(/^[A-Z][^a-z]*$/)) {
	        (function (key, fn) {
	          if (!!fn.shortName && fn.shortName === key) {
	            wrappedEnv[key] = fn
	          }
	          else {
	            wrappedEnv[key] = function (something) {
	              return fn(something)
	            }
	            wrappedEnv[key].shortName = key
	          }
	        })(key, env[key])
	      }
	    }
    
	    for (i = 0; i < 26; ++i) {
	      letter = LETTERS[i];
	      wrappedEnv[letter] = DEFAULT_ARGUMENTS[letter]
	    }
    
	    return wrappedEnv;
	  }

	  var defaultEnvironment = wrap(Passeri);

	  function apply (notation, environment) {
	    var wrappedEnv = environment ? wrap(environment) : defaultEnvironment,
	        result = evaluate(parse(notation, wrappedEnv));

	    return stringifyRoot(flatten(defunctionalize(result)))
	  };
	
		function shuffle (proper) {
			
			var expr = [proper].concat(ARGUMENTS),
			    result = evaluate(expr),
					reduction = flatten(defunctionalize(result)),
					flatReduction = flatten_(reduction),
					erased = LETTERS.reduce(function (acc, letter) {
									   return flatReduction.indexOf(letter) < 0
									          ? acc.concat([letter])
									          : acc
									 }, []),
					alphabetPointer = 25,
					inputNumbers,
					reductionNumbers;
					
			while (reduction.length > 0 && alphabetPointer >= 0 && reduction[reduction.length - 1] === LETTERS[alphabetPointer]) {
				reduction.pop();
				--alphabetPointer;
			}
			
			if (erased.length === 0 && reduction.length === 0) {
				return {
					order: 1,
					reduction: [0]
				}
			}
			
			// reduced
			flatReduction = flatten_(reduction);
			
			if (flatReduction.indexOf(LETTERS[alphabetPointer + 1]) >= 0) {
				reduction.push(LETTERS[alphabetPointer + 1])
			}
			
			inputNumbers = flatReduction.concat(erased).reduce(function (acc, letter) {
				var number = LETTERS.indexOf(letter);
				
				acc[number] = number;
				return acc;
			}, []);
			
			reductionNumbers = deepMap(reduction, function (letter) {
												return LETTERS.indexOf(letter)
											});
					
			return {
				order: inputNumbers.length,
				reduction: reductionNumbers
			};
			
		}

		return {
		    apply: apply,
		    evaluate: evaluate,
		    stringify: stringify,
				shuffle: shuffle,
				arguments: ARGUMENTS,
				defaultArguments: DEFAULT_ARGUMENTS
		};

	})();
	
	var NORMAL = (function () {
		// convert eager proper combinator lambda to eager shuffle
		var properCombinatorToDefinitionThunk = (function (properCombinatorToDefinitionThunk) {
		
																					for (shortName in Passeri) {
																						if (Passeri.hasOwnProperty(shortName)) {
																							(function (shortName) {
																								properCombinatorToDefinitionThunk[shortName] = A.memoized(function () {
																									return APPLICATIVE.shuffle(Passeri[shortName]);
																								});
																							})(shortName);
																						}
																					};
		
																					return properCombinatorToDefinitionThunk;
			
																				})({}),
		    shortName;

	  function parse (str) {
	    return shape(tokenize(str));
	  };
		
		function innerEvaluate (something, stack) {
			var head,
			    butHead, 
			    definitionThunk,
					definition,
					order,
					reduction,
					consumed,
					unconsumed,
					result, 
					strRep;
			
			if (isArray(something)) {
				
				// check for simple cycles
				strRep = stringifyRoot(flatten(something));
				if (stack.indexOf(strRep) >= 0) {
					return something;
				}
				else stack = [strRep].concat(stack);
				
				// get a "clean" head item
				// note that (xyz)ab is equivalent to xyzab, so we
				// flatten leading arrays
				head = something[0];
				butHead = something.slice(1);
				while (isArray(head)) {
					butHead = head.slice(1).concat(butHead);
					head = head[0];
				}
				
				definitionThunk = properCombinatorToDefinitionThunk[head];
				
				if (definitionThunk) {
					
					// "order" in the arity of the combinator
					// it's "order" instead of "arity" because that's
					// the CL term Smullyan uses
					//
					// "reduction" is the shape of the result using integers from
					// zero, e.g. T -> [1, 0], K -> [0], B -> [0, [1, 2]]
					definition = definitionThunk();
					order = definition.order;
					reduction = definition.reduction;
					
					if (butHead.length < order) {
						console.log(something, head, butHead, order);
						throw '' + something + ' wrong order for ' + head + ' which is of order ' + order;
					}
					else {
						consumed = butHead.slice(0, order);
						unconsumed = butHead.slice(order);
						result = deepMap(reduction, function (index) {
							return consumed[index];
						});
						result = result.concat(unconsumed);
						return innerEvaluate(result, stack);
					}
				}
				else return A.splat(A.applyLast(innerEvaluate, stack))(something);

			}
			else return something;
		};
		
		function evaluate (something) {
			return innerEvaluate(something, []);
		}

	  function reduce (notation) {
	    var result = evaluate(parse(notation));

	    return stringifyRoot(flatten(result));
	  };
		
		return {
			parseNormal: parse,
			evaluateNormal: evaluate,
			reduce: reduce
		};
		
	})();

  A.extend(root, {
    tokenize: tokenize,
    dereference: dereference,
    parse: parse,
    shape: shape,
    flatten: flatten,
  }, APPLICATIVE, APPLICATIVE.defaultArguments, NORMAL);

})(this);