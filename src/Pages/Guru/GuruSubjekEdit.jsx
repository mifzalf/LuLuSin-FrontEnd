"use client"

import { useState, useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import axiosInstance from "../../api/axiosInstance"

const GuruSubjekEdit = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [kategori, setKategori] = useState("")
  const [subjek, setSubjek] = useState("")
  const [subjectId, setSubjectId] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    const id = searchParams.get("id")
    setKategori(searchParams.get("kategori") || "")
    setSubjek(searchParams.get("subjek") || "")
    setSubjectId(id)
    if (!id) {
      setError("ID Subjek tidak ditemukan di URL.")
    }
  }, [searchParams])

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [notification])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!subjectId) {
      setError("Tidak dapat menyimpan, ID Subjek tidak valid.")
      return
    }

    setLoading(true)
    setError(null)
    setNotification(null)

    try {
      const payload = {
        subject_name: subjek,
      }

      console.log("Sending update request for ID:", subjectId, "Payload:", payload)

      const response = await axiosInstance.patch(`/API/teacher/subject/update/${subjectId}`, payload)

      console.log("Update response:", response.data)

      if (response.data.success) {
        setNotification({ type: 'success', message: 'Subjek berhasil diperbarui!' })
        setTimeout(() => {
          navigate("/guru/subjek")
        }, 1500)
      } else {
        throw new Error(response.data.message || 'Gagal memperbarui subjek')
      }

    } catch (err) {
      console.error('Update Error:', err)
      let errorMessage = err.response?.data?.message || err.message || 'Gagal memperbarui subjek.'

      if (err.response) {
        if (err.response.status === 401) {
           setError("Sesi anda telah berakhir. Silakan login kembali.");
           navigate('/login');
           return;
        }
        errorMessage = `Error ${err.response.status}: ${errorMessage}` 
      } else if (err.request) {
        errorMessage = 'Tidak dapat terhubung ke server.'
      }
      
      setError(errorMessage)
      setNotification({ type: 'error', message: errorMessage })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-[#F5EFE7] min-h-screen w-full">
      {/* Main Content */}
      <div className="flex items-start justify-center pt-16">
        <div className="bg-[#F5EFE7] rounded-3xl p-8 w-full max-w-2xl border border-[#D8C4B6] shadow-sm">
          <h2 className="text-xl font-bold text-[#213555] mb-6">Edit Subjek</h2>

          {notification && (
            <div className={`mb-4 p-3 rounded-lg text-sm ${notification.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {notification.message}
            </div>
          )}
          {error && !notification && (
             <div className="mb-4 p-3 rounded-lg text-sm bg-red-100 text-red-700">
               {error}
             </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-[#213555] text-sm font-medium mb-2">Kategori Subjek</label>
              <input
                type="text"
                value={kategori}
                onChange={(e) => setKategori(e.target.value)}
                className="w-full p-2 border border-[#D8C4B6] rounded-lg bg-white text-[#213555] outline-none focus:ring-1 focus:ring-[#3E5879]"
              />
            </div>

            <div className="mb-8">
              <label className="block text-[#213555] text-sm font-medium mb-2">Subjek</label>
              <input
                type="text"
                value={subjek}
                onChange={(e) => setSubjek(e.target.value)}
                className="w-full p-2 border border-[#D8C4B6] rounded-lg bg-white text-[#213555] outline-none focus:ring-1 focus:ring-[#3E5879]"
                required
              />
            </div>

            <hr className="border-t border-[#D8C4B6] mb-6" />

            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => navigate("/guru/subjek")}
                className="bg-[#968d84] text-white px-6 py-2 rounded-md hover:bg-[#7a7168] transition-colors disabled:opacity-50"
                disabled={loading}
              >
                Batalkan
              </button>
              <button
                type="submit"
                className="bg-[#3E5879] text-white px-6 py-2 rounded-md hover:bg-[#213555] transition-colors disabled:opacity-50"
                disabled={loading || !subjectId}
              >
                {loading ? 'Menyimpan...' : 'Simpan'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default GuruSubjekEdit

