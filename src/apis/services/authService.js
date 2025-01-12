import axiosInstance from "../axiosInstance";

const ApiAuthService = {
  // Register
  register: async (data) => {
    return axiosInstance.post("/register", data);
  },
  // Login
  login: async (data) => {
    const response = await axiosInstance.post("/login", data);
    if (response.data?.data?.token) {
      sessionStorage.setItem("authToken", response.data.data.token);  // Simpan token di sessionStorage
    }
    return response;
  },
};

export default ApiAuthService;
