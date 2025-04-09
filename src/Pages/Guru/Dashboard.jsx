import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import axiosInstance from "../../api/axiosInstance";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({ teacher_name: "", tryouts: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      setError(null);
      try {
        console.log("Fetching dashboard data...");
        const response = await axiosInstance.get("/API/teacher/dashboard");
        console.log("Dashboard API Response:", response.data);

        if (response.data && response.data.success && response.data.data) {
          setDashboardData({
            teacher_name: response.data.data.teacher_name || "Nama Guru",
            tryouts: response.data.data.tryouts?.map(t => ({ 
              nama: t.tryout_name, 
              soalDibuat: t.total_questions_created, 
              targetSoal: t.total_questions_target
            })) || [] 
          });
        } else {
          throw new Error(response.data?.message || "Failed to fetch dashboard data or data format is incorrect");
        }
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError(err.message || "Terjadi kesalahan saat memuat data dashboard.");
        setDashboardData({ teacher_name: "Error", tryouts: [] }); 
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="bg-[#F5F0E9] flex flex-col items-center p-10 min-h-screen">
      <motion.button
        className="bg-[#2F4A6D] text-white px-6 py-3 rounded-lg shadow-md hover:bg-[#1e364d] transition-all duration-300 mb-8"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {loading ? "Loading..." : error ? "Error" : dashboardData.teacher_name}
      </motion.button>

      {loading && (
        <div className="mt-8 text-[#2f4a64]">Memuat data tryout...</div>
      )}

      {!loading && error && (
        <div className="mt-8 w-full max-w-4xl bg-red-100 text-red-700 p-4 rounded-lg shadow-md">
          Error: {error}
        </div>
      )}

      {!loading && !error && (
        <motion.div
          className="w-full max-w-4xl bg-white rounded-lg shadow-md overflow-hidden"
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
              {dashboardData.tryouts.length > 0 ? (
                dashboardData.tryouts.map((tryout, index) => (
                  <motion.tr
                    key={tryout.id || index}
                    className="border-b last:border-b-0 hover:bg-gray-50 transition-colors duration-200"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <td className="py-4 px-6 text-[#2f4a64]">{tryout.nama}</td>
                    <td className="py-4 px-6 text-[#2f4a64]">{tryout.soalDibuat}</td>
                    <td className="py-4 px-6 text-[#2f4a64]">{tryout.targetSoal}</td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="py-4 px-6 text-center text-gray-500">
                    Tidak ada data tryout untuk ditampilkan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </motion.div>
      )}
    </div>
  );
};

export default Dashboard;
