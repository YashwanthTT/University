const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  student_id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  dept: { type: String, default: 'CSE' },
  marks: { type: Number, min: 0, max: 100 }
});

module.exports = mongoose.model('Student', studentSchema);
