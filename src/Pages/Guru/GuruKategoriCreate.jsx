import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiEdit, FiTrash2, FiPlus } from "react-icons/fi";
import axiosInstance from "../../api/axiosInstance";

const GuruKategoriCreate = () => {
  const navigate = useNavigate();
  const [kategoriSubjek, setKategoriSubjek] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    if (!kategoriSubjek.trim()) {
      setError("Nama kategori subjek tidak boleh kosong");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.post("/API/teacher/subjectcategory/create", {
        subject_category_name: kategoriSubjek
      });

      if (response.data.success) {
        navigate("/guru/kategorisubjek");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Gagal menambahkan kategori subjek");
      console.error("Add error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="min-h-screen bg-[#F5EFE7] flex items-center justify-center p-6">
        <div className="w-full max-w-xl border-2 border-gray-400 rounded-3xl p-6 bg-white">
          <h1 className="text-2xl font-bold text-[#213555] mb-4">
            Tambah Kategori Subjek
          </h1>
          
          <hr className="border-gray-400 mb-4" />

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
              {error}
            </div>
          )}

          <label
            htmlFor="kategoriSubjek"
            className="block text-[#213555] font-semibold mb-2"
          >
            Kategori Subjek
          </label>
          <input
            type="text"
            id="kategoriSubjek"
            value={kategoriSubjek}
            onChange={(e) => setKategoriSubjek(e.target.value)}
            placeholder="Masukkan kategori subjek"
            className="w-full border border-gray-300 rounded-xl p-3 mb-6 focus:outline-none focus:ring-2 focus:ring-[#213555] text-gray-800 bg-white"
          />

          <div className="flex justify-between items-center px-4">
            <button
              onClick={() => navigate("/guru/kategorisubjek")}
              className="bg-gray-600 text-white px-5 py-2 rounded-full hover:bg-gray-700 transition"
            >
              Batalkan
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="bg-[#213555] text-white px-5 py-2 rounded-full hover:opacity-90 transition disabled:opacity-50"
            >
              {loading ? "Memproses..." : "Buat"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuruKategoriCreate; 