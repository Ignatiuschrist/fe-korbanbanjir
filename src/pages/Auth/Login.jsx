import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiAuthService from "../../apis/services/authService";
import Swal from "sweetalert2";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      Swal.fire({
        icon: "warning",
        title: "Form Tidak Lengkap",
        text: "Email dan password harus diisi.",
      });
      return;
    }
    try {
      const response = await ApiAuthService.login({ email, password });
      sessionStorage.setItem("token", response.data.token); // Simpan token
      Swal.fire({
        icon: "success",
        title: "Login Berhasil",
        text: "Anda berhasil masuk!",
      }).then(() => {
        navigate("/admin/korbanBanjir");
      });
    } catch (error) {
      console.error("Login gagal:", error.response?.data || error.message);
      Swal.fire({
        icon: "error",
        title: "Login Gagal",
        text: "Email atau password salah.",
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>
        <form onSubmit={handleLogin} className="flex flex-col">
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
            Login
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Belum punya akun?{" "}
          <a href="/register" className="text-indigo-600 hover:underline">
            Daftar di sini
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
