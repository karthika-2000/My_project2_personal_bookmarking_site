import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signup } from '../features/auth/Authslice';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const exist = users.some((u) => u.email === email);
    if (exist) {
      alert('Email is already taken');
    } else {
      dispatch(signup({ email, password }));
      alert('Signup successful! Please login.');
      navigate('/login');
    }
  };

  return (
    <>
      <Navbar />

      <div
        className="d-flex justify-content-end align-items-center"
        style={{
          backgroundImage: "url('/sharp-modern-blue-background_78370-2390.avif')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh',
          paddingRight: '5%', 
        }}
      >
        <div className="card p-4" style={{ width: '100%', maxWidth: '800px' }}>
          <h2 className="text-center mb-3">Signup</h2>
          <form onSubmit={handleSignup}>
            <input
              type="email"
              placeholder="Email"
              className="form-control mb-3"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="form-control mb-3"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" className="btn btn-primary w-100">Signup</button>
          </form>
          
        </div>
      </div>
    </>
  );
};

export default Signup;
