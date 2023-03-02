const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const locationSchema = new Schema({
  coordinates: {
    type: [Number],
    required: true
  },
  address: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  zip: {
    type: String,
    required: true
  },
  users: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  pets: [{
    type: Schema.Types.ObjectId,
    ref: 'Pet'
  }]
});

locationSchema.virtual('users', {
  ref: 'User',
  localField: '_id',
  foreignField: 'locations'
});

locationSchema.virtual('pets', {
  ref: 'Pet',
  localField: '_id',
  foreignField: 'location'
});

const Location = mongoose.model('Location', locationSchema);

module.exports = Location;