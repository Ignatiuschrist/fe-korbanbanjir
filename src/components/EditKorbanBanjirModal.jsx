import { useState } from "react";
import Button from "./Button";

const EditKorbanBanjirModal = ({ korban, onClose, onSave }) => {
// console.log("korban", korban);

  const [formData, setFormData] = useState({
    daerah_id: korban.daerah_id || '',
    nama: korban.nama || '',
    alamat: korban.alamat || '',
    umur: korban.umur || ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.nama) newErrors.nama = 'Nama wajib diisi';
    if (!formData.alamat) newErrors.alamat = 'Alamat wajib diisi';
    if (formData.umur && formData.umur < 0) newErrors.umur = 'Umur tidak boleh negatif';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(
        korban.id,
        formData.daerah_id,
        formData.nama,
        formData.alamat,
        parseInt(formData.umur)
      );
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-1/3">
        <h2 className="text-xl font-bold mb-4 text-left">Edit KorbanBanjir</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 text-left">Daerah Id:</label>
            <input
              type="text"
              name="daerah_id"
              value={formData.daerah_id}
              onChange={handleChange}
              className="border w-full px-4 py-2 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-left">Nama:</label>
            <input
              type="text"
              name="nama"
              value={formData.nama}
              onChange={handleChange}
              className={`border w-full px-4 py-2 rounded-lg ${errors.nama ? 'border-red-500' : ''}`}
            />
            {errors.nama && <p className="text-red-500 text-sm text-left">{errors.nama}</p>}
          </div>

          <div>
            <label className="block text-gray-700 text-left">Alamat:</label>
            <textarea
              name="alamat"
              value={formData.alamat}
              onChange={handleChange}
              className={`border w-full px-4 py-2 rounded-lg ${errors.alamat ? 'border-red-500' : ''}`}
              rows="3"
            />
            {errors.alamat && <p className="text-red-500 text-sm text-left">{errors.alamat}</p>}
          </div>

          <div>
            <label className="block text-gray-700 text-left">Umur:</label>
            <input
              type="number"
              name="umur"
              value={formData.umur}
              onChange={handleChange}
              className={`border w-full px-4 py-2 rounded-lg ${errors.umur ? 'border-red-500' : ''}`}
              min="0"
            />
            {errors.umur && <p className="text-red-500 text-sm text-left">{errors.umur}</p>}
          </div>

          <div className="flex justify-end pt-4">
            <Button
              style="bg-gray-500 text-white px-4 py-2 rounded mr-2"
              text="Batal"
              onClick={onClose}
            />
            <Button
              style="bg-blue-500 text-white px-4 py-2 rounded"
              text="Simpan"
              type="submit"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditKorbanBanjirModal;