import React, { useState } from "react";
import { FaGoogle, FaApple, FaFacebook } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { useSignup } from "../../customHooks/authHooks";

const Signup = () => {
  const [data, setData] = useState({
    fullName: "",
    username: "",
    phoneNumber: "",
    address: "",
    email: "",
    password: "",
  })
  const { SignupUser } = useSignup("/auth/create/", {
    full_name: data["fullName"],
    username: data["username"],
    phone_number: data["phoneNumber"],
    address: data["address"],
    email: data["email"],
    password: data["password"],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const check = await SignupUser();
    if (check) {
      navigate("/");

    } else {
      navigate("/signup");
    }
  };
  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Left Section - Image */}
      <div
        className="hidden md:flex w-1/2 bg-cover bg-left"
        style={{ backgroundImage: "url('/assets/signup.png')" }}
      ></div>

      {/* Right Section - Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-10 bg-white">
        <h2 className="text-2xl font-bold text-black mb-4">Get Started</h2>

        {/* 
        {/* Signup Form */}
        <form className="w-full max-w-sm" onSubmit={handleSubmit}>
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={data.fullName}
            onChange={handleChange}
            className="w-full p-2 mb-3 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={data.username}
            onChange={handleChange}
            className="w-full p-2 mb-3 border border-gray-300 rounded-md"
          />
          <input
            type="tel"
            name="phoneNumber"
            placeholder="Phone Number"
            value={data.phoneNumber}
            onChange={handleChange}
            className="w-full p-2 mb-3 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={data.address}
            onChange={handleChange}
            className="w-full p-2 mb-3 border border-gray-300 rounded-md"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={data.email}
            onChange={handleChange}
            className="w-full p-2 mb-3 border border-gray-300 rounded-md"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={data.password}
            onChange={handleChange}
            className="w-full p-2 mb-3 border border-gray-300 rounded-md"
          />

          <button className="w-full bg-[#FFC0D4] text-white py-2 rounded-md font-bold hover:bg-pink-300 transition">
            REGISTER
          </button>
          <p>Already have an Account <NavLink to="/" className="text-[#FFC0D4] underline">login</NavLink></p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
