const fs = require('fs');
fs.writeFile('students.txt', 'Student 1: Rohit Sharma\nStudent 2: Ananya Kumar\n', (err) => {
  if (err) throw err;
  console.log('File written successfully.');
});
