import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";

const EditKategoriSubjek = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const [kategoriSubjek, setKategoriSubjek] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // Get subject data from location state or fetch it
    if (location.state?.subject) {
      setKategoriSubjek(location.state.subject.subject_category_name);
    } else {
      fetchSubject();
    }
  }, [id]);

  const fetchSubject = async () => {
    try {
      const response = await axiosInstance.get(`/API/teacher/subjectcategory/${id}`);
      if (response.data.success) {
        setKategoriSubjek(response.data.data.subject_category_name);
      }
    } catch (err) {
      setError("Gagal memuat data kategori subjek");
      console.error("Fetch error:", err);
    }
  };

  const handleSubmit = async () => {
    if (!kategoriSubjek.trim()) {
      setError("Nama kategori subjek tidak boleh kosong");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Menggunakan endpoint yang benar sesuai dengan API
      const response = await axiosInstance.put(`/API/teacher/subjectcategory/${id}`, {
        subject_category_name: kategoriSubjek,
        subject_category_id: id
      });

      if (response.data.success) {
        setSuccess(true);
        // Navigate back after showing success message
        setTimeout(() => {
          navigate("/guru/kategorisubjek", {
            state: {
              notification: {
                type: 'success',
                message: 'Kategori subjek berhasil diperbarui!'
              }
            }
          });
        }, 1500);
      }
    } catch (err) {
      console.error("Update error details:", err.response || err);
      setError(
        err.response?.data?.message || 
        "Gagal memperbarui kategori subjek. Silakan coba lagi."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="min-h-screen bg-[#F5EFE7] flex items-center justify-center p-6">
        <div className="w-full max-w-xl border-2 border-gray-400 rounded-3xl p-6 bg-white">
          <h1 className="text-2xl font-bold text-[#213555] mb-4">
            Edit Kategori Subjek
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
              Kategori subjek berhasil diperbarui! Mengalihkan...
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
              {loading ? "Memproses..." : success ? "Berhasil!" : "Simpan"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditKategoriSubjek;