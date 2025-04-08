import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiEdit, FiTrash2, FiPlus } from "react-icons/fi";
import axiosInstance from "../../api/axiosInstance";

const GuruKategoriCreate = () => {
  const navigate = useNavigate();
  const [kategoriSubjek, setKategoriSubjek] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    if (!kategoriSubjek.trim()) {
      setError("Nama kategori subjek tidak boleh kosong");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await axiosInstance.post("/API/teacher/subjectcategory/create", {
        subject_category_name: kategoriSubjek
      });

      if (response.data.success) {
        setSuccess(true);
        setKategoriSubjek("");
        // Tampilkan pesan sukses sebentar
        setTimeout(() => {
          // Navigasi kembali ke halaman kategori dengan state untuk menampilkan notifikasi
          navigate("/guru/kategorisubjek", { 
            state: { 
              notification: {
                type: 'success',
                message: 'Kategori subjek berhasil ditambahkan!'
              }
            }
          });
        }, 1500);
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

          {success && (
            <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md flex items-center justify-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
              </svg>
              Kategori subjek berhasil ditambahkan! Mengalihkan...
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
              disabled={loading || success}
              className="bg-[#213555] text-white px-5 py-2 rounded-full hover:opacity-90 transition disabled:opacity-50"
            >
              {loading ? "Memproses..." : success ? "Berhasil!" : "Buat"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuruKategoriCreate; 