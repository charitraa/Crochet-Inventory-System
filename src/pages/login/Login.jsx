import React from "react";
import { NavLink } from "react-router-dom";


const Login = () => {
  return (
    <div className="h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('/src/assets/login.png')" }}>
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-4">Log in to your Account</h2>
        <p className="text-center text-gray-600 mb-4">Welcome back! Select method to login</p>

        <div className="flex justify-center gap-3 mb-4">
          <button className="p-2 border rounded-lg shadow hover:bg-gray-100">
            <img src="/src/assets/google.png" alt="Google" className="w-6 h-6" />
          </button>
          <button className="p-2 border rounded-lg shadow hover:bg-gray-100">
            <img src="/src/assets/apple-logo.png" alt="Apple" className="w-6 h-6" />
          </button>
          <button className="p-2 border rounded-lg shadow hover:bg-gray-100">
            <img src="/src/assets/facebook.png" alt="Facebook" className="w-6 h-6" />
          </button>
        </div>

        <div className="text-center text-gray-500 mb-4">or continue with email</div>

        <form>
          <input type="email" placeholder="Email" className="w-full px-3 py-2 border rounded-lg mb-3 focus:ring focus:ring-pink-300" />
          <input type="password" placeholder="Password" className="w-full px-3 py-2 border rounded-lg mb-3 focus:ring focus:ring-pink-300" />

          <div className="flex justify-end items-center text-sm mb-3">
            <a href="#" className="text-[#FFC0D4] hover:underline" sty>Forget Password?</a>
          </div>

          <button type="submit" className="w-full bg-[#FFC0D4] text-white py-2 rounded-lg hover:bg-pink-600 transition">LOGIN</button>
        </form>

        <p className="text-center text-gray-600 mt-4">
          Don’t have an account? <NavLink to="/signup">
            <a href="" className="text-[#FFC0D4] hover:underline">Create an account</a></NavLink>

        </p>
      </div>
    </div>
  );
};

export default Login;