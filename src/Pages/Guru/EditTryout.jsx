"use client";

import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { FiSave, FiX } from "react-icons/fi";
import axiosInstance from "../../api/axiosInstance";

const EditTryout = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [tryoutId, setTryoutId] = useState(null);
  const [namaTryout, setNamaTryout] = useState("");
  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState({ show: false, message: "" });

  useEffect(() => {
    const id = searchParams.get("id");
    if (id) {
      setTryoutId(id);
      fetchTryoutData(id);
    } else {
      setError("ID Tryout tidak ditemukan di URL.");
      setLoading(false);
    }
  }, [searchParams]);

  const fetchTryoutData = async (id) => {
    setLoading(true);
    setError(null);
    try {
      console.log(`Fetching tryout data for ID: ${id}`);
      const response = await axiosInstance.get(`/API/teacher/tryout/${id}`);
      console.log('Fetched data:', response.data);

      if (response.data && typeof response.data === 'object' && response.data.tryout_name !== undefined) {
        const tryoutData = response.data;
        setNamaTryout(tryoutData.tryout_name || "");
        setInitialData(tryoutData);
      } else {
        console.error("Unexpected API response structure for get tryout by ID:", response.data);
        setError("Format data tryout tidak sesuai atau data tidak ditemukan.");
      }
    } catch (err) {
      console.error('Error fetching tryout data:', err);
      let message = "Gagal memuat data tryout.";
      if (err.response) {
        message = `Error ${err.response.status}: ${err.response.data?.message || err.message}`;
         if (err.response.status === 401) {
             setError("Sesi anda telah berakhir. Silakan login kembali.");
             navigate('/login');
             return;
          }
      } else if (err.request) {
        message = "Tidak dapat terhubung ke server.";
      }
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!tryoutId || !initialData) {
      setError("Data tryout tidak lengkap atau ID tidak valid.");
      return;
    }

    setSaving(true);
    setError(null);
    setNotification({ show: false, message: "" });

    try {
      const payload = {
        ...initialData,
        tryout_name: namaTryout,
      };

      console.log(`Updating tryout ID: ${tryoutId} with data:`, payload);
      const response = await axiosInstance.put(`/API/teacher/tryout/update/${tryoutId}`, payload);
      console.log('Update response:', response.data);

      if (response.data.success) {
        setNotification({ show: true, message: "Tryout berhasil diperbarui!" });
        setTimeout(() => {
          setNotification({ show: false, message: "" });
          navigate("/guru/tryout", {
             state: {
               notification: {
                 type: 'success',
                 message: 'Tryout berhasil diperbarui!'
               }
             }
           });
        }, 1500);
      } else {
        throw new Error(response.data.message || 'Gagal memperbarui tryout');
      }
    } catch (err) {
      console.error('Error updating tryout:', err);
      let message = "Gagal memperbarui tryout.";
      if (err.response) {
        message = `Error ${err.response.status}: ${err.response.data?.message || err.message}`;
         if (err.response.status === 401) {
             setError("Sesi anda telah berakhir. Silakan login kembali.");
             navigate('/login');
             return;
          }
      } else if (err.request) {
        message = "Tidak dapat terhubung ke server.";
      }
      setError(message);
      setNotification({ show: true, message: message, type: 'error' });
       setTimeout(() => setNotification({ show: false, message: "" }), 3000);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center bg-gradient-to-b from-[#f5f0e8] to-[#e8e0d0] min-h-screen w-screen p-4">
        <div className="text-[#2e4460]">Loading data...</div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center bg-gradient-to-b from-[#f5f0e8] to-[#e8e0d0] min-h-screen w-screen p-4">
      <motion.div
        className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 w-full max-w-md relative"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
         <button
           className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
           onClick={() => navigate("/guru/tryout")}
           aria-label="Close"
         >
           <FiX size={24} />
         </button>

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

        {error && (
          <motion.div
            className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg border border-red-200"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {error}
          </motion.div>
        )}

        {notification.show && (
          <motion.div
            className={`mb-4 p-3 rounded-lg border ${notification.type === 'error' ? 'bg-red-100 text-red-700 border-red-200' : 'bg-green-100 text-green-700 border-green-200'}`}
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
              className="w-full text-black px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2e4460] focus:border-transparent transition-all disabled:bg-gray-100"
              whileFocus={{ boxShadow: "0 0 0 3px rgba(46, 68, 96, 0.2)" }}
              disabled={saving || loading}
              required
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
            className="w-full bg-[#2e4460] text-white py-3 rounded-lg hover:bg-[#1e3247] transition-all flex items-center justify-center gap-2 shadow-md disabled:bg-gray-400"
            whileHover={{ scale: !saving && !loading ? 1.03 : 1 }}
            whileTap={{ scale: !saving && !loading ? 0.97 : 1 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            disabled={saving || loading || !tryoutId || error}
          >
            <FiSave /> {saving ? "Memperbarui..." : "Perbarui"}
          </motion.button>
        </motion.form>
      </motion.div>
    </div>
  );
};

export default EditTryout;
