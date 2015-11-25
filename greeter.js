/*================================================================================================================================================
                                     								Greeter.js
================================================================================================================================================*/
//Create an immediately invoced function.
;( function( global, $ ) {
	//Set up a function that will create a new Greeter.init object.
	var Greeter = function( firstName, lastName, langauge ) {
		return new Greeter.init( firstName, lastName, langauge );
	}

	//Create an array of supported langauge strings
	var supportedLangs = [ 'en', 'es', 'ru' ]; // this is hidden within an Immediately Invoced Function Expression and not directly accessible

	//Set up an informal greeting object
	var greetings = {
		en: 'Hello',
		es: 'Hola',
		ru: 'Привет'
	};

	//Set up a formal greetings object
	var formalGreetings = {
		en: 'Greetings',
		es: 'Saludos',
		ru: 'Здравствуйте'
	};

	//Create messages object for messages to get logged to console.
	var logMessages = {
		en: 'Logged in',
		es: 'Conectado',
		ru: 'Вы вошли'
	};

	//Set Greeter properties prototype object.
	Greeter.prototype = {
		//Create a fullname property that is a function that returns fullname.
		fullName: function() {
			return this.firstName + ' ' + this.lastName;
		},
		//Createa a validate property that checks for supported languages.
		validate: function() {
			if ( supportedLangs.indexOf( this.langauge ) === -1 ) {
				throw "Invalid language || Idioma no válido || Hеправильный язык";
			}
		},
		//Create an informal greeting property that greets informally.
		greeting: function(){
			return greetings[ this.langauge ] + ' ' + this.firstName + '!';
		},
		//Create a formal greeting property that greets formally.
		formalGreeting: function(){
			return formalGreetings[ this.langauge ] + ' ' + this.fullName()+ '.';
		},
		//Chainable methods
		greet: function(formal) {
			var msg;

			//If undefiled or null it will coerced into 'false'.
			if ( formal ) {
				msg = this.formalGreeting();
			} else {
				msg = this.greeting();
			}

			//Log out the message
			if ( console ) {
				console.log( msg );
			}

			//Make the method chainable by returning 'this'.
			return this;
		},
		//write a log function
		log: function() {
			if ( console ) {
				console.log( logMessages[ this.langauge ] + ':' + this.fullName());
			}
			//Make Chainable
			return this;
		},
		//Change language on the fly.
		setLang: function( newLang ) {
			//Set language to the new language.
			this.langauge = newLang;
			//Validate that the new language is supported.
			this.validate();
			//Make chainable by returning 'this'.
			return this;
		},
		//Pass in a jQuery selector that will update the value of whatever is selected to greeting.
		HTMLGreeting: function(selector, formal) {

			//Validate that '$' exists by going up the scope chain to the global elemetn and checking for '$'
			if ( !$ ) {
				throw 'jQuery not loaded';
			}
			//Check to make sure that the selector variable was passed in.
			if ( !selector ) {
				throw 'Missing jQuery selector';
			}

			var msg;
			//Check if the message is formal or informal.
			if ( formal ) {
				//Prepare formal message.
				msg = this.formalGreeting();
			} else {
				//Prepare an informal message.
				msg = this.greeting();
			}

			//Display msg in the html of the selected element.
			$(selector).html(msg);

			//Make chanable by returning 'this'.
			return this;
		}
	};

	//Create the greeter constructor function with default variables.
	Greeter.init = function( firstName, lastName, langauge ) {
		//Set a variable self where this will point to the greeter.init object.
		var self = this;
		self.firstName = firstName || '';
		self.lastName = lastName || '';
		self.langauge = langauge || 'en';
	}

	//Set the prototype property object for Greeter.init to be the prototype
	//property object to Greeter.
	Greeter.init.prototype = Greeter.prototype;

	//Expose the Greeter function to the global object and make a G$ alias.
	global.Greeter = global.G$ = Greeter;
})( window, jQuery );