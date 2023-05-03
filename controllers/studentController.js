// ObjectId() method for converting studentId string into an ObjectId for querying database
const { ObjectId } = require('mongoose').Types;
const { User, Course } = require('../models');

// // TODO: Create an aggregate function to get the number of students overall
// const headCount = async () => {
//   // Your code here
//   const numberOfStudents = await Student.aggregate();
//   return numberOfStudents;
// }

// // Execute the aggregate method on the Student model and calculate the overall grade by using the $avg operator
// const grade = async (studentId) =>
//   Student.aggregate([
//     // TODO: Ensure we include only the student who can match the given ObjectId using the $match operator
//     {
//       // Your code here
//     },
//     {
//       $unwind: '$assignments',
//     },
//     // TODO: Group information for the student with the given ObjectId alongside an overall grade calculated using the $avg operator
//     {
//       // Your code here
//     },
//   ]);

module.exports = {
  // Get all Users
  async getUser(req, res) {
    try {
      const user = await User.find();
      };
      return res.json(userObj);
    }, catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // Get a single student
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        .select('-__v')
        .lean();

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      res.json({
        student,
        grade: await grade(req.params.studentId),
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // create a new User
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Delete a User and remove them from the course
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndRemove({ _id: req.params.UserId });

      if (!user) {
        return res.status(404).json({ message: 'No such user exists' })
      };

      // const course = await Course.findOneAndUpdate(
      //   { students: req.params.studentId },
      //   { $pull: { students: req.params.studentId } },
      //   { new: true }
      // );

      // if (!course) {
      //   return res.status(404).json({
      //     message: 'Student deleted, but no courses found',
      //   });
      // }

      res.json({ message: 'User successfully deleted' });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Add an assignment to a student
  async addAssignment(req, res) {
    try {
      console.log('You are adding an assignment');
      console.log(req.body);
      const student = await Student.findOneAndUpdate(
        { _id: req.params.studentId },
        { $addToSet: { assignments: req.body } },
        { runValidators: true, new: true }
      );

      if (!student) {
        return res
          .status(404)
          .json({ message: 'No student found with that ID :(' })
      }

      res.json(student);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Remove assignment from a student
  async removeAssignment(req, res) {
    try {
      const student = await Student.findOneAndUpdate(
        { _id: req.params.studentId },
        { $pull: { assignment: { assignmentId: req.params.assignmentId } } },
        { runValidators: true, new: true }
      );

      if (!student) {
        return res
          .status(404)
          .json({ message: 'No student found with that ID :(' });
      }

      res.json(student);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
