/**
 * MODULE DEPENDENCIES
 */
var express = require('express');
var mongoose = require('mongoose');

/**
 * API Keys and Other Secret Files
 */
var secret = require("./config/secret");

/**
 * Create Express server
 */
var app = express();

/**
 * Connect to MongoDB
 */

//PRODUCTION
// mongoose.connect(secret.db);
//DEVELOPMENT
mongoose.connect('mongodb://localhost/8001');
mongoose.connection.on('error', function(err) {
  console.error(err);
  console.error('MongoDB Connection Error.');
});

/**
 * Express Server Configuration
 */
app.set("port", process.env.PORT || 8000);
app.use(express.static(__dirname + '/client'));

app.get('/', function(req, res){
  res.send('Hello, World!');
});

app.listen(app.get("port"), function() {
  console.log("Listening on port %d", app.get("port"));
});