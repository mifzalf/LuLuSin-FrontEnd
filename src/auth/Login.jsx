"use client"

import { motion } from "framer-motion"

const Login = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#1B2B44] h-screen w-screen">
      <section className="flex items-center justify-center w-full h-screen px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row w-full max-w-5xl mx-auto bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl shadow-lg overflow-hidden"
        >
          {/* Bagian Kiri - Form Login */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="w-full md:w-1/2 bg-[#F5F0EB] flex flex-col items-center justify-center px-6 md:px-10 py-8"
          >
            <motion.h2
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="text-3xl font-bold text-gray-800 mb-6"
            >
              Login
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.4 }}
              className="text-gray-600 text-center mb-4"
            >
              Masuk untuk melanjutkan perjalananmu menuju kesuksesan!
            </motion.p>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.4 }}
              className="w-full mb-4"
            >
              <label className="block text-gray-700 text-sm font-semibold mb-1">Email</label>
              <motion.input
                whileFocus={{ scale: 1.02, boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.3)" }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                type="email"
                placeholder="Masukkan email"
                className="w-full p-3 border border-gray-400 rounded-xl focus:outline-none"
              />
            </motion.div>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.4 }}
              className="w-full mb-5"
            >
              <label className="block text-gray-700 text-sm font-semibold mb-1">Password</label>
              <motion.input
                whileFocus={{ scale: 1.02, boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.3)" }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                type="password"
                placeholder="Masukkan password"
                className="w-full p-3 border border-gray-400 rounded-xl focus:outline-none"
              />
            </motion.div>
            <motion.button
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ delay: 0.9, duration: 0.4, type: "spring", stiffness: 400, damping: 10 }}
              className="w-full bg-blue-500 text-white p-3 rounded-xl hover:bg-blue-600 transition"
            >
              Login
            </motion.button>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.4 }}
              className="mt-5 text-sm text-gray-600"
            >
              Belum memiliki akun?{" "}
              <motion.a
                whileHover={{ scale: 1.05, color: "#2563EB" }}
                href="/register"
                className="text-blue-600 font-semibold"
              >
                Register
              </motion.a>
            </motion.p>
          </motion.div>

          {/* Bagian Kanan - Deskripsi */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="w-full md:w-1/2 flex flex-col items-center justify-center text-white px-6 md:px-10 py-8 bg-gradient-to-b from-blue-300 to-blue-200 shadow-lg"
          >
            <motion.h2
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.4 }}
              className="text-2xl font-bold mb-3 text-center"
            >
              Selamat Datang <br /> Kembali di Lulusin!
            </motion.h2>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.4 }}
              className="text-center text-sm"
            >
              Ayo lanjutkan perjalananmu menuju kampus impian. <br />
              Masuk sekarang dan pantau progres belajarmu!
            </motion.p>
          </motion.div>
        </motion.div>
      </section>
    </div>
  )
}

export default Login

