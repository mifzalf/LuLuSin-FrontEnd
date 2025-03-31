"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, ChevronRight, Plus, Edit, Save, X } from "lucide-react"
import React from "react"

// Question type definition
// {
//   id: string
//   question: string
//   options: string[]
//   correctAnswer: string
//   explanation: string
// }

const GuruTryoutSubjek = () => {
  // Initial questions data
  const [questions, setQuestions] = useState([
    {
      id: "q1",
      question:
        "Jika sebuah mobil melaju dengan kecepatan 60 km/jam, maka mobil tersebut akan menempuh jarak 120 km dalam waktu 2 jam. Jika kecepatan mobil ditingkatkan menjadi 90 km/jam, berapa jam yang diperlukan untuk menempuh jarak yang sama?",
      options: ["1 jam", "1,25 jam", "1,33 jam", "1,5 jam"],
      correctAnswer: "C. 1,33 jam",
      explanation:
        "Untuk menyelesaikan soal ini, kita dapat menggunakan rumus:\n\nWaktu = Jarak ÷ Kecepatan\n\nJarak yang ditempuh adalah 120 km.\nKecepatan mobil adalah 90 km/jam.\nMaka waktu yang diperlukan = 120 ÷ 90 = 1,33 jam.\n\nJadi, jawaban yang benar adalah C. 1,33 jam.",
    },
    {
      id: "q2",
      question: "Berapakah hasil dari 25 × 4 ÷ 2?",
      options: ["40", "50", "100", "200"],
      correctAnswer: "B. 50",
      explanation:
        "Untuk menyelesaikan soal ini, kita menggunakan aturan operasi hitung:\n\n25 × 4 ÷ 2 = 100 ÷ 2 = 50\n\nJadi, jawaban yang benar adalah B. 50",
    },
    {
      id: "q3",
      question: "Manakah bilangan prima berikut yang terbesar?",
      options: ["17", "23", "29", "31"],
      correctAnswer: "D. 31",
      explanation:
        "Bilangan prima adalah bilangan yang hanya memiliki dua faktor: 1 dan bilangan itu sendiri.\n\nDari pilihan yang diberikan:\nA. 17 adalah bilangan prima\nB. 23 adalah bilangan prima\nC. 29 adalah bilangan prima\nD. 31 adalah bilangan prima\n\nBilangan terbesar di antara keempat pilihan tersebut adalah 31.\n\nJadi, jawaban yang benar adalah D. 31",
    },
    {
      id: "q4",
      question: "Jika 3x + 5 = 20, berapakah nilai x?",
      options: ["3", "5", "7", "15"],
      correctAnswer: "B. 5",
      explanation:
        "Kita perlu menyelesaikan persamaan 3x + 5 = 20\n3x + 5 = 20\n3x = 20 - 5\n3x = 15\nx = 15 ÷ 3\nx = 5\n\nJadi, jawaban yang benar adalah B. 5",
    },
  ])

  // State for open/closed accordions
  const [openQuestions, setOpenQuestions] = useState({})
  const [isHovered, setIsHovered] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  // State for editing
  const [editingQuestionId, setEditingQuestionId] = useState(null)
  const [editFormData, setEditFormData] = useState(null)
  const [isAddingQuestion, setIsAddingQuestion] = useState(false)
  const [newQuestion, setNewQuestion] = useState({
    id: "",
    question: "",
    options: ["", "", "", ""],
    correctAnswer: "",
    explanation: "",
  })

  // Toggle question accordion
  const toggleQuestion = (id) => {
    setOpenQuestions((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  // Start editing a question
  const startEditing = (question) => {
    setEditingQuestionId(question.id)
    setEditFormData({ ...question })
  }

  // Cancel editing
  const cancelEditing = () => {
    setEditingQuestionId(null)
    setEditFormData(null)
  }

  // Save edited question
  const saveEditedQuestion = () => {
    if (!editFormData) return

    setQuestions((prev) => prev.map((q) => (q.id === editFormData.id ? editFormData : q)))

    setEditingQuestionId(null)
    setEditFormData(null)
  }

  // Handle edit form changes
  const handleEditFormChange = (field, value) => {
    if (!editFormData) return

    setEditFormData((prev) => {
      if (!prev) return prev
      return { ...prev, [field]: value }
    })
  }

  // Handle option changes in edit form
  const handleOptionChange = (index, value) => {
    if (!editFormData) return

    const newOptions = [...editFormData.options]
    newOptions[index] = value

    setEditFormData((prev) => {
      if (!prev) return prev
      return { ...prev, options: newOptions }
    })
  }

  // Start adding a new question
  const startAddingQuestion = () => {
    setIsAddingQuestion(true)
    setNewQuestion({
      id: `q${questions.length + 1}`,
      question: "",
      options: ["", "", "", ""],
      correctAnswer: "",
      explanation: "",
    })
  }

  // Cancel adding a question
  const cancelAddingQuestion = () => {
    setIsAddingQuestion(false)
    setNewQuestion({
      id: "",
      question: "",
      options: ["", "", "", ""],
      correctAnswer: "",
      explanation: "",
    })
  }

  // Save new question
  const saveNewQuestion = () => {
    if (
      !newQuestion.question ||
      newQuestion.options.some((opt) => !opt) ||
      !newQuestion.correctAnswer ||
      !newQuestion.explanation
    ) {
      alert("Harap isi semua bidang")
      return
    }

    setQuestions((prev) => [...prev, newQuestion])
    setIsAddingQuestion(false)
    setNewQuestion({
      id: "",
      question: "",
      options: ["", "", "", ""],
      correctAnswer: "",
      explanation: "",
    })
  }

  // Handle new question form changes
  const handleNewQuestionChange = (field, value) => {
    setNewQuestion((prev) => ({ ...prev, [field]: value }))
  }

  // Handle option changes in new question form
  const handleNewOptionChange = (index, value) => {
    const newOptions = [...newQuestion.options]
    newOptions[index] = value
    setNewQuestion((prev) => ({ ...prev, options: newOptions }))
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
    hover: {
      scale: 1.02,
      boxShadow: "0px 5px 15px rgba(0,0,0,0.1)",
      transition: { type: "spring", stiffness: 400, damping: 10 },
    },
  }

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 400, damping: 10 },
    },
    hover: {
      scale: 1.05,
      backgroundColor: "#1e3247",
      transition: { type: "spring", stiffness: 400, damping: 10 },
    },
    tap: { scale: 0.95 },
  }

  const accordionVariants = {
    open: {
      height: "auto",
      opacity: 1,
      transition: {
        height: {
          type: "spring",
          stiffness: 300,
          damping: 30,
        },
        opacity: { duration: 0.2 },
      },
    },
    closed: {
      height: 0,
      opacity: 0,
      transition: {
        height: {
          type: "spring",
          stiffness: 300,
          damping: 30,
        },
        opacity: { duration: 0.2 },
      },
    },
  }

  // Question edit form component
  const QuestionEditForm = ({ question }) => (
    <div className="p-4 bg-white border border-gray-200 rounded-md shadow-sm">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Pertanyaan:</label>
        <textarea
          className="w-full p-2 border border-gray-300 rounded-md text-black"
          value={editFormData?.question || ""}
          onChange={(e) => handleEditFormChange("question", e.target.value)}
          rows={3}
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Pilihan Jawaban:</label>
        {editFormData?.options.map((option, index) => (
          <div key={index} className="flex items-center mb-2">
            <span className="font-semibold mr-2 text-black">{String.fromCharCode(65 + index)}.</span>
            <input
              type="text"
              className="flex-1 p-2 border border-gray-300 rounded-md text-black"
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
            />
          </div>
        ))}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Jawaban Benar:</label>
        <select
          className="w-full p-2 border border-gray-300 rounded-md text-black"
          value={editFormData?.correctAnswer || ""}
          onChange={(e) => handleEditFormChange("correctAnswer", e.target.value)}
        >
          <option value="">Pilih jawaban benar</option>
          <option value="A. 1 jam">A. {editFormData?.options[0]}</option>
          <option value="B. 1,25 jam">B. {editFormData?.options[1]}</option>
          <option value="C. 1,33 jam">C. {editFormData?.options[2]}</option>
          <option value="D. 1,5 jam">D. {editFormData?.options[3]}</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Pembahasan:</label>
        <textarea
          className="w-full p-2 border border-gray-300 rounded-md text-black"
          value={editFormData?.explanation || ""}
          onChange={(e) => handleEditFormChange("explanation", e.target.value)}
          rows={5}
        />
      </div>

      <div className="flex justify-end space-x-2">
        <motion.button
          className="bg-gray-500 text-white px-4 py-2 rounded-md"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={cancelEditing}
        >
          <X className="w-4 h-4 mr-1 inline" />
          Batal
        </motion.button>
        <motion.button
          className="bg-green-600 text-white px-4 py-2 rounded-md"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={saveEditedQuestion}
        >
          <Save className="w-4 h-4 mr-1 inline" />
          Simpan
        </motion.button>
      </div>
    </div>
  )

  // New question form component
  const NewQuestionForm = () => (
    <div className="p-4 bg-white border border-gray-200 rounded-md shadow-sm mt-4">
      <h3 className="text-lg font-semibold mb-4 text-black">Tambah Soal Baru</h3>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Pertanyaan:</label>
        <textarea
          className="w-full p-2 border border-gray-300 rounded-md text-black"
          value={newQuestion.question}
          onChange={(e) => handleNewQuestionChange("question", e.target.value)}
          rows={3}
          placeholder="Masukkan pertanyaan di sini"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Pilihan Jawaban:</label>
        {newQuestion.options.map((option, index) => (
          <div key={index} className="flex items-center mb-2">
            <span className="font-semibold mr-2 text-black">{String.fromCharCode(65 + index)}.</span>
            <input
              type="text"
              className="flex-1 p-2 border border-gray-300 rounded-md text-black"
              value={option}
              onChange={(e) => handleNewOptionChange(index, e.target.value)}
              placeholder={`Pilihan ${String.fromCharCode(65 + index)}`}
            />
          </div>
        ))}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Jawaban Benar:</label>
        <select
          className="w-full p-2 border border-gray-300 rounded-md text-black"
          value={newQuestion.correctAnswer}
          onChange={(e) => handleNewQuestionChange("correctAnswer", e.target.value)}
        >
          <option value="">Pilih jawaban benar</option>
          <option value={`A. ${newQuestion.options[0]}`}>A. {newQuestion.options[0] || "Pilihan A"}</option>
          <option value={`B. ${newQuestion.options[1]}`}>B. {newQuestion.options[1] || "Pilihan B"}</option>
          <option value={`C. ${newQuestion.options[2]}`}>C. {newQuestion.options[2] || "Pilihan C"}</option>
          <option value={`D. ${newQuestion.options[3]}`}>D. {newQuestion.options[3] || "Pilihan D"}</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Pembahasan:</label>
        <textarea
          className="w-full p-2 border border-gray-300 rounded-md text-black"
          value={newQuestion.explanation}
          onChange={(e) => handleNewQuestionChange("explanation", e.target.value)}
          rows={5}
          placeholder="Masukkan pembahasan jawaban di sini"
        />
      </div>

      <div className="flex justify-end space-x-2">
        <motion.button
          className="bg-gray-500 text-white px-4 py-2 rounded-md"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={cancelAddingQuestion}
        >
          <X className="w-4 h-4 mr-1 inline" />
          Batal
        </motion.button>
        <motion.button
          className="bg-green-600 text-white px-4 py-2 rounded-md"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={saveNewQuestion}
        >
          <Save className="w-4 h-4 mr-1 inline" />
          Simpan
        </motion.button>
      </div>
    </div>
  )

  return (
    <div className="fixed inset-0 bg-[#f5f0e8] overflow-auto flex flex-col items-center p-6">
      {!isOpen ? (
        <motion.button
          className="bg-[#2e4460] text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-lg hover:bg-[#1e3247] transition"
          onClick={() => setIsOpen(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Buka Tes Potensi Skolastik
        </motion.button>
      ) : (
        <AnimatePresence>
          <motion.div
            key="content"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="bg-white w-full max-w-[95vw] rounded-lg shadow-lg border mb-20"
          >
            <motion.div className="p-6 flex justify-between items-center">
              <motion.h1 className="text-2xl font-bold text-gray-800">Tes Potensi Skolastik</motion.h1>
              <div className="flex items-center gap-3">
                <motion.button
                  className="bg-teal-600 text-white px-4 py-2 rounded-md flex items-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={startAddingQuestion}
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Tambah Soal
                </motion.button>
                <motion.button
                  className="bg-red-600 text-white px-4 py-2 rounded-md"
                  onClick={() => setIsOpen(false)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Tutup
                </motion.button>
              </div>
            </motion.div>

            {/* Content area with scrolling */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="max-h-[calc(100vh-200px)] overflow-auto"
            >
              {/* Penalaran Umum Section */}
              <motion.div className="border-t border-gray-200 p-6">
                <motion.h2 className="text-lg font-semibold text-black mb-4" variants={itemVariants}>
                  Penalaran Umum
                </motion.h2>

                {/* Questions List */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {questions.map((question) => (
                    <React.Fragment key={question.id}>
                      {editingQuestionId === question.id ? (
                        <QuestionEditForm question={question} />
                      ) : (
                        <motion.div
                          className="mb-6 border border-gray-200 rounded-md overflow-hidden"
                          variants={itemVariants}
                          whileHover={{ boxShadow: "0px 4px 12px rgba(0,0,0,0.08)" }}
                        >
                          <motion.div
                            className="flex justify-between items-center p-4 cursor-pointer bg-white hover:bg-gray-50"
                            onClick={() => toggleQuestion(question.id)}
                          >
                            <p className="font-medium text-black pr-4">{question.question}</p>
                            <motion.div
                              animate={{ rotate: openQuestions[question.id] ? 90 : 0 }}
                              transition={{ duration: 0.2 }}
                              className="flex-shrink-0"
                            >
                              {openQuestions[question.id] ? (
                                <ChevronDown className="text-teal-500" />
                              ) : (
                                <ChevronRight className="text-gray-500" />
                              )}
                            </motion.div>
                          </motion.div>

                          <AnimatePresence initial={false}>
                            {openQuestions[question.id] && (
                              <motion.div
                                variants={accordionVariants}
                                initial="closed"
                                animate="open"
                                exit="closed"
                                className="overflow-hidden border-t border-gray-200"
                              >
                                <div className="p-4 bg-gray-50">
                                  <div className="space-y-2 mb-4">
                                    {question.options.map((option, index) => (
                                      <div key={index} className="flex items-center">
                                        <span className="font-semibold mr-2 text-black">{String.fromCharCode(65 + index)}.</span>
                                        <span className="text-black">{option}</span>
                                      </div>
                                    ))}
                                  </div>

                                  <div className="mb-3 pt-2 border-t border-gray-200">
                                    <div className="font-bold text-black mb-2">
                                      Jawaban yang benar: {question.correctAnswer}
                                    </div>
                                  </div>

                                  <div className="pt-2 border-t border-gray-200">
                                    <div className="font-semibold mb-1 text-black">Pembahasan:</div>
                                    <div className="text-black whitespace-pre-line">{question.explanation}</div>

                                    {/* Edit button inside question */}
                                    <div className="flex justify-end mt-4">
                                      <motion.button
                                        className="bg-[#2e4460] text-white px-6 py-2 rounded-md text-sm transition relative overflow-hidden"
                                        variants={buttonVariants}
                                        whileHover="hover"
                                        whileTap="tap"
                                        onHoverStart={() => setIsHovered(true)}
                                        onHoverEnd={() => setIsHovered(false)}
                                        onClick={() => startEditing(question)}
                                      >
                                        <Edit className="w-4 h-4 mr-2 inline" />
                                        <motion.span
                                          initial={{ x: 0 }}
                                          animate={{ x: isHovered ? -5 : 0 }}
                                          transition={{ duration: 0.2 }}
                                        >
                                          Edit
                                        </motion.span>
                                        <AnimatePresence>
                                          {isHovered && (
                                            <motion.span
                                              className="absolute right-4"
                                              initial={{ opacity: 0, x: -10 }}
                                              animate={{ opacity: 1, x: 0 }}
                                              exit={{ opacity: 0, x: -10 }}
                                              transition={{ duration: 0.2 }}
                                            >
                                              →
                                            </motion.span>
                                          )}
                                        </AnimatePresence>
                                      </motion.button>
                                    </div>
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      )}
                    </React.Fragment>
                  ))}
                </div>

                {/* New question form */}
                {isAddingQuestion && <NewQuestionForm />}
              </motion.div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  )
}

export default GuruTryoutSubjek