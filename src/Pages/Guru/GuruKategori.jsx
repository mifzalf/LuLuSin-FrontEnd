import React from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

const GuruKategori = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#F5EFE7]">

      {/* Konten */}
      <div className="flex-grow p-10">
        <h1 className="text-2xl font-bold text-[#213555] mb-6">Subjek UTBK SNBT 2025</h1>

        {/* Tombol Tambah Kategori */}
        <div className="flex justify-end mb-4">
          <button className="bg-[#213555] text-white px-4 py-2 rounded-full flex items-center gap-2 shadow-md hover:opacity-90 transition">
            <FaPlus /> Tambah Kategori Subjek
          </button>
        </div>

        {/* Tabel */}
        <div className="bg-white rounded-md shadow-md overflow-hidden">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#3E5879] text-white text-left">
                <th className="px-4 py-3 w-16">No</th>
                <th className="px-4 py-3">Subjek</th>
                <th className="px-4 py-3 w-32">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-[#213555]">
              {[
                "Tes Potensi Skolastik",
                "Tes Literasi",
                "Penalaran Matematika"
              ].map((subject, index) => (
                <tr key={index} className="border-t">
                  <td className="px-4 py-3">{index + 1}</td>
                  <td className="px-4 py-3">{subject}</td>
                  <td className="px-4 py-3 flex gap-3">
                    {/* Ikon Edit */}
                    <button className="text-[#213555] hover:text-blue-500 transition bg-transparent">
                      <FaEdit className="w-5 h-5" />
                    </button>
                    {/* Ikon Delete */}
                    <button className="text-[#213555] hover:text-red-500 transition bg-transparent">
                      <FaTrash className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default GuruKategori;
