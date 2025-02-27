import axios from "../constant/base.url";
import React, { useContext, useState } from "react";
import { AppContext } from '../context/ContextApp';
import useHandleError from "./useHandleError";


const useLogin = (url, body) => {
  const handleError = useHandleError()
  const { setUser, isLoading, showToast, setIsLoading, setIsAuthenticated } = useContext(AppContext);
  const loginUser = async () => {
    setIsLoading(true)
    try {
      const response = await axios.post(url, body);
      showToast("Login Successfull", "success");
      localStorage.setItem("access_token", response.data.access)
      setUser(response.data.data)
      setIsAuthenticated(true)
      setIsLoading(false)
      return true;
    } catch (e) {
      handleError(e);
      setIsLoading(false)
      return false;
    }
  };

  return { loginUser, isLoading };
};

const useSignup = (url, body) => {
  const handleError = useHandleError()
  const { isLoading, showToast, setIsLoading } = useContext(AppContext);
  const SignupUser = async () => {
    setIsLoading(true)
    try {
      const response = await axios.post(url, body);
      showToast("Signup Successfull", "success");
      setIsLoading(false)
      return true;
    } catch (e) {
      handleError(e);
      setIsLoading(false)
      return false;
    }
  };

  return { SignupUser, isLoading };
};


export { useLogin, useSignup };