require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:5173' }));

mongoose
  .connect(process.env.MONGO_URI || 'mongodb://localhost:27017/fsdDB')
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('Connection error:', err.message));

// Reuses EX-13 Student schema + User model for JWT auth (Ex-14)
const User = mongoose.model(
  'User',
  new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
  })
);
const Student = mongoose.model(
  'Student',
  new mongoose.Schema({
    student_id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    dept: { type: String, default: 'CSE' },
    marks: { type: Number, min: 0, max: 100 }
  })
);

const auth = (req, res, next) => {
  const token = (req.headers.authorization || '').replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'No token' });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET || 'fsd_secret_key');
    next();
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
};

app.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (await User.findOne({ email })) return res.status(400).json({ message: 'User exists' });
    await new User({ email, password: await bcrypt.hash(password, 10) }).save();
    res.status(201).json({ message: 'Registered successfully' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password)))
    return res.status(400).json({ message: 'Invalid credentials' });
  res.json({ token: jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'fsd_secret_key', { expiresIn: '1h' }) });
});

app.get('/students', auth, async (req, res) => res.json(await Student.find()));
app.post('/students', auth, async (req, res) => {
  try {
    res.status(201).json(await new Student(req.body).save());
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
app.put('/students/:id', auth, async (req, res) => {
  const s = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!s) return res.status(404).json({ message: 'Student not found' });
  res.json(s);
});
app.delete('/students/:id', auth, async (req, res) => {
  if (!(await Student.findByIdAndDelete(req.params.id))) return res.status(404).json({ message: 'Student not found' });
  res.json({ message: 'Deleted successfully' });
});

const PORT = process.env.PORT || 5000;
if (require.main === module) app.listen(PORT, () => console.log(`Backend on port ${PORT}`));
module.exports = app;
