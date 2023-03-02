const mongoose = require('mongoose');
const { Schema } = mongoose;

const locationSchema = new mongoose.Schema({
  location: {
    type: String,
    required: true
  },
  coordinates: {
    type: [Number],
    index: '2dsphere'
  }

},
{
  toJSON: {
    virtuals: true,
  },
  id: false,
});

// Define a virtual for pets in this location
locationSchema.virtual('pets', {
  ref: 'Pet',
  localField: '_id',
  foreignField: 'location',
  justOne: false
});

// Define a virtual for users in this location
locationSchema.virtual('users', {
  ref: 'User',
  localField: '_id',
  foreignField: 'location',
  justOne: false
});

const Location = mongoose.model('Location', locationSchema);

module.exports = Location;