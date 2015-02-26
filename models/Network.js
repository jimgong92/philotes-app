var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var NetworkSchema = new Schema({
  id: Number,
  label: String,
  nodes: [{
    type: Schema.Types.ObjectId, 
    ref: 'Node'
  }]
});

module.exports = mongoose.model('Network', NetworkSchema);