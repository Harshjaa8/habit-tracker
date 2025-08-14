const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const connectDb = require('./appMongoose');
const User = require('./models/User');
const Habit = require('./models/Habit');
const Log = require('./models/Log');

connectDb();

const app = express();
app.use(cors());
app.use(express.json());

const SECRET = "secret123";

app.post('/api/signup', async (req, res) => {
  const { email, password } = req.body;
  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ message: "User exists" });
  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ email, password: hashed });
  res.json({ user: { id: user._id, email: user.email } });
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "User not found" });
  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ message: "Wrong password" });
  const token = jwt.sign({ userId: user._id }, SECRET);
  res.json({ token, user: { id: user._id, email: user.email } });
});

app.post('/api/habits', async (req, res) => {
  const { userId, name, time } = req.body;
  const habit = await Habit.create({ userId, name, time });
  res.json(habit);
});

app.get('/api/habits/:userId', async (req, res) => {
  const habits = await Habit.find({ userId: req.params.userId });
  res.json(habits);
});

app.post('/api/logs', async (req, res) => {
  const { habitId, date } = req.body;
  const log = await Log.create({ habitId, date });
  res.json(log);
});

app.get('/api/logs/:habitId', async (req, res) => {
  const logs = await Log.find({ habitId: req.params.habitId });
  res.json(logs);
});

app.get('/api/streak/:habitId', async (req, res) => {
  try {
    const logs = await Log.find({ habitId: req.params.habitId }).sort({ date: 1 });
    let streak = 0;
    let prevDate = null;

    for (let i = 0; i < logs.length; i++) {
      const logDate = new Date(logs[i].date);
      if (prevDate) {
        const diffDays = Math.floor((logDate - prevDate) / (1000 * 60 * 60 * 24));
        if (diffDays === 1) {
          streak++;
        } else if (diffDays > 1) {
          streak = 1;
        }
      } else {
        streak = 1;
      }
      prevDate = logDate;
    }

    res.json({ streak });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.delete('/api/habits/:habitId', async (req, res) => {
  try {
    const { habitId } = req.params;
    await Habit.findByIdAndDelete(habitId);
    await Log.deleteMany({ habitId });
    res.json({ message: 'Habit deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});



app.listen(5000, () => console.log('🚀 Backend running on port 5000'));
