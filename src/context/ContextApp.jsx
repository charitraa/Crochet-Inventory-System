import React, { createContext, useEffect, useState } from "react";
import Backdrop from '@mui/material/Backdrop';
import Cookies from "js-cookie";
import CircularProgress from '@mui/material/CircularProgress';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "../constant/base.url.js";

export const AppContext = createContext();

const ToastOptions = {
  position: "bottom-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "colored",
};

export default function ContextApp({ children }) {
  const [responsive, setResponsive] = useState(true);
  const [user, setUser] = useState();
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Auth state
  const [isLoading, setIsLoading] = useState(false);
  const [refresh, setRefreshData] = useState(false);
  const [openModel, setModel] = useState(false);
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('access_token');
      if (token) {
        try {
          const response = await axios.get("/auth/me/");
          setIsAuthenticated(true);
        } catch (error) {

          setIsAuthenticated(false);
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsAuthenticated(false);
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);
  const showToast = (message, type = "default") => {
    const toastConfig = {
      ...ToastOptions,
      style: {
        backgroundColor: type === "success" ? "#4CAF50" :
          type === "error" ? "#F44336" :
            type === "warn" ? "#FFC107" :
              type === "info" ? "#2196F3" :
                "#323232",
        color: "#fff",
      },
    };

    switch (type) {
      case "warn":
        toast.warn(message, toastConfig);
        break;
      case "success":
        toast.success(message, toastConfig);
        break;
      case "error":
        toast.error(message, toastConfig);
        break;
      case "info":
        toast.info(message, toastConfig);
        break;
      default:
        toast(message, toastConfig);
        break;
    }
  };


  const handleClose = () => {
    setIsLoading(false);
  };

  return (
    <AppContext.Provider value={{ responsive, isLoading, isAuthenticated, setIsAuthenticated, user, setUser, refresh, setRefreshData, setIsLoading, showToast, openModel, setModel, setResponsive }}>
      <ToastContainer />
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      {children}
    </AppContext.Provider>
  );
}
