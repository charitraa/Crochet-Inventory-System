import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/ContextApp";

const Authorizations = () => {
  const { user, isLoading, setIsLoading } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setIsLoading(false);
      if (user.is_staff) {
        navigate("/app/dashboard");
      } else {
        navigate("/app/userdashboard");
      }
    }
  }, [user, navigate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return null; // Nothing to render since it redirects
};

export default Authorizations;
