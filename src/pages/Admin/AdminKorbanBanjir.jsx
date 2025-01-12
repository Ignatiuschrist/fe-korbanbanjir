import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import Button from "../../components/Button";
import Table from "../../components/Table";
import { useNavigate } from "react-router-dom";
import ApiKorbanBanjirService from "../../apis/services/korbanBanjirService";
import AddKorbanBanjirModal from "../../components/AddKorbanBanjirModal";
import EditKorbanBanjirModal from "../../components/EditKorbanBanjirModal";

const KorbanBanjir = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [korbanBanjir, setkorbanBanjir] = useState([]);
  const [editingKorbanBanjir, setEditingKorbanBanjir] = useState(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchKorbanBanjir = async () => {
      try {
        const data = await ApiKorbanBanjirService.readKorbanBanjir();
        const mappedkorbanBanjir = data.map((korban, index) => ({
          id: korban.id,
          daerah_id: korban.daerah_id,
          alamat: korban.alamat,
          umur: korban.umur,
          nama: korban.nama,
        }));
        setkorbanBanjir(mappedkorbanBanjir.reverse());
      } catch (error) {
        Swal.fire("Error", "Gagal memuat data KorbanBanjir.", "error");
        console.error("Error fetching data:", error);
      }
    };

    fetchKorbanBanjir();
  }, [korbanBanjir]);

  const addKorbanBanjir = async (daerah_id, nama, alamat, umur ) => {
    try {
      const newKorbanBanjir = await ApiKorbanBanjirService.createKorbanBanjir({ daerah_id, nama, alamat, umur  });
      setkorbanBanjir([...korbanBanjir, { ...newKorbanBanjir, no: korbanBanjir.length + 1 }]);
      setShowAddModal(false);
      Swal.fire("Berhasil!", "Data KorbanBanjir berhasil ditambah!", "success");
    } catch (error) {
      Swal.fire("Error", "Gagal menambah data KorbanBanjir.", "error");
      console.error("Error adding korban:", error);
    }
  };

  const editKorbanBanjir = async (id, daerah_id, nama, alamat, umur ) => {
    try {
      const updatedKorbanBanjir = await ApiKorbanBanjirService.updateKorbanBanjir(id, { daerah_id, nama, alamat, umur  });
      setkorbanBanjir(korbanBanjir.map((s) => (s.id === id ? updatedKorbanBanjir : s)));
      setShowEditModal(false);
      Swal.fire("Berhasil!", "Data KorbanBanjir berhasil diperbarui!", "success");
    } catch (error) {
      Swal.fire("Error", "Gagal memperbarui data KorbanBanjir.", "error");
      console.error("Error updating korban:", error);
    }
  };

  const handleEditClick = (korban) => {
    setEditingKorbanBanjir(korban);
    setShowEditModal(true);
  };

  const handleDeleteClick = (korban) => {
    Swal.fire({
      title: "Hapus KorbanBanjir",
      text: "Apakah kamu yakin ingin menghapus KorbanBanjir ini?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, Hapus!",
      cancelButtonText: "Batal",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // console.log(korban);
          await ApiKorbanBanjirService.deleteKorbanBanjir(korban);
          setkorbanBanjir(korbanBanjir.filter((s) => s.id !== korban));
          Swal.fire("Dihapus!", "KorbanBanjir telah dihapus.", "success");
        } catch (error) {
          Swal.fire("Error", "Gagal menghapus KorbanBanjir.", "error");
          console.error("Error deleting korban:", error);
        }
      }
    });
  };

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    Swal.fire("Logout", "Anda telah berhasil logout.", "success").then(() => {
      navigate("/");
    });
  };

  return (
    <>
      <div className="flex flex-col">
        <div className="flex justify-end mb-4">
          <Button
            style="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-700"
            text="Logout"
            onClick={handleLogout}
          />
        </div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold text-lg p-2">Daftar KorbanBanjir</h2>
          <Button
            style="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
            text="Tambah KorbanBanjir"
            onClick={() => setShowAddModal(true)}
          />
        </div>
        <Table
          korbanBanjir={korbanBanjir}
          onEdit={handleEditClick}
          onDelete={handleDeleteClick}
        />
      </div>
      {showAddModal && (
        <AddKorbanBanjirModal
          onClose={() => setShowAddModal(false)}
          onSave={addKorbanBanjir}
        />
      )}
      {showEditModal && editingKorbanBanjir && (
        <EditKorbanBanjirModal
          korban={editingKorbanBanjir}
          onClose={() => setShowEditModal(false)}
          onSave={editKorbanBanjir}
        />
      )}
    </>
  );
};







export default KorbanBanjir;
