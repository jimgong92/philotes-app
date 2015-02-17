var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var NodeSchema = new Schema({
    _id: Number,
    label: String,
    friends: [{
      type: Schema.Types.ObjectId, 
      ref: 'Node'
    }]
});

module.exports = mongoose.model('Node', NodeSchema);