import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import LayoutSiswa from "./layoutSiswa/Layout";
import LayoutGuru from "./LayoutGuru/Layout";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Dashboard from "./Pages/Admin/DashBoard";
import DetailGuru from "./Pages/Admin/DetailGuru";
import DetailMurid from "./Pages/Admin/DetailMurid";
import CreateTryout from "./Pages/Guru/CreateTryout";
import EditPembahasanSoalTryout from "./Pages/Guru/EditPembahasanSoalTryout";
import SoalCreatePembahasan from "./Pages/Guru/SoalCreatePembahasan";
import EditTryout from "./Pages/Guru/EditTryout";
import EditTryoutSubjek from "./Pages/Guru/EditTryoutSubjek";
import GuruTryout from "./Pages/Guru/GuruTryout";
import GuruTryoutDetail from "./Pages/Guru/GuruTryoutDetail";
import GuruTryoutSubjek from "./Pages/Guru/GuruTryoutSubjek";
import Home from "./Pages/Guru/Home";
import SiswaDashBoard from "./Pages/Siswa/DashBoard";
import SiswaLandingPage from "./Pages/Siswa/landingpage";
import SiswaTryout from "./Pages/Siswa/Tryout";
import SiswaTryoutDetail from "./Pages/Siswa/TryoutDetail";
import SiswaTryoutHasil from "./Pages/Siswa/TryoutHasil";
import SiswaTryoutPembahasan from "./Pages/Siswa/TryoutPembahasan";
import SiswaTryoutPengerjaan from "./Pages/Siswa/TryoutPengerjaan";
import Peralihan from "./Pages/Siswa/Peralihan";
import CreateTryoutSubjek from "./Pages/Guru/CreateTryoutSubjek";
import GuruKategori from "./Pages/Guru/GuruKategori";
import GuruKategoriCreate from "./Pages/Guru/GuruKategoriCreate";
import EditKategoriSubjek from "./Pages/Guru/EditKategoriSubjek";
import GuruSubjek from "./Pages/Guru/GuruSubjek";
import GuruSubjekCreate from "./Pages/Guru/GuruSubjekCreate";
import GuruSubjekEdit from "./Pages/Guru/GuruSubjekEdit";
import SiswaTryoutId from "./Pages/Siswa/TryoutId";
import GuruDashboard from "./Pages/Guru/Dashboard";
import { motion } from "framer-motion";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Routes>
      {/* Landing Page Route - accessible to all */}
      <Route path="/" element={<SiswaLandingPage />} />
     
      {/* Auth Routes - accessible to all */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Admin Routes - only admin */}
      <Route path="/admin/dashboard" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <Dashboard />
        </ProtectedRoute>
      } />
      <Route path="/admin/detailguru" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <DetailGuru />
        </ProtectedRoute>
      } />
      <Route path="/admin/detailmurid" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <DetailMurid />
        </ProtectedRoute>
      } />

      {/* Redirect /Guru to /guru */}
      <Route path="/Guru" element={<Navigate to="/guru" replace />} />

      {/* Guru Routes - only teacher */}
      <Route path="/guru" element={
        <ProtectedRoute allowedRoles={['teacher']}>
          <LayoutGuru />
        </ProtectedRoute>
      }>
        <Route index element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="createtryout" element={<CreateTryout />} />
        <Route path="tryout" element={<GuruTryout />} />
        <Route path="edittryout" element={<EditTryout />} />
        <Route path="tryout/:id" element={<GuruTryoutDetail />} />
        <Route path="tryout/:tryout_id/:subject_id" element={<GuruTryoutSubjek />} />
        <Route path="tryout/:tryout_id/:subject_id/createsoal" element={<CreateTryoutSubjek />} />
        <Route path="tryout/:tryout_id/:subject_id/createsoal/createpembahasan" element={<SoalCreatePembahasan />} />
        <Route path="tryout/id/editsubjek" element={<EditTryoutSubjek />} />
        <Route path="kategorisubjek" element={<GuruKategori />} />
        <Route path="kategorisubjek/create" element={<GuruKategoriCreate />} />
        <Route path="kategorisubjek/edit/:id" element={<EditKategoriSubjek />} />
        <Route path="tryout/id/subjek/pembahasan/edit" element={<EditPembahasanSoalTryout />} />
        <Route path="subjek" element={<GuruSubjek />} />
        <Route path="subjek/create" element={<GuruSubjekCreate />} />
        <Route path="subjek/edit" element={<GuruSubjekEdit />} />
        <Route path="tryout/id/subjek/create" element={<CreateTryoutSubjek />} />
        <Route path="dashboard" element={<GuruDashboard />} />
        
      </Route>

      {/* Siswa Routes - only student */}
      <Route path="/siswa" element={
        <ProtectedRoute allowedRoles={['student']}>
          <LayoutSiswa />
        </ProtectedRoute>
      }>
        <Route index element={<SiswaDashBoard />} />
        <Route path="dashboard" element={<SiswaDashBoard />} />
        <Route path="tryout" element={<SiswaTryout />} />
        <Route path="tryout/:id" element={<SiswaTryoutId />} />
        <Route path="tryout/:id/:subjectId/pengerjaan" element={<SiswaTryoutPengerjaan />} />
        <Route path="tryout/:id/hasil" element={<SiswaTryoutHasil />} />
        <Route path="tryout/:id/:subjectId/pembahasan" element={<SiswaTryoutPembahasan />} />
      </Route>

      {/* About Route - accessible to all */}
      <Route path="/about" element={
        <div className="min-h-screen bg-[#213555] py-12">
          <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-center text-4xl font-bold text-white mb-12 mt-8">
              Anggota Kelompok
            </h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  name: "Dafa Ahmad Fahrisi",
                  nrp: "3123522007",
                  role: "Anggota 1"
                },
                {
                  name: "Rahadyan Danang Susetyo Pranawa",
                  nrp: "3123522018",
                  role: "Anggota 2"
                },
                {
                  name: "Tamisa Ulinda Marpaung",
                  nrp: "3123522019",
                  role: "Anggota 3"
                },
                {
                  name: "Aqil Yoga Pramono",
                  nrp: "3123522011",
                  role: "Anggota 4"
                },
                {
                  name: "Muhammad Ifzal Faidurrahman",
                  nrp: "3123522006",
                  role: "Anggota 5"
                },
                {
                  name: "Agiel Maula",
                  nrp: "3123522016",
                  role: "Anggota 6"
                },
                {
                  name: "R.P. A. Lexy Mangku Saputra",
                  nrp: "3123522012",
                  role: "Anggota 7"
                },
                {
                  name: "A. Haidar Hafiz",
                  nrp: "3123522015",
                  role: "Anggota 8"
                }
              ].map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="
                    bg-white/10 backdrop-blur-sm rounded-xl p-6
                    hover:bg-white/20 transition-all duration-300
                    border border-white/20
                    flex flex-col items-center text-center
                  "
                >
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4">
                    <span className="text-white text-xl font-bold">
                      {member.role.split(" ")[1]}
                    </span>
                  </div>
                  <h2 className="text-white text-lg font-semibold mb-2">
                    {member.role}
                  </h2>
                  <p className="text-white/90 font-medium mb-1">
                    {member.name}
                  </p>
                  <p className="text-white/70 text-sm">
                    NRP: {member.nrp}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      } />
    </Routes>
  );
}

export default App;