"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { PlusCircle, X, Upload } from "lucide-react"
import { useParams, useNavigate } from "react-router-dom"
import axiosInstance from "../../api/axiosInstance"

// Main component
function GuruTryoutSubjek() {
  const { tryout_id, subject_id } = useParams()
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(true)
  const [formData, setFormData] = useState({
    question: '',
    score: '',
    answer_options: ['', '', '', ''],
    correct_answer: ''
  })
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [loading, setLoading] = useState(false)

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
        formDataToSend.append('answer_options', option)
      })
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
          answer_options: ['', '', '', ''],
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

  if (!tryout_id || !subject_id) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-red-600">ID Tryout atau ID Subjek tidak valid.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Main Content */}
      <main className="container mx-auto py-6 px-4">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Tes Potensi Skolastik</h2>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Pendoman Umum</h3>
            <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors">
              Buat Soal
            </button>
          </div>

          {/* Question Section */}
          <div className="border rounded-lg p-4 mb-6">
            <div className="flex justify-between items-start mb-2">
              <label className="font-medium text-gray-700">Soal</label>
              <button className="text-blue-600 flex items-center text-sm" onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? (
                  <>
                    <X className="w-4 h-4 mr-1" />
                    <span className="text-gray-600">Hide</span>
                  </>
                ) : (
                  <>
                    <PlusCircle className="w-4 h-4 mr-1" />
                    <span className="text-gray-600">Open</span>
                  </>
                )}
              </button>
            </div>

            {isOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-sm text-gray-700 mb-4">
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                  industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
                  scrambled it to make a type specimen book.
                </p>
              </motion.div>
            )}
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
              <label className="block font-medium mb-2 text-gray-700">Gambar</label>
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
              <label className="block font-medium mb-2 text-gray-700">Opsi</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {['A', 'B', 'C', 'D'].map((option, index) => (
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

