import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../features/auth/Authslice';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
    const storedUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (storedUser) navigate('/dashboard');
  };

  return (
    <>
      <Navbar />

      <div
        className="d-flex justify-content-center align-items-center"
        style={{
          backgroundImage: "url('/modern-background-business-vector_660067-183.avif')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh',
          padding: '0 15px',
        }}
      >
        <div className="card p-4 bg-light bg-opacity-75" style={{ width: '100%', maxWidth: '800px' }}>
          <h2 className="text-center text-dark mb-3">Login</h2>
          <form onSubmit={handleLogin}>
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
            <button type="submit" className="btn btn-success w-100">Login</button>
          </form>

             <div className='text-center align-items-center mt-3 border-top pt-3'>
                      <p className='mb-0'>
                        New user? {''}
                        <Link to={"/signup"} className='text-primary text-decoration-none'>
                            Sign up here
                        </Link>
                      </p>
                    </div>
        </div>
      </div>
    </>
  );
};

export default Login;
