import { motion } from "framer-motion";

export default function Header() {
  return (
    <div className="flex flex-col flex-grow">
      <motion.header
        className="bg-[#1B2B44] p-4 flex justify-between items-center shadow-md"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-white font-bold text-lg">
          Santoso
          <p className="text-xs font-light">Education Assistant</p>
        </div>
        <nav className="space-x-6 flex text-white text-sm font-semibold">
          <motion.a
            href="#"
            className="hover:text-gray-400 transition"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Home
          </motion.a>
          <motion.a
            href="#"
            className="hover:text-gray-400 transition"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            About
          </motion.a>
          <motion.a
            href="#"
            className="hover:text-gray-400 transition"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Tutorial
          </motion.a>
          <motion.a
            href="/login"
            className="hover:text-gray-400 transition"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Login
          </motion.a>
        </nav>
      </motion.header>
    </div>
  );
}