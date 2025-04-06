"use client"

import { motion } from "framer-motion"
import React from "react";

const Register = () => {
  return (
    <div className="fixed inset-0 bg-[#1B2B44] overflow-hidden">
      <section className="w-full h-full flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-5xl mx-4 bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row"
          style={{ maxHeight: "90vh" }}
        >
          {/* Left Section - Description */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="w-full md:w-1/2 flex flex-col items-center justify-center text-white p-6 md:p-8 bg-[#2D4562]"
          >
            <motion.h2
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="text-2xl font-bold mb-3 text-center"
            >
              Selamat Datang di <br /> Lulusin!
            </motion.h2>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.4 }}
              className="text-center text-sm"
            >
              Bersiaplah menaklukkan SNBT dengan materi lengkap, tryout interaktif, dan analisis skor cerdas. Daftar
              sekarang dan mulai langkahmu menuju masa depan cerah!
            </motion.p>
          </motion.div>

          {/* Right Section - Register Form */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="w-full md:w-1/2 bg-[#F5F0EB] flex flex-col items-center justify-center p-6 md:p-8"
          >
            <motion.h2
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="text-3xl font-bold text-[#2D4562] mb-5 text-center"
            >
              Register
            </motion.h2>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.4 }}
              className="w-full mb-3"
            >
              <label className="block text-sm font-medium text-[#2D4562] mb-1">Email</label>
              <motion.input
                whileFocus={{ scale: 1.02, boxShadow: "0 0 0 2px rgba(45, 69, 98, 0.3)" }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                type="email"
                placeholder="contoh@email.com"
                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none"
              />
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.4 }}
              className="w-full mb-3 flex gap-2"
            >
              <div className="w-1/2">
                <label className="block text-sm font-medium text-[#2D4562] mb-1">Nama Lengkap</label>
                <motion.input
                  whileFocus={{ scale: 1.02, boxShadow: "0 0 0 2px rgba(45, 69, 98, 0.3)" }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  type="text"
                  placeholder="Masukkan nama lengkap"
                  className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none"
                />
              </div>
              <div className="w-1/2">
                <label className="block text-sm font-medium text-[#2D4562] mb-1">NISN</label>
                <motion.input
                  whileFocus={{ scale: 1.02, boxShadow: "0 0 0 2px rgba(45, 69, 98, 0.3)" }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  type="text"
                  placeholder="Masukkan NISN"
                  className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.4 }}
              className="w-full mb-3"
            >
              <label className="block text-sm font-medium text-[#2D4562] mb-1">Password</label>
              <motion.input
                whileFocus={{ scale: 1.02, boxShadow: "0 0 0 2px rgba(45, 69, 98, 0.3)" }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                type="password"
                placeholder="Masukkan password"
                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none"
              />
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.4 }}
              className="w-full mb-4"
            >
              <label className="block text-sm font-medium text-[#2D4562] mb-1">Konfirmasi Password</label>
              <motion.input
                whileFocus={{ scale: 1.02, boxShadow: "0 0 0 2px rgba(45, 69, 98, 0.3)" }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                type="password"
                placeholder="Masukkan ulang password"
                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 1, duration: 0.4 }}
              className="w-full border-t border-gray-300 my-3"
            />

            <motion.button
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ delay: 1.1, duration: 0.4, type: "spring", stiffness: 400, damping: 10 }}
              className="w-full bg-[#2D4562] text-white p-3 rounded-xl hover:bg-[#1B2B44] transition font-semibold"
            >
              Daftar Sekarang
            </motion.button>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.4 }}
              className="mt-4 text-sm text-gray-600 text-center"
            >
              Sudah memiliki akun?{" "}
              <motion.a
                whileHover={{ scale: 1.05, color: "#1B2B44" }}
                href="/login"
                className="text-[#2D4562] font-semibold"
              >
                Masuk di sini
              </motion.a>
            </motion.p>
          </motion.div>
        </motion.div>
      </section>
    </div>
  )
}

export default Register

