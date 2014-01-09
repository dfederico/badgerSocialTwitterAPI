module.exports = function(Handlebars) {
  	Handlebars.registerHelper('uncap', (function(name) {

	    return function(options) {

	    	var firstLetter,
				newName,
				remainder;

			firstLetter = options.charAt(0);
			remainder = options.substr(1);

			firstLetter = firstLetter.toLowerCase();

			newName = firstLetter + remainder;

	      return newName;
	    };


  	})());
};