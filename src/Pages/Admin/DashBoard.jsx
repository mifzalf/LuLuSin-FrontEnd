import React from "react";
import { motion } from "framer-motion";

export default function Dashboard() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4 }
    },
    hover: {
      scale: 1.02,
      transition: { duration: 0.2 }
    }
  }

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="flex bg-[#f5f0e6] w-screen h-screen fixed inset-0 overflow-hidden"
    >
      {/* Sidebar */}
      <motion.div 
        variants={itemVariants}
        className="w-64 bg-white p-6 shadow-lg h-full border-r border-gray-200"
      >
        <motion.div 
          variants={itemVariants}
          className="mb-8"
        >
          <h1 className="text-2xl font-bold text-[#2f4a64]">LuLuSin</h1>
          <p className="text-sm text-gray-500">Education Academy</p>
        </motion.div>
        
        <nav className="mt-6">
          <ul className="space-y-4">
            <motion.li 
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className="flex items-center space-x-3 text-gray-700 hover:text-[#2f4a64] cursor-pointer p-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <span className="text-xl">📊</span>
              <span className="font-medium">Dashboard</span>
            </motion.li>
            <motion.li 
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className="flex items-center space-x-3 text-gray-700 hover:text-[#2f4a64] cursor-pointer p-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <span className="text-xl">👨‍🏫</span>
              <span className="font-medium">Guru</span>
            </motion.li>
            <motion.li 
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className="flex items-center space-x-3 text-gray-700 hover:text-[#2f4a64] cursor-pointer p-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <span className="text-xl">👩‍🎓</span>
              <span className="font-medium">Murid</span>
            </motion.li>
          </ul>
        </nav>
      </motion.div>

      {/* Content */}
      <div className="flex-1 p-8 h-full overflow-auto">
        {/* Navbar */}
        <motion.div 
          variants={itemVariants}
          className="flex justify-between items-center mb-8"
        >
          <h2 className="text-2xl font-bold text-[#2f4a64]">Dashboard</h2>
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="text-2xl text-gray-600 hover:text-[#2f4a64] transition-colors"
          >
            ☰
          </motion.button>
        </motion.div>

        {/* Welcome Card */}
        <motion.div 
          variants={cardVariants}
          whileHover="hover"
          className="bg-white p-8 rounded-xl shadow-lg w-full h-full flex flex-col justify-center items-center"
        >
          <motion.div 
            variants={itemVariants}
            className="text-center mb-8"
          >
            <h3 className="text-2xl font-semibold text-[#2f4a64]">Selamat Datang</h3>
            <p className="text-gray-600 mt-2">LuLuSin Admin</p>
          </motion.div>

          <div className="mt-6 flex gap-8 w-full max-w-4xl flex-wrap justify-center">
            <motion.div 
              variants={cardVariants}
              whileHover="hover"
              className="bg-[#2f4a64] p-8 rounded-xl shadow-lg text-center flex-1 min-w-[250px] transform transition-all duration-300 hover:shadow-xl"
            >
              <p className="text-gray-200 font-semibold mb-2">Guru Terdaftar</p>
              <p className="text-4xl text-white font-bold">23</p>
            </motion.div>
            
            <motion.div 
              variants={cardVariants}
              whileHover="hover"
              className="bg-[#2f4a64] p-8 rounded-xl shadow-lg text-center flex-1 min-w-[250px] transform transition-all duration-300 hover:shadow-xl"
            >
              <p className="text-gray-200 font-semibold mb-2">Murid Terdaftar</p>
              <p className="text-4xl text-white font-bold">234</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
