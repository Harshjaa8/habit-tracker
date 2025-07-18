import React, { useState } from 'react';

const Signup = ({ onSignup }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSignup({ email, password });
    setEmail('');
    setPassword('');
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e)=> setEmail(e.target.value)}
          required
        />
        <br/>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=> setPassword(e.target.value)}
          required
        />
        <br/>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
