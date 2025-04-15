"use client";

import { useState, useEffect } from "react";
import { FiUpload, FiArrowLeft, FiSave, FiX, FiArrowRight } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";

const CreateTryoutSubjek = () => {
  const navigate = useNavigate();
  const { tryout_id, subject_id } = useParams();
  const [formData, setFormData] = useState({
    question: "",
    score: "",
    answer_options: ["", "", "", "", ""],
    question_image: null
  });

  // Load saved form data when component mounts
  useEffect(() => {
    const savedData = localStorage.getItem(`tryout_form_${tryout_id}_${subject_id}`);
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setFormData(prev => ({
        ...prev,
        question: parsedData.question || "",
        score: parsedData.score || "",
        answer_options: parsedData.answer_options || ["", "", "", "", ""]
      }));
    }
  }, [tryout_id, subject_id]);

  // Save form data whenever it changes
  useEffect(() => {
    const dataToSave = {
      question: formData.question,
      score: formData.score,
      answer_options: formData.answer_options
    };
    localStorage.setItem(`tryout_form_${tryout_id}_${subject_id}`, JSON.stringify(dataToSave));
  }, [formData, tryout_id, subject_id]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, question_image: file });
    }
  };

  const handleBack = () => {
    navigate(`/guru/tryout/${tryout_id}/${subject_id}`);
  };

  const handleNext = async () => {
    try {
      // Validate form data
      if (!formData.question.trim()) {
        alert('question is required.');
        return;
      }

      if (!formData.score.trim()) {
        alert('score is required.');
        return;
      }

      // Filter non-empty options and ensure max 5 options
      const nonEmptyOptions = formData.answer_options.filter(opt => opt.trim() !== '');
      
      if (nonEmptyOptions.length > 5) {
        alert('Maksimal 5 opsi jawaban yang diperbolehkan');
        return;
      }

      // Create FormData object
      const formDataToSend = new FormData();
      formDataToSend.append('question', formData.question.trim());
      formDataToSend.append('score', formData.score);
      
      // Send answer options as individual entries
      nonEmptyOptions.forEach((option) => {
        formDataToSend.append('answer_options', option.trim());
      });

      if (formData.question_image) {
        formDataToSend.append('question_image', formData.question_image);
      }

      const response = await axiosInstance.post(
        `/API/teacher/tryout/${tryout_id}/${subject_id}/create_question`,
        formDataToSend,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          withCredentials: true
        }
      );

      if (response.status === 201) {
        // Store the exact same data format as backend session
        const dataToSave = {
          question: formData.question.trim(),
          score: formData.score,
          answer_options: nonEmptyOptions,
          question_image: formData.question_image ? formData.question_image.name : null
        };
        localStorage.setItem(`tryout_form_${tryout_id}_${subject_id}`, JSON.stringify(dataToSave));
        
        // Navigate to create explanation page
        navigate(`/guru/tryout/${tryout_id}/${subject_id}/createsoal/createpembahasan`);
      }
    } catch (error) {
      console.error('Error creating question:', error);
      alert(error.response?.data?.message || 'Gagal menyimpan soal. Silakan coba lagi.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-1">Buat Soal Baru</h2>
            <p className="text-sm text-gray-600">Lengkapi informasi soal di bawah ini</p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pertanyaan <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.question}
                onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg text-gray-800 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                rows="3"
                placeholder="Masukkan pertanyaan"
                required
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Skor <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                value={formData.score}
                onChange={(e) => setFormData({ ...formData, score: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg text-gray-800 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                placeholder="Masukkan skor"
                required
                min="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gambar (Opsional)
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="cursor-pointer flex flex-col items-center justify-center py-4"
                >
                  <FiUpload className="text-gray-400 text-2xl mb-2" />
                  <span className="text-sm text-gray-500">Klik untuk upload gambar</span>
                </label>
                {formData.question_image && (
                  <div className="mt-2 relative">
                    <img
                      src={URL.createObjectURL(formData.question_image)}
                      alt="Preview"
                      className="max-h-40 mx-auto rounded"
                    />
                    <button
                      onClick={() => setFormData({ ...formData, question_image: null })}
                      className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
                    >
                      <FiX size={16} />
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Opsi Jawaban (Maksimal 5 opsi)
              </label>
              <div className="space-y-3">
                {formData.answer_options.slice(0, 5).map((option, index) => (
                  <input
                    key={index}
                    type="text"
                    value={option}
                    onChange={(e) => {
                      const newOptions = [...formData.answer_options];
                      newOptions[index] = e.target.value;
                      setFormData({ ...formData, answer_options: newOptions });
                    }}
                    className="w-full p-3 border border-gray-300 rounded-lg text-gray-800 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    placeholder={`Opsi ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-4 pt-6">
              <button
                onClick={handleBack}
                className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200 flex items-center gap-2"
              >
                <FiArrowLeft size={16} />
                Kembali
              </button>
              <button
                onClick={handleNext}
                className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2 shadow-md hover:shadow-lg"
              >
                Selanjutnya
                <FiArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTryoutSubjek;
