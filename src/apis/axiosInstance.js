import axios from "axios";

const axiosInstance = axios.create({
    baseURL:"http://api.dailyjournal.my.id/api",
  timeout: 50000,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    if (config.url.includes("login") || config.url.includes("register")) {
      return config;
    }
    const token = sessionStorage.getItem("authToken");
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }
    return config;
  },
  (error) => {
    console.log("axiosInstance.interceptors.request Error: ", error.message);
  }
);

export default axiosInstance;