const mongoose = require('mongoose');
const logSchema = new mongoose.Schema({
  habitId: { type: mongoose.Schema.Types.ObjectId, ref: 'Habit', required: true },
  date: String
});
module.exports = mongoose.model('Log', logSchema);
