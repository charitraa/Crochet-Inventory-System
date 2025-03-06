import axios from 'axios';
export default axios.create(
  {
    baseURL: `http://localhost:8000/`,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    withCredentials: true,
  }

)
const baseUrl = "http://127.0.0.1:8000/"
export { baseUrl }