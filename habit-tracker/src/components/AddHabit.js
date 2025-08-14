import React, { useState } from 'react';

const AddHabit = ({ onAdd }) => {
  const [name, setName] = useState('');
  const [time, setTime] = useState('morning');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) return;
    onAdd({ name, time });
    setName('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Habit name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <select value={time} onChange={(e) => setTime(e.target.value)}>
        <option value="morning">Morning</option>
        <option value="night">Night</option>
      </select>
      <button type="submit">Add Habit</button>
    </form>
  );
};

export default AddHabit;
