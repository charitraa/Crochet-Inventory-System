import React from "react";
import Navbar from "../components/nav-bar/Navbar";
import { Routes, Route } from "react-router-dom";
import Products from "./products";
import Users from "./users";
import Materials from "./Materials";
import Dashboard from "../components/dashboard/Dashboard";

const Home = () => {
  return (
    <>
     <Dashboard mainContent={ <h1>Minal kai</h1> }/>
    

    </>
  );
};

export default Home;
