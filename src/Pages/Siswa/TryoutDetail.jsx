"use client"

import { motion } from "framer-motion"
import { ArrowLeft, BookOpen, Clock, AlertTriangle, CheckCircle } from "lucide-react"

export default function SiswaTryoutDetail() {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  }

  return (
    <div className="bg-gradient-to-b from-[#F5F0E9] to-[#EAE5DE] flex flex-col items-center p-6 min-h-screen w-screen">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl"
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex items-center mb-6"
        >
          <motion.a href="/Siswa/Tryout" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <motion.button
              className="bg-gradient-to-r from-[#1E3A5F] to-[#2E4A7F] text-white p-3 rounded-full mr-4 shadow-md flex items-center justify-center"
              style={{ boxShadow: "0 4px 6px -1px rgba(30, 58, 95, 0.3)" }}
            >
              <ArrowLeft size={20} />
            </motion.button>
          </motion.a>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="bg-gradient-to-r from-[#1E3A5F] to-[#2E4A7F] text-white px-6 py-3 rounded-xl text-lg font-semibold shadow-md flex items-center"
            style={{ boxShadow: "0 4px 6px -1px rgba(30, 58, 95, 0.3)" }}
          >
            <BookOpen size={20} className="mr-2" />
            tryout utbk snbt 2025 ep.5
          </motion.div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6"
        >
          <motion.div
            variants={itemVariants}
            whileHover={{
              y: -5,
              boxShadow: "0 15px 30px -5px rgba(30, 58, 95, 0.4)",
              transition: { type: "spring", stiffness: 300 },
            }}
            className="bg-gradient-to-br from-[#1E3A5F] to-[#2E4A7F] text-white p-5 rounded-xl flex flex-col items-center shadow-lg relative overflow-hidden"
            style={{ boxShadow: "0 10px 15px -3px rgba(30, 58, 95, 0.3)" }}
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500 rounded-bl-full opacity-10"></div>
            <div className="flex items-center gap-3 z-10">
              <BookOpen size={28} className="text-blue-200" />
              <p className="text-lg font-semibold">Jumlah Soal</p>
            </div>
            <motion.span
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5, type: "spring" }}
              className="mt-3 bg-white text-[#1E3A5F] px-5 py-2 rounded-lg font-bold text-xl shadow-md"
            >
              100
            </motion.span>
          </motion.div>

          <motion.div
            variants={itemVariants}
            whileHover={{
              y: -5,
              boxShadow: "0 15px 30px -5px rgba(30, 58, 95, 0.4)",
              transition: { type: "spring", stiffness: 300 },
            }}
            className="bg-gradient-to-br from-[#1E3A5F] to-[#2E4A7F] text-white p-5 rounded-xl flex flex-col items-center shadow-lg relative overflow-hidden"
            style={{ boxShadow: "0 10px 15px -3px rgba(30, 58, 95, 0.3)" }}
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500 rounded-bl-full opacity-10"></div>
            <div className="flex items-center gap-3 z-10">
              <Clock size={28} className="text-blue-200" />
              <p className="text-lg font-semibold">Waktu</p>
            </div>
            <motion.span
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5, type: "spring" }}
              className="mt-3 bg-white text-[#1E3A5F] px-5 py-2 rounded-lg font-bold text-xl shadow-md"
            >
              40 Menit
            </motion.span>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="bg-gradient-to-br from-[#1E3A5F] to-[#2E4A7F] text-white p-6 rounded-xl shadow-lg mb-6"
          style={{ boxShadow: "0 10px 25px -5px rgba(30, 58, 95, 0.4)" }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="flex items-center justify-center mb-4"
          >
            <AlertTriangle className="mr-2" size={20} />
            <h3 className="text-lg font-semibold">Peraturan Tryout</h3>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4"
          >
            <motion.div variants={itemVariants} className="bg-white/10 p-4 rounded-xl backdrop-blur-sm">
              <h4 className="font-semibold text-blue-200 flex items-center mb-3">
                <span className="bg-blue-200 text-[#1E3A5F] w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold mr-2">
                  1
                </span>
                Persiapan Sebelum Tryout
              </h4>
              <ul className="text-sm space-y-2">
                {[
                  "Pastikan perangkat dalam kondisi baik dan koneksi stabil.",
                  "Gunakan browser terbaru.",
                  "Siapkan alat tulis jika diperlukan.",
                  "Cari tempat yang nyaman.",
                  "Pastikan daya baterai cukup atau sambungkan ke charger.",
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + index * 0.1, duration: 0.3 }}
                    className="flex items-start"
                  >
                    <CheckCircle size={16} className="text-blue-200 mr-2 mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div variants={itemVariants} className="bg-white/10 p-4 rounded-xl backdrop-blur-sm">
              <h4 className="font-semibold text-blue-200 flex items-center mb-3">
                <span className="bg-blue-200 text-[#1E3A5F] w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold mr-2">
                  2
                </span>
                Saat Tryout Berlangsung
              </h4>
              <ul className="text-sm space-y-2">
                {[
                  "Tryout memiliki batas waktu otomatis.",
                  "Dilarang membuka tab atau aplikasi lain.",
                  "Kejakan soal dengan jujur.",
                  "Jawaban hanya bisa dikumpulkan sekali.",
                  "Jika terjadi kendala teknis, hubungi tim support.",
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + index * 0.1, duration: 0.3 }}
                    className="flex items-start"
                  >
                    <CheckCircle size={16} className="text-blue-200 mr-2 mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="flex justify-center mt-6"
        >
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0 15px 30px -5px rgba(30, 58, 95, 0.4)",
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            className="bg-gradient-to-r from-[#1E3A5F] to-[#2E4A7F] text-white px-8 py-3 rounded-xl text-lg font-semibold shadow-lg"
            style={{ boxShadow: "0 10px 15px -3px rgba(30, 58, 95, 0.3)" }}
          >
            MULAI TRYOUT
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  )
}

