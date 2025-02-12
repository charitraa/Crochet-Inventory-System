import React from "react";
import Navbar from "../components/Navbar";
import { Routes, Route } from "react-router-dom";
import Products from "./products";
import Users from "./users";
import Materials from "./Materials";

const Home = () => {
  return (
    <>
      <div className="app">
        <header>Header</header>
        <div className=" flex">
          <Navbar />
          <div className="main">
            <Routes>
              <Route path="/materials" element={<Materials />} />
              <Route path="/products" element={<Products />} />
              <Route path="/users" element={<Users />} />
            </Routes>
          </div>
        </div>

      </div>
    </>
  );
};

export default Home;
