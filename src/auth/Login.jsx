"use client"

import { motion } from "framer-motion"
import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import axiosInstance from "../api/axiosInstance"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async () => {
    setError(null)
    setLoading(true)
    try {
      const response = await axiosInstance.post("/API/login", {
        email,
        password,
      })
      console.log("Login successful:", response.data)

      if (response.data && response.data.token && response.data.userType) {
        localStorage.setItem('authToken', response.data.token);
        localStorage.setItem('userType', response.data.userType);
        console.log("Token and userType saved to localStorage");

        navigate("/dashboard")
      } else {
        console.error("Login successful, but token or userType missing in response:", response.data);
        setError("Respons login tidak valid.");
      }

    } catch (err) {
      console.error("Login failed:", err)
      const errorMessage = err.response?.data?.message || err.message || "Login gagal. Periksa kembali email dan password Anda."
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

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
          {/* Left Section - Login Form */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="w-full md:w-1/2 bg-[#F5F0EB] flex flex-col items-center justify-center p-6 md:p-8"
          >
            <motion.h2
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="text-3xl font-bold text-[#2D4562] mb-5"
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
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full mb-3 p-3 bg-red-100 border border-red-400 text-red-700 rounded-xl text-center"
              >
                {error}
              </motion.div>
            )}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.4 }}
              className="w-full mb-3"
            >
              <label className="block text-gray-700 text-sm font-semibold mb-1">Email</label>
              <motion.input
                whileFocus={{ scale: 1.02, boxShadow: "0 0 0 2px rgba(45, 69, 98, 0.3)" }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                type="email"
                placeholder="Masukkan email"
                className="w-full p-3 border border-gray-300 rounded-xl bg-white text-gray-900 focus:outline-none focus:border-[#2D4562] focus:ring-1 focus:ring-[#2D4562]"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
            </motion.div>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.4 }}
              className="w-full mb-4"
            >
              <label className="block text-gray-700 text-sm font-semibold mb-1">Password</label>
              <motion.input
                whileFocus={{ scale: 1.02, boxShadow: "0 0 0 2px rgba(45, 69, 98, 0.3)" }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                type="password"
                placeholder="Masukkan password"
                className="w-full p-3 border border-gray-300 rounded-xl bg-white text-gray-900 focus:outline-none focus:border-[#2D4562] focus:ring-1 focus:ring-[#2D4562]"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
            </motion.div>
            <motion.button
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ delay: 0.9, duration: 0.4, type: "spring", stiffness: 400, damping: 10 }}
              className="w-full bg-[#2D4562] text-white p-3 rounded-xl hover:bg-[#1B2B44] transition font-semibold disabled:opacity-50"
              onClick={handleLogin}
              disabled={loading}
            >
              {loading ? "Loading..." : "Login"}
            </motion.button>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.4 }}
              className="mt-4 text-sm text-gray-600 text-center"
            >
              Belum memiliki akun?{" "}
              <motion.a
                whileHover={{ scale: 1.05, color: "#1B2B44" }}
                href="/register"
                className="text-[#2D4562] font-semibold"
              >
                Register
              </motion.a>
            </motion.p>
          </motion.div>

          {/* Right Section - Description */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="w-full md:w-1/2 flex flex-col items-center justify-center text-white p-6 md:p-8 bg-[#2D4562]"
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

