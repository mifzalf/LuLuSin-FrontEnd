"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { Clock, User, BookOpen, ArrowLeft, ArrowRight, AlertTriangle } from "lucide-react"
import { useParams, useNavigate } from "react-router-dom"
import axiosInstance from "../../api/axiosInstance"

export default function SiswaTryoutPengerjaan() {
  const navigate = useNavigate()
  const { id: idTryout, subjectId } = useParams()
  console.log('Current subjectId from params:', subjectId); // Log untuk debug
  const [currentQuestion, setCurrentQuestion] = useState(1)
  const [selectedAnswers, setSelectedAnswers] = useState({})
  const [timeLeft, setTimeLeft] = useState(null)
  const [answeredQuestions, setAnsweredQuestions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [examData, setExamData] = useState({
    studentData: null,
    subjectData: null,
    questionData: []
  })

  // Reset state setiap subjectId berubah
  useEffect(() => {
    setCurrentQuestion(1)
    setSelectedAnswers({})
    setAnsweredQuestions([])
    setTimeLeft(null)
    setLoading(true)
    setError(null)
    setExamData({
      studentData: null,
      subjectData: null,
      questionData: []
    })
  }, [subjectId])

  // Ambil data tryout setiap idTryout atau subjectId berubah
  useEffect(() => {
    const fetchTryoutData = async () => {
      try {
        setLoading(true)
        
        console.log('URL yang dipanggil:', `http://localhost:3000/API/student/tryout/${idTryout}/${subjectId}/taking`)
        const response = await axiosInstance.get(`http://localhost:3000/API/student/tryout/${idTryout}/${subjectId}/taking`)
        console.log('Response API:', response.data)

        if (!response.data) {
          throw new Error('Data tidak ditemukan')
        }

        // Simpan data ke state
        setExamData({
          studentData: response.data.studentData || {},
          subjectData: response.data.subjectData || {},
          questionData: Array.isArray(response.data.questionData) ? response.data.questionData : []
        })

        // Set timer berdasarkan total_waktu dari API
        if (response.data.subjectData?.total_waktu) {
          const minutes = parseInt(response.data.subjectData.total_waktu)
          setTimeLeft({ minutes, seconds: 0 })
        }

        setLoading(false)
      } catch (err) {
        console.error('Error lengkap:', err)
        const errorMessage = err.response?.data?.message || err.message || 'Terjadi kesalahan saat memuat data'
        setError(errorMessage)
        
        if (err.response?.status === 401 || err.response?.status === 403) {
          console.log('Error autentikasi, redirect ke login')
          navigate('/login')
        }
        
        setLoading(false)
      }
    }

    fetchTryoutData()
  }, [idTryout, subjectId, navigate])

  // Efek timer
  useEffect(() => {
    if (!timeLeft) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (!prev) return null
        
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { minutes: prev.minutes - 1, seconds: 59 }
        } else {
          clearInterval(timer)
          // Jika subjectId adalah 7 (subjek terakhir), langsung ke halaman hasil
          if (subjectId === "7") {
            navigate(`/siswa/tryout/${idTryout}/hasil`);
          } else {
            // Jika bukan subjek terakhir, lanjut ke peralihan
            const nextSubjectId = String(Number(subjectId) + 1);
            navigate(`/siswa/tryout/${idTryout}/${nextSubjectId}/peralihan`);
          }
          return prev
        }
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLeft, navigate, idTryout, subjectId])

  // Jumlah total soal
  const totalQuestions = examData.questionData?.length || 0

  // Data soal saat ini
  const currentQuestionData = examData.questionData?.[currentQuestion - 1] || null

  // Find next unanswered question
  const findNextUnansweredQuestion = () => {
    for (let i = 1; i <= totalQuestions; i++) {
      if (!answeredQuestions.includes(i)) {
        return i
      }
    }
    return 1 // If all questions are answered, return to first question
  }

  // Fungsi untuk memilih jawaban
  const handleAnswerSelect = async (answerOptionId) => {
    try {
      // Cek apakah sudah pernah menjawab soal ini
      const alreadyAnswered = answeredQuestions.includes(currentQuestion);
      const url = `/API/student/tryout/${idTryout}/${subjectId}/${currentQuestionData.question_id}/taking`;
      
      // Log data yang dikirim ke backend
      console.log("FRONTEND SEND:", {
        idTryout,
        subjectId,
        questionId: currentQuestionData.question_id,
        answerOptionId
      });

      if (alreadyAnswered) {
        // PATCH untuk update jawaban
        await axiosInstance.patch(url, { answerOptionId });
      } else {
        // POST untuk jawaban baru
        await axiosInstance.post(url, { answerOptionId });
      }

      setSelectedAnswers((prev) => ({ ...prev, [currentQuestion]: answerOptionId }));
      if (!answeredQuestions.includes(currentQuestion)) {
        setAnsweredQuestions((prev) => [...prev, currentQuestion]);
      }
      
      // Jika semua soal sudah dijawab, otomatis navigasi ke Peralihan
      if (answeredQuestions.length + 1 === totalQuestions) {
        setTimeout(() => {
          if (subjectId === "7") {
            navigate(`/siswa/tryout/${idTryout}/hasil`);
          } else {
            navigate(`/siswa/tryout/${idTryout}/${subjectId}/peralihan`);
          }
        }, 1000);
      } else if (currentQuestion < totalQuestions) {
        setTimeout(() => {
          navigateQuestion("next");
        }, 500);
      }
    } catch (err) {
      console.error('Error menyimpan jawaban:', err);
      alert('Gagal menyimpan jawaban. Silakan coba lagi.');
    }
  }

  // Fungsi untuk submit jawaban kosong
  const submitEmptyAnswer = async (questionId) => {
    try {
      const url = `/API/student/tryout/${idTryout}/${subjectId}/${questionId}/taking`;
      
      // Log data yang dikirim ke backend untuk jawaban kosong
      console.log("FRONTEND SEND EMPTY:", {
        idTryout,
        subjectId,
        questionId,
        answerOptionId: 0
      });

      await axiosInstance.post(url, { answerOptionId: 0 });
    } catch (err) {
      console.error('Error menyimpan jawaban kosong:', err);
    }
  }

  // Fungsi navigasi soal
  const navigateQuestion = async (direction) => {
    if (direction === "next") {
      // Submit jawaban kosong untuk soal saat ini jika belum dijawab
      if (!answeredQuestions.includes(currentQuestion)) {
        await submitEmptyAnswer(currentQuestionData.question_id);
        setAnsweredQuestions((prev) => [...prev, currentQuestion]);
      }

      if (currentQuestion === totalQuestions) {
        // Jika semua soal sudah dijawab
        if (answeredQuestions.length === totalQuestions) {
          if (subjectId === "7") {
            navigate(`/siswa/tryout/${idTryout}/hasil`);
          } else {
            navigate(`/siswa/tryout/${idTryout}/${subjectId}/peralihan`);
          }
        } else {
          // Jika masih ada soal yang belum dijawab, cari soal berikutnya
          const nextUnanswered = findNextUnansweredQuestion();
          setCurrentQuestion(nextUnanswered);
          setSelectedAnswers({});
        }
      } else {
        setCurrentQuestion((prev) => prev + 1);
        setSelectedAnswers({});
      }
    } else if (direction === "prev" && currentQuestion > 1) {
      setCurrentQuestion((prev) => prev - 1);
      setSelectedAnswers({});
    }
  }

  // Peringatan waktu (5 menit)
  const isTimeWarning = timeLeft?.minutes < 5

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-[#F5F0E9] to-[#EAE5DE]">
        <div className="text-xl font-semibold text-gray-700">Memuat...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-[#F5F0E9] to-[#EAE5DE]">
        <div className="text-xl font-semibold text-red-600">Error: {error}</div>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-b from-[#F5F0E9] to-[#EAE5DE] flex flex-col items-center p-6 min-h-screen w-screen">
      <motion.div className="w-full max-w-6xl">
        <motion.div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <motion.div className="bg-gradient-to-br from-[#1E3A5F] to-[#2E4A7F] text-white p-6 rounded-xl shadow-lg w-full md:w-1/3">
            <motion.h2 className="text-xl font-bold text-center mb-6">
              Selamat Mengerjakan
            </motion.h2>

            {timeLeft && (
              <motion.div className={`${
                isTimeWarning ? "bg-red-500" : "bg-[#2C4A6E]"
              } text-white text-center py-3 px-4 rounded-xl mb-4`}>
                <Clock className="inline-block mr-2" size={20} />
                <span className="text-xl font-bold">
                  {String(timeLeft.minutes).padStart(2, "0")}:{String(timeLeft.seconds).padStart(2, "0")}
                </span>
              </motion.div>
            )}

            <motion.div className="bg-[#2C4A6E] text-white text-center py-3 px-4 rounded-xl mb-4">
              <User className="inline-block mr-2" size={18} />
              <span>{examData.studentData?.nama || "Siswa"}</span>
              <div className="text-sm text-gray-300">NISN: {examData.studentData?.nisn}</div>
            </motion.div>

            <motion.div className="bg-[#2C4A6E] text-white text-center py-3 px-4 rounded-xl mb-4">
              <BookOpen className="inline-block mr-2" size={18} />
              <span>{examData.subjectData?.subjek}</span>
              <div className="text-sm text-gray-300">{examData.subjectData?.kategori_subjek}</div>
            </motion.div>

            <div className="grid grid-cols-5 gap-2 mt-4">
              {Array.from({ length: totalQuestions }, (_, i) => (
                <motion.button
                  key={i}
                  onClick={() => setCurrentQuestion(i + 1)}
                  className={`p-2 rounded-lg ${
                    currentQuestion === i + 1 ? "ring-2 ring-white" : ""
                  } ${
                    answeredQuestions.includes(i + 1)
                      ? "bg-green-500"
                      : "bg-[#2C4A6E]"
                  }`}
                >
                  {i + 1}
                </motion.button>
              ))}
            </div>

            <div className="mt-4 bg-[#2C4A6E]/50 p-3 rounded-xl">
              <div className="flex justify-between text-sm">
                <span>Terjawab: {answeredQuestions.length}</span>
                <span>Sisa: {totalQuestions - answeredQuestions.length}</span>
              </div>
            </div>
          </motion.div>

          {/* Bagian Soal */}
          <motion.div className="bg-white p-6 rounded-xl shadow-lg w-full md:w-2/3">
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">
                Soal {currentQuestion} dari {totalQuestions}
              </h3>
              {currentQuestionData?.question_image && (
                <img 
                  src={currentQuestionData.question_image} 
                  alt="Soal" 
                  className="mb-4 rounded-lg max-w-full"
                />
              )}
              <p className="text-gray-700 whitespace-pre-wrap">
                {currentQuestionData?.question || "Pertanyaan tidak tersedia"}
              </p>
            </div>

            <div className="space-y-4 mt-6">
              {Array.isArray(currentQuestionData?.answer_options) && currentQuestionData.answer_options.length > 0 ? (
                currentQuestionData.answer_options.map((option) => (
                  <motion.button
                    key={option.answer_option_id || option.id}
                    onClick={() => handleAnswerSelect(option.answer_option_id || option.id)}
                    className={`w-full p-4 text-left rounded-xl ${
                      selectedAnswers[currentQuestion] === (option.answer_option_id || option.id)
                        ? "bg-green-500 text-white"
                        : "bg-gray-100 hover:bg-gray-200"
                    }`}
                  >
                    {option.text || option.answer_option}
                  </motion.button>
                ))
              ) : (
                <div className="text-gray-500 italic">Pilihan jawaban tidak tersedia</div>
              )}
            </div>

            <div className="flex justify-between mt-6">
              <button
                onClick={() => navigateQuestion("prev")}
                disabled={currentQuestion === 1}
                className={`flex items-center px-4 py-2 rounded-xl ${
                  currentQuestion === 1 ? "bg-gray-300" : "bg-[#1E3A5F] text-white"
                }`}
              >
                <ArrowLeft className="mr-2" size={16} />
                Sebelumnya
              </button>

              <button
                onClick={() => navigateQuestion("next")}
                disabled={false}
                className={`flex items-center px-4 py-2 rounded-xl ${
                  currentQuestion === totalQuestions ? "bg-[#1E3A5F] text-white" : "bg-[#1E3A5F] text-white"
                }`}
              >
                {currentQuestion === totalQuestions ? "Selesai" : "Selanjutnya"}
                <ArrowRight className="ml-2" size={16} />
              </button>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  )
}

