import axios from 'axios';
export default axios.create(
  {
    baseURL: `http://charitra.pythonanywhere.com/`,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    withCredentials: true,
  }

)
const baseUrl = "http://charitra.pythonanywhere.com"
export { baseUrl }