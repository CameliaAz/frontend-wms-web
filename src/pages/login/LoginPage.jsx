import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
  
    setError(''); // Clear any previous errors
  
    try {
      // Prepare the payload
      const payload = { email, password };
  
      // Send the login request
      const response = await axios.post("http://127.0.0.1:8000/api/login", payload);
  
      // Destructure the response
      const { status, data } = response.data;
  
      if (status && data.success) {
        const { access_token, token_type, role } = data;
  
        // Save the token and role to localStorage
        localStorage.setItem("authToken", `${token_type} ${access_token}`);
        localStorage.setItem("userRole", role); // Store role for persistence
  
        // Dynamically navigate based on role
        if (role === 'admin') {
          navigate('/admin/dashboard');
        } else if (role === 'manager') {
          navigate('/manajer/dashboard');
        } else {
          setError('Unauthorized role.');
        }
      } else {
        // Handle login failure
        setError("Gagal login, cek email dan password Anda, lalu login kembali.");
      }
    } catch (error) {
      // Handle errors
      const errorMessage = error.response?.data?.message || 'Terjadi kesalahan. Silakan coba lagi.';
      setError(errorMessage);
      console.error("Login Error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter your email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter your password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
