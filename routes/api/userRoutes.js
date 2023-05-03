const router = require('express').Router();
const {
  getUser,
  getSingleUser,
  createUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require('../../controllers/studentController');

// /api/user
router.route('/').get(getStudents).post(createStudent);

// /api/user/:userId
router.route('/:studentId').get(getSingleStudent).delete(deleteStudent);

// /api/students/:studentId/assignments
router.route('/:studentId/assignments').post(addAssignment);

// /api/students/:studentId/assignments/:assignmentId
router.route('/:studentId/assignments/:assignmentId').delete(removeAssignment);

module.exports = router;
