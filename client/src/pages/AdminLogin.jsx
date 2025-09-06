import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const AdminLogin = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', form);
      const { user, token } = res.data;

      if (user.role !== 'admin') {
        alert('Access denied. This page is only for Admins.');
        return;
      }

      login(user, token); // update context
      navigate('/'); // or wherever your admin dashboard is
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert('Admin Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 shadow-md rounded-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Admin Login</h2>
        <input
          type="email"
          name="email"
          placeholder="Admin Email"
          value={form.email}
          onChange={handleChange}
          className="w-full mb-4 p-3 border rounded"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full mb-4 p-3 border rounded"
          required
        />
        <button type="submit" className="w-full bg-yellow-500 text-white p-3 rounded hover:bg-yellow-600">
          Login
        </button>

        <p className="text-center mt-4 text-sm text-gray-600">
          Not an admin?{' '}
          <span
            onClick={() => navigate('/admin/signup')}
            className="text-blue-600 hover:underline cursor-pointer"
          >
          Sign Up As Admin
          </span>
        </p>
      </form>
    </div>
  );
};

export default AdminLogin;
