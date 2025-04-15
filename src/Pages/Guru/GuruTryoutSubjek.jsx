"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { PlusCircle, X, Upload, ChevronDown, ChevronUp, Trash2, Edit } from "lucide-react"
import { useParams, useNavigate } from "react-router-dom"
import axiosInstance from "../../api/axiosInstance"
import { FiArrowLeft, FiArrowRight } from "react-icons/fi"

// Main component
function GuruTryoutSubjek() {
  const { tryout_id, subject_id } = useParams()
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(true)
  const [expandedQuestions, setExpandedQuestions] = useState({})
  const [formData, setFormData] = useState({
    question: '',
    score: '',
    answer_options: ['', '', '', '', ''],
    correct_answer: ''
  })
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [loading, setLoading] = useState(false)
  const [subjectData, setSubjectData] = useState(null)
  const [error, setError] = useState(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [questionToDelete, setQuestionToDelete] = useState(null)

  useEffect(() => {
    const fetchSubjectData = async () => {
      try {
        const response = await axiosInstance.get(`/API/teacher/tryout/${tryout_id}/${subject_id}`)
        setSubjectData(response.data)
      } catch (err) {
        console.error('Error fetching subject data:', err)
        setError(err.response?.data?.message || 'Failed to fetch subject data')
      }
    }

    if (tryout_id && subject_id) {
      fetchSubjectData()
    }
  }, [tryout_id, subject_id])

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0] || null
    setFile(selectedFile)

    if (selectedFile) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result)
      }
      reader.readAsDataURL(selectedFile)
    } else {
      setPreview(null)
    }
  }

  const handleInputChange = (e, index) => {
    const { name, value } = e.target
    if (name === 'answer_options') {
      const newOptions = [...formData.answer_options]
      newOptions[index] = value
      setFormData(prev => ({
        ...prev,
        answer_options: newOptions
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      const formDataToSend = new FormData()
      formDataToSend.append('question', formData.question)
      formDataToSend.append('score', formData.score)
      formData.answer_options.forEach((option) => {
        formDataToSend.append('answer_options', JSON.stringify({ answer_option: option }))
      })
      formDataToSend.append('correct_answer', formData.correct_answer)
      if (file) {
        formDataToSend.append('question_image', file)
      }

      const response = await axiosInstance.post(
        `/API/teacher/tryout/${tryout_id}/${subject_id}/create_question`,
        formDataToSend,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )

      if (response.status === 201) {
        alert('Soal berhasil disimpan!')
        // Reset form
        setFormData({
          question: '',
          score: '',
          answer_options: ['', '', '', '', ''],
          correct_answer: ''
        })
        setFile(null)
        setPreview(null)
        
        // Navigate back to tryout detail
        navigate(`/guru/tryout/${tryout_id}`)
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      alert(error.response?.data?.message || 'Gagal menyimpan soal. Silakan coba lagi.')
    } finally {
      setLoading(false)
    }
  }

  const handleBack = () => {
    navigate(`/guru/tryout/${tryout_id}`)
  }

  const toggleQuestion = (index) => {
    setExpandedQuestions(prev => ({
      ...prev,
      [index]: !prev[index]
    }))
  }

  const handleEdit = (question) => {
    setFormData({
      question: question.question,
      score: question.score,
      answer_options: question.answer_options.map(opt => opt.answer_option),
      correct_answer: question.correct_answer
    })
    
    window.scrollTo({
      top: document.querySelector('form').offsetTop - 100,
      behavior: 'smooth'
    })
  }

  const handleDelete = async (questionId) => {
    try {
      await axiosInstance.delete(`/API/teacher/tryout/${tryout_id}/${subject_id}/delete_question/${questionId}`)
      
      const response = await axiosInstance.get(`/API/teacher/tryout/${tryout_id}/${subject_id}`)
      setSubjectData(response.data)
      
      setShowDeleteConfirm(false)
      setQuestionToDelete(null)
      
      alert('Soal berhasil dihapus!')
    } catch (error) {
      console.error('Error deleting question:', error)
      alert(error.response?.data?.message || 'Gagal menghapus soal. Silakan coba lagi.')
    }
  }

  const openDeleteConfirm = (question) => {
    setQuestionToDelete(question)
    setShowDeleteConfirm(true)
  }

  if (!tryout_id || !subject_id) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-red-600">ID Tryout atau ID Subjek tidak valid.</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <main className="container mx-auto py-6 px-4">
        <div className="bg-blue-600 text-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-2xl font-bold">
            {subjectData?.subject?.[0]?.subject_name || "Loading..."}
          </h2>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          {/* Delete Confirmation Modal */}
          {showDeleteConfirm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full mx-4">
                <h3 className="text-lg font-semibold mb-4">Konfirmasi Hapus</h3>
                <p className="text-gray-600 mb-6">Apakah Anda yakin ingin menghapus soal ini?</p>
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setShowDeleteConfirm(false)}
                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
                  >
                    Batal
                  </button>
                  <button
                    onClick={() => handleDelete(questionToDelete)}
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                  >
                    Hapus
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Existing Questions Section */}
          {subjectData && subjectData.tryoutQuestionBySubject && (
            <div className="mb-6">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center space-x-4">
                  <h3 className="text-xl font-semibold text-gray-800">Soal yang Sudah Ada</h3>
                  <span className="bg-blue-600 text-white text-sm font-medium px-3 py-1 rounded-full">
                    {subjectData.tryoutQuestionBySubject.length} Soal
                  </span>
                </div>
                <button
                  onClick={() => {
                    window.scrollTo({
                      top: document.querySelector('form').offsetTop - 100,
                      behavior: 'smooth'
                    })
                  }}
                  className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors shadow-sm"
                >
                  <PlusCircle className="w-5 h-5" />
                  <span>Buat Soal Baru</span>
                </button>
              </div>

              <div className="space-y-4">
                {subjectData.tryoutQuestionBySubject.map((question, index) => (
                  <motion.div
                    key={index}
                    className="border border-blue-600/20 rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow"
                    initial={false}
                  >
                    <div className={`p-4 hover:bg-blue-50 transition-colors ${
                      expandedQuestions[index] ? 'bg-blue-50' : ''
                    }`}>
                      <div className="flex justify-between items-center">
                        <div 
                          className="flex items-center space-x-3 flex-grow cursor-pointer"
                          onClick={() => toggleQuestion(index)}
                        >
                          <span className="font-medium text-blue-600">Soal {index + 1}</span>
                          <span className="text-gray-600 text-sm">
                            {question.question.length > 100
                              ? question.question.substring(0, 100) + "..."
                              : question.question}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2 ml-4">
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              handleEdit(question)
                            }}
                            className="p-2 text-blue-600 hover:bg-blue-600/10 rounded-full transition-colors"
                            title="Edit Soal"
                          >
                            <Edit className="w-5 h-5" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              openDeleteConfirm(question)
                            }}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                            title="Hapus Soal"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => toggleQuestion(index)}
                            className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors"
                          >
                            {expandedQuestions[index] ? (
                              <ChevronUp className="w-5 h-5" />
                            ) : (
                              <ChevronDown className="w-5 h-5" />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>

                    <AnimatePresence>
                      {expandedQuestions[index] && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="border-t border-blue-600/20"
                        >
                          <div className="p-4 bg-white">
                            <div className="mb-4">
                              <p className="text-gray-700 whitespace-pre-line">{question.question}</p>
                              {question.question_image && (
                                <img src={question.question_image} alt="Question" className="max-w-md mt-2 rounded-lg" />
                              )}
                            </div>

                            <div className="space-y-1 mb-3">
                              <p className="font-medium text-gray-700 mb-2">Pilihan Jawaban:</p>
                              {question.answer_options.map((option, optIndex) => (
                                <p key={optIndex} className="text-gray-600 pl-4 py-1 hover:bg-blue-50 rounded-md transition-colors">
                                  {String.fromCharCode(65 + optIndex)}. {option.answer_option}
                                </p>
                              ))}
                            </div>

                            <div className="bg-blue-600/10 p-4 rounded-lg mb-2">
                              <p className="font-medium text-gray-700">Jawaban Benar:</p>
                              <p className="text-blue-600 mt-1 font-medium">{question.correct_answer}</p>
                            </div>

                            <div className="flex items-center space-x-2">
                              <span className="text-sm font-medium text-gray-600">Nilai:</span>
                              <span className="text-sm bg-blue-600 text-white px-3 py-1 rounded-full">
                                {question.score}
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Create New Question Form */}
          <div className="flex justify-center items-center bg-gradient-to-b from-amber-50 to-amber-100 p-4 rounded-lg">
            <motion.div
              className="border-2 border-[#213555] rounded-2xl p-8 w-full max-w-xl bg-white shadow-lg"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <motion.h2
                className="text-xl font-bold mb-6 text-[#213555] relative"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Buat Soal Baru
                <motion.div
                  className="absolute -bottom-2 left-0 h-1 bg-[#4F709C] rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "60px" }}
                  transition={{ delay: 0.4, duration: 0.4 }}
                />
              </motion.h2>

              <form onSubmit={handleSubmit}>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6"
                >
                  {/* Question Input */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-[#213555]">Soal</label>
                    <motion.textarea
                      name="question"
                      value={formData.question}
                      onChange={(e) => handleInputChange(e)}
                      className="w-full p-3 border border-[#213555] bg-[#F8F9FA] rounded-lg h-32 focus:outline-none focus:ring-2 focus:ring-[#4F709C] focus:border-transparent transition-all text-black"
                      placeholder="Masukkan soal disini"
                      required
                      whileFocus={{ boxShadow: "0 0 0 3px rgba(33, 53, 85, 0.2)" }}
                    />
                  </div>

                  {/* Image Upload */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-[#213555]">Gambar (Opsional)</label>
                    <motion.div
                      className="border-2 border-dashed border-[#213555] rounded-lg p-4 bg-[#F8F9FA]"
                      whileHover={{ borderColor: "rgba(79, 112, 156, 0.8)" }}
                    >
                      <div className="flex items-center justify-center mb-2">
                        <label className="cursor-pointer flex items-center space-x-2 text-sm text-[#213555] hover:text-[#4F709C] transition-colors">
                          <Upload className="w-5 h-5" />
                          <span>Pilih file</span>
                          <input 
                            type="file" 
                            className="hidden" 
                            accept="image/*" 
                            onChange={handleFileChange}
                            name="question_image"
                          />
                        </label>
                      </div>

                      <motion.div
                        className="bg-white rounded-md flex items-center justify-center"
                        style={{ height: "120px" }}
                        whileHover={{ boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)" }}
                      >
                        {preview ? (
                          <img
                            src={preview}
                            alt="Preview"
                            className="max-h-full max-w-full object-contain rounded-md"
                          />
                        ) : (
                          <span className="text-gray-400">Preview gambar</span>
                        )}
                      </motion.div>
                    </motion.div>
                  </div>

                  {/* Answer Options */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <label className="block text-sm font-bold text-[#213555]">Opsi Jawaban</label>
                    </div>
                    <motion.div
                      className="border border-[#213555] bg-[#F8F9FA] p-4 rounded-lg space-y-3"
                      variants={{
                        visible: {
                          transition: {
                            staggerChildren: 0.05
                          }
                        }
                      }}
                    >
                      {['A', 'B', 'C', 'D', 'E'].map((option, index) => (
                        <motion.div
                          key={option}
                          className="flex items-center gap-2"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="flex-grow relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-medium text-[#213555]">
                              {option}.
                            </span>
                            <motion.input
                              type="text"
                              name="answer_options"
                              value={formData.answer_options[index]}
                              onChange={(e) => handleInputChange(e, index)}
                              className="w-full pl-8 pr-3 py-2 border border-[#213555] bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4F709C] focus:border-transparent text-black"
                              placeholder={`Opsi ${option}`}
                              required
                              whileFocus={{
                                boxShadow: "0 0 0 3px rgba(33, 53, 85, 0.2)",
                              }}
                            />
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>

                  {/* Correct Answer */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-[#213555]">Jawaban yang Benar</label>
                    <motion.input
                      type="text"
                      name="correct_answer"
                      value={formData.correct_answer}
                      onChange={(e) => handleInputChange(e)}
                      className="w-full p-3 border border-[#213555] bg-[#F8F9FA] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4F709C] focus:border-transparent text-black"
                      placeholder="Masukkan jawaban yang benar"
                      required
                      whileFocus={{ boxShadow: "0 0 0 3px rgba(33, 53, 85, 0.2)" }}
                    />
                  </div>

                  {/* Score */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-[#213555]">Nilai</label>
                    <motion.input
                      type="number"
                      name="score"
                      value={formData.score}
                      onChange={(e) => handleInputChange(e)}
                      className="w-full p-3 border border-[#213555] bg-[#F8F9FA] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4F709C] focus:border-transparent text-black"
                      placeholder="Masukkan nilai"
                      required
                      whileFocus={{ boxShadow: "0 0 0 3px rgba(33, 53, 85, 0.2)" }}
                    />
                  </div>

                  {/* Action Buttons */}
                  <motion.div
                    variants={{
                      hidden: { opacity: 0, x: -10 },
                      visible: {
                        opacity: 1,
                        x: 0,
                        transition: { type: "spring", stiffness: 100 },
                      },
                    }}
                    className="flex justify-between mt-8 gap-4"
                  >
                    <motion.button
                      type="button"
                      onClick={handleBack}
                      className="bg-gray-500 text-white px-5 py-2 rounded-lg hover:bg-gray-600 flex items-center gap-2 shadow-md"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FiArrowLeft size={16} /> Batalkan
                    </motion.button>
                    <motion.button
                      type="submit"
                      className="bg-gradient-to-r from-[#213555] to-[#4F709C] text-white px-5 py-2 rounded-lg hover:bg-[#4F709C] flex items-center gap-2 shadow-md"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      disabled={loading}
                    >
                      {loading ? (
                        "Menyimpan..."
                      ) : (
                        <>
                          Simpan <FiArrowRight size={16} />
                        </>
                      )}
                    </motion.button>
                  </motion.div>
                </motion.div>
              </form>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default GuruTryoutSubjek

