import axios from "axios";

const API = axios.create({
  baseURL: "https://eventhive-backend-ekf5.onrender.com/api"
});

export default API;