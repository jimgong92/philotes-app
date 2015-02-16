var mongoose = require('mongoose');

var NetworkSchema = new mongoose.Schema({
  _id: Number,
  nodes: [{
    type: mongoose.Schema.Types.objectId, 
    ref: 'Node'
  }]
});

module.exports = mongoose.model('Network', NetworkSchema);