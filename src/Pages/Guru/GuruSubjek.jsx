import React from "react";
import { Link } from "react-router-dom";
import { FiEdit, FiTrash2, FiPlus } from "react-icons/fi";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

const GuruSubjek = () => {
  const navigate = useNavigate();
  const [tryouts, setTryouts] = useState([
    {
      kategori: "Tes Potensi Skolastik",
      subjek: [
        "Penalaran Umum",
        "Pemahaman Bacaan dan Menulis",
        "Pengetahuan dan Pemahaman Umum",
        "Penalaran Kuantitatif",
      ],
    },
    {
      kategori: "Tes Literasi",
      subjek: ["Literasi Bahasa Indonesia", "Literasi Bahasa Inggris"],
    },
    {
      kategori: "Penalaran Matematika",
      subjek: ["Penalaran Matematika"],
    },
  ]);

  const handleDelete = (kategoriIdx, subjekIdx) => {
    const newTryouts = [...tryouts];
    newTryouts[kategoriIdx].subjek.splice(subjekIdx, 1);
    setTryouts(newTryouts);
  };

  return (
    <div className="min-h-screen bg-[#f5f0e6] flex items-center justify-center p-6">
      <div className="w-full max-w-4xl">
        <div className="w-full flex justify-between items-center py-6">
          <h1 className="text-2xl font-bold text-[#213555]">Subjek UTBK SNBT 2025</h1>
          <button
            onClick={() => navigate("/guru/subjek/create")}
            className="bg-[#3E5879] text-white px-6 py-2.5 rounded-lg flex items-center gap-2 hover:bg-[#213555] transition"
          >
            <FiPlus size={16} /> Tambahkan
          </button>
        </div>

        <div className="w-full space-y-6">
          {tryouts.map((kategori, kategoriIdx) => (
            <div key={kategoriIdx} className="bg-white shadow-md rounded-lg overflow-hidden">
              <div className="bg-[#213555] text-white p-4 text-lg font-semibold flex">
                <span className="w-2/3 text-center">{kategori.kategori}</span>
                <span className="w-1/3 text-center border-l">Aksi</span>
              </div>
              {kategori.subjek.map((subjek, subjekIdx) => (
                <div
                  key={subjekIdx}
                  className="flex items-center p-4 border-b last:border-none hover:bg-gray-50 transition"
                >
                  <span className="w-2/3 text-center text-[#2f4a64] font-medium">{subjek}</span>
                  <div className="w-1/3 flex justify-center gap-3 border-l">
                    <button
                      onClick={() =>
                        navigate(`/guru/subjek/edit?kategori=${kategori.kategori}&subjek=${subjek}`)
                      }
                      className="text-[#3E5879] hover:text-[#213555] transition p-2 hover:bg-gray-100 rounded-full"
                    >
                      <FiEdit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(kategoriIdx, subjekIdx)}
                      className="text-[#3E5879] hover:text-red-600 transition p-2 hover:bg-gray-100 rounded-full"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GuruSubjek;
