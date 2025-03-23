import { motion } from "framer-motion";

const Home = () => {
  const tryouts = [
    { nama: "Tryout UTBK SNBT 2025 Ep. 1", jumlahSoal: 120, totalSoal: 170 },
    { nama: "Tryout UTBK SNBT 2025 Ep. 2", jumlahSoal: 1, totalSoal: 0 },
  ];

  return (
    <div className="bg-[#F5F0E9] flex flex-col items-center p-10 min-h-screen w-screen">
      <motion.button
        className="bg-[#2F4A6D] text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Nama Guru
      </motion.button>
      <motion.div
        className="mt-8 w-full max-w-4xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <table className="w-full border-collapse shadow-lg rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-[#2F4A6D] text-white">
              <th className="p-4 text-left">Nama Tryout</th>
              <th className="p-4 text-left">Jumlah Soal</th>
              <th className="p-4 text-left">Total Soal</th>
            </tr>
          </thead>
          <tbody>
            {tryouts.map((tryout, index) => (
              <motion.tr
                key={index}
                className="border-b bg-white hover:bg-gray-100 transition-colors duration-300"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.2 }}
              >
                <td className="p-4 text-blue-600">{tryout.nama}</td>
                <td className="p-4 text-blue-600">{tryout.jumlahSoal}</td>
                <td className="p-4 text-blue-600">{tryout.totalSoal}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
};

export default Home;