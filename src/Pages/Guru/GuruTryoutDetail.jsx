"use client"
import { motion } from "framer-motion"
// Hapus import state dan ikon yang tidak digunakan jika ada
// import { useState } from "react"
// import { ChevronDown, ChevronRight, BookOpen, Brain, Calculator } from "lucide-react"

// Data Dummy (ganti dengan data asli nanti)
const skolastikData = [
  { name: "Penalaran Umum", created: 20, target: 30 },
  { name: "Pemahaman Bacaan dan Menulis", created: 10, target: 20 },
  { name: "Pengetahuan dan Pemahaman Umum", created: 15, target: 20 },
  { name: "Penalaran Kuantitatif", created: 15, target: 20 },
];

const literasiData = [
  { name: "Literasi Bahasa Indonesia", created: 25, target: 30 },
  { name: "Literasi Bahasa Inggris", created: 15, target: 20 },
];

const matematikaData = [
  { name: "Penalaran Matematika", created: 10, target: 20 },
];

const GuruTryoutDetail = () => {
  return (
    <div className="flex flex-col items-center bg-[#f5f0e8] p-6 min-h-screen w-full">
      <motion.div
        className="w-full max-w-3xl px-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Judul Tryout */}
        <motion.h1
          className="text-3xl font-bold text-gray-800 mb-8 text-center"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, type: "spring", stiffness: 100 }}
        >
          Tryout UTBK SNBT 2025 ep. 1
        </motion.h1>

        {/* Container untuk semua section tabel */}
        <div className="w-full space-y-6">
          {/* Section Tabel Skolastik */}
          <SectionTable
            title="Tes Potensi Skolastik"
            items={skolastikData}
          />

          {/* Section Tabel Literasi */}
          <SectionTable
            title="Tes Literasi"
            items={literasiData}
          />

          {/* Section Tabel Matematika */}
          <SectionTable
            title="Penalaran Matematika"
            items={matematikaData}
          />
        </div>

        {/* Tombol Publish */}
        <div className="flex justify-end mt-8">
          <motion.button
            className="bg-[#2e4460] text-white font-semibold py-2 px-6 rounded-lg shadow hover:bg-[#263850] transition-colors duration-200"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            Publish
          </motion.button>
        </div>
      </motion.div>
    </div>
  )
}

// Komponen baru untuk menampilkan tabel per section
const SectionTable = ({ title, items }) => {
  return (
    <motion.div
      className="bg-white rounded-lg shadow-md overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <table className="w-full text-sm text-left text-gray-700">
        {/* Header Tabel */}
        <thead className="text-xs text-white uppercase bg-[#2e4460]">
          <tr>
            {/* Judul Section di header kolom pertama */}
            <th scope="col" className="px-6 py-3 font-semibold">
              {title}
            </th>
            <th scope="col" className="px-6 py-3 text-center font-semibold">Soal Dibuat</th>
            <th scope="col" className="px-6 py-3 text-center font-semibold">Target Soal</th>
          </tr>
        </thead>
        {/* Body Tabel */}
        <tbody>
          {items.map((item, index) => (
            <tr key={index} className="bg-white border-b last:border-b-0 hover:bg-gray-50">
              {/* Nama Subtes */}
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                {item.name}
              </th>
              {/* Jumlah Soal Dibuat */}
              <td className="px-6 py-4 text-center">{item.created}</td>
              {/* Target Soal */}
              <td className="px-6 py-4 text-center">{item.target}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
};


export default GuruTryoutDetail

