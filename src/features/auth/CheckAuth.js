import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// HOC: Takes a component and returns an authenticated-wrapped version
const checkAuth = (Component) => {
  const AuthWrapper = (props) => {
    const user = useSelector((store) => store.auth.user);
    const navigate = useNavigate();

    useEffect(() => {
      if (!user) {
        navigate('/login');
      }
    }, [user, navigate]);

    return <Component {...props} />;
  };

  return AuthWrapper;
};

export default checkAuth;
