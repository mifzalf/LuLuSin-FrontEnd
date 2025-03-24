import React from "react";

const GuruKategori = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow bg-[#F5EFE7] p-6">
        <h1 className="text-2xl font-bold text-[#213555] mb-6">
          Subjek UTBK SNBT 2025
        </h1>

        <div className="flex justify-center">
          <div className="space-y-4 w-full max-w-xl">
            <button
              className="block w-full bg-gradient-to-r from-[#3E5879] to-[#213555]
                         text-white text-center py-3 rounded-xl shadow-md font-medium text-lg
                         hover:opacity-90 transition"
            >
              Tes Potensi Skolastik
            </button>
            <button
              className="block w-full bg-gradient-to-r from-[#3E5879] to-[#213555]
                         text-white text-center py-3 rounded-xl shadow-md font-medium text-lg
                         hover:opacity-90 transition"
            >
              Tes Literasi
            </button>
            <button
              className="block w-full bg-gradient-to-r from-[#3E5879] to-[#213555]
                         text-white text-center py-3 rounded-xl shadow-md font-medium text-lg
                         hover:opacity-90 transition"
            >
              Penalaran Matematika
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuruKategori;
