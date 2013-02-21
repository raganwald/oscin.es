(function(root) {
  var A = require('allong.es'),
      Passeri = require('./passeri'),
      Oenanthe = require('./oenanthe');
      Improper = require('./improper-combinatorials');

  A.extend(root,
    Passeri, 
		Improper,
    Oenanthe,
    {
      bool: require('./bool')
    }
  );

})(this);
