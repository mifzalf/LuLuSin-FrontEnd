"use client";
import { motion } from "framer-motion";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";

const SoalCreatePembahasan = () => {
  const navigate = useNavigate();
  const { tryout_id, subject_id } = useParams();
  const location = useLocation();
  const [formData, setFormData] = useState({
    jawaban: "",
    pembahasan: ""
  });

  const handleBack = () => {
    // Go back to the create question page
    navigate(`/guru/tryout/${tryout_id}/${subject_id}/createsoal`);
  };

  const handleNext = () => {
    // Navigate to the next page with createpembahasan
    navigate(`/guru/tryout/${tryout_id}/${subject_id}/createsoal/createpembahasan`);
  };

  // Check if we're on the createpembahasan page
  const isCreatePembahasan = location.pathname.includes('createpembahasan');

  return (
    <div className={`min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 p-6 ${isCreatePembahasan ? 'block' : 'hidden'}`}>
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-1">Pembahasan Soal</h2>
              <p className="text-sm text-gray-600">Tambahkan pembahasan untuk soal yang telah dibuat</p>
            </div>
          </div>

          <div className="border border-gray-200 rounded-xl p-8 bg-white shadow-sm">
            <div className="mb-8">
              <div className="flex items-center mb-6">
                <div className="w-2 h-6 bg-blue-600 rounded-full mr-3"></div>
                <h3 className="text-lg font-semibold text-gray-800">Pembahasan</h3>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Jawaban
                  </label>
                  <input
                    type="text"
                    value={formData.jawaban}
                    onChange={(e) => setFormData({ ...formData, jawaban: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg text-gray-800 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    placeholder="Masukkan jawaban yang benar"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pembahasan
                  </label>
                  <textarea
                    value={formData.pembahasan}
                    onChange={(e) => setFormData({ ...formData, pembahasan: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg text-gray-800 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    rows="5"
                    placeholder="Masukkan pembahasan soal"
                  ></textarea>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-4 pt-4 border-t">
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

export default SoalCreatePembahasan;
