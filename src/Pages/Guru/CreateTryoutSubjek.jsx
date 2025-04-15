"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiPlus, FiX, FiArrowRight, FiArrowLeft } from "react-icons/fi";

const CreateTryoutSubjek = () => {
  const [questions, setQuestions] = useState([
    {
      question: "",
      options: ["", "", "", "", ""]
    }
  ]);

  const addQuestion = () => {
    setQuestions([
      {
        question: "",
        options: ["", "", "", "", ""]
      },
      ...questions
    ]);
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
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white w-screen p-4">
      <main className="container mx-auto py-6">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <motion.div
            className="border-2 border-blue-600 rounded-2xl p-8 w-full bg-white shadow-lg"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <motion.h2
              className="text-xl font-bold mb-6 text-blue-600 relative"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Buat Soal Tryout
              <motion.div
                className="absolute -bottom-2 left-0 h-1 bg-blue-600 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: "60px" }}
                transition={{ delay: 0.4, duration: 0.4 }}
              />
            </motion.h2>



            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-6"
            >
              {[...questions].reverse().map((questionItem, questionIndex) => (
                <motion.div key={questions.length - 1 - questionIndex} className="border-b pb-6 mb-6 last:border-b-0">
                  <motion.div variants={itemVariants}>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Soal {questions.length - questionIndex}
                    </label>
                    <motion.textarea
                      className="w-full p-3 border border-blue-600 bg-gray-50 rounded-lg h-32 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all text-gray-800"
                      value={questionItem.question}
                      onChange={(e) => {
                        const newQuestions = [...questions];
                        newQuestions[questions.length - 1 - questionIndex].question = e.target.value;
                        setQuestions(newQuestions);
                      }}
                      whileFocus={{ boxShadow: "0 0 0 3px rgba(37, 99, 235, 0.2)" }}
                    ></motion.textarea>
                  </motion.div>

                  <motion.div variants={itemVariants} className="space-y-3 mt-4">
                    <div className="flex justify-between items-center">
                      <label className="block text-sm font-medium text-gray-700">
                        Opsi
                      </label>
                      <motion.button
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 flex items-center gap-2 shadow-md"
                        onClick={() => addOption(questions.length - 1 - questionIndex)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FiPlus size={16} /> Tambah Opsi
                      </motion.button>
                    </div>

                    <motion.div
                      className="border border-blue-600 bg-gray-50 p-4 rounded-lg space-y-3"
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
                                className="w-full p-3 border border-blue-600 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent text-gray-800"
                                placeholder={`Opsi ${optionIndex + 1}`}
                                value={option}
                                onChange={(e) => {
                                  const newQuestions = [...questions];
                                  newQuestions[questions.length - 1 - questionIndex].options[optionIndex] = e.target.value;
                                  setQuestions(newQuestions);
                                }}
                                whileFocus={{
                                  boxShadow: "0 0 0 3px rgba(37, 99, 235, 0.2)",
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
                  className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2 shadow-md"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Selanjutnya <FiArrowRight size={16} />
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default CreateTryoutSubjek;
