var mongoose = require('mongoose');

var NodeSchema = new mongoose.Schema({
    _id: Number,
    name: String,
    friends: [{
      type: mongoose.Schema.Types.objectId, 
      ref: 'Node'
    }]
});

module.exports = mongoose.model('Node', NodeSchema);