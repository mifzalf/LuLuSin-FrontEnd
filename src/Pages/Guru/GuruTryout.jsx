"use client";
import { motion } from "framer-motion";
import { FiPlay, FiEdit, FiPlus } from "react-icons/fi";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

const GuruTryout = () => {
  const navigate = useNavigate();
  const [tryouts, setTryouts] = useState([
    { id: 1, nama: "tryout utbk snbt 2025 ep. 1" },
    { id: 2, nama: "tryout utbk snbt 2025 ep. 2" },
    { id: 3, nama: "tryout utbk snbt 2025 ep. 3" },
  ]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentTryout, setCurrentTryout] = useState(null);
  const [newTryoutName, setNewTryoutName] = useState("");

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  const handleCreateTryout = () => {
    if (newTryoutName.trim() === "") return;
    
    const newTryout = {
      id: tryouts.length > 0 ? Math.max(...tryouts.map(t => t.id)) + 1 : 1,
      nama: newTryoutName.trim()
    };
    
    setTryouts([...tryouts, newTryout]);
    setNewTryoutName("");
    setShowCreateModal(false);
  };

  const handleEditTryout = () => {
    if (newTryoutName.trim() === "" || !currentTryout) return;
    
    const updatedTryouts = tryouts.map(tryout => 
      tryout.id === currentTryout.id ? {...tryout, nama: newTryoutName} : tryout
    );
    
    setTryouts(updatedTryouts);
    setNewTryoutName("");
    setCurrentTryout(null);
    setShowEditModal(false);
  };

  const navigateToCreateTryout = () => {
    navigate('/guru/createtryout');
  };

  const navigateToEditTryout = (tryout) => {
    navigate(`/guru/edittryout?id=${tryout.id}`);
  };

  return (
    <div className="bg-gradient-to-b from-gray-100 to-gray-200 flex justify-center items-center min-h-screen w-screen p-4">
      <motion.div
        className="w-full max-w-4xl bg-[#f5f0e6] p-8 rounded-2xl shadow-lg border border-gray-200"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.div
          className="mb-6 flex justify-between items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <motion.h1
            className="text-2xl font-bold text-gray-900"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
          >
            Tryout UTBK SNBT 2025
          </motion.h1>
          
          <motion.button
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all flex items-center gap-2 shadow-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={navigateToCreateTryout}
          >
            <FiPlus size={16} /> Tambah Tryout
          </motion.button>
        </motion.div>

        <motion.div
          className="bg-white rounded-xl overflow-hidden shadow-md"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
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
                <motion.tr
                  key={tryout.id}
                  className="border-b last:border-b-0 hover:bg-gray-50 transition-colors"
                  variants={itemVariants}
                >
                  <td className="p-4 text-gray-800">{index + 1}</td>
                  <td className="p-4 font-medium text-blue-700">
                    {tryout.nama}
                  </td>
                  <td className="p-4 flex justify-end gap-2">
                    <motion.button
                      className="bg-amber-500 text-white px-3 py-2 rounded-lg hover:bg-amber-600 transition-all flex items-center gap-1 shadow-sm"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => navigateToEditTryout(tryout)}
                    >
                      <FiEdit size={16} /> Edit
                    </motion.button>
                    <motion.button
                      className="bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition-all flex items-center gap-1 shadow-sm"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FiPlay size={16} /> Mulai
                    </motion.button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </motion.div>

      {/* Create Tryout Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50">
          <motion.div 
            className="bg-white rounded-xl p-6 w-full max-w-md"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <h2 className="text-xl font-bold mb-4">Tambah Tryout Baru</h2>
            <input
              type="text"
              placeholder="Nama Tryout"
              className="w-full p-3 border rounded-lg mb-4"
              value={newTryoutName}
              onChange={(e) => setNewTryoutName(e.target.value)}
            />
            <div className="flex justify-end gap-3">
              <button 
                className="px-4 py-2 border rounded-lg hover:bg-gray-100"
                onClick={() => setShowCreateModal(false)}
              >
                Batal
              </button>
              <button 
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                onClick={handleCreateTryout}
              >
                Simpan
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Edit Tryout Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50">
          <motion.div 
            className="bg-white rounded-xl p-6 w-full max-w-md"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <h2 className="text-xl font-bold mb-4">Edit Tryout</h2>
            <input
              type="text"
              placeholder="Nama Tryout"
              className="w-full p-3 border rounded-lg mb-4"
              value={newTryoutName}
              onChange={(e) => setNewTryoutName(e.target.value)}
            />
            <div className="flex justify-end gap-3">
              <button 
                className="px-4 py-2 border rounded-lg hover:bg-gray-100"
                onClick={() => setShowEditModal(false)}
              >
                Batal
              </button>
              <button 
                className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600"
                onClick={handleEditTryout}
              >
                Update
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default GuruTryout;
