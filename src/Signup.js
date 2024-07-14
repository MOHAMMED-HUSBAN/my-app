// SignUp.js
import React, { useState } from 'react';
import './Signup.css';

function SignUp() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSignUp = (e) => {
    e.preventDefault();
    // Save user data in localStorage
    localStorage.setItem('user', JSON.stringify({ username, email }));
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem('user');
    setIsLoggedIn(false);
  };

  if (isLoggedIn) {
    const userData = JSON.parse(localStorage.getItem('user'));
    return (
      <div>
        <p>Welcome , {userData.username} !</p>
        <button className='buttonaf' onClick={handleLogout}>Logout</button>
      </div>
    );
  }
// kjlkhjflkj88
  return (
    <form onSubmit={handleSignUp}>
      <h2>Sign Up</h2>
      <div>
        <label>Username:</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button type="submit">Sign Up</button>
    </form>
  );
}

export default SignUp;
