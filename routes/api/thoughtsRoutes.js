const router = require('express').Router();
const {
  getThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  removeReaction

} = require('../../controllers/thoughtsController.js');

// /api/thoughts/
router.route("/").get(getThoughts).post(createThought);

// /api/thoughts/:id
router.route("/:thoughtId").get(getThoughtById).put(updateThought).delete(deleteThought);

// /api/thoughts/:thoughtId/reactions
router.route("/:thoughtId/reactions").post(createReaction);

// /api/thoughts/:thoughtId/reactions
router.route("/:thoughtId/reactions/:reactionId").delete(removeReaction);

module.exports = router;