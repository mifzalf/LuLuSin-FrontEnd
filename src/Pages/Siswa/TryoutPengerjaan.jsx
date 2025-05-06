"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { Clock, User, BookOpen, ArrowLeft, ArrowRight, AlertTriangle } from "lucide-react"
import React from "react"
import { useParams } from "react-router-dom"
import axios from "axios"

export default function SiswaTryoutPengerjaan() {
  const { idTryout, idSubject } = useParams()
  const [currentQuestion, setCurrentQuestion] = useState(1)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [timeLeft, setTimeLeft] = useState({ minutes: 32, seconds: 56 })
  const [answeredQuestions, setAnsweredQuestions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [studentData, setStudentData] = useState(null)
  const [subjectData, setSubjectData] = useState(null)
  const [questionData, setQuestionData] = useState([])

  // Fetch tryout data
  useEffect(() => {
    const fetchTryoutData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/API/students/tryout/${idTryout}/${idSubject}/taking`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}` // Assuming you store the token in localStorage
            }
          }
        )
        const { studentData, subjectData, questionData } = response.data
        setStudentData(studentData)
        setSubjectData(subjectData)
        setQuestionData(questionData)
        setLoading(false)
      } catch (err) {
        setError(err.message)
        setLoading(false)
      }
    }

    fetchTryoutData()
  }, [idTryout, idSubject])

  // Total number of questions based on API response
  const totalQuestions = questionData.length

  // Function to handle question navigation
  const navigateQuestion = (direction) => {
    if (direction === "next" && currentQuestion < totalQuestions) {
      setCurrentQuestion((prev) => prev + 1)
      setSelectedAnswer(null)
    } else if (direction === "prev" && currentQuestion > 1) {
      setCurrentQuestion((prev) => prev - 1)
      setSelectedAnswer(null)
    }
  }

  // Function to directly go to a question
  const goToQuestion = (questionNumber) => {
    setCurrentQuestion(questionNumber)
    setSelectedAnswer(null)
  }

  // Function to handle answer selection
  const handleAnswerSelect = (index) => {
    setSelectedAnswer(index)
    if (!answeredQuestions.includes(currentQuestion)) {
      setAnsweredQuestions((prev) => [...prev, currentQuestion])
    }
  }

  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { minutes: prev.minutes - 1, seconds: 59 }
        } else {
          clearInterval(timer)
          return prev
        }
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

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

  // Warning time (5 minutes)
  const isTimeWarning = timeLeft.minutes < 5

  return (
    <div className="bg-gradient-to-b from-[#F5F0E9] to-[#EAE5DE] flex flex-col items-center p-6 min-h-screen w-screen">
      {loading ? (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-xl font-semibold text-gray-700">Loading...</div>
        </div>
      ) : error ? (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-xl font-semibold text-red-600">Error: {error}</div>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-6xl"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex flex-col md:flex-row gap-6"
          >
            {/* Sidebar */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="bg-gradient-to-br from-[#1E3A5F] to-[#2E4A7F] text-white p-6 rounded-xl shadow-lg w-full md:w-1/3"
              style={{ boxShadow: "0 10px 25px -5px rgba(30, 58, 95, 0.4)" }}
            >
              <motion.h2
                variants={itemVariants}
                className="text-xl font-bold text-center mb-6 flex items-center justify-center"
              >
                <span className="bg-blue-200 h-6 w-1.5 rounded-full mr-2"></span>
                Selamat Mengerjakan
              </motion.h2>

              <motion.div
                variants={itemVariants}
                className={`${
                  isTimeWarning
                    ? "bg-gradient-to-r from-red-500 to-orange-500 animate-pulse"
                    : "bg-gradient-to-r from-[#2C4A6E] to-[#3A5A80]"
                } text-white text-center py-3 px-4 rounded-xl mb-4 shadow-md flex items-center justify-center`}
              >
                <Clock className={`mr-2 ${isTimeWarning ? "animate-bounce" : ""}`} size={20} />
                <div>
                  <div className="font-semibold">Waktu Tersisa</div>
                  <div className="text-xl font-bold">
                    {String(timeLeft.minutes).padStart(2, "0")}:{String(timeLeft.seconds).padStart(2, "0")}
                  </div>
                </div>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="bg-gradient-to-r from-[#2C4A6E] to-[#3A5A80] text-white text-center py-3 px-4 rounded-xl mb-4 shadow-md"
              >
                <div className="flex items-center justify-center mb-1">
                  <User size={18} className="text-blue-200 mr-2" />
                  <span className="font-semibold">{studentData?.name}</span>
                </div>
                <div className="text-sm text-blue-200">{studentData?.id}</div>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="bg-gradient-to-r from-[#2C4A6E] to-[#3A5A80] text-white text-center py-3 px-4 rounded-xl mb-4 shadow-md"
              >
                <div className="flex items-center justify-center mb-1">
                  <BookOpen size={18} className="text-blue-200 mr-2" />
                  <span className="font-semibold">{subjectData?.name}</span>
                </div>
                <div className="text-sm text-blue-200">{subjectData?.description}</div>
              </motion.div>

              <motion.p variants={itemVariants} className="text-sm text-blue-200 mb-2 font-medium">
                Navigasi Soal:
              </motion.p>

              <motion.div variants={containerVariants} className="grid grid-cols-5 sm:grid-cols-6 gap-2">
                {Array.from({ length: totalQuestions }, (_, i) => (
                  <motion.button
                    key={i}
                    variants={itemVariants}
                    whileHover={{
                      scale: 1.1,
                      transition: { type: "spring", stiffness: 300 },
                    }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => goToQuestion(i + 1)}
                    className={`p-2 rounded-lg flex items-center justify-center ${
                      currentQuestion === i + 1 ? "ring-2 ring-white" : ""
                    } ${
                      answeredQuestions.includes(i + 1)
                        ? "bg-gradient-to-br from-green-400 to-green-500 text-black font-medium"
                        : "bg-[#2C4A6E]"
                    }`}
                  >
                    {i + 1}
                  </motion.button>
                ))}
              </motion.div>

              <motion.div variants={itemVariants} className="mt-6 bg-[#2C4A6E]/50 p-3 rounded-xl">
                <div className="flex justify-between text-sm text-blue-200">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-green-400 mr-1"></div>
                    <span>Terjawab: {answeredQuestions.length}</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-[#2C4A6E] mr-1"></div>
                    <span>Belum: {totalQuestions - answeredQuestions.length}</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Question Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="bg-gradient-to-br from-[#1E3A5F] to-[#2E4A7F] text-white p-6 rounded-xl shadow-lg w-full md:w-2/3 flex flex-col items-center"
              style={{ boxShadow: "0 10px 25px -5px rgba(30, 58, 95, 0.4)" }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="w-full bg-gray-200 rounded-xl mb-6 overflow-hidden shadow-md"
              >
                <div className="bg-[#2C4A6E] p-2 text-sm font-medium flex justify-between items-center">
                  <span>
                    Soal {currentQuestion} dari {totalQuestions}
                  </span>
                  <span className="bg-blue-200 text-[#1E3A5F] px-2 py-0.5 rounded-full text-xs font-bold">
                    {subjectData?.name}
                  </span>
                </div>
                <div className="p-4 bg-white">
                  <p className="text-gray-800">{questionData[currentQuestion - 1]?.question_text}</p>
                </div>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                className="text-center text-sm mb-6 bg-[#2C4A6E]/50 p-4 rounded-xl w-full"
              >
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                industry's standard dummy text ever since the 1500s.
              </motion.p>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                transition={{ delayChildren: 0.8 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full"
              >
                {questionData[currentQuestion - 1]?.options.map((option, index) => (
                  <motion.button
                    key={index}
                    variants={itemVariants}
                    custom={index}
                    whileHover={{
                      scale: 1.03,
                      backgroundColor: "#3A5A80",
                      transition: { type: "spring", stiffness: 300 },
                    }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleAnswerSelect(index)}
                    className={`p-4 rounded-xl text-left flex items-center shadow-md relative overflow-hidden ${
                      selectedAnswer === index
                        ? "bg-gradient-to-br from-green-400 to-green-500 text-black"
                        : "bg-[#2C4A6E]"
                    }`}
                  >
                    <div className="absolute top-0 right-0 w-20 h-20 bg-white rounded-bl-full opacity-10"></div>
                    <span className="bg-white/20 w-6 h-6 rounded-full flex items-center justify-center mr-3 text-sm font-medium">
                      {["A", "B", "C", "D"][index]}
                    </span>
                    {option}
                  </motion.button>
                ))}
              </motion.div>

              {isTimeWarning && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-red-500/20 text-white p-3 rounded-xl mt-4 text-center w-full flex items-center justify-center"
                >
                  <AlertTriangle className="mr-2" size={18} />
                  <p className="text-sm">Perhatian! Waktu pengerjaan hampir habis.</p>
                </motion.div>
              )}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.3, duration: 0.5 }}
                className="flex justify-between w-full mt-6"
              >
                <motion.button
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: "#2E4A7F",
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigateQuestion("prev")}
                  disabled={currentQuestion === 1}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium shadow-md ${
                    currentQuestion === 1 ? "bg-gray-500 cursor-not-allowed opacity-50" : "bg-[#2C4A6E]"
                  }`}
                >
                  <ArrowLeft size={16} />
                  Sebelumnya
                </motion.button>

                <motion.button
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: "#2E4A7F",
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigateQuestion("next")}
                  disabled={currentQuestion === totalQuestions}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium shadow-md ${
                    currentQuestion === totalQuestions ? "bg-gray-500 cursor-not-allowed opacity-50" : "bg-[#2C4A6E]"
                  }`}
                >
                  Selanjutnya
                  <ArrowRight size={16} />
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}

