"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useNavigate, useParams } from "react-router-dom"
// Import icons if you're using lucide-react
// If not, you can replace with any icon library or SVG elements

export default function TryoutId() {
  const [isLoaded, setIsLoaded] = useState(false)
  const navigate = useNavigate()
  const { id } = useParams()

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  // Arrow left icon component
  const ArrowLeft = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 19-7-7 7-7" />
      <path d="M19 12H5" />
    </svg>
  )

  // File text icon component
  const FileText = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" x2="8" y1="13" y2="13" />
      <line x1="16" x2="8" y1="17" y2="17" />
      <line x1="10" x2="8" y1="9" y2="9" />
    </svg>
  )

  // Clock icon component
  const Clock = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-gradient-to-b from-[#f8f3ee] to-[#f0e9e4] flex items-center justify-center p-4 md:p-8"
    >
      <div className="w-full max-w-4xl">
        <motion.div variants={itemVariants} className="flex justify-between items-center mb-6">
          <button
            onClick={() => navigate('/siswa/tryout')}
            className="bg-[#1E3A5F] text-white p-3 rounded-full hover:bg-[#2E4A7F] transition-colors duration-300 flex items-center gap-2"
          >
            <ArrowLeft />
            <span className="hidden md:inline">Kembali</span>
          </button>
        </motion.div>

        <motion.div variants={itemVariants} className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="bg-[#1E3A5F] text-white p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold mb-2">Tryout UTBK SNBT 2025</h2>
            <p className="text-gray-300">Episode 5</p>
          </div>

          <div className="bg-[#1E3A5F] text-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <FileText />
                <span className="text-lg">Jumlah Soal</span>
              </div>
              <div className="bg-[#d9c5a0] text-[#1E3A5F] px-4 py-2 rounded-full text-lg font-semibold">
                100
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Clock />
                <span className="text-lg">Waktu</span>
              </div>
              <div className="bg-[#d9c5a0] text-[#1E3A5F] px-4 py-2 rounded-full text-lg font-semibold">
                40 Menit
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="bg-[#1E3A5F] rounded-xl overflow-hidden shadow-lg mb-6"
        >
          <div className="bg-[#2E4A7F] text-white py-4 px-6 text-center text-xl font-semibold">
            Peraturan Tryout
          </div>
          <div className="p-8 text-white">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <h3 className="text-xl font-semibold mb-4 text-[#d9c5a0]">
                  Persiapan Sebelum Tryout
                </h3>
                <ol className="list-decimal list-inside space-y-3 text-gray-200">
                  <li className="leading-relaxed">
                    Pastikan menggunakan laptop/HP dalam kondisi baik dan memiliki koneksi internet yang stabil
                  </li>
                  <li className="leading-relaxed">
                    Gunakan browser terbaru untuk menghindari kendala teknis selama tryout
                  </li>
                  <li className="leading-relaxed">
                    Siapkan alat tulis dan kertas untuk mencatat soal-soal selama tryout
                  </li>
                  <li className="leading-relaxed">
                    Cari tempat yang nyaman dan minim gangguan agar bisa fokus selama tryout
                  </li>
                  <li className="leading-relaxed">
                    Pastikan daya baterai perangkat cukup atau sambungkan ke charger
                  </li>
                </ol>
              </div>
              <div className="space-y-6">
                <h3 className="text-xl font-semibold mb-4 text-[#d9c5a0]">
                  Saat Tryout Berlangsung
                </h3>
                <ol className="list-decimal list-inside space-y-3 text-gray-200">
                  <li className="leading-relaxed">
                    Tryout memiliki batas waktu, dan waktu akan berjalan otomatis sejak dimulai
                  </li>
                  <li className="leading-relaxed">
                    Dilarang membuka tab atau aplikasi lain yang tidak berhubungan dengan tryout
                  </li>
                  <li className="leading-relaxed">
                    Kerjakan soal dengan jujur tanpa bantuan pihak lain
                  </li>
                  <li className="leading-relaxed">
                    Jawaban yang telah dikumpulkan tidak dapat diubah kembali
                  </li>
                  <li className="leading-relaxed">
                    Jika terjadi kendala teknis, segera hubungi tim support
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.button
          variants={itemVariants}
          onClick={() => navigate(`/siswa/tryout/id/subjek/pengerjaan`)}
          className="w-full bg-gradient-to-r from-[#1E3A5F] to-[#2E4A7F] text-white py-4 px-8 rounded-xl text-lg font-semibold transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
        >
          MULAI TRYOUT
        </motion.button>
      </div>
    </motion.div>
  )
}

