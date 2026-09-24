const mongoose = require('mongoose');

mongoose
  .connect('mongodb://localhost:27017/fsdDB')
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('Connection error:', err));

module.exports = mongoose;
