var express = require( 'express' );
var path= require('path');
var app = express();

var server_port = process.env.OPENSHIFT_NODEJS_PORT || 4140;
var server_host = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';


//redirect send
//app.use('/fonts', express.static(path.join(__dirname,'public/fonts')));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/css', express.static('css'));
app.use('/fonts', express.static('fonts'));
app.use('/images', express.static('images'));
app.use('/js', express.static('js'));

app.get( '/', function ( request, response ) {
	var session_id='3';
	response.sendFile( __dirname + '/views/index.html' );
	//response.send('http://'+server_host+':'+server_port+'/session/'+session_id)
} );
app.get( '/session/:id', function ( request, response ) {
	response.send(request.params.id);
} );






// muilt next handleer
app.get( '/example/b', function ( request, response, next ) {
	console.log( 'First handler' ); 
	next();
	}, function ( request, response ) { 
	response.send('Second handler');
} );
//server start 
var server = app.listen( server_port, function () {
	var host = server.address().address;
	var port = server.address().port;
	console.log( 'Listening at http://%s:%s', host, port );
} );


// socket.io
var io = require( 'socket.io' )( server );
io.on( 'connection', function( socket ) {
	console.log( 'New user connected' );
	socket.on( 'disconnect', function() {
		console.log( 'User disconnected' );
	} );
	
	socket.on('register', function(id){
		socket.join(id);
		console.log("Join Room" +  id);
	});
	socket.on('command', function(data){
		io.emit('command', data);
	});
	socket.on('command', function(id, data){
		console.log('Received ' + data + ' signal from ' + id);
		io.to(id).emit('command', data);
	});
	socket.on('add', function(id, videoID, title){
		io.to(id).emit('add', videoID, title);
	});
	socket.on('remove', function(id, videoID){
		io.to(id).emit('remove', videoID);
	});
	socket.on('clear', function(id){
		console.log("Clear singal in " +  id);
		io.to(id).emit('clear');
	});
	// socket.on('sync', function(id){
	// 	console.log("Sync request in room " + id);
	// 	io.to(id).emit('sync');
	// });
	// socket.on('syncRes', function(id, playlist){
	// 	console.log("Sending Sync Response to room " + id);
	// 	io.to(id).emit('syncRes', playlist);
	// });


	//socket.join('444');


} );

//namerspace
// var nsp = io.of( '/444' );
// nsp.on( 'connection', function ( socket ) {
// 	console.log( 'someone connected' );
// });
// nsp.emit( 'hi', 'everyone!' );