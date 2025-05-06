"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useNavigate, useParams } from "react-router-dom"
import axiosInstance from "../../api/axiosInstance"
// Import icons if you're using lucide-react
// If not, you can replace with any icon library or SVG elements

export default function TryoutId() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [tryoutData, setTryoutData] = useState(null)
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const { id } = useParams()

  useEffect(() => {
    const fetchTryoutData = async () => {
      try {
        const response = await axiosInstance.get(`/API/student/tryout/${id}`)
        console.log('API Response:', response.data)
        console.log('Response structure:', {
          tryout: {
            name: response.data?.getTryout?.tryout_name,
            episode: response.data?.getTryout?.episode,
            id: response.data?.getTryout?.tryout_id
          },
          data: {
            total_minimal_questions: response.data?.data?.total_minimal_questions,
            total_time_limit: response.data?.data?.total_time_limit
          }
        })
        
        // Store the entire response data
        setTryoutData(response.data)
        setIsLoaded(true)
      } catch (err) {
        console.error('Error fetching tryout:', err)
        if (err.response?.status === 403 || err.response?.status === 401) {
          setError('Sesi anda telah berakhir. Silakan login kembali')
          setTimeout(() => {
            navigate('/login')
          }, 2000)
        } else {
          setError(err.response?.data?.message || 'Terjadi kesalahan saat memuat data')
        }
        setIsLoaded(true)
      }
    }

    fetchTryoutData()
  }, [id, navigate])

  console.log('Current tryoutData:', tryoutData) // Debug log

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

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4 }
    },
    hover: {
      scale: 1.02,
      transition: { duration: 0.2 }
    }
  }

  const buttonVariants = {
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 }
    },
    tap: {
      scale: 0.95,
      transition: { duration: 0.1 }
    }
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-gradient-to-b from-[#f8f3ee] to-[#f0e9e4] flex items-center justify-center p-4 md:p-8"
    >
      {error ? (
        <div className="text-red-500 text-center">
          <p>Error: {error}</p>
          <button 
            onClick={() => navigate('/siswa/tryout')}
            className="mt-4 bg-[#1E3A5F] text-white px-4 py-2 rounded"
          >
            Kembali ke Daftar Tryout
          </button>
        </div>
      ) : !isLoaded ? (
        <div className="text-[#1E3A5F] text-xl">Loading...</div>
      ) : (
        <div className="w-full max-w-4xl">
          <motion.div variants={itemVariants} className="flex justify-between items-center mb-8">
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={() => navigate('/siswa/tryout')}
              className="bg-[#1E3A5F] text-white p-3 rounded-full hover:bg-[#2E4A7F] transition-colors duration-300 flex items-center gap-2 shadow-lg"
            >
              <ArrowLeft />
              <span className="hidden md:inline">Kembali</span>
            </motion.button>
          </motion.div>

          <motion.div variants={itemVariants} className="grid md:grid-cols-2 gap-6 mb-8">
            <motion.div
              variants={cardVariants}
              whileHover="hover"
              className="bg-[#1E3A5F] text-white p-6 rounded-xl shadow-lg transform transition-all duration-300 hover:shadow-xl"
            >
              <h2 className="text-2xl font-bold">
                {tryoutData?.getTryout?.tryout_name || 'Tryout UTBK SNBT 2025'}
              </h2>
            </motion.div>

            <motion.div
              variants={cardVariants}
              whileHover="hover"
              className="bg-[#1E3A5F] text-white p-6 rounded-xl shadow-lg grid grid-cols-2 gap-4"
            >
              <div className="flex flex-col items-start space-y-2">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  <span className="text-base font-medium">Target Soal</span>
                </div>
                <div className="bg-[#d9c5a0] text-[#1E3A5F] px-4 py-2 rounded-full text-base font-semibold shadow-md w-full text-center">
                  {tryoutData?.data?.total_minimal_questions || '16'}
                </div>
              </div>

              <div className="flex flex-col items-start space-y-2">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span className="text-base font-medium">Waktu</span>
                </div>
                <div className="bg-[#d9c5a0] text-[#1E3A5F] px-4 py-2 rounded-full text-base font-semibold shadow-md w-full text-center">
                  {tryoutData?.data?.total_time_limit || '18'} Menit
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            variants={cardVariants}
            whileHover="hover"
            className="bg-[#1E3A5F] rounded-xl overflow-hidden shadow-lg mb-8 transform transition-all duration-300 hover:shadow-xl"
          >
            <div className="bg-[#2E4A7F] text-white py-4 px-6 text-center text-xl font-semibold">
              Peraturan Tryout
            </div>
            <div className="p-8 text-white">
              <div className="grid md:grid-cols-2 gap-8">
                <motion.div
                  variants={itemVariants}
                  className="space-y-6"
                >
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
                </motion.div>
                <motion.div
                  variants={itemVariants}
                  className="space-y-6"
                >
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
                </motion.div>
              </div>
            </div>
          </motion.div>

          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={() => navigate(`/siswa/tryout/${id}/subjek/pengerjaan`)}
            className="w-full bg-gradient-to-r from-[#1E3A5F] to-[#2E4A7F] text-white py-4 px-8 rounded-xl text-lg font-semibold shadow-lg transform transition-all duration-300 hover:shadow-xl"
          >
            MULAI TRYOUT
          </motion.button>
        </div>
      )}
    </motion.div>
  )
}

