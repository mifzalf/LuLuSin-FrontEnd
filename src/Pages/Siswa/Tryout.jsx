"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { ArrowLeft, BookOpen, CheckCircle, Clock } from "lucide-react"

export default function SiswaTryout() {
  const [activeTab, setActiveTab] = useState("pending")

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: (i) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.05,
        duration: 0.5,
        type: "spring",
        stiffness: 100,
      },
    }),
  }

  return (
    <div className="bg-gradient-to-b from-[#F5F0E9] to-[#EAE5DE] flex flex-col items-center p-6 min-h-screen w-screen">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl"
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex items-center mb-6"
        >
          <motion.a href="/Siswa/DashBoard" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <motion.button
              className="bg-gradient-to-r from-[#1E3A5F] to-[#2E4A7F] text-white p-2 rounded-xl shadow-md flex items-center justify-center"
              style={{ boxShadow: "0 4px 6px -1px rgba(30, 58, 95, 0.3)" }}
            >
              <ArrowLeft size={20} />
            </motion.button>
          </motion.a>

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-2xl font-bold text-[#1E3A5F] ml-4 flex items-center"
          >
            <span className="bg-[#1E3A5F] h-6 w-1.5 rounded-full mr-2 inline-block"></span>
            TRYOUT SNBT
          </motion.h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="bg-white p-4 rounded-2xl shadow-lg mb-6 flex justify-center border border-gray-100"
          style={{
            backgroundImage: "radial-gradient(circle at top right, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 1))",
          }}
        >
          <div className="flex space-x-4 p-1 bg-gray-100 rounded-xl">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className={`px-6 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === "pending"
                  ? "bg-gradient-to-r from-[#1E3A5F] to-[#2E4A7F] text-white shadow-md"
                  : "bg-transparent text-gray-600 hover:bg-gray-200"
              }`}
              onClick={() => setActiveTab("pending")}
            >
              <div className="flex items-center">
                <Clock size={16} className="mr-2" />
                Belum Dikerjakan
              </div>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className={`px-6 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === "completed"
                  ? "bg-gradient-to-r from-[#1E3A5F] to-[#2E4A7F] text-white shadow-md"
                  : "bg-transparent text-gray-600 hover:bg-gray-200"
              }`}
              onClick={() => setActiveTab("completed")}
            >
              <div className="flex items-center">
                <CheckCircle size={16} className="mr-2" />
                Telah Dikerjakan
              </div>
            </motion.button>
          </div>
        </motion.div>

        {activeTab === "pending" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="bg-gradient-to-br from-[#1E3A5F] to-[#2E4A7F] text-white p-6 rounded-2xl shadow-lg"
            style={{ boxShadow: "0 10px 25px -5px rgba(30, 58, 95, 0.4)" }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="flex items-center justify-center mb-4"
            >
              <Clock className="mr-2" size={20} />
              <h3 className="text-lg font-semibold">Belum Dikerjakan</h3>
            </motion.div>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4"
            >
              {[6, 7, 8, 9].map((ep, index) => (
                <motion.div
                  key={ep}
                  custom={index}
                  variants={itemVariants}
                  whileHover={{
                    scale: 1.03,
                    boxShadow: "0 15px 30px -5px rgba(0, 0, 0, 0.2)",
                    transition: { type: "spring", stiffness: 300 },
                  }}
                  className="bg-gradient-to-br from-gray-100 to-gray-200 text-gray-800 p-5 rounded-xl flex justify-between items-center relative overflow-hidden"
                  style={{ boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
                >
                  <div className="absolute top-0 left-0 w-20 h-20 bg-gray-300 rounded-br-full opacity-50"></div>
                  <div className="z-10">
                    <span className="bg-[#1E3A5F] text-white text-xs font-bold px-2 py-1 rounded-full mb-1 inline-block">
                      EP.{ep}
                    </span>
                    <p className="text-sm font-medium mt-1 flex items-center">
                      <BookOpen size={16} className="mr-2 text-[#1E3A5F]" />
                      tryout utbk snbt 2025 ep.{ep}
                    </p>
                  </div>
                  <motion.button
                    whileHover={{
                      scale: 1.1,
                      backgroundColor: "#2E4A7F",
                      boxShadow: "0 10px 15px -3px rgba(30, 58, 95, 0.4)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    className="bg-gradient-to-r from-[#1E3A5F] to-[#2E4A7F] text-white px-5 py-2 rounded-xl text-sm font-medium z-10"
                    style={{ boxShadow: "0 4px 6px -1px rgba(30, 58, 95, 0.3)" }}
                  >
                    Lihat
                  </motion.button>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}

        {activeTab === "completed" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="bg-gradient-to-br from-[#2E3A5F] to-[#3E4A7F] text-white p-6 rounded-2xl shadow-lg"
            style={{ boxShadow: "0 10px 25px -5px rgba(46, 58, 95, 0.4)" }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="flex items-center justify-center mb-4"
            >
              <CheckCircle className="mr-2" size={20} />
              <h3 className="text-lg font-semibold">Telah Dikerjakan</h3>
            </motion.div>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4"
            >
              {[4, 5].map((ep, index) => (
                <motion.div
                  key={ep}
                  custom={index}
                  variants={itemVariants}
                  whileHover={{
                    scale: 1.03,
                    boxShadow: "0 15px 30px -5px rgba(0, 0, 0, 0.2)",
                    transition: { type: "spring", stiffness: 300 },
                  }}
                  className="bg-gradient-to-br from-gray-100 to-gray-200 text-gray-800 p-5 rounded-xl flex justify-between items-center relative overflow-hidden"
                  style={{ boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
                >
                  <div className="absolute top-0 left-0 w-20 h-20 bg-gray-300 rounded-br-full opacity-50"></div>
                  <div className="z-10">
                    <div className="flex items-center">
                      <span className="bg-green-600 text-white text-xs font-bold px-2 py-1 rounded-full mb-1 inline-block">
                        EP.{ep}
                      </span>
                      <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Selesai</span>
                    </div>
                    <p className="text-sm font-medium mt-1 flex items-center">
                      <BookOpen size={16} className="mr-2 text-[#1E3A5F]" />
                      tryout utbk snbt 2025 ep.{ep}
                    </p>
                  </div>
                  <motion.button
                    whileHover={{
                      scale: 1.1,
                      backgroundColor: "#2E4A7F",
                      boxShadow: "0 10px 15px -3px rgba(30, 58, 95, 0.4)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    className="bg-gradient-to-r from-[#1E3A5F] to-[#2E4A7F] text-white px-5 py-2 rounded-xl text-sm font-medium z-10"
                    style={{ boxShadow: "0 4px 6px -1px rgba(30, 58, 95, 0.3)" }}
                  >
                    Lihat
                  </motion.button>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}

