"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { PlusCircle, X, Upload, ChevronDown, ChevronUp, Trash2, Edit } from "lucide-react"
import { useParams, useNavigate, useLocation } from "react-router-dom"
import axiosInstance from "../../api/axiosInstance"
import { FiArrowLeft, FiArrowRight } from "react-icons/fi"

// Main component
function GuruTryoutSubjek() {
  const { tryout_id, subject_id } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(true)
  const [expandedQuestions, setExpandedQuestions] = useState({})
  const [formData, setFormData] = useState({
    question: '',
    score: '',
    answer_options: ['', '', '', '', ''],
    correct_answer: ''
  })
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [loading, setLoading] = useState(false)
  const [subjectData, setSubjectData] = useState(null)
  const [error, setError] = useState(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [questionToDelete, setQuestionToDelete] = useState(null)
  const [notification, setNotification] = useState({ show: false, message: '', type: 'success' })

    const fetchSubjectData = async () => {
      try {
      setLoading(true);
      setError(null);
      console.log(`[DEBUG] Fetching data for tryout_id: ${tryout_id}, subject_id: ${subject_id}`);
      
      // Tambahkan parameter untuk mencegah cache browser
      const timestamp = new Date().getTime();
      console.log(`[DEBUG] Using timestamp: ${timestamp} to prevent caching`);
      
      const response = await axiosInstance.get(`/API/teacher/tryout/${tryout_id}/${subject_id}?nocache=${timestamp}`, {
        headers: {
          // Tambahkan header untuk mencegah cache
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      });
      
      console.log('[DEBUG] Subject data received:', response.data);
      
      if (!response.data) {
        throw new Error('No data received from server');
      }
      
      // Bandingkan dengan data sebelumnya untuk debugging
      if (subjectData && subjectData.tryoutQuestionBySubject) {
        console.log('[DEBUG] Previous question count:', subjectData.tryoutQuestionBySubject.length);
        console.log('[DEBUG] New question count:', response.data.tryoutQuestionBySubject?.length || 0);
      }
      
      setSubjectData(response.data);
      } catch (err) {
      console.error('[ERROR] Error fetching subject data:', err);
      
      // Log more detailed error information
      if (err.response) {
        console.error('[ERROR] Error response:', err.response.status, err.response.data);
      } else if (err.request) {
        console.error('[ERROR] No response received:', err.request);
      }
      
      setError(err.response?.data?.message || 'Gagal mengambil data subjek. Silakan refresh halaman.');
      
      // Try re-fetching after a short delay (only once)
      setTimeout(() => {
        console.log('[DEBUG] Retrying fetch...');
        retryFetch();
      }, 2000);
    } finally {
      setLoading(false);
    }
  };
  
  const retryFetch = async () => {
    try {
      console.log('Retrying fetch subject data...');
      const response = await axiosInstance.get(`/API/teacher/tryout/${tryout_id}/${subject_id}`);
      
      if (response.data) {
        setSubjectData(response.data);
        setError(null);
        console.log('Retry successful, data received:', response.data);
      }
    } catch (err) {
      console.error('Retry failed:', err);
      setError('Gagal memuat data. Silakan coba refresh halaman atau kembali ke halaman sebelumnya.');
    }
  };

  useEffect(() => {
    if (tryout_id && subject_id) {
      // Log navigation state for debugging
      console.log('[DEBUG] Location state:', location.state);
      
      // Force immediate fetch
      fetchSubjectData();
    }
  }, [tryout_id, subject_id, location.pathname]);

  // Modifikasi effect untuk refresh data setelah pembuatan pertanyaan
  useEffect(() => {
    // Check if we've navigated back from creating a question
    if (location.state?.refreshData) {
      console.log('[DEBUG] Detected return from question creation, refreshing data...');
      console.log('[DEBUG] State timestamp:', location.state?.timestamp);
      
      // Tampilkan notifikasi jika ada pesan
      if (location.state?.message) {
        setNotification({
          show: true,
          message: location.state.message,
          type: 'success'
        });
        
        // Sembunyikan notifikasi setelah 5 detik
        setTimeout(() => {
          setNotification({ show: false, message: '', type: 'success' });
        }, 5000);
      }
      
      // Clear the state to prevent multiple refreshes
      navigate(location.pathname, { replace: true, state: {} });
      
      // Delay fetch for a moment to ensure server has processed the data
      setTimeout(() => {
        console.log('[DEBUG] Executing delayed fetch after navigation...');
        fetchSubjectData();
      }, 500);
    }
  }, [location.state]);

  // Tambahkan interval refresh lebih sering untuk debugging
  useEffect(() => {
    // Fungsi untuk memuat data
    const refreshData = () => {
      console.log("[DEBUG] Auto-refresh: Fetching new data...");
      fetchSubjectData();
    };

    // Set interval untuk auto-refresh setiap 5 detik untuk memastikan data terupdate
    const intervalId = setInterval(refreshData, 5000);

    // Cleanup interval saat komponen unmount
    return () => clearInterval(intervalId);
  }, [tryout_id, subject_id]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0] || null
    setFile(selectedFile)

    if (selectedFile) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result)
      }
      reader.readAsDataURL(selectedFile)
    } else {
      setPreview(null)
    }
  }

  const handleInputChange = (e, index) => {
    const { name, value } = e.target
    if (name === 'answer_options') {
      const newOptions = [...formData.answer_options]
      newOptions[index] = value
      setFormData(prev => ({
        ...prev,
        answer_options: newOptions
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      const formDataToSend = new FormData()
      formDataToSend.append('question', formData.question)
      formDataToSend.append('score', formData.score)
      formData.answer_options.forEach((option) => {
        formDataToSend.append('answer_options', JSON.stringify({ answer_option: option }))
      })
      formDataToSend.append('correct_answer', formData.correct_answer)
      if (file) {
        formDataToSend.append('question_image', file)
      }

      const response = await axiosInstance.post(
        `/API/teacher/tryout/${tryout_id}/${subject_id}/create_question`,
        formDataToSend,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )

      if (response.status === 201) {
        alert('Soal berhasil disimpan!')
        // Reset form
        setFormData({
          question: '',
          score: '',
          answer_options: ['', '', '', '', ''],
          correct_answer: ''
        })
        setFile(null)
        setPreview(null)
        
        // Navigate back to tryout detail
        navigate(`/guru/tryout/${tryout_id}`)
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      alert(error.response?.data?.message || 'Gagal menyimpan soal. Silakan coba lagi.')
    } finally {
      setLoading(false)
    }
  }

  const handleBack = () => {
    navigate(`/guru/tryout/${tryout_id}`)
  }

  const toggleQuestion = (index) => {
    setExpandedQuestions(prev => ({
      ...prev,
      [index]: !prev[index]
    }))
  }

  const handleEdit = (question) => {
    setFormData({
      question: question.question,
      score: question.score,
      answer_options: question.answer_options.map(opt => opt.answer_option),
      correct_answer: question.correct_answer
    })
    
    window.scrollTo({
      top: document.querySelector('form').offsetTop - 100,
      behavior: 'smooth'
    })
  }

  const handleDelete = async (questionId) => {
    try {
      await axiosInstance.delete(`/API/teacher/tryout/${tryout_id}/${subject_id}/${questionId}/delete`)
      
      const response = await axiosInstance.get(`/API/teacher/tryout/${tryout_id}/${subject_id}`)
      setSubjectData(response.data)
      
      setShowDeleteConfirm(false)
      setQuestionToDelete(null)
      
      alert('Soal berhasil dihapus!')
    } catch (error) {
      console.error('Error deleting question:', error)
      alert(error.response?.data?.message || 'Gagal menghapus soal. Silakan coba lagi.')
    }
  }

  const openDeleteConfirm = (question) => {
    setQuestionToDelete(question.question_id)
    setShowDeleteConfirm(true)
  }

  // Ubah fungsi forceRefresh untuk mengatasi masalah URL dan koneksi
  const forceRefresh = () => {
    console.log("[DEBUG] Manual force refresh triggered");
    setLoading(true);
    
    // Coba gunakan URL endpoint yang lebih sederhana
    const timestamp = new Date().getTime();
    // Gunakan URL absolut tanpa parameter tambahan yang mungkin menyebabkan masalah
    const url = `http://localhost:3000/API/teacher/tryout/${tryout_id}/${subject_id}`;
    console.log("[DEBUG] Forcing refresh with URL:", url);
    
    axiosInstance.get(url)
      .then(response => {
        console.log("[DEBUG] Force refresh response status:", response.status);
        console.log("[DEBUG] Response data:", response.data);
        
        // Log perbandingan jumlah soal lebih detail
        if (subjectData && response.data) {
          const oldCount = subjectData.tryoutQuestionBySubject?.length || 0;
          const newCount = response.data.tryoutQuestionBySubject?.length || 0;
          console.log(`[DEBUG] Comparison - Old count: ${oldCount}, New count: ${newCount}`);
          
          // Tambahkan alert untuk debugging
          if (oldCount === newCount) {
            alert(`Jumlah soal tidak berubah (${oldCount}). Backend mungkin belum menyimpan data baru.`);
          } else {
            alert(`Jumlah soal berubah dari ${oldCount} menjadi ${newCount}.`);
          }
        }
        
        setSubjectData(response.data);
        setLoading(false);
        
        // Tampilkan notifikasi setelah refresh berhasil
        setNotification({
          show: true,
          message: 'Data berhasil diperbarui',
          type: 'success'
        });
        
        setTimeout(() => {
          setNotification({ show: false, message: '', type: 'success' });
        }, 3000);
      })
      .catch(err => {
        console.error('[ERROR] Force refresh failed:', err);
        setLoading(false);
        
        // Tampilkan pesan error yang lebih informatif
        setNotification({
          show: true,
          message: `Gagal memperbarui data: ${err.message}. Coba Hard Refresh atau kembali ke halaman tryout.`,
          type: 'error'
        });
      });
  };

  // Function untuk kembali ke halaman tryout dan kemudian masuk kembali
  const refreshViaTryoutPage = () => {
    // Navigasi kembali ke halaman tryout
    console.log("[DEBUG] Refreshing via tryout page navigation");
    
    // Tampilkan pesan
    setNotification({
      show: true,
      message: 'Mengalihkan ke halaman tryout untuk memperbarui data...',
      type: 'success'
    });
    
    // Tunda navigasi agar pesan bisa dilihat
    setTimeout(() => {
      navigate(`/guru/tryout/${tryout_id}`);
    }, 1500);
  };

  // Tambahkan fungsi untuk hard refresh (reload halaman)
  const hardRefresh = () => {
    console.log("[DEBUG] Hard refresh (page reload) triggered");
    // Simpan flag di session storage untuk menunjukkan bahwa halaman di-reload untuk refresh
    sessionStorage.setItem('hardRefreshed', 'true');
    // Reload halaman
    window.location.reload();
  };

  // Tambahkan useEffect untuk mendeteksi hard refresh
  useEffect(() => {
    // Periksa apakah ini adalah hasil dari hard refresh
    const wasHardRefreshed = sessionStorage.getItem('hardRefreshed');
    if (wasHardRefreshed === 'true') {
      // Hapus flag
      sessionStorage.removeItem('hardRefreshed');
      // Tampilkan notifikasi
      setNotification({
        show: true,
        message: 'Halaman telah dimuat ulang sepenuhnya untuk memperbarui data',
        type: 'success'
      });
      // Sembunyikan notifikasi setelah beberapa detik
      setTimeout(() => {
        setNotification({ show: false, message: '', type: 'success' });
      }, 3000);
    }
  }, []);

  if (!tryout_id || !subject_id) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-red-600">ID Tryout atau ID Subjek tidak valid.</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-red-600">{error}</p>
          <div className="mt-4">
            <button 
              onClick={() => fetchSubjectData()} 
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Coba Lagi
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <main className="container mx-auto py-6 px-4">
        <div className="bg-blue-600 text-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-2xl font-bold">
            {subjectData?.subject?.[0]?.subject_name || "Loading..."}
          </h2>
        </div>

        {/* Notifikasi */}
        <AnimatePresence>
          {notification.show && (
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className={`mb-6 p-4 rounded-lg shadow-md flex items-center justify-between ${
                notification.type === 'success' 
                  ? 'bg-green-100 text-green-800 border border-green-300' 
                  : 'bg-red-100 text-red-800 border border-red-300'
              }`}
            >
              <div className="flex items-center">
                {notification.type === 'success' ? (
                  <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                ) : (
                  <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path>
                  </svg>
                )}
                <p>{notification.message}</p>
              </div>
              <button
                onClick={() => setNotification({ ...notification, show: false })}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Loading Indicator */}
        {loading && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6 flex justify-center items-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mr-3"></div>
            <p className="text-gray-700">Memuat data...</p>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          {/* Delete Confirmation Modal */}
          {showDeleteConfirm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full mx-4">
                <h3 className="text-lg font-semibold mb-4">Konfirmasi Hapus</h3>
                <p className="text-gray-600 mb-6">Apakah Anda yakin ingin menghapus soal ini?</p>
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setShowDeleteConfirm(false)}
                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
                  >
                    Batal
                  </button>
                  <button
                    onClick={() => handleDelete(questionToDelete)}
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                  >
                    Hapus
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Existing Questions Section */}
          {subjectData && subjectData.tryoutQuestionBySubject && (
            <div className="mb-6">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center space-x-4">
                  <h3 className="text-xl font-semibold text-gray-800">Soal yang Sudah Ada</h3>
                  <span className="bg-blue-600 text-white text-sm font-medium px-3 py-1 rounded-full">
                    {subjectData.tryoutQuestionBySubject.length} Soal
                  </span>
                  
                  {/* Add manual refresh button dengan fungsi yang lebih kuat */}
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={forceRefresh}
                      className="flex items-center space-x-1 bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-1.5 rounded-md transition-colors"
                      title="Force refresh data tanpa reload halaman"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                      </svg>
                      <span>Force Refresh</span>
                    </button>
                    <button
                      onClick={hardRefresh}
                      className="flex items-center space-x-1 bg-green-100 hover:bg-green-200 text-green-700 px-3 py-1.5 rounded-md transition-colors"
                      title="Muat ulang halaman sepenuhnya"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                      </svg>
                      <span>Hard Refresh</span>
                    </button>
                    <button
                      onClick={refreshViaTryoutPage}
                      className="flex items-center space-x-1 bg-amber-100 hover:bg-amber-200 text-amber-700 px-3 py-1.5 rounded-md transition-colors"
                      title="Kembali ke halaman tryout dan masuk kembali untuk refresh"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
                      </svg>
                      <span>Via Tryout Page</span>
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => {
                    navigate(`/guru/tryout/${tryout_id}/${subject_id}/createSoal`);
                  }}
                  className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors shadow-sm"
                >
                  <PlusCircle className="w-5 h-5" />
                  <span>Buat Soal Baru</span>
                </button>
              </div>

              {subjectData.tryoutQuestionBySubject.length === 0 ? (
                <div className="text-center py-10 bg-gray-50 rounded-lg">
                  <p className="text-gray-500 mb-4">Belum ada soal yang dibuat</p>
                  <button
                    onClick={() => navigate(`/guru/tryout/${tryout_id}/${subject_id}/createSoal`)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Buat Soal Pertama
                  </button>
                </div>
              ) : (
              <div className="space-y-4">
                {subjectData.tryoutQuestionBySubject.map((question, index) => {
                  console.log('DEBUG QUESTION:', question);
                  return (
                    <motion.div
                      key={index}
                      className="border border-blue-600/20 rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow"
                      initial={false}
                    >
                      <div className={`p-4 hover:bg-blue-50 transition-colors ${
                        expandedQuestions[index] ? 'bg-blue-50' : ''
                      }`}>
                        <div className="flex justify-between items-center">
                          <div 
                            className="flex items-center space-x-3 flex-grow cursor-pointer"
                            onClick={() => toggleQuestion(index)}
                          >
                            <span className="font-medium text-blue-600">Soal {index + 1}</span>
                            <span className="text-gray-600 text-sm">
                              {question.question.length > 100
                                ? question.question.substring(0, 100) + "..."
                                : question.question}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2 ml-4">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                navigate(`/guru/tryout/${tryout_id}/${subject_id}/editSoal/${question.question_id}`);
                              }}
                              className="p-2 text-blue-600 hover:bg-blue-600/10 rounded-full transition-colors"
                              title="Edit Soal"
                            >
                              <Edit className="w-5 h-5" />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                openDeleteConfirm(question)
                              }}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                              title="Hapus Soal"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => toggleQuestion(index)}
                              className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors"
                            >
                              {expandedQuestions[index] ? (
                                <ChevronUp className="w-5 h-5" />
                              ) : (
                                <ChevronDown className="w-5 h-5" />
                              )}
                            </button>
                          </div>
                        </div>
                      </div>

                      <AnimatePresence>
                        {expandedQuestions[index] && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="border-t border-blue-600/20"
                          >
                            <div className="p-4 bg-white">
                              <div className="mb-4">
                                <p className="text-gray-700 whitespace-pre-line">{question.question}</p>
                                {question.question_image && (
                                  <img src={question.question_image} alt="Question" className="max-w-md mt-2 rounded-lg" />
                                )}
                              </div>

                              <div className="space-y-1 mb-3">
                                <p className="font-medium text-gray-700 mb-2">Pilihan Jawaban:</p>
                                {question.answer_options.map((option, optIndex) => (
                                  <p key={optIndex} className="text-gray-600 pl-4 py-1 hover:bg-blue-50 rounded-md transition-colors">
                                    {String.fromCharCode(65 + optIndex)}. {option.answer_option}
                                  </p>
                                ))}
                              </div>

                              <div className="bg-blue-600/10 p-4 rounded-lg mb-2">
                                <p className="font-medium text-gray-700">Jawaban Benar:</p>
                                <p className="text-blue-600 mt-1 font-medium">{question.correct_answer}</p>
                              </div>

                              <div className="flex items-center space-x-2">
                                <span className="text-sm font-medium text-gray-600">Nilai:</span>
                                <span className="text-sm bg-blue-600 text-white px-3 py-1 rounded-full">
                                  {question.score}
                                </span>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  )
                })}
              </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default GuruTryoutSubjek

