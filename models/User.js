const { Schema, model } = require('mongoose');

// Schema to create User model
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^\S+@\S+\.\S+$/
    },
    thoughts: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Thought'
    }],
    friends: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }]
  },
  {
    toJSON: {
      virtuals: true 
    },
    id: false
  }
);

// virtual property that retrieves the length of the 'friends' array
UserSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

const User = mongoose.model('User', UserSchema);

module.exports = User;

