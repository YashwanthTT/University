// EX-12: MongoDB CRUD — run: mongosh --file mongo_crud.js
// Or copy-paste into mongosh / Compass Shell. Compass: connect to mongodb://localhost:27017
db = db.getSiblingDB('fsdDB');

// CREATE
db.students.insertMany([
  { student_id: 1, name: "Rohit Kumar", dept: "CSE", marks: 85 },
  { student_id: 2, name: "Ananya Sharma", dept: "ISE", marks: 90 },
  { student_id: 3, name: "Vikram Rao", dept: "CSE", marks: 78 }
]);

// READ all + filtered
db.students.find();
db.students.find({ dept: "CSE" });

// UPDATE
db.students.updateOne({ student_id: 1 }, { $set: { marks: 92 } });

// DELETE
db.students.deleteOne({ student_id: 3 });

// VERIFY
db.students.find();
