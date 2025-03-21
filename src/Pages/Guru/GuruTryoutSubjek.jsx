"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronRight } from "lucide-react";
import React from "react";

const GuruTryoutSubjek = () => {
  const [isAnswerOpen, setIsAnswerOpen] = useState(false);
  const [isSecondQuestionOpen, setIsSecondQuestionOpen] = useState(false);
  const [isThirdQuestionOpen, setIsThirdQuestionOpen] = useState(false);
  const [isFourthQuestionOpen, setIsFourthQuestionOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
    hover: {
      scale: 1.02,
      boxShadow: "0px 5px 15px rgba(0,0,0,0.1)",
      transition: { type: "spring", stiffness: 400, damping: 10 },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 400, damping: 10 },
    },
    hover: {
      scale: 1.05,
      backgroundColor: "#1e3247",
      transition: { type: "spring", stiffness: 400, damping: 10 },
    },
    tap: { scale: 0.95 },
  };

  const accordionVariants = {
    open: {
      height: "auto",
      opacity: 1,
      transition: {
        height: {
          type: "spring",
          stiffness: 300,
          damping: 30,
        },
        opacity: { duration: 0.2 },
      },
    },
    closed: {
      height: 0,
      opacity: 0,
      transition: {
        height: {
          type: "spring",
          stiffness: 300,
          damping: 30,
        },
        opacity: { duration: 0.2 },
      },
    },
  };

  return (
    <div className="fixed inset-0 bg-[#f5f0e8] overflow-hidden flex flex-col items-center justify-center p-6">
      {!isOpen ? (
        <motion.button
          className="bg-[#2e4460] text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-lg hover:bg-[#1e3247] transition"
          onClick={() => setIsOpen(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Buka Tes Potensi Skolastik
        </motion.button>
      ) : (
        <AnimatePresence>
          <motion.div
            key="content"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="bg-white w-full max-w-2xl rounded-lg shadow-lg border"
          >
            <motion.div className="p-6">
              <motion.h1 className="text-2xl font-bold text-gray-800 mb-4">
                Tes Potensi Skolastik
              </motion.h1>
              <motion.button
                className="bg-red-600 text-white px-4 py-2 rounded-md mb-4"
                onClick={() => setIsOpen(false)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Tutup
              </motion.button>
            </motion.div>

            {/* Content area without scrolling */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Penalaran Umum Section */}
              <motion.div className="border-t border-gray-200 p-6">
                <motion.h2
                  className="text-lg font-semibold text-black mb-4"
                  variants={itemVariants}
                >
                  Penalaran Umum
                </motion.h2>

                <motion.div
                  className="mb-6 border border-gray-200 rounded-md overflow-hidden"
                  variants={itemVariants}
                  whileHover={{ boxShadow: "0px 4px 12px rgba(0,0,0,0.08)" }}
                >
                  <motion.div
                    className="flex justify-between items-center p-4 cursor-pointer bg-white hover:bg-gray-50"
                    onClick={() => setIsAnswerOpen(!isAnswerOpen)}
                  >
                    <p className="font-medium text-black pr-4">
                      Jika sebuah mobil melaju dengan kecepatan 60 km/jam, maka
                      mobil tersebut akan menempuh jarak 120 km dalam waktu 2
                      jam. Jika kecepatan mobil ditingkatkan menjadi 90 km/jam,
                      berapa jam yang diperlukan untuk menempuh jarak yang sama?
                    </p>
                    <motion.div
                      animate={{ rotate: isAnswerOpen ? 90 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex-shrink-0"
                    >
                      {isAnswerOpen ? (
                        <ChevronDown className="text-teal-500" />
                      ) : (
                        <ChevronRight className="text-gray-500" />
                      )}
                    </motion.div>
                  </motion.div>

                  <AnimatePresence initial={false}>
                    {isAnswerOpen && (
                      <motion.div
                        variants={accordionVariants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                        className="overflow-hidden border-t border-gray-200"
                      >
                        <div className="p-4 bg-gray-50">
                          <div className="space-y-2 mb-4">
                            <div className="flex items-center">
                              <span className="font-semibold mr-2">A.</span>
                              <span className="text-black">1 jam</span>
                            </div>
                            <div className="flex items-center">
                              <span className="font-semibold mr-2">B.</span>
                              <span className="text-black">1,25 jam</span>
                            </div>
                            <div className="flex items-center">
                              <span className="font-semibold mr-2">C.</span>
                              <span className="text-black">1,33 jam</span>
                            </div>
                            <div className="flex items-center">
                              <span className="font-semibold mr-2">D.</span>
                              <span className="text-black">1,5 jam</span>
                            </div>
                          </div>

                          <div className="mb-3 pt-2 border-t border-gray-200">
                            <div className="font-bold text-black mb-2">
                              Jawaban yang benar: C. 1,33 jam
                            </div>
                          </div>

                          <div className="pt-2 border-t border-gray-200">
                            <div className="font-semibold mb-1">
                              Pembahasan:
                            </div>
                            <div className="text-black">
                              <p>
                                Untuk menyelesaikan soal ini, kita dapat
                                menggunakan rumus:
                              </p>
                              <p className="font-semibold my-2">
                                Waktu = Jarak ÷ Kecepatan
                              </p>
                              <p>Jarak yang ditempuh adalah 120 km.</p>
                              <p>Kecepatan mobil adalah 90 km/jam.</p>
                              <p>
                                Maka waktu yang diperlukan = 120 ÷ 90 = 1,33
                                jam.
                              </p>
                              <p className="mt-2">
                                Jadi, jawaban yang benar adalah C. 1,33 jam.
                              </p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                <motion.div className="flex justify-end">
                  <motion.button
                    className="bg-[#2e4460] text-white px-6 py-2 rounded-md text-sm transition relative overflow-hidden"
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    onHoverStart={() => setIsHovered(true)}
                    onHoverEnd={() => setIsHovered(false)}
                  >
                    <motion.span
                      initial={{ x: 0 }}
                      animate={{ x: isHovered ? -5 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      Edit
                    </motion.span>
                    <AnimatePresence>
                      {isHovered && (
                        <motion.span
                          className="absolute right-4"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          transition={{ duration: 0.2 }}
                        >
                          →
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </motion.div>
              </motion.div>

              {/* Additional question example */}
              <motion.div
                className="border-t border-gray-200 p-6"
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.2 }}
              >
                <motion.div
                  className="mb-6 border border-gray-200 rounded-md overflow-hidden"
                  whileHover={{ boxShadow: "0px 4px 12px rgba(0,0,0,0.08)" }}
                >
                  <motion.div
                    className="flex justify-between items-center p-4 cursor-pointer bg-white hover:bg-gray-50"
                    onClick={() =>
                      setIsSecondQuestionOpen(!isSecondQuestionOpen)
                    }
                  >
                    <span className="font-medium text-black pr-4">
                      Berapakah hasil dari 25 × 4 ÷ 2?
                    </span>
                    <motion.div
                      animate={{ rotate: isSecondQuestionOpen ? 90 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex-shrink-0"
                    >
                      {isSecondQuestionOpen ? (
                        <ChevronDown className="text-teal-500" />
                      ) : (
                        <ChevronRight className="text-gray-500" />
                      )}
                    </motion.div>
                  </motion.div>

                  <AnimatePresence initial={false}>
                    {isSecondQuestionOpen && (
                      <motion.div
                        variants={accordionVariants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                        className="overflow-hidden border-t border-gray-200"
                      >
                        <div className="p-4 bg-gray-50">
                          <div className="space-y-2 mb-4">
                            <div className="flex items-center">
                              <span className="font-semibold mr-2">A.</span>
                              <span className="text-black">40</span>
                            </div>
                            <div className="flex items-center">
                              <span className="font-semibold mr-2">B.</span>
                              <span className="text-black">50</span>
                            </div>
                            <div className="flex items-center">
                              <span className="font-semibold mr-2">C.</span>
                              <span className="text-black">100</span>
                            </div>
                            <div className="flex items-center">
                              <span className="font-semibold mr-2">D.</span>
                              <span className="text-black">200</span>
                            </div>
                          </div>

                          <div className="mb-3 pt-2 border-t border-gray-200">
                            <div className="font-bold text-black mb-2">
                              Jawaban yang benar: B. 50
                            </div>
                          </div>

                          <div className="pt-2 border-t border-gray-200">
                            <div className="font-semibold mb-1">
                              Pembahasan:
                            </div>
                            <div className="text-black">
                              <p>
                                Untuk menyelesaikan soal ini, kita menggunakan
                                aturan operasi hitung:
                              </p>
                              <p className="font-semibold my-2">
                                25 × 4 ÷ 2 = 100 ÷ 2 = 50
                              </p>
                              <p>Jadi, jawaban yang benar adalah B. 50</p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.div>

              {/* Third question */}
              <motion.div
                className="border-t border-gray-200 p-6"
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.3 }}
              >
                <motion.div
                  className="mb-6 border border-gray-200 rounded-md overflow-hidden"
                  whileHover={{ boxShadow: "0px 4px 12px rgba(0,0,0,0.08)" }}
                >
                  <motion.div
                    className="flex justify-between items-center p-4 cursor-pointer bg-white hover:bg-gray-50"
                    onClick={() => setIsThirdQuestionOpen(!isThirdQuestionOpen)}
                  >
                    <span className="font-medium text-black pr-4">
                      Manakah bilangan prima berikut yang terbesar?
                    </span>
                    <motion.div
                      animate={{ rotate: isThirdQuestionOpen ? 90 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex-shrink-0"
                    >
                      {isThirdQuestionOpen ? (
                        <ChevronDown className="text-teal-500" />
                      ) : (
                        <ChevronRight className="text-gray-500" />
                      )}
                    </motion.div>
                  </motion.div>

                  <AnimatePresence initial={false}>
                    {isThirdQuestionOpen && (
                      <motion.div
                        variants={accordionVariants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                        className="overflow-hidden border-t border-gray-200"
                      >
                        <div className="p-4 bg-gray-50">
                          <div className="space-y-2 mb-4">
                            <div className="flex items-center">
                              <span className="font-semibold mr-2">A.</span>
                              <span className="text-black">17</span>
                            </div>
                            <div className="flex items-center">
                              <span className="font-semibold mr-2">B.</span>
                              <span className="text-black">23</span>
                            </div>
                            <div className="flex items-center">
                              <span className="font-semibold mr-2">C.</span>
                              <span className="text-black">29</span>
                            </div>
                            <div className="flex items-center">
                              <span className="font-semibold mr-2">D.</span>
                              <span className="text-black">31</span>
                            </div>
                          </div>

                          <div className="mb-3 pt-2 border-t border-gray-200">
                            <div className="font-bold text-black mb-2">
                              Jawaban yang benar: D. 31
                            </div>
                          </div>

                          <div className="pt-2 border-t border-gray-200">
                            <div className="font-semibold mb-1">
                              Pembahasan:
                            </div>
                            <div className="text-black">
                              <p>
                                Bilangan prima adalah bilangan yang hanya
                                memiliki dua faktor: 1 dan bilangan itu sendiri.
                              </p>
                              <p>Dari pilihan yang diberikan:</p>
                              <p>A. 17 adalah bilangan prima</p>
                              <p>B. 23 adalah bilangan prima</p>
                              <p>C. 29 adalah bilangan prima</p>
                              <p>D. 31 adalah bilangan prima</p>
                              <p className="mt-2">
                                Bilangan terbesar di antara keempat pilihan
                                tersebut adalah 31.
                              </p>
                              <p>Jadi, jawaban yang benar adalah D. 31</p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.div>

              {/* Fourth question */}
              <motion.div
                className="border-t border-gray-200 p-6"
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.4 }}
              >
                <motion.div
                  className="mb-6 border border-gray-200 rounded-md overflow-hidden"
                  whileHover={{ boxShadow: "0px 4px 12px rgba(0,0,0,0.08)" }}
                >
                  <motion.div
                    className="flex justify-between items-center p-4 cursor-pointer bg-white hover:bg-gray-50"
                    onClick={() =>
                      setIsFourthQuestionOpen(!isFourthQuestionOpen)
                    }
                  >
                    <span className="font-medium text-black pr-4">
                      Jika 3x + 5 = 20, berapakah nilai x?
                    </span>
                    <motion.div
                      animate={{ rotate: isFourthQuestionOpen ? 90 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex-shrink-0"
                    >
                      {isFourthQuestionOpen ? (
                        <ChevronDown className="text-teal-500" />
                      ) : (
                        <ChevronRight className="text-gray-500" />
                      )}
                    </motion.div>
                  </motion.div>

                  <AnimatePresence initial={false}>
                    {isFourthQuestionOpen && (
                      <motion.div
                        variants={accordionVariants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                        className="overflow-hidden border-t border-gray-200"
                      >
                        <div className="p-4 bg-gray-50">
                          <div className="space-y-2 mb-4">
                            <div className="flex items-center">
                              <span className="font-semibold mr-2">A.</span>
                              <span className="text-black">3</span>
                            </div>
                            <div className="flex items-center">
                              <span className="font-semibold mr-2">B.</span>
                              <span className="text-black">5</span>
                            </div>
                            <div className="flex items-center">
                              <span className="font-semibold mr-2">C.</span>
                              <span className="text-black">7</span>
                            </div>
                            <div className="flex items-center">
                              <span className="font-semibold mr-2">D.</span>
                              <span className="text-black">15</span>
                            </div>
                          </div>

                          <div className="mb-3 pt-2 border-t border-gray-200">
                            <div className="font-bold text-black mb-2">
                              Jawaban yang benar: B. 5
                            </div>
                          </div>

                          <div className="pt-2 border-t border-gray-200">
                            <div className="font-semibold mb-1">
                              Pembahasan:
                            </div>
                            <div className="text-black">
                              <p>
                                Kita perlu menyelesaikan persamaan 3x + 5 = 20
                              </p>
                              <p>3x + 5 = 20</p>
                              <p>3x = 20 - 5</p>
                              <p>3x = 15</p>
                              <p>x = 15 ÷ 3</p>
                              <p>x = 5</p>
                              <p className="mt-2">
                                Jadi, jawaban yang benar adalah B. 5
                              </p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
};

export default GuruTryoutSubjek;
