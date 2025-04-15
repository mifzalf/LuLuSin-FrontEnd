"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { PlusCircle, X, Upload, ChevronDown, ChevronUp, Trash2, Edit } from "lucide-react"
import { useParams, useNavigate } from "react-router-dom"
import axiosInstance from "../../api/axiosInstance"

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
    <div className="min-h-screen bg-slate-100">
      <main className="container mx-auto py-6 px-4">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          {subjectData?.subject?.[0]?.subject_name || "Loading..."}
        </h2>

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
          {subjectData && subjectData.tryoutQuestionBySubject && subjectData.tryoutQuestionBySubject.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Soal yang Sudah Ada</h3>
              <div className="space-y-4">
                {subjectData.tryoutQuestionBySubject.map((question, index) => (
                  <motion.div
                    key={index}
                    className="border rounded-lg overflow-hidden"
                    initial={false}
                  >
                    <div className={`p-4 hover:bg-gray-50 transition-colors ${
                      expandedQuestions[index] ? 'bg-gray-50' : ''
                    }`}>
                      <div className="flex justify-between items-center">
                        <div 
                          className="flex items-center space-x-3 flex-grow cursor-pointer"
                          onClick={() => toggleQuestion(index)}
                        >
                          <span className="font-medium text-gray-700">Soal {index + 1}</span>
                          <span className="text-gray-500 text-sm">
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
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
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
                          className="border-t"
                        >
                          <div className="p-4">
                            <div className="mb-4">
                              <p className="text-gray-700 whitespace-pre-line">{question.question}</p>
                              {question.question_image && (
                                <img src={question.question_image} alt="Question" className="max-w-md mt-2" />
                              )}
                            </div>

                            <div className="space-y-1 mb-3">
                              <p className="font-medium text-gray-700 mb-1">Pilihan Jawaban:</p>
                              {question.answer_options.map((option, optIndex) => (
                                <p key={optIndex} className="text-gray-600 pl-4">
                                  {String.fromCharCode(65 + optIndex)}. {option.answer_option}
                                </p>
                              ))}
                            </div>

                            <div className="bg-gray-50 p-3 rounded-md mb-2">
                              <p className="font-medium text-gray-700">Jawaban Benar:</p>
                              <p className="text-green-600 mt-1">{question.correct_answer}</p>
                            </div>

                            <p className="text-sm text-gray-500">Nilai: {question.score}</p>
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
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Buat Soal Baru</h3>
          </div>

          {/* Form Section */}
          <form onSubmit={handleSubmit} className="border rounded-lg p-4">
            <div className="mb-4">
              <label className="block font-medium mb-2 text-gray-700">Soal</label>
              <motion.div whileTap={{ scale: 0.995 }}>
                <textarea
                  name="question"
                  value={formData.question}
                  onChange={(e) => handleInputChange(e)}
                  className="w-full border rounded-md p-2 focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none transition-all text-gray-800"
                  rows={3}
                  placeholder="Masukkan soal disini"
                  required
                />
              </motion.div>
            </div>

            <div className="mb-4">
              <label className="block font-medium mb-2 text-gray-700">Gambar (Opsional)</label>
              <div className="border rounded-md p-4">
                <div className="flex items-center justify-center mb-2">
                  <label className="cursor-pointer flex items-center text-sm text-gray-600">
                    <Upload className="w-4 h-4 mr-1" />
                    Pilih file
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
                  className="bg-gray-100 rounded-md flex items-center justify-center"
                  style={{ height: "120px" }}
                  whileHover={{ boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)" }}
                >
                  {preview ? (
                    <img
                      src={preview}
                      alt="Preview"
                      className="max-h-full max-w-full object-contain"
                    />
                  ) : (
                    <span className="text-gray-500">Preview gambar</span>
                  )}
                </motion.div>
              </div>
            </div>

            <div className="mb-4">
              <label className="block font-medium mb-2 text-gray-700">Opsi Jawaban</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {['A', 'B', 'C', 'D', 'E'].map((option, index) => (
                  <motion.div key={option} whileTap={{ scale: 0.98 }}>
                    <input
                      type="text"
                      name="answer_options"
                      value={formData.answer_options[index]}
                      onChange={(e) => handleInputChange(e, index)}
                      className="w-full border rounded-md p-2 focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none transition-all text-gray-800"
                      placeholder={`Opsi ${option}`}
                      required
                    />
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <label className="block font-medium mb-2 text-gray-700">Jawaban yang Benar</label>
              <motion.div whileTap={{ scale: 0.98 }}>
                <input
                  type="text"
                  name="correct_answer"
                  value={formData.correct_answer}
                  onChange={(e) => handleInputChange(e)}
                  className="w-full border rounded-md p-2 focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none transition-all text-gray-800"
                  placeholder="Masukkan jawaban yang benar"
                  required
                />
              </motion.div>
            </div>

            <div className="mb-6">
              <label className="block font-medium mb-2 text-gray-700">Nilai</label>
              <motion.div whileTap={{ scale: 0.98 }}>
                <input
                  type="number"
                  name="score"
                  value={formData.score}
                  onChange={(e) => handleInputChange(e)}
                  className="w-full border rounded-md p-2 focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none transition-all text-gray-800"
                  placeholder="Masukkan nilai"
                  required
                />
              </motion.div>
            </div>

            <div className="flex justify-between">
              <motion.button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={loading}
              >
                {loading ? 'Menyimpan...' : 'Simpan'}
              </motion.button>
              <motion.button
                type="button"
                onClick={handleBack}
                className="bg-red-500 px-4 py-2 rounded hover:bg-red-600 transition-colors text-white font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={loading}
              >
                Kembali
              </motion.button>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}

export default GuruTryoutSubjek

