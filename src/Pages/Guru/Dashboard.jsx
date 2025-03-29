import { motion } from "framer-motion";

const Dashboard = () => {
  const tryouts = [
    { nama: "Tryout UTBK SNBT 2025 Ep. 1", soalDibuat: 110, targetSoal: 160 },
    { nama: "Tryout UTBK SNBT 2025 Ep. 2", soalDibuat: 0, targetSoal: 160 },
    { nama: "Tryout UTBK SNBT 2025 Ep. 3", soalDibuat: 0, targetSoal: 160 },
  ];

  return (
    <div className="bg-[#F5F0E9] flex flex-col items-center p-10 min-h-screen">
      <motion.button
        className="bg-[#2F4A6D] text-white px-6 py-3 rounded-lg shadow-md hover:bg-[#1e364d] transition-all duration-300"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        Nama Guru
      </motion.button>

      <motion.div
        className="mt-8 w-full max-w-4xl bg-white rounded-lg shadow-md overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[#2F4A6D] text-white">
              <th className="py-4 px-6 text-left font-semibold">Nama Tryout</th>
              <th className="py-4 px-6 text-left font-semibold">Soal Dibuat</th>
              <th className="py-4 px-6 text-left font-semibold">Target Soal</th>
            </tr>
          </thead>
          <tbody>
            {tryouts.map((tryout, index) => (
              <motion.tr
                key={index}
                className="border-b last:border-b-0 hover:bg-gray-50 transition-colors duration-200"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <td className="py-4 px-6 text-[#2f4a64]">{tryout.nama}</td>
                <td className="py-4 px-6 text-[#2f4a64]">{tryout.soalDibuat}</td>
                <td className="py-4 px-6 text-[#2f4a64]">{tryout.targetSoal}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
};

export default Dashboard;
