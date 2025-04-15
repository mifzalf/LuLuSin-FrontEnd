import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiEdit, FiTrash2, FiPlus, FiAlertTriangle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";

const GuruSubjek = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [tryouts, setTryouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState(null);
  
  // State for delete confirmation modal
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [subjectToDeleteInfo, setSubjectToDeleteInfo] = useState(null); // { kategoriIdx, subjekIdx, name, id }

  useEffect(() => {
    // Check for location state notifications
    if (location.state?.notification) {
      setNotification(location.state.notification);
      // Clear the location state
      navigate(location.pathname, { replace: true, state: {} });
      // Refresh data when notification comes from category changes
      fetchSubjects();
    }
  }, [location.state]);

  // Separate useEffect for initial load
  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Fetching subjects...');
      
      // First, fetch categories to ensure we have the latest data
      const categoryResponse = await axiosInstance.get("/API/teacher/subjectcategory");
      const categories = categoryResponse.data.dataSubjectCategory || [];
      
      // Then fetch subjects
      const response = await axiosInstance.get("/API/teacher/subject");
      console.log('Raw API Response:', response.data);
      
      let subjects = [];
      if (response.data && response.data.datasubject) {
        subjects = response.data.datasubject;
      }
      console.log('Extracted subjects:', subjects);

      const groupedSubjects = {};
      
      // First, create entries for all categories
      categories.forEach(category => {
        groupedSubjects[category.subject_category_id] = {
          kategori: category.subject_category_name,
          subjek: []
        };
      });

      // Then populate with subjects
      subjects.forEach(subject => {
        const categoryId = subject.id_subject_category;
        if (!groupedSubjects[categoryId]) {
          groupedSubjects[categoryId] = {
            kategori: subject.subject_category_name || `Kategori ${categoryId}`,
            subjek: []
          };
        }
        groupedSubjects[categoryId].subjek.push({
          subject_id: subject.subject_id, 
          subject_name: subject.subject_name,
          time_limit: subject.time_limit,
          minimal_questions: subject.minimal_questions
        });
      });
      
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

  useEffect(() => {
    console.log('Current tryouts state:', tryouts);
  }, [tryouts]);

  // Function to initiate delete (now called by modal confirm)
  const handleDelete = async () => {
    // Ensure we have the info before proceeding
    if (!subjectToDeleteInfo) {
      console.error("Attempted to delete without subject info.");
      closeDeleteConfirm();
      return;
    }

    const { kategoriIdx, subjekIdx, id: subjectId, name: subjectName } = subjectToDeleteInfo;

    // Double-check if the data still exists (optional but good practice)
    if (!tryouts[kategoriIdx] || !tryouts[kategoriIdx].subjek[subjekIdx] || tryouts[kategoriIdx].subjek[subjekIdx].subject_id !== subjectId) {
       console.error("Data mismatch or subject already removed.");
       setNotification({ type: 'error', message: 'Subjek mungkin sudah dihapus atau data tidak cocok.' });
       closeDeleteConfirm();
       fetchSubjects(); // Refresh to be sure
       return;
    }

    try {
      console.log(`Deleting subject with ID: ${subjectId}`);
      
      const response = await axiosInstance.delete(`/API/teacher/subject/delete/${subjectId}`);
      console.log('Delete response:', response.data);
      
      if (response.data.success || response.data.message === 'OK') {
        await fetchSubjects(); // Refresh list after delete
        setNotification({
          type: 'success',
          message: `Subjek "${subjectName}" berhasil dihapus!`
        });
      } else {
        throw new Error(response.data.message || 'Gagal menghapus subjek');
      }
    } catch (err) {
      console.error('Delete Error:', err);
      setNotification({
        type: 'error',
        message: err.response?.data?.message || err.message || `Gagal menghapus ${subjectName}`
      });
    } finally {
        closeDeleteConfirm(); // Close modal regardless of success/failure
    }
  };
  
  // Function to open the confirmation modal
  const openDeleteConfirm = (kategoriIdx, subjekIdx, id, name) => {
      setSubjectToDeleteInfo({ kategoriIdx, subjekIdx, id, name });
      setShowDeleteConfirm(true);
  };

  // Function to close the confirmation modal
  const closeDeleteConfirm = () => {
      setShowDeleteConfirm(false);
      setSubjectToDeleteInfo(null);
  };

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
    <div className="min-h-screen bg-[#f5f0e6] flex items-center justify-center p-6 relative"> 
      <div className="w-full max-w-4xl">
        {notification && (
          <div className={`mb-4 p-4 rounded-lg ${ notification.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700' }`}>
            {notification.message}
          </div>
        )}
        
        <div className="w-full flex justify-between items-center py-6">
          <h1 className="text-2xl font-bold text-[#213555]">Data Subjek</h1>
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
                <div key={kategori.kategori + '-' + kategoriIdx} className="bg-white shadow-md rounded-lg overflow-hidden"> {/* Improved key */}
                  <div className="bg-[#213555] text-white p-4 font-semibold flex items-center">
                    <span className="w-2/5 pl-4 text-left">{kategori.kategori}</span>
                    <span className="w-1/5 text-center">Waktu Pengerjaan</span>
                    <span className="w-1/5 text-center">Minimal Soal</span>
                    <span className="w-1/5 text-center">Aksi</span>
                  </div>
                  {kategori.subjek && kategori.subjek.length > 0 ? (
                    kategori.subjek.map((subjek, subjekIdx) => (
                      <div
                        key={subjek.subject_id || subjekIdx}
                        className="flex items-center p-4 border-b last:border-none hover:bg-gray-50 transition"
                      >
                        <span className="w-2/5 pl-4 text-left text-[#2f4a64] font-medium">
                          {subjek.subject_name}
                        </span>
                        <span className="w-1/5 text-center text-[#2f4a64]">
                          {subjek.time_limit ? `${subjek.time_limit} Menit` : '-'}
                        </span>
                        <span className="w-1/5 text-center text-[#2f4a64]">
                          {subjek.minimal_questions || '-'}
                        </span>
                        <div className="w-1/5 flex justify-center items-center gap-3">
                          <button
                            onClick={() =>
                              navigate(`/guru/subjek/edit?kategori=${encodeURIComponent(kategori.kategori)}&subjek=${encodeURIComponent(subjek.subject_name)}&id=${subjek.subject_id}`)
                            }
                            className="text-[#3E5879] hover:text-[#213555] transition p-1.5 hover:bg-gray-100 rounded-md"
                            aria-label={`Edit ${subjek.subject_name}`}
                          >
                            <FiEdit size={18} />
                          </button>
                          {/* Delete Button - Opens Modal */}
                          <button
                            onClick={() => openDeleteConfirm(kategoriIdx, subjekIdx, subjek.subject_id, subjek.subject_name)}
                            className="text-[#3E5879] hover:text-red-600 transition p-1.5 hover:bg-gray-100 rounded-md"
                             aria-label={`Hapus ${subjek.subject_name}`}
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

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && subjectToDeleteInfo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-sm w-full mx-auto">
            <div className="flex items-start mb-4">
              <div className="flex-shrink-0 bg-red-100 rounded-full p-2 mr-3">
                 <FiAlertTriangle className="text-red-600 text-xl" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mt-1">Konfirmasi Hapus</h3>
            </div>
            <p className="text-sm text-gray-600 mb-6">
              Apakah Anda yakin ingin menghapus subjek{" "}
              <strong className="text-gray-700">"{subjectToDeleteInfo.name}"</strong>? Tindakan ini tidak dapat dibatalkan.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={closeDeleteConfirm}
                className="px-4 py-2 text-sm font-medium bg-white text-gray-700 border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition"
              >
                Batal
              </button>
              <button
                onClick={handleDelete} // Calls handleDelete which uses subjectToDeleteInfo state
                className="px-4 py-2 text-sm font-medium bg-red-600 text-white border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition"
              >
                Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GuruSubjek;
