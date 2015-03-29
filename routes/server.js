var express = require( 'express' );
var app = express();
app.get( '/', function ( request, response ) {
	response.send( 'Hello World!' );
} );
app.get( '/example/b', function ( request, response, next ) {
console.log( 'First handler' ); You need to specify the next object
next();
when there are more than one
}, function ( request, response ) { handlers.
response.send('Second handler'); Before a handler returns, call
} );
var server = app.listen( 4140, function () {
	var host = server.address().address;
	var port = server.address().port;
	console.log( 'Listening at http://%s:%s', host, port );
} );