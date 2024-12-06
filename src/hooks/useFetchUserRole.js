// src/hooks/useFetchUserRole.js
import { useState, useEffect } from "react";
import axios from "axios";

export default function useFetchUserRole() {
    const [userRole, setUserRole] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchUserRole() {
            try {
                const response = await axios.get("/api/user"); // Ganti URL sesuai API Anda
                setUserRole(response.data.user.role);
            } catch (error) {
                console.error("Failed to fetch user role:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchUserRole();
    }, []);

    return { userRole, loading };
}
