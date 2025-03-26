import { useContext, useState } from "react";
import { AppContext } from "../context/ContextApp";
import useHandleError from "./useHandleError";
import axios from "axios";

const useFormPost = (url, body) => {
  const { setIsLoading, showToast } = useContext(AppContext);
  const [data, setData] = useState();

  const handleError = useHandleError();
  const save = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(`https://charitra.pythonanywhere.com/${url}`, body,
        { headers: { "Content-Type": "multipart/form-data" }, withCredentials: true, },
      );
      setData(response.data)
      setIsLoading(false);
      return true;
    } catch (error) {
      handleError(error);
      setIsLoading(false);
      return false;
    }
  };

  return { save, data };
};

export default useFormPost;