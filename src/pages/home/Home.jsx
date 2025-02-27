import React, { useContext } from "react";
import Dashboard from "../../components/dashboard/Dashboard";
import { useEffect } from "react";
import { AppContext } from "../../context/ContextApp";

const Home = () => {
  const { user } = useContext(AppContext);

  return (
    <>
      <Dashboard mainContent={
        <h1 className="text-amber-300">Minal kai</h1>

      } />
    </>
  );
};

export default Home;
