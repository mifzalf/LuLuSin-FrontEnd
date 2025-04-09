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
      console.log('Raw API Response:', response.data);
      
      // Extract subjects from the response
      let subjects = [];
      if (response.data && response.data.datasubject) {
        subjects = response.data.datasubject;
      }
      console.log('Extracted subjects:', subjects);

      // Group subjects by category ID
      const groupedSubjects = {};
      subjects.forEach(subject => {
        const categoryId = subject.id_subject_category;
        if (!groupedSubjects[categoryId]) {
          groupedSubjects[categoryId] = {
            kategori: `Kategori ${categoryId}`,
            subjek: []
          };
        }
        groupedSubjects[categoryId].subjek.push({
          subject_id: subject.subject_id,
          subject_name: subject.subject_name,
          time_limit: subject.time_limit
        });
      });
      
      // Convert to array format
      const formattedData = Object.values(groupedSubjects);
      console.log('Formatted Data:', formattedData);
      
      if (formattedData.length === 0) {
        setError("Tidak ada data subjek yang tersedia");
      } else {
        setError(null);
      }
      setTryouts(formattedData);
      
    } catch (err) {
      console.error('Error details:', {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status
      });
      
      if (err.response) {
        if (err.response.status === 401) {
          setError("Sesi anda telah berakhir. Silakan login kembali.");
          navigate('/login');
        } else {
          setError(`Error ${err.response.status}: ${err.response.data?.message || 'Gagal memuat data'}`);
        }
      } else if (err.request) {
        setError("Tidak dapat terhubung ke server. Mohon periksa koneksi anda.");
      } else {
        setError("Terjadi kesalahan saat memuat data: " + err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  // Add debug logging for tryouts state changes
  useEffect(() => {
    console.log('Current tryouts state:', tryouts);
  }, [tryouts]);

  const handleDelete = async (kategoriIdx, subjekIdx) => {
    try {
      const subjectToDelete = tryouts[kategoriIdx].subjek[subjekIdx];
      console.log('Deleting subject:', subjectToDelete);
      
      const response = await axiosInstance.delete(`/API/teacher/subject/${subjectToDelete.subject_id}`);
      console.log('Delete response:', response.data);
      
      if (response.data.success) {
        await fetchSubjects();
        setNotification({
          type: 'success',
          message: 'Subjek berhasil dihapus!'
        });
      } else {
        throw new Error(response.data.message || 'Gagal menghapus subjek');
      }
    } catch (err) {
      console.error('Delete Error:', err);
      setNotification({
        type: 'error',
        message: err.response?.data?.message || err.message || 'Gagal menghapus subjek'
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

        {loading ? (
          <div className="bg-white shadow-md rounded-lg p-6 text-center">
            <div className="text-[#213555]">Loading...</div>
          </div>
        ) : error ? (
          <div className="bg-white shadow-md rounded-lg p-6 text-center">
            <div className="text-red-500">{error}</div>
          </div>
        ) : (
          <div className="w-full space-y-6">
            {tryouts && tryouts.length > 0 ? (
              tryouts.map((kategori, kategoriIdx) => (
                <div key={kategoriIdx} className="bg-white shadow-md rounded-lg overflow-hidden">
                  <div className="bg-[#213555] text-white p-4 font-semibold flex items-center">
                    <span className="w-3/5 pl-4 text-left">{kategori.kategori}</span>
                    <span className="w-1/5 text-center">Waktu Pengerjaan</span>
                    <span className="w-1/5 text-center">Aksi</span>
                  </div>
                  {kategori.subjek && kategori.subjek.length > 0 ? (
                    kategori.subjek.map((subjek, subjekIdx) => (
                      <div
                        key={subjekIdx}
                        className="flex items-center p-4 border-b last:border-none hover:bg-gray-50 transition"
                      >
                        <span className="w-3/5 pl-4 text-left text-[#2f4a64] font-medium">
                          {subjek.subject_name}
                        </span>
                        <span className="w-1/5 text-center text-[#2f4a64]">
                          {subjek.time_limit ? `${subjek.time_limit} Menit` : '-'}
                        </span>
                        <div className="w-1/5 flex justify-center items-center gap-3">
                          <button
                            onClick={() =>
                              navigate(`/guru/subjek/edit?kategori=${encodeURIComponent(kategori.kategori)}&subjek=${encodeURIComponent(subjek.subject_name)}&id=${subjek.subject_id}`)
                            }
                            className="text-[#3E5879] hover:text-[#213555] transition p-1.5 hover:bg-gray-100 rounded-md"
                          >
                            <FiEdit size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(kategoriIdx, subjekIdx)}
                            className="text-[#3E5879] hover:text-red-600 transition p-1.5 hover:bg-gray-100 rounded-md"
                          >
                            <FiTrash2 size={18} />
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-gray-500">
                      Tidak ada subjek dalam kategori ini
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="bg-white shadow-md rounded-lg p-6 text-center text-gray-500">
                Tidak ada data subjek yang tersedia
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default GuruSubjek;
