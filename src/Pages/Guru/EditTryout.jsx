"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FiSave } from "react-icons/fi";

const EditTryout = () => {
  const [namaTryout, setNamaTryout] = useState("");
  const [notification, setNotification] = useState({ show: false, message: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Tryout diperbarui:", namaTryout);
    setNotification({ show: true, message: "Tryout berhasil diperbarui!" });
    
    // Hide notification after 3 seconds
    setTimeout(() => {
      setNotification({ show: false, message: "" });
    }, 3000);
  };

  return (
    <div className="flex items-center justify-center bg-gradient-to-b from-[#f5f0e8] to-[#e8e0d0] min-h-screen w-screen p-4">
      <motion.div
        className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 w-full max-w-md"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <motion.h1
          className="text-xl font-bold text-gray-800 mb-6 relative"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Edit Tryout
          <motion.div
            className="absolute -bottom-2 left-0 h-1 bg-[#2e4460] rounded-full"
            initial={{ width: 0 }}
            animate={{ width: "60px" }}
            transition={{ delay: 0.4, duration: 0.4 }}
          />
        </motion.h1>

        {notification.show && (
          <motion.div 
            className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg border border-green-200"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {notification.message}
          </motion.div>
        )}

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <motion.div
            className="mb-6"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Nama Tryout
            </label>
            <motion.input
              type="text"
              value={namaTryout}
              onChange={(e) => setNamaTryout(e.target.value)}
              className="w-full text-black px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2e4460] focus:border-transparent transition-all"
              whileFocus={{ boxShadow: "0 0 0 3px rgba(46, 68, 96, 0.2)" }}
            />
          </motion.div>

          <motion.hr
            className="border-gray-300 mb-6"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          />

          <motion.button
            type="submit"
            className="w-full bg-[#2e4460] text-white py-3 rounded-lg hover:bg-[#1e3247] transition-all flex items-center justify-center gap-2 shadow-md"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <FiSave /> Perbarui
          </motion.button>
        </motion.form>
      </motion.div>
    </div>
  );
};

export default EditTryout;
