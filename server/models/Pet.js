const mongoose = require('mongoose');
const { Schema } = mongoose;

const petSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  breed: {
    type: String,
    required: true
  },
  age: {
    type: Number,
  
  },
  gender: {
    type: String,
    // required: true
  },
  size: {
    type: String,
    enum: ['small', 'medium', 'large']
  },
  color: {
    type: String,
    // required: true
  },
  description: {
    type: String,
    // required: true
  },
  friendly: {
    type: Boolean,
    required: true
  },
  health: {
    type: String
  },
  lastSeenLocation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Location'
  },
  notes: {
    type: String
  },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User'
},
},
 {
    toJSON: {
      virtuals: true,
    },
    id: false,
  });

const Pet = mongoose.model('Pet', petSchema);

module.exports = Pet;