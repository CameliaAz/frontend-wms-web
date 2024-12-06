// src/components/RoleBasedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

export default function RoleBasedRoute({ allowedRoles, userRole, children }) {
    if (!userRole) return null; // Tampilkan loader jika data belum siap
    return allowedRoles.includes(userRole) ? children : <Navigate to="/not-authorized" />;
}
