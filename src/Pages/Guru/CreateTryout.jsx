"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FiEdit, FiTrash, FiPlus, FiX } from "react-icons/fi"

const GuruTryout = () => {
  const [tryouts, setTryouts] = useState([
    { id: 1, nama: "tryout utbk snbt 2025 ep. 1" },
    { id: 2, nama: "tryout utbk snbt 2025 ep. 2" },
    { id: 3, nama: "tryout utbk snbt 2025 ep. 3" },
  ])

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newTryoutName, setNewTryoutName] = useState("")

  const handleAddTryout = () => {
    if (newTryoutName.trim()) {
      const newId = tryouts.length > 0 ? Math.max(...tryouts.map((t) => t.id)) + 1 : 1
      setTryouts([...tryouts, { id: newId, nama: newTryoutName.trim() }])
      setNewTryoutName("")
      setIsModalOpen(false)
    }
  }

  const handleDeleteTryout = (id) => {
    setTryouts(tryouts.filter((tryout) => tryout.id !== id))
  }

  return (
    <div className="flex flex-col flex-grow justify-center items-center min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 p-4 w-screen">
      <motion.div
        className="w-full max-w-6xl bg-[#f5f0e6] p-6 md:p-8 rounded-2xl shadow-lg border border-gray-200"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <motion.h1 className="text-2xl font-bold text-gray-900">Tryout UTBK SNBT 2025</motion.h1>
          <motion.button
            className="bg-[#2f4a64] text-white px-4 py-2 rounded-lg hover:bg-[#1e364d] transition-all flex items-center gap-2 shadow-md"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsModalOpen(true)}
          >
            <FiPlus /> Tambah Tryout Baru
          </motion.button>
        </motion.div>

        <motion.div className="bg-white rounded-xl overflow-hidden shadow-md">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#2f4a64] text-white">
                  <th className="p-4 text-left rounded-tl-xl">No</th>
                  <th className="p-4 text-left">Nama Tryout</th>
                  <th className="p-4 text-right rounded-tr-xl">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {tryouts.map((tryout, index) => (
                  <tr key={tryout.id} className="border-b last:border-b-0 hover:bg-gray-50 transition-colors">
                    <td className="p-4 text-gray-800">{index + 1}</td>
                    <td className="p-4 font-medium text-blue-700">{tryout.nama}</td>
                    <td className="p-4 flex space-x-3 justify-end">
                      <button className="text-gray-600 hover:text-blue-700 bg-gray-100 p-2 rounded-full">
                        <FiEdit size={18} />
                      </button>
                      <button
                        className="text-gray-600 hover:text-red-700 bg-gray-100 p-2 rounded-full"
                        onClick={() => handleDeleteTryout(tryout.id)}
                      >
                        <FiTrash size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default GuruTryout
