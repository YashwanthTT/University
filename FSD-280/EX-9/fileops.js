const fs = require('fs');

// 1. Write to a file
fs.writeFile('students.txt', 'Student 1: Rohit Sharma\nStudent 2: Ananya Kumar\n', (err) => {
  if (err) throw err;
  console.log('File written successfully.');

  // 2. Read from the file
  fs.readFile('students.txt', 'utf8', (err, data) => {
    if (err) throw err;
    console.log('File Content:\n' + data);

    // 3. Append data to the file
    fs.appendFile('students.txt', 'Student 3: Vikram Rao\n', (err) => {
      if (err) throw err;
      console.log('Data appended successfully.');

      // 4. Rename students.txt
      fs.renameSync('students.txt', 'renamed-students.txt');
      console.log('File renamed successfully.');

      // 5. Check if renamed file exists and delete it
      fs.access('renamed-students.txt', fs.constants.F_OK, (err) => {
        if (!err) {
          fs.unlink('renamed-students.txt', (err) => {
            if (err) throw err;
            console.log('File deleted successfully.');
          });
        }
      });
    });
  });
});
