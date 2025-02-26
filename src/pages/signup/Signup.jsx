import React from "react";
import { FaGoogle, FaApple, FaFacebook } from "react-icons/fa";

const Signup = () => {
  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Left Section - Image */}
      <div
        className="hidden md:flex w-1/2 bg-cover bg-left"
        style={{ backgroundImage: "url('/src/assets/signup.png')" }}
      ></div>

      {/* Right Section - Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-10 bg-white">
        <h2 className="text-2xl font-bold text-black mb-4">Get Started</h2>

        {/* 
        {/* Signup Form */}
        <form className="w-full max-w-sm">
          <input type="text" placeholder="Full Name" className="w-full p-2 mb-3 border border-gray-300 rounded-md" />
          <input type="text" placeholder="Username" className="w-full p-2 mb-3 border border-gray-300 rounded-md" />
          <input type="tel" placeholder="Phone Number" className="w-full p-2 mb-3 border border-gray-300 rounded-md" />
          <input type="text" placeholder="Address" className="w-full p-2 mb-3 border border-gray-300 rounded-md" />
          <input type="email" placeholder="Email" className="w-full p-2 mb-3 border border-gray-300 rounded-md" />
          <input type="password" placeholder="Password" className="w-full p-2 mb-3 border border-gray-300 rounded-md" />


          <button className="w-full bg-[#FFC0D4] text-white py-2 rounded-md font-bold hover:bg-pink-300 transition">
            REGISTER
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
