"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiPlus, FiX, FiArrowRight, FiArrowLeft, FiUpload } from "react-icons/fi";

const CreateTryoutSubjek = () => {
  const [formData, setFormData] = useState({
    soal: "",
    gambar: null,
    opsi: ["", "", "", ""],
    jawabanBenar: "",
    pembahasan: "",
    skor: ""
  });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, gambar: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="mb-6 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-black">Tes Potensi Skolastik</h2>
            <button className="bg-blue-600 text-white px-4 py-2 rounded text-sm">
              Buat Soal
            </button>
          </div>

          <div className="border rounded-lg p-6">
            <div className="mb-6">
              <h3 className="font-medium mb-4 text-black">Pendidikan Umum</h3>
              
              {/* Soal */}
              <div className="mb-4">
                <label className="block text-sm mb-2 text-black font-medium">Soal</label>
                <textarea
                  className="w-full p-2 border rounded-md text-black bg-white"
                  rows="4"
                  value={formData.soal}
                  onChange={(e) => setFormData({ ...formData, soal: e.target.value })}
                  placeholder="Masukkan soal di sini"
                />
              </div>

              {/* Gambar */}
              <div className="mb-4">
                <label className="block text-sm mb-2 text-black font-medium">Gambar</label>
                <div className="border-2 border-dashed rounded-lg p-4 text-center">
                  {formData.gambar ? (
                    <img
                      src={formData.gambar}
                      alt="Preview"
                      className="max-h-48 mx-auto"
                    />
                  ) : (
                    <div className="py-8">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="imageUpload"
                      />
                      <label
                        htmlFor="imageUpload"
                        className="cursor-pointer flex flex-col items-center"
                      >
                        <FiUpload className="text-gray-600 text-3xl mb-2" />
                        <span className="text-sm text-gray-600">Klik untuk upload</span>
                      </label>
                    </div>
                  )}
                </div>
              </div>

              {/* Opsi */}
              <div className="mb-4">
                <label className="block text-sm mb-2 text-black font-medium">Opsi</label>
                <div className="grid grid-cols-2 gap-4">
                  {formData.opsi.map((opsi, index) => (
                    <input
                      key={index}
                      type="text"
                      className="w-full p-2 border rounded-md text-black bg-white"
                      placeholder={`Opsi ${index + 1}`}
                      value={opsi}
                      onChange={(e) => {
                        const newOpsi = [...formData.opsi];
                        newOpsi[index] = e.target.value;
                        setFormData({ ...formData, opsi: newOpsi });
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Jawaban yang Benar */}
              <div className="mb-4">
                <label className="block text-sm mb-2 text-black font-medium">Jawaban yang Benar</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md text-black bg-white"
                  value={formData.jawabanBenar}
                  onChange={(e) => setFormData({ ...formData, jawabanBenar: e.target.value })}
                  placeholder="Masukkan jawaban yang benar"
                />
              </div>

              {/* Pembahasan */}
              <div className="mb-4">
                <label className="block text-sm mb-2 text-black font-medium">Pembahasan</label>
                <textarea
                  className="w-full p-2 border rounded-md text-black bg-white"
                  rows="3"
                  value={formData.pembahasan}
                  onChange={(e) => setFormData({ ...formData, pembahasan: e.target.value })}
                  placeholder="Masukkan pembahasan"
                />
              </div>

              {/* Skor */}
              <div className="mb-4">
                <label className="block text-sm mb-2 text-black font-medium">Skor</label>
                <input
                  type="number"
                  className="w-full p-2 border rounded-md text-black bg-white"
                  value={formData.skor}
                  onChange={(e) => setFormData({ ...formData, skor: e.target.value })}
                  placeholder="Masukkan skor"
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-4">
              <button className="px-4 py-2 border rounded-md text-black hover:bg-gray-100">Back</button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTryoutSubjek;
