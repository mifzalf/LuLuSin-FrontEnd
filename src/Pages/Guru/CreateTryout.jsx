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
  const [editMode, setEditMode] = useState(false)
  const [currentTryoutId, setCurrentTryoutId] = useState(null)

  const handleAddTryout = () => {
    if (newTryoutName.trim()) {
      if (editMode) {
        // Update existing tryout
        setTryouts(
          tryouts.map((tryout) =>
            tryout.id === currentTryoutId ? { ...tryout, nama: newTryoutName.trim() } : tryout
          )
        )
        setEditMode(false)
        setCurrentTryoutId(null)
      } else {
        // Add new tryout
        const newId = tryouts.length > 0 ? Math.max(...tryouts.map((t) => t.id)) + 1 : 1
        setTryouts([...tryouts, { id: newId, nama: newTryoutName.trim() }])
      }
      setNewTryoutName("")
      setIsModalOpen(false)
    }
  }

  const handleEditTryout = (id) => {
    const tryoutToEdit = tryouts.find((tryout) => tryout.id === id)
    if (tryoutToEdit) {
      setNewTryoutName(tryoutToEdit.nama)
      setCurrentTryoutId(id)
      setEditMode(true)
      setIsModalOpen(true)
    }
  }

  const handleDeleteTryout = (id) => {
    setTryouts(tryouts.filter((tryout) => tryout.id !== id))
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setNewTryoutName("")
    setEditMode(false)
    setCurrentTryoutId(null)
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
                      <button 
                        className="text-gray-600 hover:text-blue-700 bg-gray-100 p-2 rounded-full"
                        onClick={() => handleEditTryout(tryout.id)}
                      >
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

      {/* Modal for adding/editing tryout */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-xl p-6 w-full max-w-md"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-900">
                  {editMode ? "Edit Tryout" : "Tambah Tryout Baru"}
                </h2>
                <button
                  className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
                  onClick={closeModal}
                >
                  <FiX size={24} />
                </button>
              </div>
              <div className="mb-4">
                <label htmlFor="tryoutName" className="block text-sm font-medium text-gray-700 mb-1">
                  Nama Tryout
                </label>
                <input
                  type="text"
                  id="tryoutName"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 bg-white"
                  placeholder="Masukkan nama tryout"
                  value={newTryoutName}
                  onChange={(e) => setNewTryoutName(e.target.value)}
                  autoFocus
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  onClick={closeModal}
                >
                  Batal
                </button>
                <button
                  className="px-4 py-2 bg-[#2f4a64] text-white rounded-lg hover:bg-[#1e364d] disabled:bg-gray-400"
                  onClick={handleAddTryout}
                  disabled={!newTryoutName.trim()}
                >
                  {editMode ? "Simpan" : "Tambah"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default GuruTryout
