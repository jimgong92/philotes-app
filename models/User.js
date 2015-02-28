var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
    id: Number,
    username: String,
    password: String,
    networks: [{
      type: Schema.Types.ObjectId, 
      ref: 'Network'
    }]
});

module.exports = mongoose.model('User', UserSchema);