"use client";
import { motion } from "framer-motion";
import { FiArrowLeft, FiSave } from "react-icons/fi";
import { useState, useEffect } from "react";
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
    answer_options: []
  });

  const handleBack = () => {
    navigate(`/guru/tryout/${tryout_id}/${subject_id}/createsoal`);
  };

  const handleNext = async () => {
    try {
      // First check if correct_answer_index exists and is valid
      if (formData.correct_answer_index === null || formData.correct_answer_index === undefined) {
        alert('correct_answer_index is required.');
        return;
      }

      // Parse to integer and validate
      const correct_answer_index = Number(formData.correct_answer_index);
      
      if (isNaN(correct_answer_index) || correct_answer_index < 0) {
        alert('Indeks jawaban benar tidak valid.');
        return;
      }

      // Check if the index is valid for the options array
      if (correct_answer_index >= questionData.answer_options.length) {
        alert('Indeks jawaban benar tidak valid opsi jawaban tidak ditemukan.');
        return;
      }

      // Validate question_explanation
      if (!formData.question_explanation?.trim()) {
        alert('Pembahasan soal tidak boleh kosong.');
        return;
      }

      // Send data to API
      const response = await axiosInstance.post(
        `/API/teacher/tryout/${tryout_id}/${subject_id}/create_question/create_explanation`,
        {
          correct_answer_index: correct_answer_index,
          question_explanation: formData.question_explanation.trim()
        },
        {
          withCredentials: true // Ensure cookies are sent with the request
        }
      );

      if (response.status === 201) {
        // Clear the saved question data
        localStorage.removeItem(`tryout_form_${tryout_id}_${subject_id}`);
        // After successful submission, navigate back to the subject page
        navigate(`/guru/tryout/${tryout_id}/${subject_id}`);
      }
    } catch (error) {
      console.error('Error submitting pembahasan:', error);
      if (error.response?.status === 400 && error.response?.data?.message === 'Data soal sementara tidak ditemukan, mohon mulai dari awal.') {
        // If session data is missing, redirect back to create question
        navigate(`/guru/tryout/${tryout_id}/${subject_id}/createsoal`);
      } else {
        alert(error.response?.data?.message || 'Terjadi kesalahan. Silakan coba lagi.');
      }
    }
  };

  // Load the question data when component mounts
  useEffect(() => {
    const loadQuestionData = async () => {
      try {
        const savedData = localStorage.getItem(`tryout_form_${tryout_id}_${subject_id}`);
        if (savedData) {
          const parsedData = JSON.parse(savedData);
          setQuestionData({
            question: parsedData.question || "",
            answer_options: parsedData.answer_options || []
          });
        } else {
          // If no data in localStorage, redirect back
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-1">Pembahasan Soal</h2>
            <p className="text-sm text-gray-600">Tambahkan pembahasan untuk soal yang telah dibuat</p>
          </div>

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
                      option.trim() && (
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
                          correct_answer_index: value === "" ? null : Number(value)
                        });
                      }}
                      className="input-field w-full p-3 border border-gray-300 rounded-lg text-gray-800 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                      required
                    >
                      <option value="">Pilih jawaban benar</option>
                      {questionData.answer_options.map((option, index) => (
                        option.trim() && (
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
                onClick={handleNext}
                className="button-primary px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2 shadow-md hover:shadow-lg"
              >
                Simpan
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

