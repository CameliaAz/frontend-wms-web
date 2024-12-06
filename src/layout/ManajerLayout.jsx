// src/layout/AdminLayout.jsx
import React from 'react';
import Sidebar from '../components/Sidebar';

const AdminLayout = ({ role, children }) => {
  return (
    <div className="admin-layout">
      <Sidebar role={role} />
      <div className="content-area">
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
