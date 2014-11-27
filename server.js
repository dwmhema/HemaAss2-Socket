
// Require Native Node.js Libraries
var express = require('express');
var app = express();
var http = require('http');
http = http.Server(app);
var io = require('socket.io');
io = io(http);
var usernames =[];

// Route our Assets
app.use('/assets/', express.static(__dirname + '/public/assets/'));

// Route our Home Page
app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});

// Handle Socket Connection
io.on('connection', function(socket){

  console.log('A User Connected');
  socket.on('new user', function(data){

  	if (usernames.indexOf(data) != -1){

  		return;

  	}
    // else {
  	// 	callback(true);
  		socket.name = data;
  		usernames.push(socket.name);
  		io.emit('usernames', usernames);
      //io.emit('usernames', data);

  	// }
  });


  // Handle Message Event
  socket.on('message', function(data){
    console.log(data);
    io.emit('update', data);
  });

  socket.on('checkUser', function(){
    //if user exists
    //if user does not exist

    //if user does not exist
    socket.emit('contiue');
  })


});

// Start Server
http.listen(process.env.PORT || 3000, process.env.IP || "127.0.0.1", function(){
  var addr = http.address();
  console.log("Server started at", addr.address + ":" + addr.port);
});
