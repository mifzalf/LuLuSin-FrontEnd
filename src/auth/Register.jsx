"use client"

import { motion } from "framer-motion"

const Register = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#1B2B44] h-screen w-screen">
      <section className="flex items-center justify-center w-full h-screen px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row w-full max-w-5xl mx-auto bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl shadow-lg overflow-hidden"
        >
          {/* Bagian Kiri - Deskripsi */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="w-full md:w-1/2 flex flex-col items-center justify-center text-white px-6 md:px-10 py-8 bg-[#2D4562]"
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
              className="text-center text-sm px-4"
            >
              Bersiaplah menaklukkan SNBT dengan materi lengkap, tryout interaktif, dan analisis skor cerdas. Daftar
              sekarang dan mulai langkahmu menuju masa depan cerah!
            </motion.p>
          </motion.div>

          {/* Bagian Kanan - Form Register */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="w-full md:w-1/2 bg-[#F5F0EB] flex flex-col items-center justify-center px-6 md:px-10 py-8"
          >
            <motion.h2
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="text-3xl font-bold text-[#2D4562] mb-6 text-center"
            >
              Register
            </motion.h2>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.4 }}
              className="w-full mb-4"
            >
              <motion.input
                whileFocus={{ scale: 1.02, boxShadow: "0 0 0 2px rgba(45, 69, 98, 0.3)" }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                type="email"
                placeholder="Email"
                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none"
              />
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.4 }}
              className="w-full mb-4 flex gap-2"
            >
              <motion.input
                whileFocus={{ scale: 1.02, boxShadow: "0 0 0 2px rgba(45, 69, 98, 0.3)" }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                type="text"
                placeholder="Nama"
                className="w-1/2 p-3 border border-gray-300 rounded-xl focus:outline-none"
              />
              <motion.input
                whileFocus={{ scale: 1.02, boxShadow: "0 0 0 2px rgba(45, 69, 98, 0.3)" }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                type="text"
                placeholder="NISN"
                className="w-1/2 p-3 border border-gray-300 rounded-xl focus:outline-none"
              />
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.4 }}
              className="w-full mb-4"
            >
              <motion.input
                whileFocus={{ scale: 1.02, boxShadow: "0 0 0 2px rgba(45, 69, 98, 0.3)" }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                type="password"
                placeholder="Password"
                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none"
              />
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.4 }}
              className="w-full mb-5"
            >
              <motion.input
                whileFocus={{ scale: 1.02, boxShadow: "0 0 0 2px rgba(45, 69, 98, 0.3)" }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                type="password"
                placeholder="Konfirmasi Password"
                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 1, duration: 0.4 }}
              className="w-full border-t border-gray-300 my-4"
            />

            <motion.button
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ delay: 1.1, duration: 0.4, type: "spring", stiffness: 400, damping: 10 }}
              className="w-full bg-[#2D4562] text-white p-3 rounded-xl hover:bg-[#1B2B44] transition font-semibold"
            >
              Register
            </motion.button>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.4 }}
              className="mt-5 text-sm text-gray-600 text-center"
            >
              sudah memiliki akun?{" "}
              <motion.a
                whileHover={{ scale: 1.05, color: "#1B2B44" }}
                href="#"
                className="text-[#2D4562] font-semibold"
              >
                Login
              </motion.a>
            </motion.p>
          </motion.div>
        </motion.div>
      </section>
    </div>
  )
}

export default Register

