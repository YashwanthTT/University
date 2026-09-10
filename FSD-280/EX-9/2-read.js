const fs = require('fs');
fs.readFile('students.txt', 'utf8', (err, data) => {
  if (err) throw err;
  console.log('File Content:\n' + data);
});
