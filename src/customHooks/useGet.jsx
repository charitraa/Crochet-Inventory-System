import React, { useCallback, useContext, useEffect, useState } from "react";
import axios from "../constant/base.url";
import { AppContext } from "../context/ContextApp";
const useGet = (url) => {
  const [newData, SetNewData] = useState();
  const { setData, isLoading, setIsLoading } = useContext(AppContext);
  const handleData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(url);
      console.log(response.data);
      SetNewData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }, [url, setIsLoading]);
  useEffect(() => {
    handleData();
  }, [url]);
  return { newData, isLoading, handleData };
};

export default useGet;