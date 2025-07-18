import React from 'react';
import axios from 'axios';

const HabitList = ({ habits, onDelete }) => {
  const deleteHabit = async (habitId) => {
    try {
      await axios.delete(`http://localhost:5000/api/habits/${habitId}`);
      onDelete(habitId);
    } catch (err) {
      console.error(err);
      alert('Error deleting habit');
    }
  };

  return (
    <ul>
      {habits.map(habit => (
        <li key={habit._id}>
          {habit.name} - {habit.time}
          <button onClick={() => deleteHabit(habit._id)} className="delete-button">
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default HabitList;
