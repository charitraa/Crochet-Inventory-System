import { useContext, useState } from "react";
import axios from "../constant/base.url";
import { AppContext } from "../context/ContextApp";
import useHandleError from "./useHandleError";

const usePut = (url, body) => {
  const { setIsLoading, showToast } = useContext(AppContext);
  const [data, setData] = useState();

  const handleError = useHandleError();
  const update = async () => {
    setIsLoading(true);
    try {
      const response = await axios.put(url, body, { withCredentials: true });
      setData(response.data);
      setIsLoading(false);
      return true;
    } catch (error) {
      console.error("Error updating data:", error);
      handleError(error);
      setIsLoading(false);
      return false;
    }
  };

  return { update, data };
};

export default usePut;