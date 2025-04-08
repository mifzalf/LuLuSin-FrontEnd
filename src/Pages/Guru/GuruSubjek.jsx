import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiEdit, FiTrash2, FiPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";

const GuruSubjek = () => {
  const navigate = useNavigate();
  const [tryouts, setTryouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Fetching subjects...');
      const response = await axiosInstance.get("/API/teacher/subject");
      console.log('Response received:', response);
      
      if (response.data.success) {
        setTryouts(response.data.data);
        setError(null);
      } else {
        setError(response.data.message || "Gagal memuat data subjek");
      }
    } catch (err) {
      console.error('Error fetching subjects:', err);
      if (err.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        setError(`Error ${err.response.status}: ${err.response.data.message || 'Gagal memuat data'}`);
      } else if (err.request) {
        // The request was made but no response was received
        setError("Tidak dapat terhubung ke server. Mohon periksa koneksi anda.");
      } else {
        // Something happened in setting up the request that triggered an Error
        setError("Terjadi kesalahan saat memuat data: " + err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (kategoriIdx, subjekIdx) => {
    try {
      const subjectToDelete = tryouts[kategoriIdx].subjek[subjekIdx];
      const response = await axiosInstance.delete(`/API/teacher/subject/delete/${subjectToDelete.subject_id}`);
      
      if (response.data.success) {
        const newTryouts = [...tryouts];
        newTryouts[kategoriIdx].subjek.splice(subjekIdx, 1);
        setTryouts(newTryouts);
        setNotification({
          type: 'success',
          message: 'Subjek berhasil dihapus!'
        });
      }
    } catch (err) {
      setNotification({
        type: 'error',
        message: err.response?.data?.message || 'Gagal menghapus subjek'
      });
    }
  };

  // Clear notification after 3 seconds
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f5f0e6] flex items-center justify-center">
        <div className="text-[#213555]">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#f5f0e6] flex items-center justify-center">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f0e6] flex items-center justify-center p-6">
      <div className="w-full max-w-4xl">
        {notification && (
          <div className={`mb-4 p-4 rounded-lg ${
            notification.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}>
            {notification.message}
          </div>
        )}
        
        <div className="w-full flex justify-between items-center py-6">
          <h1 className="text-2xl font-bold text-[#213555]">Subjek UTBK SNBT 2025</h1>
          <button
            onClick={() => navigate("/guru/subjek/create")}
            className="bg-[#3E5879] text-white px-6 py-2.5 rounded-lg flex items-center gap-2 hover:bg-[#213555] transition"
          >
            <FiPlus size={16} /> Tambahkan
          </button>
        </div>

        <div className="w-full space-y-6">
          {tryouts.map((kategori, kategoriIdx) => (
            <div key={kategoriIdx} className="bg-white shadow-md rounded-lg overflow-hidden">
              <div className="bg-[#213555] text-white p-4 text-lg font-semibold flex">
                <span className="w-2/3 text-center">{kategori.kategori}</span>
                <span className="w-1/3 text-center border-l">Aksi</span>
              </div>
              {kategori.subjek.map((subjek, subjekIdx) => (
                <div
                  key={subjekIdx}
                  className="flex items-center p-4 border-b last:border-none hover:bg-gray-50 transition"
                >
                  <span className="w-2/3 text-center text-[#2f4a64] font-medium">{subjek.subject_name}</span>
                  <div className="w-1/3 flex justify-center gap-3 border-l">
                    <button
                      onClick={() =>
                        navigate(`/guru/subjek/edit?kategori=${kategori.kategori}&subjek=${subjek.subject_name}&id=${subjek.subject_id}`)
                      }
                      className="text-[#3E5879] hover:text-[#213555] transition p-2 hover:bg-gray-100 rounded-full"
                    >
                      <FiEdit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(kategoriIdx, subjekIdx)}
                      className="text-[#3E5879] hover:text-red-600 transition p-2 hover:bg-gray-100 rounded-full"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GuruSubjek;
