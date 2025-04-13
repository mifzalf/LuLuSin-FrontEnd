"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axiosInstance from "../../api/axiosInstance"

const GuruSubjekCreate = () => {
  const navigate = useNavigate()
  const [selectedKategoriId, setSelectedKategoriId] = useState("")
  const [kategoriList, setKategoriList] = useState([])
  const [loadingKategori, setLoadingKategori] = useState(true)
  const [errorKategori, setErrorKategori] = useState(null)
  const [subjek, setSubjek] = useState("")
  const [timeLimit, setTimeLimit] = useState("")
  const [minSoal, setMinSoal] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    const fetchKategori = async () => {
      setLoadingKategori(true);
      setErrorKategori(null);
      try {
        const response = await axiosInstance.get("/API/teacher/subjectcategory");
        if (response.data && response.data.dataSubjectCategory) {
          setKategoriList(response.data.dataSubjectCategory);
        } else {
          setErrorKategori("Gagal memuat daftar kategori: Format data tidak sesuai.");
        }
      } catch (err) {
        console.error("Error fetching kategori:", err);
        setErrorKategori(err.response?.data?.message || "Gagal memuat daftar kategori.");
      } finally {
        setLoadingKategori(false);
      }
    };
    fetchKategori();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setNotification(null)

    if (!selectedKategoriId || !subjek) {
      setError("Kategori dan Subjek wajib diisi.")
      setLoading(false)
      return
    }

    if (minSoal !== '' && Number(minSoal) < 0) {
        setError("Minimal Soal tidak boleh negatif.");
        setLoading(false);
        return;
    }

    if (timeLimit !== '' && Number(timeLimit) < 0) {
        setError("Waktu Pengerjaan tidak boleh negatif.");
        setLoading(false);
        return;
    }

    try {
      const payload = {
        id_subject_category: selectedKategoriId,
        subject_name: subjek.trim(),
        time_limit: timeLimit ? parseInt(timeLimit) : 0,
        min_soal: minSoal ? parseInt(minSoal) : 0
      }

      console.log("Sending create request:", payload)

      const response = await axiosInstance.post("/API/teacher/subject/create", payload)

      console.log("Create response:", response.data)

      if (response.status === 201 || response.data?.success || response.data?.message?.includes('CREATED')) {
        navigate("/guru/subjek", {
          state: {
            notification: {
              type: 'success',
              message: 'Subjek berhasil dibuat!'
            }
          }
        })
      } else {
        throw new Error(response.data?.message || 'Gagal membuat subjek')
      }

    } catch (err) {
      console.error('Create Error:', err)
      let errorMessage = err.response?.data?.message || err.message || 'Gagal membuat subjek.'
      if (err.response?.status === 401) {
        errorMessage = "Sesi anda telah berakhir. Silakan login kembali.";
        navigate('/login');
      } else if (err.response) {
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
    <div className="bg-[#F5EFE7] min-h-screen w-full flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl p-8 w-full max-w-2xl shadow-lg border border-gray-200">
        <h2 className="text-xl font-bold text-[#213555] mb-8">Tambah Subjek</h2>

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
        {errorKategori && (
           <div className="mb-4 p-3 rounded-lg text-sm bg-yellow-100 text-yellow-700">
             Error memuat kategori: {errorKategori}
           </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="kategori" className="block text-[#213555] text-sm font-medium mb-1">Kategori Subjek</label>
            <select
              id="kategori"
              value={selectedKategoriId}
              onChange={(e) => setSelectedKategoriId(e.target.value)}
              className="w-full p-3 border border-[#D8C4B6] rounded-full bg-white text-[#213555] outline-none focus:ring-1 focus:ring-[#3E5879] disabled:bg-gray-100"
              required
              disabled={loadingKategori}
            >
              <option value="" disabled> -- {loadingKategori ? 'Memuat kategori...' : 'Pilih Kategori Subjek'} -- </option>
              {!loadingKategori && kategoriList.map((kat) => (
                <option key={kat.subject_category_id} value={kat.subject_category_id}>
                  {kat.subject_category_name}
                </option>
              ))}
            </select>
            {loadingKategori && <p className="text-xs text-gray-500 mt-1">Memuat daftar kategori...</p>}
          </div>

          <div>
            <label htmlFor="subjek" className="block text-[#213555] text-sm font-medium mb-1">Subjek</label>
            <input
              id="subjek"
              type="text"
              value={subjek}
              onChange={(e) => setSubjek(e.target.value)}
              className="w-full p-3 border border-[#D8C4B6] rounded-full bg-white text-[#213555] outline-none focus:ring-1 focus:ring-[#3E5879]"
              placeholder="Masukkan nama subjek"
              required
            />
          </div>

          <div>
            <label htmlFor="timeLimit" className="block text-[#213555] text-sm font-medium mb-1">Waktu Pengerjaan <span className="text-xs text-gray-500">(Menit)</span></label>
            <input
              id="timeLimit"
              type="number"
              value={timeLimit}
              onChange={(e) => setTimeLimit(e.target.value)}
              className="w-full p-3 border border-[#D8C4B6] rounded-full bg-white text-[#213555] outline-none focus:ring-1 focus:ring-[#3E5879]"
              min="0"
              placeholder="Masukkan waktu dalam menit (opsional)"
            />
          </div>

          <div>
            <label htmlFor="minSoal" className="block text-[#213555] text-sm font-medium mb-1">Minimal Soal</label>
            <input
              id="minSoal"
              type="number"
              value={minSoal}
              onChange={(e) => setMinSoal(e.target.value)}
              className="w-full p-3 border border-[#D8C4B6] rounded-full bg-white text-[#213555] outline-none focus:ring-1 focus:ring-[#3E5879]"
              min="0"
              placeholder="Masukkan jumlah minimal soal (opsional)"
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
              disabled={loading || loadingKategori}
            >
              {loading ? 'Membuat...' : 'Buat'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default GuruSubjekCreate

