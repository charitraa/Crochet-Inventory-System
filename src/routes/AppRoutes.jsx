import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";

export default function AppRoutes() {
  return (
    <Routes>
       <Route path="/" element={<Home />} />
      {/* <Route path="/" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} /> */}
      <Route path="/">
        {/* <Route path="dashboard" element={<Home />} /> */}
        {/* <Route path="profile" element={<Profile />} /> */}
      </Route>
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
}
