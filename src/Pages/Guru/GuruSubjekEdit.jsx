"use client"

import { useState, useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import axiosInstance from "../../api/axiosInstance"

const GuruSubjekEdit = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [kategori, setKategori] = useState("")
  const [subjek, setSubjek] = useState("")
  const [timeLimit, setTimeLimit] = useState("")
  const [subjectId, setSubjectId] = useState(null)
  const [loading, setLoading] = useState(false)
  const [loadingData, setLoadingData] = useState(true)
  const [error, setError] = useState(null)
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    const id = searchParams.get("id")
    setSubjectId(id)

    if (!id) {
      setError("ID Subjek tidak ditemukan di URL.")
      setLoadingData(false)
      return
    }

    const fetchSubjectDetails = async () => {
      try {
        setLoadingData(true)
        setError(null)
        const response = await axiosInstance.get(`/API/teacher/subject/${id}`)
        if (response.data && response.data.datasubject) {
          const subjectData = response.data.datasubject; 
          setKategori(subjectData.category_name || searchParams.get("kategori") || "")
          setSubjek(subjectData.subject_name || "")
          setTimeLimit(subjectData.time_limit || "")
        } else {
          setKategori(searchParams.get("kategori") || "") 
          setSubjek(searchParams.get("subjek") || "")
          setTimeLimit("")
          console.warn("Could not fetch subject details, using URL parameters as fallback.")
        }
      } catch (err) {
        console.error("Error fetching subject details:", err)
        setError("Gagal memuat detail subjek. Menggunakan data dari URL.")
        setKategori(searchParams.get("kategori") || "") 
        setSubjek(searchParams.get("subjek") || "")
        setTimeLimit("") 
      } finally {
        setLoadingData(false)
      }
    }

    fetchSubjectDetails()

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
        time_limit: timeLimit === '' ? null : Number(timeLimit)
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

  if (loadingData) {
    return (
      <div className="bg-[#F5EFE7] min-h-screen w-full flex items-center justify-center">
        <div>Loading subject details...</div>
      </div>
    );
  }

  return (
    <div className="bg-[#F5EFE7] min-h-screen w-full flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl p-8 w-full max-w-2xl shadow-lg border border-gray-200"> 
        <h2 className="text-xl font-bold text-[#213555] mb-8">Edit Subjek</h2>

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

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-[#213555] text-sm font-medium mb-1">Kategori Subjek</label>
            <input
              type="text"
              value={kategori}
              readOnly 
              className="w-full p-3 border border-[#D8C4B6] rounded-full bg-gray-100 text-[#213555] outline-none cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-[#213555] text-sm font-medium mb-1">Subjek</label>
            <input
              type="text"
              value={subjek}
              onChange={(e) => setSubjek(e.target.value)}
              className="w-full p-3 border border-[#D8C4B6] rounded-full bg-white text-[#213555] outline-none focus:ring-1 focus:ring-[#3E5879]"
              required
            />
          </div>

          <div>
            <label className="block text-[#213555] text-sm font-medium mb-1">Waktu Pengerjaan <span className="text-xs text-gray-500">(Menit)</span></label>
            <input
              type="number"
              value={timeLimit}
              onChange={(e) => setTimeLimit(e.target.value)}
              className="w-full p-3 border border-[#D8C4B6] rounded-full bg-white text-[#213555] outline-none focus:ring-1 focus:ring-[#3E5879]"
              min="0"
              placeholder="Masukkan waktu dalam menit"
            />
          </div>

          <hr className="border-t border-[#D8C4B6] my-8" />

          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={() => navigate("/guru/subjek")}
              className="bg-gray-400 text-white px-8 py-2.5 rounded-full hover:bg-gray-500 transition-colors disabled:opacity-50"
              disabled={loading}
            >
              Batalkan
            </button>
            <button
              type="submit"
              className="bg-[#3E5879] text-white px-8 py-2.5 rounded-full hover:bg-[#213555] transition-colors disabled:opacity-50"
              disabled={loading || !subjectId}
            >
              {loading ? 'Menyimpan...' : 'Simpan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default GuruSubjekEdit

