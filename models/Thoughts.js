const { Schema, model } = require('mongoose');

const ThoughtSchema = new mongoose.Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => dateFormat(timestamp)
    },
    username: {
      type: String,
      required: true
    },
    reactions: [
      {
        reactionBody: {
          type: String,
          required: true,
          minlength: 1,
          maxlength: 280
        },
        username: {
          type: String,
          required: true
        },
        createdAt: {
          type: Date,
          default: Date.now,
          get: timestamp => dateFormat(timestamp)
        }
      }
    ]
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
  }
);

// virtual property that retrieves the length of the 'reactions' array
ThoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

const dateFormat = timestamp => {
  return new Date(timestamp).toLocaleDateString();
};

const Thought = mongoose.model('Thought', ThoughtSchema);

module.exports = Thought;
