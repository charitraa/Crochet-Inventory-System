import React, { useCallback, useContext, useState } from "react";
import axios from "../constant/base.url";
import { AppContext } from '../context/ContextApp';
import useHandleError from "./useHandleError";

const useDelete = () => {
  const [responseMessage, setResponseMessage] = useState();
  const { setIsLoading, setData, setHealth, setRefreshData, setRegular, setOccasional, setToxic, setGoodPlants, setBadPlants } = useContext(AppContext);
  const handleError = useHandleError();

  const handleDelete = useCallback(async (url) => {
    setIsLoading(true);

    try {
      const response = await axios.delete(url);
      setResponseMessage(response.data);
      // setHealth([])
      // setRegular([])
      // setOccasional([])
      // setToxic([])
      // setOccasional([])
      // setToxic([]) 
      //  setGoodPlants([])
      //  setBadPlants([])
      return true;
    } catch (error) {
      handleError(error.message || "An error occurred during logout");
      setIsLoading(false);
      return false;
    }
  }, [setIsLoading]);

  return { responseMessage, handleDelete };
};

export default useDelete;