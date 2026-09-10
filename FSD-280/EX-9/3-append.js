const fs = require('fs');
fs.appendFile('students.txt', 'Student 3: Vikram Rao\n', (err) => {
  if (err) throw err;
  console.log('Data appended successfully.');
});
