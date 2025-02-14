import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import Materials from "../pages/Materials";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/*" element={<NotFound />} />
      <Route path="app/profile" element={<Materials />} />

    </Routes>
  );
}
