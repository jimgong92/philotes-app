var mongoose = require('mongoose');

var NetworkSchema = new mongoose.Schema({
  _id: Number,
  nodes: [{
    _id: Number,
    name: String,
    friends: [{
      _id: Number
    }]
  }]
});

module.exports = mongoose.model('Network', NetworkSchema);