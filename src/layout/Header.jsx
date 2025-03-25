import { motion } from "framer-motion";
import React from "react";

export default function Header() {
  return (
    <div className="w-full">
      <motion.header
        className="bg-[#1B2B44] p-4 flex justify-between items-center shadow-md w-full"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Logo and title */}
        <div className="text-white font-bold text-lg pl-16">
          LuLuSin
          <p className="text-xs font-light">Education Academy</p>
        </div>

        {/* Navigation */}
        <div className="flex items-center space-x-4 text-white text-sm font-semibold">
          <motion.a
            href="#"
            className="hover:text-gray-400 transition"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Dashboard
          </motion.a>
          <motion.a
            href="#"
            className="hover:text-gray-400 transition"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Tryout
          </motion.a>
          <motion.button
            className="bg-gray-600 text-white px-4 py-1 rounded-full text-sm shadow-md pr-15 hover:bg-gray-500 transition"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            Logout
          </motion.button>
        </div>
      </motion.header>
    </div>
  );
}