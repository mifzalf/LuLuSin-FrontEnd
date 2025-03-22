import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Layout from "./layout/Layout";
import Login from "./auth/Login";
import Register from "./auth/Register";
import GuruTryoutSubjek from "./Pages/Guru/GuruTryoutSubjek";
import Dashboard from "./Pages/Admin/DashBoard";
import DetailGuru from "./Pages/Admin/DetailGuru";
import DetailMurid from "./Pages/Admin/DetailMurid";
import CreateTryout from "./Pages/Guru/CreateTryout";
import SiswaDashBoard from "./Pages/Siswa/DashBoard";
import SiswaLandingPage from "./Pages/Siswa/landingpage";


function App() {
  const [count, setCount] = useState(0);

  return (
    <Routes>
      {/* Routing untuk halaman tanpa layout */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/Admin/DashBoard" element={<Dashboard />} />
      <Route path="/Admin/DetailGuru" element={<DetailGuru />} />
      <Route path="/Admin/DetailMurid" element={<DetailMurid />} />
      <Route path="/Guru/Tryout/id/subjek" element={<GuruTryoutSubjek />} />

      {/* Routing dengan Layout */}
      <Route path="/*" element={
        <Layout>
          <Routes>
            <Route index element={
              <div className="group-members-container">
                <h1>Anggota Kelompok</h1>
                <div className="members-list">
                  <div className="member-card">
                    <h2>Anggota 1</h2>
                    <p>Dafa Ahmad Fahrisi</p>
                    <p>NRP: 3123522007</p>
                  </div>
                  <div className="member-card">
                    <h2>Anggota 2</h2>
                    <p>Nama Lengkap</p>
                    <p>NIM: 123456789</p>
                  </div>
                  <div className="member-card">
                    <h2>Anggota 3</h2>
                    <p>Nama Lengkap</p>
                    <p>NIM: 123456789</p>
                  </div>
                  <div className="member-card">
                    <h2>Anggota 4</h2>
                    <p>Nama Lengkap</p>
                    <p>NIM: 123456789</p>
                  </div>
                </div>
              </div>
            } />
            <Route path="Guru/CreateTryout" element={<CreateTryout />} />
            <Route path="Siswa/DashBoard" element={<SiswaDashBoard />} />   
            <Route path="Siswa/landingpage" element={<SiswaLandingPage />} />         
          </Routes>
        </Layout>
      } />
    </Routes>
  );
}

export default App;
