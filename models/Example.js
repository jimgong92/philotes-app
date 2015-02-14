var mongoose = require('mongoose');

var ExampleSchema = new mongoose.Schema({
  _id: Number
});

module.exports = mongoose.model('Example', ExampleSchema);