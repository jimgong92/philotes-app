var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var NetworkSchema = new Schema({
  id: Number,
  label: String,
  nodes: [{
    id: Number,
    label: String,
    friends: [{
      type: Schema.Types.ObjectId, 
      ref: 'Node'
    }]
  }]
});

module.exports = mongoose.model('Network', NetworkSchema);