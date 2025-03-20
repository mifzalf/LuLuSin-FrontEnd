import { motion } from "framer-motion";

export default function Footer() {
  return (
    <motion.footer
      className="bg-[#1B2B44] text-white p-6 mt-8 w-full text-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start">
        <div className="mb-4 md:mb-0">
          <img
            src="/santoso tk lulus kuliah.png"
            alt="Logo"
            className="w-16 h-16 mb-2"
          />
          <h4 className="font-bold text-lg">LuLuSin</h4>
          <p className="text-gray-300">Education Academy</p>
          <p className="text-gray-400">Learning Untuk Lulus Seleksi Nasional</p>
        </div>
        <div className="mb-4 md:mb-0">
          <p>Jl. Raya Lenteng No.km, RW.2,</p>
          <p>Aredake, Batuan, Kec. Batuan,</p>
          <p>Kabupaten Sumenep, Jawa Timur 80582</p>
        </div>
        <div>
          <p className="font-semibold">Hubungi Kami :</p>
          <p>
            Email: <span className="text-gray-300">dewaruci393@gmail.com</span>
          </p>
          <p>
            Kontak: <span className="text-gray-300">+62 812-3516-3528</span>
          </p>
        </div>
      </div>
      <div className="mt-4 text-center text-gray-400 text-xs">
        © 2025 LuLuSin. All Rights Reserved PT. Mesir Timur Tengah
      </div>
    </motion.footer>
  );
}