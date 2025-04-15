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
  const [minSoal, setMinSoal] = useState("")
  const [subjectId, setSubjectId] = useState(null)
  const [loading, setLoading] = useState(false)
  const [loadingData, setLoadingData] = useState(true)
  const [error, setError] = useState(null)
  const [notification, setNotification] = useState(null)
  const [originalSubjectData, setOriginalSubjectData] = useState(null)
  const [categoryList, setCategoryList] = useState([])
  const [selectedCategoryId, setSelectedCategoryId] = useState("")

  useEffect(() => {
    const compositeId = searchParams.get("id")

    // Extract the actual subject ID if it's a composite ID (e.g., "1:1")
    let actualSubjectId = compositeId;
    if (compositeId && compositeId.includes(':')) {
        actualSubjectId = compositeId.split(':')[1];
    }
    
    setSubjectId(actualSubjectId) // Set state with the actual ID

    if (!actualSubjectId) { // Check if we have an ID after parsing
      setError("ID Subjek tidak ditemukan atau tidak valid di URL.")
      setLoadingData(false)
      return
    }

    // Fetch category list and subject details
    const fetchData = async () => {
      try {
        setLoadingData(true)
        setError(null)

        // Fetch category list
        const categoryResponse = await axiosInstance.get('/API/teacher/subjectcategory')
        if (categoryResponse.data && Array.isArray(categoryResponse.data.dataSubjectCategory)) {
          console.log("Category data received:", categoryResponse.data.dataSubjectCategory);
          setCategoryList(categoryResponse.data.dataSubjectCategory)
        } else {
          console.warn("Could not fetch category list or format incorrect")
          setCategoryList([])
        }

        // Fetch ALL subjects since there's no endpoint for a single one
        const response = await axiosInstance.get(`/API/teacher/subject`)
        
        if (response.data && Array.isArray(response.data.datasubject)) {
          // Find the specific subject from the list using the actualSubjectId
          const allSubjects = response.data.datasubject;
          // Ensure comparison handles potential type mismatch (string vs number)
          const subjectData = allSubjects.find(subj => String(subj.subject_id) === String(actualSubjectId));

          if (subjectData) {
            // Found the subject, set the state
            console.log("Subject Data received:", subjectData);
            setOriginalSubjectData(subjectData);
            setKategori(subjectData.category_name || searchParams.get("kategori") || "") // Assuming category_name exists, adjust if needed
            setSelectedCategoryId(subjectData.id_subject_category || "")
            setSubjek(subjectData.subject_name || "")
            setTimeLimit(subjectData.time_limit ?? "")
            setMinSoal(subjectData.minimal_questions ?? "") // Changed from minimal_soal to minimal_questions
          } else {
            // Subject with the ID not found in the list, use fallback
            setOriginalSubjectData(null);
            console.warn(`Subject with ID ${actualSubjectId} not found in the fetched list. Using URL parameters.`);
            setError("Detail subjek tidak ditemukan dalam daftar. Menggunakan data dari URL.")
            setKategori(searchParams.get("kategori") || "") 
            setSubjek(searchParams.get("subjek") || "")
            setTimeLimit("") 
            setMinSoal("")
          }
        } else {
          // Failed to fetch the list or data format is incorrect, use fallback
          setOriginalSubjectData(null);
          console.warn("Could not fetch subject list or format incorrect, using URL parameters as fallback.")
          setError("Gagal memuat daftar subjek. Menggunakan data dari URL.")
          setKategori(searchParams.get("kategori") || "") 
          setSubjek(searchParams.get("subjek") || "")
          setTimeLimit("")
          setMinSoal("")
        }
      } catch (err) {
        console.error("Error fetching data:", err)
        setOriginalSubjectData(null);
        setError("Gagal memuat data. Menggunakan data dari URL.")
        setKategori(searchParams.get("kategori") || "") 
        setSubjek(searchParams.get("subjek") || "")
        setTimeLimit("") 
        setMinSoal("")
      } finally {
        setLoadingData(false)
      }
    }

    fetchData()

  }, [searchParams])

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [notification])

  // Update category name when category id changes
  useEffect(() => {
    if (selectedCategoryId && categoryList.length > 0) {
      const selectedCategory = categoryList.find(cat => String(cat.subject_category_id) === String(selectedCategoryId))
      if (selectedCategory) {
        setKategori(selectedCategory.subject_category_name || "")
      }
    }
  }, [selectedCategoryId, categoryList])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!subjectId) {
      setError("Tidak dapat menyimpan, ID subjek tidak valid.")
      return
    }

    // Validasi field yang wajib diisi
    if (!selectedCategoryId) {
      setError("Kategori Subjek wajib dipilih.");
      return;
    }
    if (!subjek.trim()) {
      setError("Nama Subjek wajib diisi.");
      return;
    }
    if (!timeLimit || timeLimit === '') {
      setError("Waktu Pengerjaan wajib diisi.");
      return;
    }
    if (!minSoal || minSoal === '') {
      setError("Minimal Soal wajib diisi.");
      return;
    }

    setLoading(true)
    setError(null)
    setNotification(null)

    if (Number(minSoal) < 0) {
        setError("Minimal Soal tidak boleh negatif.");
        setLoading(false);
        return;
    }
    if (Number(timeLimit) < 0) {
        setError("Waktu Pengerjaan tidak boleh negatif.");
        setLoading(false);
        return;
    }

    try {
      const payload = {
        id_subject_category: Number(selectedCategoryId),
        subject_name: subjek,
        time_limit: Number(timeLimit),
        minimal_questions: Number(minSoal)
      }

      console.log("Sending update request for ID:", subjectId, "Payload:", payload)

      const response = await axiosInstance.patch(`/API/teacher/subject/update/${subjectId}`, payload)

      console.log("Update response:", response.data)

      if (response.data.success || response.data.message === 'OK') {
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
        } else if (err.response.status === 400) {
           // Menampilkan pesan spesifik untuk validasi yang gagal
           setError(err.response.data.message || "Data tidak lengkap. Harap isi semua field yang wajib.");
           setLoading(false);
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
        <div className="text-[#213555]">Memuat detail subjek...</div>
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
            <label className="block text-[#213555] text-sm font-medium mb-1">Kategori Subjek <span className="text-red-500">*</span></label>
            <select
              value={selectedCategoryId}
              onChange={(e) => setSelectedCategoryId(e.target.value)}
              className="w-full p-3 border border-[#D8C4B6] rounded-full bg-white text-[#213555] outline-none focus:ring-1 focus:ring-[#3E5879]"
              required
            >
              <option value="">Pilih Kategori</option>
              {categoryList.map((cat) => (
                <option key={cat.subject_category_id} value={cat.subject_category_id}>
                  {cat.subject_category_name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[#213555] text-sm font-medium mb-1">Subjek <span className="text-red-500">*</span></label>
            <input
              type="text"
              value={subjek}
              onChange={(e) => setSubjek(e.target.value)}
              className="w-full p-3 border border-[#D8C4B6] rounded-full bg-white text-[#213555] outline-none focus:ring-1 focus:ring-[#3E5879]"
              required
            />
          </div>

          <div>
            <label className="block text-[#213555] text-sm font-medium mb-1">Waktu Pengerjaan (Menit) <span className="text-red-500">*</span></label>
            <input
              type="number"
              value={timeLimit}
              onChange={(e) => setTimeLimit(e.target.value)}
              className="w-full p-3 border border-[#D8C4B6] rounded-full bg-white text-[#213555] outline-none focus:ring-1 focus:ring-[#3E5879]"
              min="1"
              placeholder="Masukkan waktu dalam menit"
              required
            />
          </div>

          <div>
            <label className="block text-[#213555] text-sm font-medium mb-1">Minimal Soal <span className="text-red-500">*</span></label>
            <input
              type="number"
              value={minSoal}
              onChange={(e) => setMinSoal(e.target.value)}
              className="w-full p-3 border border-[#D8C4B6] rounded-full bg-white text-[#213555] outline-none focus:ring-1 focus:ring-[#3E5879]"
              min="1"
              placeholder="Masukkan jumlah minimal soal"
              required
            />
          </div>

          <div className="text-xs text-gray-500 italic">
            <span className="text-red-500">*</span> Field wajib diisi
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

