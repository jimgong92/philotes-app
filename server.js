/*
  MODULE DEPENDENCIES
*/
var express = require('express');
var app = express();
var http = require('http').Server(app);

//Serve static files
app.use(express.static(__dirname + '/client'));
app.use(express.static(__dirname + '/client/styles'));

app.get('/', function(req, res){
  res.send('Hello, World!');
});

var port = process.env.PORT || 8000;
http.listen(port, function() {
  console.log('Listening at http://%s:%s', http.address().address, port);
});