import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/auth/Authslice';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-4">
      <Link className="navbar-brand" to="/dashboard">BookmarkApp</Link>


      <div className="ms-auto">
         {user && (
          <span className="me-3 text-success fw-bold">
            Welcome, {user.email}
          </span>
        )}
        {user ? (
          <>
            <Link className="btn btn-outline-primary me-2" to="/dashboard">Dashboard</Link>
            <button className="btn btn-outline-danger" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link className="btn btn-outline-primary me-2" to="/login">Login</Link>
            <Link className="btn btn-outline-secondary" to="/signup">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
