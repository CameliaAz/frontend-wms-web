import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, role }) => {
  const { userRole } = useAuth();
  if (userRole !== role) {
    return <Navigate to="/login" replace />;
  }
  return children;
};
