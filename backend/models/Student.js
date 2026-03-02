const mongoose = require('mongoose');

const studentSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
      trim: true
    },
    studentId: {
      type: String,
      required: [true, 'Please add a student ID'],
      unique: true,
      trim: true
    },
    class: {
      type: String,
      required: [true, 'Please add a class'],
      trim: true
    },
    section: {
      type: String,
      required: [true, 'Please add a section'],
      trim: true
    },
    phoneNumber: {
      type: String,
      required: [true, 'Please add a phone number'],
      trim: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Student', studentSchema);
