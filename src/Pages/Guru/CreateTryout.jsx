"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { FiPlus, FiX } from "react-icons/fi"
import axiosInstance from "../../api/axiosInstance"

const CreateTryout = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [formData, setFormData] = useState({
    nama: "",
    targetSoal: 160,
    status: "Show"
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const response = await axiosInstance.post("/API/teacher/tryout/create", formData)
      
      if (response.data.success) {
        // Navigate back to tryout list with success message
        navigate("/guru/tryout", {
          state: {
            notification: {
              type: 'success',
              message: 'Tryout berhasil dibuat!'
            }
          }
        })
      }
    } catch (err) {
      console.error('Error creating tryout:', err)
      setError(err.response?.data?.message || "Gagal membuat tryout")
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <div className="min-h-screen bg-[#f5f0e6] p-6">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-[#2f4a64]">Buat Tryout Baru</h1>
            <button
              className="text-gray-500 hover:text-gray-700"
              onClick={() => navigate("/guru/tryout")}
            >
              <FiX size={24} />
            </button>
          </div>

          {error && (
            <div className="mb-4 p-4 bg-red-100 text-red-800 rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="nama" className="block text-sm font-medium text-gray-700 mb-1">
                Nama Tryout
              </label>
              <input
                type="text"
                id="nama"
                name="nama"
                value={formData.nama}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2f4a64] focus:border-transparent"
                placeholder="Masukkan nama tryout"
                required
              />
            </div>

            <div>
              <label htmlFor="targetSoal" className="block text-sm font-medium text-gray-700 mb-1">
                Target Soal
              </label>
              <input
                type="number"
                id="targetSoal"
                name="targetSoal"
                value={formData.targetSoal}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2f4a64] focus:border-transparent"
                min="1"
                required
              />
            </div>

            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2f4a64] focus:border-transparent"
              >
                <option value="Show">Show</option>
                <option value="Hide">Hide</option>
              </select>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700"
                onClick={() => navigate("/guru/tryout")}
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-[#2f4a64] text-white rounded-lg hover:bg-[#1e364d] disabled:bg-gray-400"
                disabled={loading}
              >
                {loading ? "Menyimpan..." : "Simpan"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreateTryout
