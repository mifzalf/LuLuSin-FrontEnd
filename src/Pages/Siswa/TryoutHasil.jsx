"use client"

import { motion } from "framer-motion"
import { CheckCircle, XCircle, HelpCircle, BarChart3, BookOpen, Award, ArrowLeft } from "lucide-react"
import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import axiosInstance from "../../api/axiosInstance"

export default function SiswaTryoutHasil() {
  const [hoveredCard, setHoveredCard] = useState(null)
  const [tryoutResults, setTryoutResults] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const { id } = useParams()
  const [subjectList, setSubjectList] = useState([]);

  useEffect(() => {
    const fetchTryoutResults = async () => {
      try {
        const response = await axiosInstance.get(`/API/student/tryout/${id}/result`)
        const raw = response.data
        const summary = Array.isArray(raw.summary) ? raw.summary[0] : raw.summary
        // Langsung pakai data asli dari API
        setTryoutResults({ summary, perCategorySubject: raw.perCategorySubject })
        setLoading(false)
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch tryout results')
        setLoading(false)
      }
    }
    fetchTryoutResults()
  }, [id])

  useEffect(() => {
    axiosInstance.get(`/API/student/tryout/${id}`)
      .then(res => {
        let subjects = res.data.getTryout.subjects;
        if (typeof subjects === 'string') {
          subjects = JSON.parse(subjects);
        }
        setSubjectList(subjects);
      });
  }, [id]);

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

  // Test categories data
  const testCategories = [
    {
      title: "Tes Skolastik",
      icon: <BookOpen className="mr-2" size={20} />,
      subcategories: [
        "Penalaran Umum",
        "Pengetahuan dan Pemahaman Umum",
        "Pemahaman Baca dan Menulis",
        "Pengetahuan Kuantitatif",
      ],
    },
    {
      title: "Tes Literasi",
      icon: <BarChart3 className="mr-2" size={20} />,
      subcategories: ["Literasi Bahasa Indonesia", "Literasi Bahasa Inggris"],
    },
    {
      title: "Tes Penalaran Matematika",
      icon: <Award className="mr-2" size={20} />,
      subcategories: [],
    },
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1E3A5F]"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500 text-center">
          <p className="text-xl font-semibold mb-2">Error</p>
          <p>{error}</p>
          <button 
            onClick={() => navigate('/siswa/tryout')}
            className="mt-4 bg-[#1E3A5F] text-white px-4 py-2 rounded-lg"
          >
            Back to Tryout
          </button>
        </div>
      </div>
    )
  }

  // Get metrics from API data
  const metrics = tryoutResults?.summary ? [
    { title: "Nilai rata-rata", value: tryoutResults.summary.average_score.toString(), icon: <Award size={28} className="text-yellow-300 mb-1" /> },
    { title: "Total Jawaban Benar", value: tryoutResults.summary.total_correct.toString(), icon: <CheckCircle size={28} className="text-green-400 mb-1" /> },
    { title: "Total Jawaban Salah", value: tryoutResults.summary.total_wrong.toString(), icon: <XCircle size={28} className="text-red-400 mb-1" /> },
    { title: "Total Jawaban Kosong", value: tryoutResults.summary.total_empty.toString(), icon: <HelpCircle size={28} className="text-gray-400 mb-1" /> },
  ] : []

  // Helper untuk ambil subjek per kategori
  const getSubjectsByCategory = (categoryName) => {
    return tryoutResults?.perCategorySubject
      ?.find(cat => cat.result.nama_kategori === categoryName)?.result?.subjek || [];
  };

  // Helper untuk render metrik subjek
  const renderSubjectMetrics = (sub) => {
    // Cari ID subjek berdasarkan nama subjek
    const found = subjectList.find(s =>
      (s.subject_name || s.nama_subjek) === (sub.nama_subjek || sub.subject_name)
    );
    const subjectId = found ? found.subject_id : undefined;

    return (
      <div 
        onClick={() => subjectId && navigate(`/siswa/tryout/${id}/${subjectId}/pembahasan`)}
        className="bg-[#2C4A6E] rounded-xl p-4 mb-3 cursor-pointer hover:bg-[#2C4A6E]/80 transition-colors"
      >
        <div className="font-semibold text-white mb-2">{sub.nama_subjek}</div>
        <div className="grid grid-cols-4 gap-2 mt-2">
          <div className="flex flex-col items-center bg-[#22345A] rounded-lg p-2">
            <Award size={18} className="text-yellow-300 mb-1" />
            <span className="text-xs text-blue-100">Nilai</span>
            <span className="font-bold text-white">{sub.nilai_rata_rata}</span>
          </div>
          <div className="flex flex-col items-center bg-[#22345A] rounded-lg p-2">
            <CheckCircle size={18} className="text-green-400 mb-1" />
            <span className="text-xs text-blue-100">Total Jawaban Benar</span>
            <span className="font-bold text-white">{sub.total_jawaban_benar}</span>
          </div>
          <div className="flex flex-col items-center bg-[#22345A] rounded-lg p-2">
            <XCircle size={18} className="text-red-400 mb-1" />
            <span className="text-xs text-blue-100">Total Jawaban Salah</span>
            <span className="font-bold text-white">{sub.total_jawaban_salah}</span>
          </div>
          <div className="flex flex-col items-center bg-[#22345A] rounded-lg p-2">
            <HelpCircle size={18} className="text-gray-400 mb-1" />
            <span className="text-xs text-blue-100">Total Jawaban Kosong</span>
            <span className="font-bold text-white">{sub.total_jawaban_kosong}</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gradient-to-b from-[#F5F0E9] to-[#EAE5DE] flex flex-col items-center p-6 min-h-screen w-screen">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-5xl space-y-6"
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex items-center justify-between mb-6"
        >
          <motion.a 
            href="/siswa/tryout" 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }}
          >
            <motion.button
              className="bg-gradient-to-r from-[#1E3A5F] to-[#2E4A7F] text-white p-3 rounded-full shadow-md flex items-center justify-center"
              style={{ boxShadow: "0 4px 6px -1px rgba(30, 58, 95, 0.3)" }}
            >
              <ArrowLeft size={20} />
            </motion.button>
          </motion.a>
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-2xl font-bold text-[#1E3A5F] flex items-center"
          >
            <span className="bg-[#1E3A5F] h-6 w-1.5 rounded-full mr-2 inline-block"></span>
            Hasil Tryout SNBT
          </motion.h1>
          <div className="w-10"></div> {/* Spacer for centering */}
        </motion.div>

        {/* Header Box */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-gradient-to-br from-[#1E3A5F] to-[#2E4A7F] text-white p-6 rounded-xl shadow-lg mb-4">
          {metrics.map((item, index) => (
            <div key={index} className="flex flex-col items-center justify-center p-2 rounded-xl">
              {item.icon}
              <span className="text-xs text-blue-200 mt-1 mb-1 text-center">{item.title}</span>
              <span className="text-2xl font-bold text-white">{item.value}</span>
            </div>
          ))}
        </div>

        {/* Tes Skolastik */}
        <div className="bg-[#22345A] rounded-xl p-4 mb-4">
          <h2 className="text-lg font-bold text-white mb-2">Tes Skolastik</h2>
          {getSubjectsByCategory("Tes Potensi Skolastik").map((sub, idx) => {
            console.log('SUBJEK DEBUG:', sub);
            return (
              <div key={idx} className="bg-[#2C4A6E] rounded-xl p-4 mb-3">
                {renderSubjectMetrics(sub)}
              </div>
            );
          })}
        </div>

        {/* Tes Literasi */}
        <div className="bg-[#22345A] rounded-xl p-4 mb-4">
          <h2 className="text-lg font-bold text-white mb-2">Tes Literasi</h2>
          {getSubjectsByCategory("Tes Literasi").map((sub, idx) => {
            console.log('SUBJEK DEBUG:', sub);
            return (
              <div key={idx} className="bg-[#2C4A6E] rounded-xl p-4 mb-3">
                {renderSubjectMetrics(sub)}
              </div>
            );
          })}
        </div>

        {/* Tes Penalaran Matematika */}
        <div className="bg-[#22345A] rounded-xl p-4 mb-4">
          <h2 className="text-lg font-bold text-white mb-2">Tes Penalaran Matematika</h2>
          {getSubjectsByCategory("Penalaran Matematika").map((sub, idx) => {
            console.log('SUBJEK DEBUG:', sub);
            return (
              <div key={idx} className="bg-[#2C4A6E] rounded-xl p-4 mb-3">
                {renderSubjectMetrics(sub)}
              </div>
            );
          })}
        </div>

        {/* Button Keluar */}
        <div className="flex justify-center mt-6">
          <button
            onClick={() => navigate('/siswa/tryout')}
            className="bg-gradient-to-r from-[#1E3A5F] to-[#2E4A7F] text-white px-8 py-3 rounded-xl text-lg font-semibold shadow-lg"
            style={{ boxShadow: "0 10px 15px -3px rgba(30, 58, 95, 0.3)" }}
          >
            Keluar
          </button>
        </div>
      </motion.div>
    </div>
  )
}

