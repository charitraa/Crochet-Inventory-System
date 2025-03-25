import axios from 'axios';
export default axios.create(
  {
    baseURL: `https://charitra.pythonanywhere.com/`,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    withCredentials: true,
  }

)
const baseUrl = "https://charitra.pythonanywhere.com"
export { baseUrl }