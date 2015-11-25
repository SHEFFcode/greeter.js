//Gets a new object (the architecture allows not to have to use the 'new' keyword, similar to '$')
var g = G$('Yuriy', 'Shefer');

//Runs chaingable functions with an output to the console.
g.greet().setLang('ru').greet(true).log();

//Uses jquery selector and function to apply the greating as an HTML code of an element, with some console messages.
$('#login').on('click', function() {
	//Create a greeter object.
	var loginGreeter = G$( 'Yuriy', 'Shefer' );
	//Hide the login div
	$('#logindiv').hide();
	//Set the language based on the value of the select element. Then output the HTML to the greeting element.
	loginGreeter.setLang($('#lang').val()).HTMLGreeting('#greeting', true).log();
});