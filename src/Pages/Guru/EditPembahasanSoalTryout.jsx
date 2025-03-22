"use client"
import { motion } from "framer-motion"
import { FiArrowLeft, FiArrowRight, FiSave } from "react-icons/fi"
import { useState, useEffect } from "react"

const EditPembahasanSoalTryout = () => {
  // State untuk menyimpan data
  const [jawaban, setJawaban] = useState("")
  const [pembahasan, setPembahasan] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState({ text: "", type: "" })
  const [soalId, setSoalId] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [totalSoal, setTotalSoal] = useState(0)

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100 },
    },
  }

  // Fungsi untuk mengambil data soal
  useEffect(() => {
    const fetchSoalData = async () => {
      try {
        // Di sini akan diimplementasikan fetch data dari API/database
        // Contoh:
        // const response = await fetch(`/api/soal-tryout/${soalId}`);
        // const data = await response.json();
        // setJawaban(data.jawaban);
        // setPembahasan(data.pembahasan);
        // setTotalSoal(data.totalSoal);
        
        // Mock data untuk contoh:
        setJawaban("A");
        setPembahasan("Ini adalah pembahasan untuk soal ini...");
        setTotalSoal(10);
      } catch (error) {
        setMessage({ text: "Gagal mengambil data: " + error.message, type: "error" });
      }
    };

    if (soalId) {
      fetchSoalData();
    }
  }, [soalId]);

  // Fungsi untuk menyimpan perubahan
  const handleSave = async () => {
    setLoading(true);
    try {
      // Di sini akan diimplementasikan update data ke API/database
      // Contoh:
      // await fetch(`/api/soal-tryout/${soalId}`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ jawaban, pembahasan })
      // });
      
      // Mock response:
      await new Promise(resolve => setTimeout(resolve, 500)); // simulasi delay
      setMessage({ text: "Perubahan berhasil disimpan!", type: "success" });
    } catch (error) {
      setMessage({ text: "Gagal menyimpan: " + error.message, type: "error" });
    } finally {
      setLoading(false);
      setTimeout(() => setMessage({ text: "", type: "" }), 3000);
    }
  };

  // Fungsi untuk navigasi antar soal
  const navigatePrevious = () => {
    if (currentIndex > 0) {
      setSoalId(currentIndex - 1);
      setCurrentIndex(prev => prev - 1);
    }
  };

  const navigateNext = () => {
    if (currentIndex < totalSoal - 1) {
      setSoalId(currentIndex + 1);
      setCurrentIndex(prev => prev + 1);
    }
  };

  // Fungsi handle perubahan input
  const handleJawabanChange = (e) => {
    setJawaban(e.target.value);
  };

  const handlePembahasanChange = (e) => {
    setPembahasan(e.target.value);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-screen bg-gradient-to-b from-[#f5efe4] to-[#e8e0d0] p-4">
      <motion.div className="w-full max-w-lg" variants={containerVariants} initial="hidden" animate="visible">
        <motion.div className="bg-white shadow-lg rounded-2xl p-8 border border-gray-200" variants={itemVariants}>
          <motion.h2 className="text-xl font-bold mb-6 text-gray-800 relative" variants={itemVariants}>
            Edit Pembahasan Soal Tryout
            <motion.div
              className="absolute -bottom-2 left-0 h-1 bg-gray-700 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: "100px" }}
              transition={{ delay: 0.4, duration: 0.4 }}
            />
          </motion.h2>

          {message.text && (
            <motion.div 
              className={`mb-4 p-3 rounded-lg ${message.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {message.text}
            </motion.div>
          )}

          <div className="space-y-5">
            <motion.div variants={itemVariants}>
              <label className="block text-gray-700 mb-2 font-medium">Jawaban</label>
              <motion.input
                type="text"
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all text-gray-800"
                whileFocus={{ boxShadow: "0 0 0 3px rgba(107, 114, 128, 0.2)" }}
                value={jawaban}
                onChange={handleJawabanChange}
                placeholder="Masukkan jawaban disini"
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <label className="block text-gray-700 mb-2 font-medium">Pembahasan</label>
              <motion.textarea
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all text-gray-800"
                rows="5"
                whileFocus={{ boxShadow: "0 0 0 3px rgba(107, 114, 128, 0.2)" }}
                value={pembahasan}
                onChange={handlePembahasanChange}
                placeholder="Masukkan pembahasan disini"
              ></motion.textarea>
            </motion.div>

            <motion.button
              className="w-full py-3 bg-gray-700 text-white rounded-lg shadow-md hover:bg-gray-800 flex items-center justify-center gap-2 mt-4"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              variants={itemVariants}
              onClick={handleSave}
              disabled={loading}
            >
              {loading ? "Menyimpan..." : <><FiSave /> Simpan</>}
            </motion.button>
          </div>
        </motion.div>

        <motion.div className="flex justify-between w-full mt-4" variants={itemVariants}>
          <motion.button
            className={`px-5 py-2 text-white rounded-lg shadow-md flex items-center gap-2 ${currentIndex === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-gray-500 hover:bg-gray-600'}`}
            whileHover={currentIndex > 0 ? { scale: 1.05 } : {}}
            whileTap={currentIndex > 0 ? { scale: 0.95 } : {}}
            onClick={navigatePrevious}
            disabled={currentIndex === 0}
          >
            <FiArrowLeft /> Sebelumnya
          </motion.button>

          <div className="text-center self-center text-gray-800 font-medium">
            Soal {currentIndex + 1} dari {totalSoal}
          </div>

          <motion.button
            className={`px-5 py-2 text-white rounded-lg shadow-md flex items-center gap-2 ${currentIndex === totalSoal - 1 ? 'bg-gray-400 cursor-not-allowed' : 'bg-gray-500 hover:bg-gray-600'}`}
            whileHover={currentIndex < totalSoal - 1 ? { scale: 1.05 } : {}}
            whileTap={currentIndex < totalSoal - 1 ? { scale: 0.95 } : {}}
            onClick={navigateNext}
            disabled={currentIndex === totalSoal - 1}
          >
            Selanjutnya <FiArrowRight />
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default EditPembahasanSoalTryout

