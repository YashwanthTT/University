const { MongoClient } = require('mongodb');

async function main() {
  const client = new MongoClient('mongodb://localhost:27017');
  await client.connect();
  const col = client.db('fsdDB').collection('students');

  // CREATE
  await col.deleteMany({});
  await col.insertMany([
    { student_id: 1, name: "Rohit Kumar", dept: "CSE", marks: 85 },
    { student_id: 2, name: "Ananya Sharma", dept: "ISE", marks: 90 },
    { student_id: 3, name: "Vikram Rao", dept: "CSE", marks: 78 },
  ]);

  // READ all + filtered
  console.log('All:', await col.find().toArray());
  console.log('CSE:', await col.find({ dept: "CSE" }).toArray());

  // UPDATE
  await col.updateOne({ student_id: 1 }, { $set: { marks: 92 } });

  // DELETE
  await col.deleteOne({ student_id: 3 });

  // VERIFY
  console.log('Final:', await col.find().toArray());
  await client.close();
}

main().catch(e => { console.error(e); process.exit(1); });
