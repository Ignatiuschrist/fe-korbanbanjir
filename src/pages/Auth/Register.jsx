import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiAuthService from "../../apis/services/authService";
import Swal from "sweetalert2";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); 

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      Swal.fire({
        icon: "warning",
        title: "Form Tidak Lengkap",
        text: "Semua kolom harus diisi.",
      });
      return;
    }
    try {
      const response = await ApiAuthService.register({ name, email, password });
      Swal.fire({
        icon: "success",
        title: "Registrasi Berhasil",
        text: "Akun Anda berhasil dibuat!",
      }).then(() => {
        navigate("/admin/KorbanBanjir");
      });
    } catch (error) {
      console.error("Terjadi kesalahan saat registrasi:", error.response?.data || error.message);
      Swal.fire({
        icon: "error",
        title: "Registrasi Gagal",
        text: "Silakan coba lagi.",
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h1 className="text-3xl font-bold mb-6 text-center">Register</h1>
        <form onSubmit={handleRegister} className="flex flex-col">
          <label htmlFor="name" className="mb-2 text-sm font-medium">
            Nama
          </label>
          <input
            type="text"
            id="name"
            className="p-2 mb-4 border border-gray-300 rounded"
            placeholder="Masukkan nama Anda"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="email" className="mb-2 text-sm font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="p-2 mb-4 border border-gray-300 rounded"
            placeholder="Masukkan email Anda"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password" className="mb-2 text-sm font-medium">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="p-2 mb-6 border border-gray-300 rounded"
            placeholder="Masukkan password Anda"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
          >
            Daftar
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Sudah punya akun?{" "}
          <a href="/" className="text-indigo-600 hover:underline">
            Login di sini
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
