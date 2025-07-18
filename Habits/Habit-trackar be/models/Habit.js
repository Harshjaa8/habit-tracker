const mongoose = require('mongoose');
const habitSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: String,
  time: String
});
module.exports = mongoose.model('Habit', habitSchema);
