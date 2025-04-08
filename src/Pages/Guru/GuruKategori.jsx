import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";

const GuruKategori = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notification, setNotification] = useState(location.state?.notification || null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(null);

  // Fetch subjects when component mounts or when returning from create
  const fetchSubjects = async () => {
    try {
      const response = await axiosInstance.get("/API/teacher/subjectcategory");
      
      if (response.data.dataSubjectCategory) {
        setSubjects(response.data.dataSubjectCategory);
        setError(null);
      } else {
        setError("Gagal memuat data subjek: Format data tidak sesuai");
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data?.message || `Error ${err.response.status}: Gagal memuat data subjek`);
      } else if (err.request) {
        setError("Tidak ada respon dari server. Periksa koneksi internet Anda atau pastikan server berjalan.");
      } else {
        setError(err.message || "Terjadi kesalahan saat memuat data");
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSubjects();
    
    // Clear notification after 3 seconds
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
        // Clear the location state
        window.history.replaceState({}, document.title);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [location]);

  // Handle delete confirmation
  const handleDeleteClick = (subject) => {
    setSelectedSubject(subject);
    setShowDeleteConfirm(true);
  };

  // Handle delete action
  const handleDelete = async () => {
    if (!selectedSubject) return;

    try {
      const response = await axiosInstance.delete(`/API/teacher/subjectcategory/delete/${selectedSubject.subject_category_id}`);
      
      if (response.data.success) {
        setSubjects(subjects.filter(s => s.subject_category_id !== selectedSubject.subject_category_id));
        setNotification({
          type: 'success',
          message: 'Kategori subjek berhasil dihapus!'
        });
      }
    } catch (err) {
      setNotification({
        type: 'error',
        message: err.response?.data?.message || 'Gagal menghapus kategori subjek'
      });
    } finally {
      setShowDeleteConfirm(false);
      setSelectedSubject(null);
    }
  };

  // Handle edit navigation
  const handleEdit = (subject) => {
    navigate(`/guru/kategorisubjek/edit/${subject.subject_category_id}`, {
      state: { subject }
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F5EFE7]">
      {/* Konten */}
      <div className="flex-grow p-10">
        <h1 className="text-2xl font-bold text-[#213555] mb-6">Subjek UTBK SNBT 2025</h1>

        {/* Notifikasi */}
        {notification && (
          <div className={`mb-4 p-3 rounded-md flex items-center justify-center ${
            notification.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}>
            {notification.type === 'success' && (
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
              </svg>
            )}
            {notification.message}
          </div>
        )}

        {/* Form Tambah Kategori */}
        <div className="flex justify-end mb-4">
          <button
            onClick={() => navigate("/guru/kategorisubjek/create")}
            className="bg-[#213555] text-white px-4 py-2 rounded-full flex items-center gap-2 shadow-md hover:opacity-90 transition"
          >
            <FaPlus /> Tambah Kategori Subjek
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}

        {/* Tabel */}
        <div className="bg-white rounded-md shadow-md overflow-hidden">
          {isLoading ? (
            <div className="p-4 text-center">Memuat data...</div>
          ) : subjects.length === 0 ? (
            <div className="p-4 text-center text-gray-500">
              Belum ada kategori subjek. Klik tombol "Tambah Kategori Subjek" untuk menambahkan.
            </div>
          ) : (
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#3E5879] text-white text-left">
                  <th className="px-4 py-3 w-16">No</th>
                  <th className="px-4 py-3">Subjek</th>
                  <th className="px-4 py-3 w-32">Aksi</th>
                </tr>
              </thead>
              <tbody className="text-[#213555]">
                {subjects.map((subject, index) => (
                  <tr key={subject.subject_category_id || index} className="border-t">
                    <td className="px-4 py-3">{index + 1}</td>
                    <td className="px-4 py-3">{subject.subject_category_name}</td>
                    <td className="px-4 py-3 flex gap-3">
                      <button 
                        onClick={() => handleEdit(subject)}
                        className="text-[#213555] hover:text-blue-500 transition bg-transparent"
                      >
                        <FaEdit className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={() => handleDeleteClick(subject)}
                        className="text-[#213555] hover:text-red-500 transition bg-transparent"
                      >
                        <FaTrash className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full">
            <h2 className="text-xl font-bold text-[#213555] mb-4">Konfirmasi Hapus</h2>
            <p className="text-gray-600 mb-6">
              Apakah Anda yakin ingin menghapus kategori subjek "{selectedSubject?.subject_category_name}"?
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition"
              >
                Batal
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GuruKategori;
