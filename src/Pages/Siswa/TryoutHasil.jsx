"use client"

import { motion } from "framer-motion"
import { CheckCircle, XCircle, HelpCircle, BarChart3, BookOpen, Award, ArrowLeft } from "lucide-react"
import { useState } from "react"

export default function SiswaTryoutHasil() {
  const [hoveredCard, setHoveredCard] = useState(null)

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
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  }

  // Test categories data
  const testCategories = [
    {
      title: "Tes Skolastik",
      icon: <BookOpen className="mr-2" size={20} />,
      subcategories: [
        "Penalaran Umum",
        "Pengetahuan dan Pemahaman Umum",
        "Pemahaman Baca dan Menulis",
        "Pengetahuan Kuantitatif",
      ],
    },
    {
      title: "Tes Literasi",
      icon: <BarChart3 className="mr-2" size={20} />,
      subcategories: ["Literasi Bahasa Indonesia", "Literasi Bahasa Inggris"],
    },
    {
      title: "Tes Penalaran Matematika",
      icon: <Award className="mr-2" size={20} />,
      subcategories: [],
    },
  ]

  // Metrics data
  const metrics = [
    { title: "Nilai", value: "763", icon: <Award size={18} className="text-yellow-300" /> },
    { title: "Total Jawaban Benar", value: "23", icon: <CheckCircle size={18} className="text-green-400" /> },
    { title: "Total Jawaban Salah", value: "5", icon: <XCircle size={18} className="text-red-400" /> },
    { title: "Total Jawaban Kosong", value: "2", icon: <HelpCircle size={18} className="text-gray-400" /> },
  ]

  return (
    <div className="bg-gradient-to-b from-[#F5F0E9] to-[#EAE5DE] flex flex-col items-center p-6 min-h-screen w-screen">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-5xl space-y-6"
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex items-center justify-between mb-6"
        >
          <motion.a href="/Siswa/Tryout" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <motion.button
              className="bg-gradient-to-r from-[#1E3A5F] to-[#2E4A7F] text-white p-3 rounded-full shadow-md flex items-center justify-center"
              style={{ boxShadow: "0 4px 6px -1px rgba(30, 58, 95, 0.3)" }}
            >
              <ArrowLeft size={20} />
            </motion.button>
          </motion.a>
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-2xl font-bold text-[#1E3A5F] flex items-center"
          >
            <span className="bg-[#1E3A5F] h-6 w-1.5 rounded-full mr-2 inline-block"></span>
            Hasil Tryout SNBT
          </motion.h1>
          <div className="w-10"></div> {/* Spacer for centering */}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-gradient-to-br from-[#1E3A5F] to-[#2E4A7F] text-white p-6 rounded-xl shadow-lg"
          style={{ boxShadow: "0 10px 25px -5px rgba(30, 58, 95, 0.4)" }}
        >
          {[
            { title: "Nilai rata-rata", value: "763", icon: <Award size={24} className="text-yellow-300 mb-2" /> },
            {
              title: "Total Jawaban Benar",
              value: "67",
              icon: <CheckCircle size={24} className="text-green-400 mb-2" />,
            },
            { title: "Total Jawaban Salah", value: "9", icon: <XCircle size={24} className="text-red-400 mb-2" /> },
            {
              title: "Total Jawaban Kosong",
              value: "2",
              icon: <HelpCircle size={24} className="text-gray-400 mb-2" />,
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                transition: { type: "spring", stiffness: 300 },
              }}
              className="flex flex-col items-center justify-center p-4 rounded-xl"
            >
              {item.icon}
              <p className="text-sm text-blue-200">{item.title}</p>
              <motion.span
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.8 + index * 0.1, duration: 0.5, type: "spring" }}
                className="text-3xl font-bold"
              >
                {item.value}
              </motion.span>
            </motion.div>
          ))}
        </motion.div>

        {testCategories.map((category, categoryIndex) => (
          <motion.div
            key={categoryIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + categoryIndex * 0.1, duration: 0.5 }}
            className="bg-gradient-to-br from-[#1E3A5F] to-[#2E4A7F] text-white p-6 rounded-xl shadow-lg"
            style={{ boxShadow: "0 10px 25px -5px rgba(30, 58, 95, 0.4)" }}
          >
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 + categoryIndex * 0.1, duration: 0.5 }}
              className="text-center text-xl font-semibold mb-4 flex items-center justify-center"
            >
              {category.icon}
              {category.title}
            </motion.h2>

            {category.subcategories.length > 0 ? (
              category.subcategories.map((subcategory, subcategoryIndex) => (
                <motion.div
                  key={subcategoryIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + categoryIndex * 0.1 + subcategoryIndex * 0.05, duration: 0.5 }}
                  className="mt-4 bg-[#1A3352]/50 p-4 rounded-xl"
                >
                  <h3 className="text-lg font-semibold mb-3 flex items-center">
                    <span className="bg-blue-200 text-[#1E3A5F] w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold mr-2">
                      {subcategoryIndex + 1}
                    </span>
                    {subcategory}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-2">
                    {metrics.map((metric, metricIndex) => (
                      <motion.div
                        key={metricIndex}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                          delay: 0.8 + categoryIndex * 0.1 + subcategoryIndex * 0.05 + metricIndex * 0.05,
                          duration: 0.5,
                        }}
                        whileHover={{
                          scale: 1.05,
                          backgroundColor: "rgba(255, 255, 255, 0.1)",
                          transition: { type: "spring", stiffness: 300 },
                        }}
                        onHoverStart={() => setHoveredCard(`${categoryIndex}-${subcategoryIndex}-${metricIndex}`)}
                        onHoverEnd={() => setHoveredCard(null)}
                        className="bg-gradient-to-br from-[#2C4A6E] to-[#3A5A80] p-4 rounded-xl text-center shadow-md relative overflow-hidden"
                      >
                        <div className="absolute top-0 right-0 w-16 h-16 bg-white rounded-bl-full opacity-5"></div>
                        <div className="flex items-center justify-center mb-2">
                          {metric.icon}
                          <p className="ml-1 text-sm">{metric.title}</p>
                        </div>
                        <motion.span
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{
                            delay: 0.9 + categoryIndex * 0.1 + subcategoryIndex * 0.05 + metricIndex * 0.05,
                            duration: 0.5,
                            type: "spring",
                          }}
                          className={`text-xl font-bold ${
                            metric.title === "Nilai"
                              ? "text-yellow-300"
                              : metric.title.includes("Benar")
                                ? "text-green-400"
                                : metric.title.includes("Salah")
                                  ? "text-red-400"
                                  : "text-gray-400"
                          }`}
                        >
                          {metric.value}
                        </motion.span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + categoryIndex * 0.1, duration: 0.5 }}
                className="mt-4 bg-[#1A3352]/50 p-4 rounded-xl"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-2">
                  {metrics.map((metric, metricIndex) => (
                    <motion.div
                      key={metricIndex}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.8 + categoryIndex * 0.1 + metricIndex * 0.05, duration: 0.5 }}
                      whileHover={{
                        scale: 1.05,
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                        transition: { type: "spring", stiffness: 300 },
                      }}
                      onHoverStart={() => setHoveredCard(`${categoryIndex}-${metricIndex}`)}
                      onHoverEnd={() => setHoveredCard(null)}
                      className="bg-gradient-to-br from-[#2C4A6E] to-[#3A5A80] p-4 rounded-xl text-center shadow-md relative overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 w-16 h-16 bg-white rounded-bl-full opacity-5"></div>
                      <div className="flex items-center justify-center mb-2">
                        {metric.icon}
                        <p className="ml-1 text-sm">{metric.title}</p>
                      </div>
                      <motion.span
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{
                          delay: 0.9 + categoryIndex * 0.1 + metricIndex * 0.05,
                          duration: 0.5,
                          type: "spring",
                        }}
                        className={`text-xl font-bold ${
                          metric.title === "Nilai"
                            ? "text-yellow-300"
                            : metric.title.includes("Benar")
                              ? "text-green-400"
                              : metric.title.includes("Salah")
                                ? "text-red-400"
                                : "text-gray-400"
                        }`}
                      >
                        {metric.value}
                      </motion.span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="flex justify-center mt-6"
        >
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0 15px 30px -5px rgba(30, 58, 95, 0.4)",
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            className="bg-gradient-to-r from-[#1E3A5F] to-[#2E4A7F] text-white px-8 py-3 rounded-xl text-lg font-semibold shadow-lg"
            style={{ boxShadow: "0 10px 15px -3px rgba(30, 58, 95, 0.3)" }}
          >
            Keluar
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  )
}

