const router = require('express').Router();
const {
  getUser,
  getSingleUser,
  createUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require('../../controllers/userController');

// /api/user
router.route('/').get(getUser).post(createUser);

// /api/user/:userId
router.route('/:userId').get(getSingleUser).delete(deleteUser);

// /api/user/:userId/friends
router.route('/:userId/assignments').post(addFriend);

// /api/user/:userId/assignments/:assignmentId
router.route('/:userId/assignments/:assignmentId').delete(removeFriend);

module.exports = router;