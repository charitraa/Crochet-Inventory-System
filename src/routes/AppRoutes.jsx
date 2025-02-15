import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/home/Home";
import NotFound from "../pages/NotFound";
import Materials from "../pages/materials/Materials";
import Login from "../pages/login/Login";
import Signup from "../pages/signup/Signup";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/app/dashboard" element={<Home />} />
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/*" element={<NotFound />} />
      <Route path="app/profile" element={<Materials />} />

    </Routes>
  );
}
