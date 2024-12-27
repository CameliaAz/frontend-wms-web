import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = ({ allowedRoles }) => {
  const userRole = localStorage.getItem("userRole");

  // Jika tidak ada userRole, redirect ke halaman login
  if (!userRole) {
    return <Navigate to="/login/LoginPage" replace />;
  }

  // Jika role pengguna tidak sesuai dengan allowedRoles, redirect ke halaman unauthorized
  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/login/Unauthorized" replace />;
  }

  // Jika lolos pemeriksaan, render konten
  return <Outlet />;
};

export default PrivateRoute;
