const router = require('express').Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require('../../controllers/userController');

// /api/user
router.route('/').get(getAllUsers).post(createUser);

// /api/user/:userId
router.route('/:userId').get(getUserById).put(updateUser).delete(deleteUser);

// /api/user/:userId/friends
router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);

module.exports = router;