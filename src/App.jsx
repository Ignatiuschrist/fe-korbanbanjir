import React from "react";
import { Navigate } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLayout from "./layouts/AdminLayouts";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminKorbanBanjir from "./pages/Admin/AdminKorbanBanjir";
// import KorbanBanjir from "./pages/Admin/KorbanBanjir";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Halaman Login */}
        <Route path="/" element={<Login />} />
        {/* Halaman Register */}
        <Route path="/register" element={<Register />} />
        {/* Halaman Admin
        <Route path="/admin" element={
          <ProtectedRoute>
            <AdminLayout>
              <AdminKorbanBanjir />
            </AdminLayout>
          </ProtectedRoute>
        } /> */}
        <Route path="/admin/KorbanBanjir" element={
          <ProtectedRoute>
            <AdminLayout>
              <AdminKorbanBanjir />
            </AdminLayout>
          </ProtectedRoute>
        } />
        <Route path="/admin/dashboard" element={
          <ProtectedRoute>
            <AdminLayout>
              <AdminDashboard />
            </AdminLayout>
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
};

const ProtectedRoute = ({ children }) => {
  const token = sessionStorage.getItem("authToken");  // Periksa token dari sessionStorage
  if (!token) {
    return <Navigate to="/" replace />;  // Arahkan ke halaman login jika token tidak ada
  }
  return children;
};

export default App;
