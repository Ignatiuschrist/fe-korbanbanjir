import React from "react";

const Table = ({ korbanBanjir, onEdit, onDelete }) => {
  return (
    <table className="min-w-full text-center text-sm font-light">
      <thead className="bg-gray-500 text-white border-b">
        <tr>
          <th className="border px-4 py-2">No</th>
          <th className="border px-4 py-2">Nama</th>
          <th className="border px-4 py-2">Alamat</th>
          <th className="border px-4 py-2">Umur</th>
          <th className="border px-4 py-2">Aksi</th>
        </tr>
      </thead>
      <tbody>
        {korbanBanjir.map((korban, index) => (
          <tr key={korban.id} className="bg-gray-200 text-black border-b">
            <td className="border px-4 py-2">{index +1}</td>
            <td className="border px-4 py-2">{korban.nama}</td>
            <td className="border px-4 py-2">{korban.alamat}</td>
            <td className="border px-4 py-2">{korban.umur}</td>
            <td className="border px-4 py-2">
              <button
                onClick={() => onEdit(korban)}
                className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(korban.id)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Hapus
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
