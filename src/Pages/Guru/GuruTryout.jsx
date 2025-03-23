"use client";
import { motion } from "framer-motion";
import { FiEdit, FiTrash, FiPlus } from "react-icons/fi";

const GuruTryout = () => {
  const tryouts = [
    { id: 1, nama: "tryout utbk snbt 2025 ep. 1" },
    { id: 2, nama: "tryout utbk snbt 2025 ep. 2" },
    { id: 3, nama: "tryout utbk snbt 2025 ep. 3" },
  ];

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

  return (
    <div className="bg-gradient-to-b from-gray-100 to-gray-200 flex justify-center items-center min-h-screen w-screen p-4">
      <motion.div
        className="w-full max-w-4xl bg-[#f5f0e6] p-8 rounded-2xl shadow-lg border border-gray-200"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.div
          className="flex justify-between items-center mb-6"
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
            className="bg-[#2f4a64] text-white px-4 py-2 rounded-lg hover:bg-[#1e364d] transition-all flex items-center gap-2 shadow-md"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiPlus /> Tambah Tryout Baru
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
                  <td className="p-4 flex space-x-3 justify-end">
                    <motion.button
                      className="text-gray-600 hover:text-blue-700 bg-gray-100 p-2 rounded-full"
                      whileHover={{ scale: 1.1, backgroundColor: "#e6f7ff" }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <FiEdit size={18} />
                    </motion.button>
                    <motion.button
                      className="text-gray-600 hover:text-red-700 bg-gray-100 p-2 rounded-full"
                      whileHover={{ scale: 1.1, backgroundColor: "#fff1f0" }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <FiTrash size={18} />
                    </motion.button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default GuruTryout;
