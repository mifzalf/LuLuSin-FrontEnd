"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"

const GuruSubjekCreate = () => {
  const navigate = useNavigate()
  const [kategori, setKategori] = useState("")
  const [subjek, setSubjek] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate("/guru/subjek")
  }

  return (
    <div className="bg-[#F5EFE7] min-h-screen w-full flex items-start justify-center pt-24">
      <div className="bg-[#F5EFE7] rounded-3xl p-8 w-full max-w-2xl border border-[#D8C4B6] shadow-sm">
        <h2 className="text-xl font-bold text-[#213555] mb-6">Tambah Subjek</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-[#213555] text-sm font-medium mb-2">Kategori Subjek</label>
            <input
              type="text"
              value={kategori}
              onChange={(e) => setKategori(e.target.value)}
              className="w-full p-2 border border-[#D8C4B6] rounded-lg bg-white text-[#213555] outline-none focus:ring-1 focus:ring-[#3E5879]"
            />
          </div>

          <div className="mb-8">
            <label className="block text-[#213555] text-sm font-medium mb-2">Subjek</label>
            <input
              type="text"
              value={subjek}
              onChange={(e) => setSubjek(e.target.value)}
              className="w-full p-2 border border-[#D8C4B6] rounded-lg bg-white text-[#213555] outline-none focus:ring-1 focus:ring-[#3E5879]"
            />
          </div>

          <hr className="border-t border-[#D8C4B6] mb-6" />

          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => navigate("/guru/subjek")}
              className="bg-[#3E5879] text-white px-6 py-2 rounded-md hover:bg-[#213555] transition-colors"
            >
              Batalkan
            </button>
            <button
              type="submit"
              className="bg-[#3E5879] text-white px-6 py-2 rounded-md hover:bg-[#213555] transition-colors"
            >
              Buat
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default GuruSubjekCreate

