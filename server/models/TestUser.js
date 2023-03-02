const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  pets: [{
    type: Schema.Types.ObjectId,
    ref: 'Pet'
  }],
  locations: [{
    type: Schema.Types.ObjectId,
    ref: 'Location'
  }]
});
userSchema.virtual('pets', {
  ref: 'Pet',
  localField: '_id',
  foreignField: 'user'
});

userSchema.virtual('locations', {
  ref: 'Location',
  localField: '_id',
  foreignField: 'users'
});

const User = mongoose.model('User', userSchema);

module.exports = User;