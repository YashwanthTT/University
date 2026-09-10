const fs = require('fs');
fs.access('renamed-students.txt', fs.constants.F_OK, (err) => {
  if (!err) {
    fs.unlink('renamed-students.txt', (err) => {
      if (err) throw err;
      console.log('File deleted successfully.');
    });
  } else {
    console.log('File does not exist.');
  }
});
