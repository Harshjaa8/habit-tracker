import React, { useState } from 'react';
import './App.css';
import axios from 'axios';
import AddHabit from './components/AddHabit';
import HabitList from './components/HabitList';
import CalendarView from './components/CalendarView';
import Login from './components/Login';
import Signup from './components/Signup';

function App() {
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(true);
  const [habits, setHabits] = useState([]);
  const handleDeleteHabit = (habitId) => {
    setHabits(prev => prev.filter(habit => habit._id !== habitId));
  };


  const backend = 'http://localhost:5000';

  const handleLogin = async (credentials) => {
    try {
      const res = await axios.post(`${backend}/api/login`, credentials);
      setUser(res.data.user);
      // load habits after login
      fetchHabits(res.data.user.id);
    } catch (err) {
      console.error(err);
      alert('Login failed');
    }
  };

  const handleSignup = async (credentials) => {
    try {
      const res = await axios.post(`${backend}/api/signup`, credentials);
      setUser(res.data.user);
    } catch (err) {
      console.error(err);
      alert('Signup failed');
    }
  };

  const handleAddHabit = async (habit) => {
    try {
      const res = await axios.post(`${backend}/api/habits`, {
        userId: user.id,
        name: habit.name,
        time: habit.time
      });
      setHabits([...habits, res.data]);
    } catch (err) {
      console.error(err);
      alert('Add habit failed');
    }
  };

  const fetchHabits = async (userId) => {
    try {
      const res = await axios.get(`${backend}/api/habits/${userId}`);
      setHabits(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  if (!user) {
    return (
      <div style={{ textAlign: 'center' }}>
        {showLogin ? (
          <>
            <Login onLogin={handleLogin} />
            <p>Don't have an account? <button onClick={() => setShowLogin(false)}>Sign up here</button></p>
          </>
        ) : (
          <>
            <Signup onSignup={handleSignup} />
            <p>Already have an account? <button onClick={() => setShowLogin(true)}>Login here</button></p>
          </>
        )}
      </div>
    );
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Welcome, {user.email}</h1>
      <h2>Daily Habit Tracker</h2>
      <AddHabit onAdd={handleAddHabit} />
      <HabitList habits={habits} onDelete={handleDeleteHabit} />
      {habits.map((habit, index) => (
        <CalendarView key={index} habit={habit} />
      ))}
    </div>
  );
}

export default App;
