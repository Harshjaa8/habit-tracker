import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CalendarView = ({ habit }) => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    async function fetchStreak() {
      try {
        const res = await axios.get(`http://localhost:5000/api/streak/${habit._id}`);
        setStreak(res.data.streak);
      } catch (err) {
        console.error(err);
      }
    }
    fetchStreak();
  }, [habit]);

  const markTodayDone = async () => {
    try {
      const todayDate = new Date().toISOString().slice(0, 10); // "YYYY-MM-DD"
      await axios.post(`http://localhost:5000/api/logs`, { habitId: habit._id, date: todayDate });
      alert(`Marked done for ${todayDate}`);
      // refresh streak
      const res = await axios.get(`http://localhost:5000/api/streak/${habit._id}`);
      setStreak(res.data.streak);
    } catch (err) {
      console.error(err);
      alert('Error marking day');
    }
  };

  return (
    <div className="habit-card">
      <h3>{habit.name}</h3>
      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
        {days.map(day => (
          <button
            key={day}
            className="day-button"
            disabled
          >
            {day}
          </button>
        ))}
      </div>
      <div className="streak">
        🔥 Current streak: <b>{streak} days</b>
      </div>
      <button onClick={markTodayDone} style={{
        marginTop: '8px',
        background: '#2196F3',
        color: 'white',
        padding: '6px 12px',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer'
      }}>
        Mark today as done
      </button>
    </div>
  );
};

export default CalendarView;
