"use client";
import { motion } from "framer-motion";
import { FiArrowLeft, FiCheck } from "react-icons/fi";
import { useState } from "react";

const EditSoalCreatePembahasan = () => {
  // State untuk jawaban dan pembahasan
  const [jawaban, setJawaban] = useState("");
  const [pembahasan, setPembahasan] = useState("");

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] p-4">
      <div className="bg-white rounded-3xl p-6 max-w-3xl mx-auto shadow-sm">
        <div className="flex items-center mb-6">
          <button className="p-2 rounded-full bg-gray-100 mr-4">
            <FiArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h3 className="text-sm text-gray-600 mb-1">Pembahasan Soal Tryout</h3>
            <h2 className="text-xl font-semibold">Tambah Pembahasan Soal Tryout</h2>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2">
              Jawaban
            </label>
            <input
              type="text"
              value={jawaban}
              onChange={(e) => setJawaban(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">
              Pembahasan
            </label>
            <textarea
              value={pembahasan}
              onChange={(e) => setPembahasan(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-1 focus:ring-blue-500"
              rows="5"
            ></textarea>
          </div>

          <div className="flex justify-between mt-6">
            <button className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
              Sebelumnya
            </button>
            <button className="px-6 py-2 bg-[#2B4365] text-white rounded-lg hover:bg-[#1a2a40]">
              Buat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditSoalCreatePembahasan;
