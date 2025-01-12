import axiosInstance from "../axiosInstance";

const ApiKorbanBanjirService = {
  // Tambah KorbanBanjir
  createKorbanBanjir: async (data) => {
    const response = await axiosInstance.post(`/korbanBanjir`, data);
    return response.data.data;
  },
  
  // Baca korbanBanjir
  readKorbanBanjir: async () => {
    const response = await axiosInstance.get("/korbanBanjir");
    return response.data.data;
  },
  
  // Perbarui korbanBanjir
  updateKorbanBanjir: async (id, data) => {
    const response = await axiosInstance.put(`/korbanBanjir/${id}`, data);
    return response.data.data;
  },
  
  // Hapus korbanBanjir
  deleteKorbanBanjir: async (id) => {
    const response = await axiosInstance.delete(`/korbanBanjir/${id}`);
    return response.data;
  },
};

export default ApiKorbanBanjirService;
