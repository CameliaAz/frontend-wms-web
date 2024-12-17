// LoginPage.jsx
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';

const LoginPage = () => {
  const [role, setRole] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    // Dummy user data
    const users = [
      { email: 'admin@example.com', password: 'admin123', role: 'admin' },
      { email: 'manager@example.com', password: 'manager123', role: 'manajer' },
    ];

    // Find user with matching credentials
    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
        setRole(user.role);
        setError('');
        console.log(`Logged in as ${user.role}`);
        alert(`Welcome, ${user.role}!`);
        
        // Navigate to dashboard after successful login
        if (user.role === 'admin') {
          Navigate('/admin/dashboard');
        } else {
          // Handle other roles if necessary
          Navigate('/manager/dashboard');
        }
      } else {
        setRole('');
        setError('Invalid email or password');
      }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-1">Email</label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-600 mb-1">Password</label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter your password"
              required
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
        {/* {role && (
          <p className="mt-4 text-sm text-center text-green-500">
            Logged in as <strong>{role}</strong>
          </p>
        )} */}
        <p className="mt-4 text-sm text-center text-gray-600">
          Don't have an account? <a href="/register" className="text-blue-500 hover:underline">Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
