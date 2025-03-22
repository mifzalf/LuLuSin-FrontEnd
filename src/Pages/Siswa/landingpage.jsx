"use client";

import { FaUserCheck, FaClipboardList, FaBook } from "react-icons/fa";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import React from "react";

export default function SiswaLandingPage() {
  const featuresRef = useRef(null);
  const featuresInView = useInView(featuresRef, { once: true, amount: 0.2 });

  const stepsRef = useRef(null);
  const stepsInView = useInView(stepsRef, { once: true, amount: 0.2 });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring",   stiffness: 100 },
    },
  };

  const cardVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: (i) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        type: "spring",
        stiffness: 100,
      },
    }),
  };

  const stepVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: (i) => ({
      scale: 1,
      opacity: 1,
      transition: {
        delay: i * 0.05,
        duration: 0.4,
        type: "spring",
        stiffness: 100,
      },
    }),
  };

  return (
    <div className="flex flex-col min-h-screen w-screen">
      <main className="flex-grow w-full bg-amber-50">
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row items-center max-w-6xl mx-auto bg-[#F5EDE4] p-10 rounded-lg"
        >
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="md:w-1/2 text-[#1B2B44]"
          >
            <motion.h2
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8, type: "spring" }}
              className="   cofont-bold text-3xl md:text-4xl leading-tight"
            >
              Bersiaplah Menempuh Jenjang Pendidikan Yang Lebih Tinggi
            </motion.h2>
          </motion.div>
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="md:w-1/2 flex justify-center"
          >
            <motion.img
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8, type: "spring" }}
              whileHover={{ scale: 1.05, rotate: 2 }}
              src="/santoso tk lulus kuliah.png"
              alt="Education Illustration"
              className="w-80"
            />
          </motion.div>
        </motion.section>

        <section className="relative bg-[#1B2B44] py-10 px-6 mt-[-40px] rounded-t-2xl">
          <motion.div
            ref={featuresRef}
            initial="hidden"
            animate={featuresInView ? "visible" : "hidden"}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-6xl mx-auto"
          >
            {[
              {
                title: " Learning Untuk Lulus Seleksi Nasional",
                text: "Persiapan SNBT kini lebih mudah dan terarah! Dengan materi lengkap, tryout interaktif, serta analisis skor yang akurat, Lulusin siap membantumu melewati seleksi masuk perguruan tinggi dengan percaya diri.",
              },
              {
                icon: <FaUserCheck className="text-4xl text-white mb-4" />,
                title: "Learning Untuk Lulus Seleksi Nasional",
                text: "Persiapan SNBT kini lebih mudah dan terarah! Dengan materi lengkap, tryout interaktif, serta analisis skor yang jelas, kamu siap menentukan strategi terbaik.",
              },
              {
                icon: <FaClipboardList className="text-4xl text-white mb-4" />,
                title: "Seluruh Materi SNBT",
                text: "Belajar lebih mudah dengan kurikulum lengkap yang dirancang untuk menghadapi SNBT dengan percaya diri.",
              },
              {
                icon: <FaBook className="text-4xl text-white mb-4" />,
                title: "Tryout Interaktif & Pencatatan Skor",
                text: "Latih kemampuanmu dengan tryout SNBT dan pantau perkembangan skor setiap sesi.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                custom={index}
                variants={cardVariants}
                whileHover={{
                  y: -10,
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)",
                  transition: { type: "spring", stiffness: 300 },
                }}
                className="bg-[#23395d] p-6 rounded-lg shadow-lg text-center text-white"
              >
                {item.icon && (
                  <motion.div
                    initial={{ rotateY: 0 }}
                    whileHover={{ rotateY: 360 }}
                    transition={{ duration: 0.8 }}
                  >
                    {item.icon}
                  </motion.div>
                )}
                <motion.h3
                  variants={itemVariants}
                  className="font-bold text-lg"
                >
                  {item.title}
                </motion.h3>
                <motion.p variants={itemVariants} className="text-sm mt-2">
                  {item.text}
                </motion.p>
              </motion.div>
            ))}
          </motion.div>
          <div className="bg-[#1B2B44] py-10 px-6 text-white">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center text-lg font-semibold mb-4"
            >
              Tata cara penggunaan aplikasi
            </motion.h3>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="border-t border-gray-400 mb-4"
            />
            <motion.div
              ref={stepsRef}
              initial="hidden"
              animate={stepsInView ? "visible" : "hidden"}
              variants={containerVariants}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto"
            >
              {[...Array(8)].map((_, index) => (
                <motion.div
                  key={index}
                  custom={index}
                  variants={stepVariants}
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: "#3A5785",
                    transition: { type: "spring", stiffness: 300 },
                  }}
                  className="bg-[#2E4568] h-32 rounded-lg shadow-md"
                />
              ))}
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
}
