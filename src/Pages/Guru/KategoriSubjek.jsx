import React from "react";
import { Link } from "react-router-dom";
import { FiEdit, FiTrash2, FiPlus } from "react-icons/fi";


const KategoriSubjek = () => {
  return (
    <GuruLayout>
      <div className="w-full">
        <div className="min-h-screen bg-white flex items-center justify-center p-6">
          <div className="w-full max-w-xl border-2 border-gray-400 rounded-3xl p-6">
            <h1 className="text-2xl font-bold text-[#213555] mb-4">
              Tambah Kategori Subjek
            </h1>
            
            <hr className="border-gray-400 mb-4" />

            <label
              htmlFor="kategoriSubjek"
              className="block text-[#213555] font-semibold mb-2"
            >
              Kategori Subjek
            </label>
            <input
              type="text"
              id="kategoriSubjek"
              placeholder="Masukkan kategori subjek"
              className="w-full border border-gray-300 rounded-xl p-3 mb-6 focus:outline-none focus:ring-2 focus:ring-[#213555]"
            />

            <div className="flex justify-between items-center px-4">
              <button
                className="bg-gray-600 text-white px-5 py-2 rounded-full hover:bg-gray-700 transition"
              >
                Batalkan
              </button>
              <button
                className="bg-gray-600 text-white px-5 py-2 rounded-full hover:bg-gray-700 transition"
              >
                Buat
              </button>
            </div>
          </div>
        </div>
      </div>
    </GuruLayout>
  );
};

export default KategoriSubjek;