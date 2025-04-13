"use client";

import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";

const EditTryout = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [tryoutId, setTryoutId] = useState(null);
  const [namaTryout, setNamaTryout] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const id = searchParams.get("id");
    if (id) {
      setTryoutId(id);
      fetchTryoutData(id);
    } else {
      setError("ID Tryout tidak ditemukan di URL.");
      setLoading(false);
    }
  }, [searchParams]);

  const fetchTryoutData = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get(`/API/teacher/tryout/${id}`);
      
      if (response.data && response.data.result) {
        const tryoutData = response.data.result;
        setNamaTryout(tryoutData.tryout_name || "");
      } else {
        setError("Format data tryout tidak sesuai atau data tidak ditemukan.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Gagal memuat data tryout");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.patch(`/API/teacher/tryout/update/${tryoutId}`, {
        tryout_name: namaTryout
      });

      if (response.data.success || response.status === 200) {
        navigate("/guru/tryout", {
          state: {
            notification: {
              type: 'success',
              message: 'Tryout berhasil diperbarui!'
            }
          },
          replace: true
        });
      } else {
        setError("Gagal memperbarui tryout");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Gagal memperbarui tryout");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/guru/tryout", { replace: true });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f5f0e8] flex items-center justify-center">
        <div className="text-[#2f4a64]">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f0e8] flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h1 className="text-xl font-bold text-[#2f4a64] mb-6">Edit Tryout</h1>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-[#2f4a64] mb-2">
              Nama Tryout
            </label>
            <input
              type="text"
              value={namaTryout}
              onChange={(e) => setNamaTryout(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2f4a64] text-gray-900 placeholder-gray-500 bg-white"
              placeholder="Masukkan nama tryout"
              required
            />
          </div>

          <div className="flex justify-between gap-4 mt-6">
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors w-24"
            >
              Batalkan
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#2f4a64] text-white rounded-md hover:bg-[#1e3247] transition-colors w-24"
              disabled={loading}
            >
              {loading ? "Loading..." : "Simpan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTryout;
