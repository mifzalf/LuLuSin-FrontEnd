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

        if (response.data && response.data.teacherData && response.data.tryouts) {
          console.log("Teacher Data from API:", response.data.teacherData);
          
          const teacherName = response.data.teacherData[0]?.username ||
                            response.data.teacherData?.username ||
                            response.data.teacherData[0]?.teacher_name || 
                            response.data.teacherData?.teacher_name || 
                            "Nama Guru";
          
          setDashboardData({
            teacher_name: teacherName, 
            tryouts: response.data.tryouts.map(t => ({ 
              id: t.tryout_id || null,
              nama: t.tryout_name || "Nama Tryout Tidak Tersedia", 
              soalDibuat: t.total_questions_created !== undefined ? t.total_questions_created : 'N/A', 
              targetSoal: t.total_questions_target !== undefined ? t.total_questions_target : 'N/A'
            })) 
          });
        } else {
          throw new Error("Format data dashboard tidak sesuai harapan.");
        }
      } catch (err) {
        console.error("Error fetching or processing dashboard data:", err);
        const errorMessage = err.response?.data?.message || err.message || "Terjadi kesalahan saat memuat data dashboard.";
        setError(errorMessage);
        setDashboardData({ teacher_name: "Error", tryouts: [] }); 
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="bg-[#F5F0E9] flex flex-col p-6 md:p-10 min-h-screen w-full items-center">
      <div className="w-full max-w-4xl">
        <motion.h1 
          className="text-3xl font-bold text-[#2F4A6D] mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Dashboard
        </motion.h1>

        <motion.button
          className="bg-[#2F4A6D] text-white px-4 py-2 rounded-md shadow-sm hover:bg-[#1e364d] transition-all duration-300 mb-6 text-sm"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {loading ? "Loading..." : error ? "Error" : dashboardData.teacher_name}
        </motion.button>

        {loading && (
          <div className="mt-8 text-center text-[#2f4a64]">Memuat data tryout...</div>
        )}

        {!loading && error && (
          <div className="mt-8 w-full bg-red-100 text-red-700 p-4 rounded-lg shadow-md">
            Error: {error}
          </div>
        )}

        {!loading && !error && (
          <motion.div
            className="bg-white rounded-lg shadow-md overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <table className="w-full border-collapse">
              <thead className="bg-[#2F4A6D] text-white text-sm">
                <tr>
                  <th className="py-3 px-4 md:px-6 text-left font-semibold">Nama Tryout</th>
                  <th className="py-3 px-4 md:px-6 text-center font-semibold">Soal Dibuat</th>
                  <th className="py-3 px-4 md:px-6 text-center font-semibold">Target Soal</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {dashboardData.tryouts.length > 0 ? (
                  dashboardData.tryouts.map((tryout, index) => (
                    <motion.tr
                      key={tryout.id || index}
                      className="border-b last:border-b-0 hover:bg-gray-50 transition-colors duration-200"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <td className="py-3 px-4 md:px-6 text-[#2f4a64] font-medium">{tryout.nama}</td>
                      <td className="py-3 px-4 md:px-6 text-[#2f4a64] text-center">{tryout.soalDibuat}</td>
                      <td className="py-3 px-4 md:px-6 text-[#2f4a64] text-center">{tryout.targetSoal}</td>
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
    </div>
  );
};

export default Dashboard;