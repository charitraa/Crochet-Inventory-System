import { useContext, useState } from "react";
import { AppContext } from "../context/ContextApp";
import useHandleError from "./useHandleError";
import axios from "axios";

const usePostProfile = (url) => {
  const { setIsLoading, showToast } = useContext(AppContext);
  const [data, setData] = useState();

  const handleError = useHandleError();
  const save = async (body) => {
    setIsLoading(true);
    try {
      const response = await axios.post(`http://localhost:8000/${url}`, body,
        { headers: { "Content-Type": "multipart/form-data" }, withCredentials: true, },
      );
      setData(response.data)
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

export default usePostProfile;