import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useLogin } from "../../customHooks/authHooks";
import { AppContext } from "../../context/ContextApp";


const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  })
  const { user } = useContext(AppContext)
  const { loginUser } = useLogin("/auth/login/", {
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
    const check = await loginUser();
    if (check) {
      navigate('/authorization')
    } else {
      navigate("/");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: 'url("assets/loginbg.png")' }}>
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-4">Log in to your Account</h2>
        <p className="text-center text-gray-600 mb-4">Welcome back! Select method to login</p>

        <div className="flex justify-center gap-3 mb-4">
          <button className="p-2 border rounded-lg shadow hover:bg-gray-100">
            <img src="assets/google.png" alt="Google" className="w-6 h-6" />
          </button>
          <button className="p-2 border rounded-lg shadow hover:bg-gray-100">
            <img src="assets/apple-logo.png" alt="Apple" className="w-6 h-6" />
          </button>
          <button className="p-2 border rounded-lg shadow hover:bg-gray-100">
            <img src="assets/facebook.png" alt="Facebook" className="w-6 h-6" />
          </button>
        </div>

        <div className="text-center text-gray-500 mb-4">or continue with email</div>

        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="Email" name="email" id="email" value={data.email} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg mb-3 focus:ring focus:ring-pink-300" />
          <input type="password" placeholder="Password" name="password" value={data.password} onChange={handleChange} id="password" className="w-full px-3 py-2 border rounded-lg mb-3 focus:ring focus:ring-pink-300" />

          <div className="flex justify-end items-center text-sm mb-3">
            <a className="text-[#FFC0D4] hover:underline cursor-pointer" onClick={() => navigate('/forget-password')}>Forget Password?</a>
          </div>

          <button type="submit" className="w-full bg-[#FFC0D4] text-white py-2 rounded-lg hover:bg-pink-600 transition">LOGIN</button>
        </form>

        <p className="text-center text-gray-600 mt-4">
          Don’t have an account? <NavLink to="/signup" className="text-[#FFC0D4] hover:underline">
            Create an account</NavLink>

        </p>
      </div >
    </div >
  );
};

export default Login;