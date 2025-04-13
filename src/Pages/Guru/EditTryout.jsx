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
  const [subjects, setSubjects] = useState([]);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState({ show: false, message: "" });

  useEffect(() => {
    const id = searchParams.get("id");
    if (id) {
      setTryoutId(id);
      Promise.all([
        fetchTryoutData(id),
        fetchSubjects()
      ]);
    } else {
      setError("ID Tryout tidak ditemukan di URL.");
      setLoading(false);
    }
  }, [searchParams]);

  const fetchSubjects = async () => {
    try {
      const response = await axiosInstance.get("/API/teacher/subject");
      if (response.data && response.data.datasubject) {
        setSubjects(response.data.datasubject);
      }
    } catch (err) {
      console.error('Error fetching subjects:', err);
      setError("Gagal memuat data subjek");
    }
  };

  const fetchTryoutData = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get(`/API/teacher/tryout/${id}`);
      
      if (response.data && response.data.result) {
        const tryoutData = response.data.result;
        setNamaTryout(tryoutData.tryout_name || "");
        setSelectedSubjects(tryoutData.subject_ids || []);
        setInitialData(tryoutData);
      } else {
        setError("Format data tryout tidak sesuai atau data tidak ditemukan.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Gagal memuat data tryout");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const response = await axiosInstance.put(`/API/teacher/tryout/update/${tryoutId}`, {
        tryout_name: namaTryout,
        subject_ids: selectedSubjects
      });

      if (response.data.success) {
        // Refresh GuruSubjek data
        navigate("/guru/subjek", {
          state: {
            notification: {
              type: 'success',
              message: 'Data subjek telah diperbarui'
            }
          }
        });

        // Navigate back to tryout page
        navigate("/guru/tryout", {
          state: {
            notification: {
              type: 'success',
              message: 'Tryout berhasil diperbarui!'
            }
          }
        });
      } else {
        setError("Gagal memperbarui tryout");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Gagal memperbarui tryout");
    } finally {
      setSaving(false);
    }
  };

  const handleSubjectChange = (subjectId) => {
    setSelectedSubjects(prev => {
      const selected = [...prev];
      const index = selected.indexOf(subjectId);
      
      if (index === -1) {
        selected.push(subjectId);
      } else {
        selected.splice(index, 1);
      }

      return selected;
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f5f0e6] flex items-center justify-center">
        <div className="text-[#2f4a64]">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f0e6] p-6">
      <motion.div
        className="max-w-2xl mx-auto bg-white rounded-xl p-6 shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
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

          <motion.div
            className="mb-6"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Pilih Subjek
            </label>
            <div className="space-y-2 max-h-60 overflow-y-auto border border-gray-300 rounded-lg p-3">
              {subjects.map(subject => (
                <div key={subject.subject_id} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`subject-${subject.subject_id}`}
                    checked={selectedSubjects.includes(subject.subject_id)}
                    onChange={() => handleSubjectChange(subject.subject_id)}
                    className="h-4 w-4 text-[#2e4460] border-gray-300 rounded focus:ring-[#2e4460]"
                    disabled={saving || loading}
                  />
                  <label
                    htmlFor={`subject-${subject.subject_id}`}
                    className="ml-2 text-sm text-gray-700"
                  >
                    {subject.subject_name}
                  </label>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.button
            type="submit"
            className="w-full bg-[#2e4460] text-white py-3 rounded-lg hover:bg-[#1e3247] transition-all flex items-center justify-center gap-2 shadow-md disabled:bg-gray-400"
            whileHover={{ scale: !saving && !loading ? 1.03 : 1 }}
            whileTap={{ scale: !saving && !loading ? 0.97 : 1 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            disabled={saving || loading || !tryoutId || error || selectedSubjects.length === 0}
          >
            <FiSave /> {saving ? "Memperbarui..." : "Perbarui"}
          </motion.button>
        </motion.form>
      </motion.div>
    </div>
  );
};

export default EditTryout;
