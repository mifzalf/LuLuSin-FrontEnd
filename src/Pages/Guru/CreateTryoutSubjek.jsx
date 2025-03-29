"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiPlus, FiX, FiArrowRight, FiArrowLeft } from "react-icons/fi";
import GuruLayout from "./Layout/GuruLayout";

const CreateTryoutSubjek = () => {
  const [questions, setQuestions] = useState([
    {
      question: "",
      options: ["", "", "", "", ""],
      image: null,
      imagePreview: null
    }
  ]);

  const addQuestion = () => {
    setQuestions([
      {
        question: "",
        options: ["", "", "", "", ""],
        image: null,
        imagePreview: null
      },
      ...questions
    ]);
  };

  const handleImageChange = (questionIndex, e) => {
    const file = e.target.files[0];
    if (file) {
      const newQuestions = [...questions];
      newQuestions[questions.length - 1 - questionIndex].image = file;
      newQuestions[questions.length - 1 - questionIndex].imagePreview = URL.createObjectURL(file);
      setQuestions(newQuestions);
    }
  };

  const removeImage = (questionIndex) => {
    const newQuestions = [...questions];
    newQuestions[questions.length - 1 - questionIndex].image = null;
    newQuestions[questions.length - 1 - questionIndex].imagePreview = null;
    setQuestions(newQuestions);
  };

  const addOption = (questionIndex) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options.push("");
    setQuestions(newQuestions);
  };

  const removeOption = (questionIndex, optionIndex) => {
    if (questions[questionIndex].options.length > 2) {
      const newQuestions = [...questions];
      newQuestions[questionIndex].options = newQuestions[questionIndex].options.filter(
        (_, index) => index !== optionIndex
      );
      setQuestions(newQuestions);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  return (
    <GuruLayout>
      <div className="flex justify-center items-center w-full">
        <motion.div
          className="border-2 border-[#213555] rounded-2xl p-8 w-full max-w-xl bg-white shadow-lg"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <motion.h2
            className="text-xl font-bold mb-6 text-[#213555] relative"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Buat Soal Tryout
            <motion.div
              className="absolute -bottom-2 left-0 h-1 bg-[#4F709C] rounded-full"
              initial={{ width: 0 }}
              animate={{ width: "60px" }}
              transition={{ delay: 0.4, duration: 0.4 }}
            />
          </motion.h2>

          <motion.button
            className="w-full bg-gradient-to-r from-[#213555] to-[#4F709C] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#4F709C] flex items-center gap-2 justify-center shadow-sm mb-6"
            onClick={addQuestion}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiPlus size={16} /> Tambah Soal Baru
          </motion.button>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            {[...questions].reverse().map((questionItem, questionIndex) => (
              <motion.div key={questions.length - 1 - questionIndex} className="border-b pb-6 mb-6 last:border-b-0">
                <motion.div variants={itemVariants}>
                  <label className="block mb-2 text-sm font-medium text-[#213555]">
                    Soal {questions.length - questionIndex}
                  </label>
                  <motion.textarea
                    className="w-full p-3 border border-[#213555] bg-[#F8F9FA] rounded-lg h-32 focus:outline-none focus:ring-2 focus:ring-[#4F709C] focus:border-transparent transition-all text-black"
                    value={questionItem.question}
                    onChange={(e) => {
                      const newQuestions = [...questions];
                      newQuestions[questions.length - 1 - questionIndex].question = e.target.value;
                      setQuestions(newQuestions);
                    }}
                    whileFocus={{ boxShadow: "0 0 0 3px rgba(33, 53, 85, 0.2)" }}
                  ></motion.textarea>
                </motion.div>

                {/* Image Upload Section */}
                <motion.div variants={itemVariants} className="mt-4">
                  <label className="block mb-2 text-sm font-medium text-[#213555]">
                    Gambar Soal (Opsional)
                  </label>
                  <div className="space-y-4">
                    <div className="flex items-center justify-center w-full">
                      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-[#213555] border-dashed rounded-lg cursor-pointer bg-[#F8F9FA] hover:bg-gray-100">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <FiPlus className="w-8 h-8 mb-2 text-[#213555]" />
                          <p className="text-sm text-[#213555]">
                            Klik untuk upload gambar
                          </p>
                        </div>
                        <input
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={(e) => handleImageChange(questionIndex, e)}
                        />
                      </label>
                    </div>

                    {questionItem.imagePreview && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="relative"
                      >
                        <img
                          src={questionItem.imagePreview}
                          alt="Preview"
                          className="max-h-48 rounded-lg mx-auto"
                        />
                        <button
                          onClick={() => removeImage(questionIndex)}
                          className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                        >
                          <FiX size={16} />
                        </button>
                      </motion.div>
                    )}
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="space-y-3 mt-4">
                  <div className="flex justify-between items-center">
                    <label className="block text-sm font-bold text-[#213555]">
                      Opsi
                    </label>
                    <motion.button
                      className="bg-gradient-to-r from-[#213555] to-[#4F709C] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#4F709C] flex items-center gap-2 shadow-sm"
                      onClick={() => addOption(questions.length - 1 - questionIndex)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FiPlus size={16} /> Tambah Opsi
                    </motion.button>
                  </div>

                  <motion.div
                    className="border border-[#213555] bg-[#F8F9FA] p-4 rounded-lg space-y-3"
                    variants={containerVariants}
                  >
                    <AnimatePresence>
                      {questionItem.options.map((option, optionIndex) => (
                        <motion.div
                          key={optionIndex}
                          className="flex items-center gap-2"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="flex-grow relative">
                            <motion.input
                              type="text"
                              className="w-full p-3 border border-[#213555] bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4F709C] focus:border-transparent pr-10 text-black"
                              placeholder={`Opsi ${optionIndex + 1}`}
                              value={option}
                              onChange={(e) => {
                                const newQuestions = [...questions];
                                newQuestions[questions.length - 1 - questionIndex].options[optionIndex] = e.target.value;
                                setQuestions(newQuestions);
                              }}
                              whileFocus={{
                                boxShadow: "0 0 0 3px rgba(33, 53, 85, 0.2)",
                              }}
                            />
                            {questionItem.options.length > 2 && (
                              <motion.button
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-500"
                                onClick={() => removeOption(questions.length - 1 - questionIndex, optionIndex)}
                                whileHover={{ scale: 1.2 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                <FiX size={16} />
                              </motion.button>
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}

            <motion.div
              variants={itemVariants}
              className="flex justify-between mt-8 gap-4"
            >
              <motion.button
                className="bg-gray-500 text-white px-5 py-2 rounded-lg hover:bg-gray-600 flex items-center gap-2 shadow-md"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiArrowLeft size={16} /> Batalkan
              </motion.button>
              <motion.button
                className="bg-gradient-to-r from-[#213555] to-[#4F709C] text-white px-5 py-2 rounded-lg hover:bg-[#4F709C] flex items-center gap-2 shadow-md"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Selanjutnya <FiArrowRight size={16} />
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </GuruLayout>
  );
};

export default CreateTryoutSubjek;
