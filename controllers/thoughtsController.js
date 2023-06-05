const { Thought, User } = require("../Models");

const thoughtController = {
  // GET all thoughts
  getAllThoughts(req, res) {
    Thought.find({})
    .populate({
      path: "reactions",
    })
    .sort({ _id: -1 })
    .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        res.status(400).json(err);
      });
  },
  //   GET single thought by _id
  getThoughtById({ params }, res) {
    Thought.findById(params.thoughtId)
      .populate({
        path: "reactions",
      })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: "No thought found by that id!" });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  },
  //   POST to create new thought
  addThought({ params, body }, res) {
    User.findOne({ username: body.username })
      .then(user => {
        if (!user) {
          return res.status(404).json({ message: 'No user found with this username!' });
        }
  
        const thoughtData = {
          thoughtText: body.thoughtText,
          username: user._id // Use the user's ID instead of the username
        };
  
        return Thought.create(thoughtData);
      })
      .then(thought => {
        return User.findOneAndUpdate(
          { _id: thought.username },
          { $push: { thoughts: thought._id } },
          { new: true }
        );
      })
      .then(user => {
        if (!user) {
          return res.status(404).json({ message: 'No user found with this ID!' });
        }
  
        res.json(user);
      })
      .catch(err => res.status(400).json(err));
  },
  
  //   PUT to update thought by _id
  updateThought({ params, body }, res) {
    console.log(params.thoughtId);
    console.log(body);
    Thought.findOneAndUpdate({ _id: params.thoughtId }, body, {
      new: true,
      runValidators: true,
    })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No thought found with this id!" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.status(400).json(err));
  },

  // DELETE to remove thought by _id
  removeThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.thoughtId })
      .then((deletedThought) => {
        if (!deletedThought) {
          return res.status(404).json({ message: "No thought with this id!" });
        }
        console.log(deletedThought);
        User.findOneAndUpdate(
          { username: deletedThought.username },
          { $pull: { thoughts: params.thoughtId } },
          { new: true }
        ).then((dbUserData) => {
          if (!dbUserData) {
            res.status(404).json({ message: "No user found with this id!" });
            return;
          }
          res.json(dbUserData);
        });
      })
      .catch((err) => res.json(err));
  },
  //   POST to create reaction
  addReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $push: { reactions: body } },
      { new: true, runValidators: true }
    )
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this id!" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.json(err));
  },
  // DELETE to pull and remove reaction by reaction's reactionId
  removeReaction({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      // remove specific reply from replies array
      // where replyId matches value of params.replyId passed in from route
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true }
    )
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.json(err));
  },
};

module.exports = thoughtController;