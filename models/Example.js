var mongoose = require('mongoose');

var ExampleSchema = new mongoose.Schema({
  id: Number
});

module.exports = mongoose.model('Example', ExampleSchema);