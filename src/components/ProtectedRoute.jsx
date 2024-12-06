import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, allowedRoles, userRole }) {
    // Memeriksa apakah salah satu role dalam allowedRoles ada di userRole
    if (!allowedRoles.some(role => userRole.includes(role))) {
        return <Navigate to="/unauthorized" />;
    }

    return children;
}

