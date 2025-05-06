import React, { useState } from 'react';
import { FiLock } from 'react-icons/fi'; // lock icon

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setMessage('First verify your email');
    } else {
      setMessage('Please enter your email');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-cover bg-center" style={{ backgroundImage: 'url("assets/loginbg.png")' }}>
      <div className="bg-white rounded-lg shadow-lg text-center w-96 p-8">
        <div className="flex justify-center mb-6">
          <div className="bg-pink-100 p-4 rounded-full">
            <FiLock className="text-pink-300 text-3xl" />
          </div>
        </div>
        <h2 className="text-2xl font-bold mb-2">Reset your password</h2>
        <p className="text-gray-500 mb-6">
          Forgot your password? Please enter your email and we’ll send you a 4-digit code.
        </p>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-pink-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-pink-300 text-white py-2 rounded-lg hover:bg-pink-700 transition"
          >
            Get 4-digit code
          </button>
        </form>
        {message && (
          <p className="mt-4 text-green-300">{message}</p>
        )}
      </div>
    </div>
  );
};

export default ForgetPassword;
