const fs = require('fs');
fs.renameSync('students.txt', 'renamed-students.txt');
console.log('File renamed successfully.');
