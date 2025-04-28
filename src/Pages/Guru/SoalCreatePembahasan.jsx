"use client";
import { motion } from "framer-motion";
import { FiArrowLeft, FiSave } from "react-icons/fi";
import { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";

const SoalCreatePembahasan = () => {
  const navigate = useNavigate();
  const { tryout_id, subject_id } = useParams();
  const location = useLocation();
  const [formData, setFormData] = useState({
    correct_answer_index: null,
    question_explanation: ""
  });
  const [questionData, setQuestionData] = useState({
    question: "",
    answer_options: [],
    score: ""
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleBack = () => {
    navigate(`/guru/tryout/${tryout_id}/${subject_id}/createsoal`);
  };

  // Fungsi untuk memperbaharui token autentikasi
  const refreshToken = useCallback(async () => {
    try {
      console.log('Mencoba memperbaharui token...');
      
      // Gunakan endpoint refresh token yang tersedia di backend
      const response = await axiosInstance.post('/API/auth/refresh-token', {}, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (response.status === 200 && response.data.token) {
        console.log('Token berhasil diperbaharui');
        
        // Simpan token baru ke localStorage
        localStorage.setItem('authToken', response.data.token);
        
        // Tetapkan opsi cookie dengan expiry dan httpOnly
        document.cookie = `authToken=${response.data.token}; path=/; max-age=${60 * 60 * 24}; SameSite=Strict`;
        
        return true;
      }
      return false;
    } catch (error) {
      console.error('Gagal memperbaharui token:', error);
      return false;
    }
  }, []);

  const handleNext = async (retryCount = 0) => {
    try {
      setLoading(true);
      setError("");
      
      // Maksimum percobaan ulang
      const MAX_RETRIES = 2;
      
      // Validasi input
      if (formData.correct_answer_index === null || formData.correct_answer_index === undefined) {
        setError('correct_answer_index is required.');
        alert('Jawaban benar harus dipilih.');
        setLoading(false);
        return;
      }

      // Debug: Lihat nilai asli correct_answer_index
      console.log('Raw correct_answer_index:', formData.correct_answer_index);
      console.log('Raw correct_answer_index type:', typeof formData.correct_answer_index);
      
      // Parse ke integer seperti yang diharapkan backend
      const correct_answer_index = parseInt(formData.correct_answer_index, 10);
      
      // Debug: Lihat nilai setelah parsing
      console.log('After parseInt correct_answer_index:', correct_answer_index);
      console.log('After parseInt correct_answer_index type:', typeof correct_answer_index);
      
      if (isNaN(correct_answer_index) || correct_answer_index < 0) {
        setError('Indeks jawaban benar tidak valid.');
        alert('Indeks jawaban benar tidak valid.');
        setLoading(false);
        return;
      }

      // Validasi pembahasan
      if (!formData.question_explanation || typeof formData.question_explanation !== 'string' || !formData.question_explanation.trim()) {
        setError('Pembahasan soal tidak boleh kosong.');
        alert('Pembahasan soal tidak boleh kosong.');
        setLoading(false);
        return;
      }

      // Konfirmasi dengan pengguna
      const confirmSubmit = window.confirm("Apakah Anda yakin ingin menyimpan soal dan pembahasan ini?");
      if (!confirmSubmit) {
        setLoading(false);
        return;
      }
      
      // Cek token dan coba refresh jika diperlukan
      const authToken = localStorage.getItem('authToken');
      if (!authToken) {
        const refreshSuccessful = await refreshToken();
        if (!refreshSuccessful) {
          setError('Sesi Anda telah berakhir. Silakan login kembali.');
          alert('Sesi Anda telah berakhir. Anda akan diarahkan ke halaman login.');
          setTimeout(() => {
            window.location.href = '/login';
          }, 1500);
          setLoading(false);
          return;
        }
      }

      console.log('Menggunakan metode dua langkah...');
      console.log(`Percobaan: ${retryCount + 1} dari ${MAX_RETRIES + 1}`);
      
      // LANGKAH 1: Kirim data soal ke session server
      console.log('STEP 1: Mengirim data soal ke session server...');
      
      // Siapkan data soal dalam format yang diharapkan backend
      const formDataStep1 = new FormData();
      formDataStep1.append('question', questionData.question || '');
      formDataStep1.append('score', questionData.score || '');
      
      // Pastikan answer_options diproses dengan benar
      if (Array.isArray(questionData.answer_options)) {
        questionData.answer_options.forEach((option) => {
          if (option !== undefined && option !== null) {
            formDataStep1.append('answer_options', option);
          }
        });
      } else if (questionData.answer_options) {
        formDataStep1.append('answer_options', questionData.answer_options);
      }
      
      // Request pertama: Menyimpan soal ke session
      const responseStep1 = await axiosInstance.post(
        `/API/teacher/tryout/${tryout_id}/${subject_id}/create_question`,
        formDataStep1,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        }
      );
      
      console.log('Step 1 Response:', responseStep1.data);
      
      if (responseStep1.status === 201) {
        // LANGKAH 2: Kirim data pembahasan
        console.log('STEP 2: Mengirim data pembahasan...');
        
        // Siapkan beberapa format untuk pengujian
        const correctAnswerAsInt = correct_answer_index;
        const correctAnswerAsString = String(correct_answer_index);
        const correctAnswerAsStringWithQuotes = `"${correctAnswerAsString}"`;
        
        console.log('correctAnswerAsInt:', correctAnswerAsInt, '(type:', typeof correctAnswerAsInt, ')');
        console.log('correctAnswerAsString:', correctAnswerAsString, '(type:', typeof correctAnswerAsString, ')');
        console.log('correctAnswerAsStringWithQuotes:', correctAnswerAsStringWithQuotes, '(type:', typeof correctAnswerAsStringWithQuotes, ')');
        
        // Coba dengan URLSearchParams (x-www-form-urlencoded) terlebih dahulu
        try {
          const urlSearchParams = new URLSearchParams();
          urlSearchParams.append('correct_answer_index', correctAnswerAsString);
          urlSearchParams.append('question_explanation', formData.question_explanation.trim());
          
          console.log('Sending with URLSearchParams approach');
          console.log('URLSearchParams raw:', urlSearchParams);
          console.log('URLSearchParams as string:', urlSearchParams.toString());
          
          // Debug request
          console.log('Request URL:', `/API/teacher/tryout/${tryout_id}/${subject_id}/create_question/create_explanation`);
          console.log('Request headers:', {
            'Content-Type': 'application/x-www-form-urlencoded',
          });
          
          const responseUrlEncoded = await axiosInstance.post(
            `/API/teacher/tryout/${tryout_id}/${subject_id}/create_question/create_explanation`,
            urlSearchParams,
            {
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
              }
            }
          );
          
          console.log('URLSearchParams Response:', responseUrlEncoded.data);
          
          if (responseUrlEncoded.status === 201) {
            onSuccessfulSubmission();
            return;
          }
        } catch (urlEncodedError) {
          console.error('URLSearchParams approach failed:', urlEncodedError);
          console.error('URLSearchParams error response:', urlEncodedError.response?.data);
          
          // Coba dengan FormData
          try {
            const formDataObj = new FormData();
            formDataObj.append('correct_answer_index', correctAnswerAsString);
            formDataObj.append('question_explanation', formData.question_explanation.trim());
            
            console.log('Sending with FormData approach');
            
            const responseFormData = await axiosInstance.post(
              `/API/teacher/tryout/${tryout_id}/${subject_id}/create_question/create_explanation`,
              formDataObj,
              {
                headers: {
                  'Content-Type': 'multipart/form-data',
                }
              }
            );
            
            console.log('FormData Response:', responseFormData.data);
            
            if (responseFormData.status === 201) {
              onSuccessfulSubmission();
              return;
            }
          } catch (formDataError) {
            console.error('FormData approach failed:', formDataError);
            console.error('FormData error response:', formDataError.response?.data);
            
            // Terakhir, coba dengan JSON
            try {
              // Kirim sebagai JSON dengan berbagai format
              const attemptJsonFormats = async () => {
                // Format 1: Integer dalam JSON
                try {
                  const jsonData1 = {
                    correct_answer_index: correctAnswerAsInt,
                    question_explanation: formData.question_explanation.trim()
                  };
                  
                  console.log('Sending JSON with Integer:', jsonData1);
                  
                  const responseJson1 = await axiosInstance.post(
                    `/API/teacher/tryout/${tryout_id}/${subject_id}/create_question/create_explanation`,
                    jsonData1,
                    {
                      headers: {
                        'Content-Type': 'application/json',
                      }
                    }
                  );
                  
                  console.log('JSON (Integer) Response:', responseJson1.data);
                  
                  if (responseJson1.status === 201) {
                    onSuccessfulSubmission();
                    return true;
                  }
                } catch (error) {
                  console.error('JSON Integer format failed:', error);
                }
                
                // Format 2: String dalam JSON
                try {
                  const jsonData2 = {
                    correct_answer_index: correctAnswerAsString,
                    question_explanation: formData.question_explanation.trim()
                  };
                  
                  console.log('Sending JSON with String:', jsonData2);
                  
                  const responseJson2 = await axiosInstance.post(
                    `/API/teacher/tryout/${tryout_id}/${subject_id}/create_question/create_explanation`,
                    jsonData2,
                    {
                      headers: {
                        'Content-Type': 'application/json',
                      }
                    }
                  );
                  
                  console.log('JSON (String) Response:', responseJson2.data);
                  
                  if (responseJson2.status === 201) {
                    onSuccessfulSubmission();
                    return true;
                  }
                } catch (error) {
                  console.error('JSON String format failed:', error);
                }
                
                return false;
              };
              
              const jsonSuccess = await attemptJsonFormats();
              if (!jsonSuccess) {
                throw new Error('All JSON formats failed');
              }
            } catch (jsonError) {
              console.error('All JSON approaches failed:', jsonError);
              throw new Error('All approaches failed to send explanation data');
            }
          }
        }
      }
    } catch (error) {
      console.error('Error submitting data:', error);
      
      // Log error detail
      if (error.response) {
        console.error('Response error:', error.response.status, error.response.data);
        
        // Handle session expired errors
        if (error.response.status === 401 || 
            error.response.data?.message?.toLowerCase().includes('session expired') ||
            error.response.data?.message?.toLowerCase().includes('unauthorized')) {
          
          // Coba refresh token dulu
          try {
            const refreshSuccessful = await refreshToken();
            if (refreshSuccessful) {
              // Coba kirim request lagi
              alert('Sesi diperbaharui. Mencoba menyimpan data kembali...');
              setLoading(false);
              
              // Coba lagi dengan token baru - increment retry counter
              if (retryCount < MAX_RETRIES) {
                setTimeout(() => {
                  handleNext(retryCount + 1);
                }, 1000);
                return;
              }
            }
          } catch (refreshError) {
            console.error('Failed to refresh token:', refreshError);
          }
          
          setError('Sesi Anda telah berakhir. Silakan login kembali.');
          alert('Sesi Anda telah berakhir. Anda akan diarahkan ke halaman login.');
          
          // Simpan data sementara sebelum redirect
          try {
            // Simpan data saat ini ke localStorage dengan key khusus
            const tempSaveData = {
              question: questionData.question,
              answer_options: questionData.answer_options,
              score: questionData.score,
              correct_answer_index: formData.correct_answer_index,
              question_explanation: formData.question_explanation
            };
            localStorage.setItem(`temp_save_data_${tryout_id}_${subject_id}`, JSON.stringify(tempSaveData));
            
            // Tambahkan juga ke sessionStorage untuk redundansi
            sessionStorage.setItem(`temp_save_data_${tryout_id}_${subject_id}`, JSON.stringify(tempSaveData));
          } catch (e) {
            console.error('Failed to save temp data:', e);
          }
          
          // Redirect ke halaman login
          setTimeout(() => {
            window.location.href = '/login';
          }, 1500);
          return;
        }
        
        setError(error.response.data?.message || 'Terjadi kesalahan. Silakan coba lagi.');
      } else if (error.request) {
        console.error('Request error:', error.request);
        setError('Tidak dapat terhubung ke server. Periksa koneksi Anda.');
        
        // Coba ulang jika koneksi bermasalah
        if (retryCount < MAX_RETRIES) {
          console.log(`Koneksi gagal, mencoba ulang dalam 2 detik... (${retryCount + 1}/${MAX_RETRIES})`);
          setTimeout(() => {
            handleNext(retryCount + 1);
          }, 2000);
          return;
        }
      } else {
        console.error('Error:', error.message);
        setError(error.message || 'Terjadi kesalahan yang tidak diketahui.');
        
        // Coba ulang untuk error umum
        if (retryCount < MAX_RETRIES) {
          console.log(`Terjadi kesalahan, mencoba ulang... (${retryCount + 1}/${MAX_RETRIES})`);
          setTimeout(() => {
            handleNext(retryCount + 1);
          }, 1500);
          return;
        }
      }
      
      alert(`Gagal menyimpan data: ${error.response?.data?.message || error.message}. Silakan coba lagi.`);
    } finally {
      setLoading(false);
    }
  };

  // Helper function untuk handle successful submission
  const onSuccessfulSubmission = () => {
    // Bersihkan localStorage
    localStorage.removeItem(`tryout_form_${tryout_id}_${subject_id}`);
    localStorage.removeItem(`temp_save_data_${tryout_id}_${subject_id}`);
    
    alert('Soal dan pembahasan berhasil disimpan!');
    
    // Navigasi kembali ke halaman soal
    navigate(`/guru/tryout/${tryout_id}/${subject_id}`, { 
      state: { 
        refreshData: true, 
        timestamp: new Date().getTime(),
        message: 'Data soal baru telah ditambahkan'
      } 
    });
  };

  // Load the question data when component mounts
  useEffect(() => {
    const loadQuestionData = async () => {
      try {
        // Cek apakah ada data yang tersimpan sebelumnya karena session expired
        const tempSavedData = localStorage.getItem(`temp_save_data_${tryout_id}_${subject_id}`);
        if (tempSavedData) {
          const tempData = JSON.parse(tempSavedData);
          console.log('Found temporary saved data from previous session:', tempData);
          
          // Muat data soal
          setQuestionData({
            question: tempData.question || "",
            answer_options: Array.isArray(tempData.answer_options) 
              ? tempData.answer_options.filter(option => option !== null && option !== undefined)
              : [],
            score: tempData.score || ""
          });
          
          // Muat data pembahasan
          setFormData({
            correct_answer_index: tempData.correct_answer_index !== undefined ? tempData.correct_answer_index : null,
            question_explanation: tempData.question_explanation || ""
          });
          
          // Hapus data sementara setelah digunakan
          localStorage.removeItem(`temp_save_data_${tryout_id}_${subject_id}`);
          
          console.log('Temporary question data loaded successfully');
          return;
        }
        
        // Load data dari localStorage reguler
        const savedData = localStorage.getItem(`tryout_form_${tryout_id}_${subject_id}`);
        console.log('Data from localStorage:', savedData);
        
        if (savedData) {
          const parsedData = JSON.parse(savedData);
          console.log('Parsed data:', parsedData);
          
          // Pastikan answer_options adalah array valid
          const answer_options = Array.isArray(parsedData.answer_options) 
            ? parsedData.answer_options.filter(option => option !== null && option !== undefined)
            : [];
            
          setQuestionData({
            question: parsedData.question || "",
            answer_options: answer_options,
            score: parsedData.score || ""
          });
          
          console.log('Question data loaded successfully');
        } else {
          console.error('No saved data found in localStorage');
          alert("Data soal sementara tidak ditemukan, mohon mulai dari awal.");
          navigate(`/guru/tryout/${tryout_id}/${subject_id}/createsoal`);
        }
      } catch (error) {
        console.error('Error loading question data:', error);
        alert('Terjadi kesalahan saat memuat data soal.');
        navigate(`/guru/tryout/${tryout_id}/${subject_id}/createsoal`);
      }
    };

    loadQuestionData();
  }, [tryout_id, subject_id, navigate]);

  // Method khusus untuk ujicoba pengiriman pembahasan dengan berbagai format
  const sendExplanationWithFormat = async () => {
    try {
      setLoading(true);
      
      // Ambil nilai indeks dari dropdown
      const dropdownIndex = document.querySelector('select').value;
      console.log('Raw dropdown value:', dropdownIndex);
      
      // PENDEKATAN BARU: Kirim dalam 3 format berbeda
      
      // 1. Format integer tanpa quotes
      const numericIndex = parseInt(dropdownIndex, 10);
      
      // 2. Gunakan FormData dengan parameter yang diubah namanya
      const formDataNew = new FormData();
      formDataNew.append('answer_index', numericIndex); // Coba ubah nama parameter
      formDataNew.append('explanation', formData.question_explanation); // Coba ubah nama parameter
      
      // Kirim dengan FormData dan parameter baru
      try {
        const response = await axiosInstance.post(
          `/API/teacher/tryout/${tryout_id}/${subject_id}/create_question/create_explanation`,
          formDataNew,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            }
          }
        );
        
        console.log('Alternative format success:', response.data);
        onSuccessfulSubmission();
        return true;
      } catch (error) {
        console.error('Alternative format failed:', error);
        
        // 3. Coba dengan parameter yang berbeda-beda
        try {
          // Coba dengan struktur data yang sepenuhnya berbeda
          const alternativeFormat = {
            answerIndex: numericIndex,
            explanation: formData.question_explanation,
            tryoutId: tryout_id,
            subjectId: subject_id
          };
          
          const response = await axiosInstance.post(
            `/API/teacher/tryout/${tryout_id}/${subject_id}/create_question/create_explanation`,
            alternativeFormat,
            {
              headers: {
                'Content-Type': 'application/json',
              }
            }
          );
          
          console.log('Completely different format success:', response.data);
          onSuccessfulSubmission();
          return true;
        } catch (finalError) {
          console.error('All formats failed. Final attempt:', finalError);
          
          // CARA TERAKHIR: Coba reset session dan mulai lagi
          try {
            alert("Semua format gagal. Mencoba memulai ulang session...");
            
            // Reset session dengan membuat permintaan ke endpoint utama
            await axiosInstance.get(`/API/teacher/tryout/${tryout_id}/${subject_id}`);
            
            // Mulai lagi dari awal - buat pertanyaan baru
            const stepOneData = new FormData();
            stepOneData.append('question', questionData.question || '');
            stepOneData.append('score', questionData.score || '');
            
            if (Array.isArray(questionData.answer_options)) {
              questionData.answer_options.forEach((option) => {
                if (option !== undefined && option !== null) {
                  stepOneData.append('answer_options', option);
                }
              });
            }
            
            // Coba buat pertanyaan baru
            const newQuestionResponse = await axiosInstance.post(
              `/API/teacher/tryout/${tryout_id}/${subject_id}/create_question`,
              stepOneData,
              {
                headers: {
                  'Content-Type': 'multipart/form-data',
                }
              }
            );
            
            if (newQuestionResponse.status === 201) {
              // Coba tambahkan pembahasan langsung dengan parameter minimal
              const minimalParams = new FormData();
              minimalParams.append('correct_answer_index', numericIndex);
              
              const explanationResponse = await axiosInstance.post(
                `/API/teacher/tryout/${tryout_id}/${subject_id}/create_question/create_explanation`,
                minimalParams,
                {
                  headers: {
                    'Content-Type': 'multipart/form-data',
                  }
                }
              );
              
              if (explanationResponse.status === 201) {
                onSuccessfulSubmission();
                return true;
              }
            }
            
            throw new Error("Reset session failed");
          } catch (resetError) {
            console.error('Session reset failed:', resetError);
            alert("Semua upaya gagal. Silakan refresh halaman dan coba lagi.");
            return false;
          }
        }
      }
    } catch (error) {
      console.error('Format testing failed:', error);
      setLoading(false);
      return false;
    } finally {
      setLoading(false);
    }
  };
  
  // Metode terakhir: reset hard dan coba metode baru yang benar-benar berbeda
  const hardResetAndTryAgain = async () => {
    try {
      setLoading(true);
      
      // Konfirmasi dengan user
      if (!confirm("Ini akan menghapus soal saat ini dan mencoba prosedur berbeda. Lanjutkan?")) {
        setLoading(false);
        return;
      }
      
      // 1. Reset session dengan membuat permintaan ke endpoint utama
      await axiosInstance.get(`/API/teacher/tryout/${tryout_id}/${subject_id}/reset_session`);
      
      // 2. Buat soal terlebih dahulu tanpa pembahasan (step 1)
      const createQuestionOnly = new FormData();
      createQuestionOnly.append('question', questionData.question || '');
      createQuestionOnly.append('score', questionData.score || '');
      createQuestionOnly.append('correct_answer_index', formData.correct_answer_index);
      
      // Tambahkan pilihan jawaban
      if (Array.isArray(questionData.answer_options)) {
        questionData.answer_options.forEach((option) => {
          if (option !== undefined && option !== null) {
            createQuestionOnly.append('answer_options', option);
          }
        });
      }
      
      // 3. Kirim soal dengan correct_answer_index dalam satu permintaan
      const combinedResponse = await axiosInstance.post(
        `/API/teacher/tryout/${tryout_id}/${subject_id}/create_complete_question`,
        createQuestionOnly,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        }
      );
      
      if (combinedResponse.status === 201 || combinedResponse.status === 200) {
        // 4. Kirim pembahasan secara terpisah jika diperlukan
        const explanationOnly = new FormData();
        explanationOnly.append('question_explanation', formData.question_explanation);
        explanationOnly.append('id', combinedResponse.data.question_id); // Gunakan ID dari response
        
        const explanationResponse = await axiosInstance.post(
          `/API/teacher/tryout/${tryout_id}/${subject_id}/add_explanation`,
          explanationOnly,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            }
          }
        );
        
        if (explanationResponse.status === 201 || explanationResponse.status === 200) {
          onSuccessfulSubmission();
          return;
        }
      }
      
      throw new Error("Hard reset failed");
    } catch (error) {
      console.error('Hard reset approach failed:', error);
      alert("Pendekatan alternatif gagal. Silakan hubungi administrator.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-1">Pembahasan Soal</h2>
            <p className="text-sm text-gray-600">Tambahkan pembahasan untuk soal yang telah dibuat</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg mb-6">
              <p>{error}</p>
            </div>
          )}

          <div className="question-container border border-gray-200 rounded-xl p-8 bg-white shadow-sm">
            <div className="mb-8">
              {/* Display the question */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="text-sm font-medium text-gray-600 mb-2">Pertanyaan:</h4>
                <p className="text-gray-800">{questionData.question}</p>
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-600 mb-2">Opsi Jawaban:</h4>
                  <div className="space-y-2">
                    {questionData.answer_options.map((option, index) => (
                      option !== undefined && option !== null && (
                        <div 
                          key={index} 
                          className={`p-2 rounded-lg ${
                            parseInt(formData.correct_answer_index) === index 
                              ? 'bg-green-100 border border-green-500 text-green-700' 
                              : 'text-gray-700'
                          }`}
                        >
                          {String.fromCharCode(65 + index)}. {option}
                          {parseInt(formData.correct_answer_index) === index && (
                            <span className="ml-2 text-green-600 font-medium">(Jawaban Benar)</span>
                          )}
                        </div>
                      )
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center mb-6">
                <div className="w-2 h-6 bg-blue-600 rounded-full mr-3"></div>
                <h3 className="text-lg font-semibold text-gray-800">Pembahasan</h3>
              </div>

              <div className="explanation-container space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pilih Jawaban Benar <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      value={formData.correct_answer_index ?? ""}
                      onChange={(e) => {
                        const value = e.target.value;
                        setFormData({
                          ...formData,
                          correct_answer_index: value === "" ? null : parseInt(value, 10)
                        });
                        
                        // Log nilai yang dipilih untuk debugging
                        console.log('Selected dropdown value:', value);
                        console.log('Converted to number:', value === "" ? null : parseInt(value, 10));
                      }}
                      className="input-field w-full p-3 border border-gray-300 rounded-lg text-gray-800 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                      required
                    >
                      <option value="">Pilih jawaban benar</option>
                      {questionData.answer_options.map((option, index) => (
                        option !== undefined && option !== null && (
                          <option key={index} value={index}>
                            {String.fromCharCode(65 + index)}. {option}
                          </option>
                        )
                      ))}
                    </select>
                  </div>
                  {formData.correct_answer_index !== null && (
                    <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-sm text-green-700">
                        Jawaban yang dipilih: {String.fromCharCode(65 + formData.correct_answer_index)}. {questionData.answer_options[formData.correct_answer_index]}
                      </p>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pembahasan <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={formData.question_explanation || ""}
                    onChange={(e) => setFormData({ ...formData, question_explanation: e.target.value })}
                    className="textarea-field w-full p-3 border border-gray-300 rounded-lg text-gray-800 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    rows="5"
                    placeholder="Masukkan pembahasan soal"
                    required
                  ></textarea>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-4 pt-4 border-t">
              <button 
                onClick={handleBack}
                className="button-secondary px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200 flex items-center gap-2"
              >
                <FiArrowLeft size={16} />
                Kembali
              </button>
              <button 
                onClick={() => handleNext()}
                disabled={loading}
                className={`button-primary px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2 shadow-md hover:shadow-lg ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {loading ? 'Menyimpan...' : 'Simpan'}
                <FiSave size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SoalCreatePembahasan;

