import axios from "axios";

const API = axios.create({
    baseURL: "https://eventhive-backend-ekf5.onrender.com"
});

export default API;