import axios from "../constant/base.url";
import React, { useContext } from "react";
import { AppContext } from '../context/ContextApp';
import useHandleError from "./useHandleError";

const useLogin = (url, body) => {
  const handleError = useHandleError()
  const { setUser, isAuthenticated, isLoading, showToast, setIsLoading, setIsAuthenticated } = useContext(AppContext);
  const loginUser = async () => {
    setIsLoading(true)
    try {
      const response = await axios.post(url, body);
      showToast("Login Successfull", "success");

      console.log(response.data.data.is_staff);
      setIsAuthenticated(true)
      setIsLoading(false)
      setUser(response.data.data)
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