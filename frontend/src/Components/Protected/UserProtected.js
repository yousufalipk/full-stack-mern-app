import React from 'react';
import { Navigate } from 'react-router-dom';

const UserProtected = ({ userType, children }) => {
  if (userType !== 'admin') {
    console.log("User Type:", userType);
    return <Navigate to="/" replace />;
  }

  return children;
};

export default UserProtected;
