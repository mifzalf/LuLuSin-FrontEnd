"use client";
import { motion } from "framer-motion";
import { FiArrowLeft } from "react-icons/fi";
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
    <div className="min-h-screen bg-[#FFF5F5] p-8">
      <div className="bg-white rounded-[32px] p-8 max-w-2xl mx-auto">
        <div className="flex items-start gap-4 mb-8">
          <button className="p-2 rounded-full bg-[#2B4365] text-white">
            <FiArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-[#2B4365] text-xl font-semibold">
            Tambah Pembahasan Soal Tryout
          </h1>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-[#2B4365] mb-2 font-medium">
              Jawaban
            </label>
            <input
              type="text"
              value={jawaban}
              onChange={(e) => setJawaban(e.target.value)}
              className="w-full border border-gray-200 rounded-lg p-3 focus:outline-none"
              placeholder="Masukkan jawaban"
            />
          </div>

          <div>
            <label className="block text-[#2B4365] mb-2 font-medium">
              Pembahasan
            </label>
            <textarea
              value={pembahasan}
              onChange={(e) => setPembahasan(e.target.value)}
              className="w-full border border-gray-200 rounded-lg p-3 focus:outline-none"
              rows="4"
              placeholder="Masukkan pembahasan"
            ></textarea>
          </div>

          <div className="flex justify-between pt-4 border-t border-gray-200">
            <button className="px-6 py-2.5 bg-[#2B4365] text-white rounded-lg font-medium">
              Sebelumnya
            </button>
            <button className="px-6 py-2.5 bg-[#2B4365] text-white rounded-lg font-medium">
              Buat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditSoalCreatePembahasan;
