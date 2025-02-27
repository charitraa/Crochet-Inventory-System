import { useContext, useState } from "react";
import axios from "../constant/base.url";
import { AppContext } from "../context/ContextApp";
import useHandleError from "./useHandleError";

const usePost = (url, body) => {
  const { setIsLoading, showToast } = useContext(AppContext);
  const [data, setData] = useState();

  const handleError = useHandleError();
  const save = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(url, body, { withCredentials: true });
      setData(response.data)
      showToast("Data Saved Successfully!!")
      setIsLoading(false);
      return true;
    } catch (error) {
      console.error("Error saving data:", error);
      handleError(error);
      setIsLoading(false);
      return false;
    }
  };

  return { save, data };
};

export default usePost;