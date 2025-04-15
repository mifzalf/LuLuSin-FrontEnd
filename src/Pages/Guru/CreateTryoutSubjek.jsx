"use client";

import { useState } from "react";
import { FiUpload, FiArrowLeft, FiSave } from "react-icons/fi";

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-1">Tes Potensi Skolastik</h2>
              <p className="text-sm text-gray-600">Buat soal baru untuk tes potensi skolastik</p>
            </div>
            <button className="bg-blue-600 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors duration-200 shadow-md hover:shadow-lg">
              Buat Soal
            </button>
          </div>

          <div className="border border-gray-200 rounded-xl p-8 bg-white shadow-sm">
            <div className="mb-8">
              <div className="flex items-center mb-6">
                <div className="w-2 h-6 bg-blue-600 rounded-full mr-3"></div>
                <h3 className="text-lg font-semibold text-gray-800">Pendidikan Umum</h3>
              </div>
              
              {/* Soal */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Soal</label>
                <textarea
                  className="w-full p-3 border border-gray-300 rounded-lg text-gray-800 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  rows="4"
                  value={formData.soal}
                  onChange={(e) => setFormData({ ...formData, soal: e.target.value })}
                  placeholder="Masukkan soal di sini"
                />
              </div>

              {/* Gambar */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Gambar</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
                  {formData.gambar ? (
                    <div className="relative p-4">
                      <img
                        src={formData.gambar}
                        alt="Preview"
                        className="max-h-48 mx-auto rounded-lg shadow-sm"
                      />
                      <button
                        onClick={() => setFormData({ ...formData, gambar: null })}
                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors duration-200"
                      >
                        <FiX size={16} />
                      </button>
                    </div>
                  ) : (
                    <div className="py-12">
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
                        <FiUpload className="text-blue-600 text-3xl mb-2" />
                        <span className="text-sm text-gray-600">Klik untuk upload gambar</span>
                        <span className="text-xs text-gray-500 mt-1">PNG, JPG, atau GIF (Maks. 2MB)</span>
                      </label>
                    </div>
                  )}
                </div>
                    </div>

              {/* Opsi */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Opsi Jawaban</label>
                <div className="grid grid-cols-2 gap-4">
                  {formData.opsi.map((opsi, index) => (
                    <div key={index} className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full font-medium text-sm">
                        {String.fromCharCode(65 + index)}
                      </div>
                      <input
                                type="text"
                        className="w-full pl-12 pr-3 py-3 border border-gray-300 rounded-lg text-gray-800 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                        placeholder={`Opsi ${index + 1}`}
                        value={opsi}
                                onChange={(e) => {
                          const newOpsi = [...formData.opsi];
                          newOpsi[index] = e.target.value;
                          setFormData({ ...formData, opsi: newOpsi });
                        }}
                      />
                            </div>
                  ))}
                </div>
              </div>

              {/* Jawaban yang Benar */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Jawaban yang Benar</label>
                <input
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-lg text-gray-800 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  value={formData.jawabanBenar}
                  onChange={(e) => setFormData({ ...formData, jawabanBenar: e.target.value })}
                  placeholder="Masukkan jawaban yang benar"
                />
              </div>

              {/* Pembahasan */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Pembahasan</label>
                <textarea
                  className="w-full p-3 border border-gray-300 rounded-lg text-gray-800 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  rows="3"
                  value={formData.pembahasan}
                  onChange={(e) => setFormData({ ...formData, pembahasan: e.target.value })}
                  placeholder="Masukkan pembahasan jawaban"
                />
              </div>

              {/* Skor */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Skor</label>
                <input
                  type="number"
                  className="w-full p-3 border border-gray-300 rounded-lg text-gray-800 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  value={formData.skor}
                  onChange={(e) => setFormData({ ...formData, skor: e.target.value })}
                  placeholder="Masukkan skor"
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-4 pt-4 border-t">
              <button className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200 flex items-center gap-2">
                <FiArrowLeft size={16} />
                Kembali
              </button>
              <button className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2 shadow-md hover:shadow-lg">
                <FiSave size={16} />
                Simpan
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTryoutSubjek;
