import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, role, allowedRoles }) => {
  if (!role) {
    // Jika pengguna tidak login, redirect ke halaman login
    return <Navigate to="/login" />;
  }

  if (!allowedRoles.includes(role)) {
    // Jika pengguna tidak memiliki role yang diizinkan
    return <Navigate to="/unauthorized" />;
  }

  // Jika lolos validasi, tampilkan komponen anak
  return children;
};

export default PrivateRoute;
