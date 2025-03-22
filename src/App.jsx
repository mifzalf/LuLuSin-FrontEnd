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
import SiswaTryout from "./Pages/Siswa/Tryout";
import SiswaTryoutDetail from "./Pages/Siswa/Tryoutdetail";


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
              <div className="group-members-container" style={{ padding: '30px', maxWidth: '1200px', margin: '0 auto' }}>
                <h1 style={{ textAlign: 'center', marginBottom: '30px', color: '#2c3e50', fontSize: '2.5rem' }}>Anggota Kelompok</h1>
                <div className="members-list" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
                  <div className="member-card" style={{ backgroundColor: '#f8f9fa', borderRadius: '10px', padding: '20px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', transition: 'transform 0.3s ease', cursor: 'pointer' }}>
                    <h2 style={{ color: '#3498db', marginBottom: '10px', fontSize: '1.25rem' }}>Anggota 1</h2>
                    <p style={{ fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '5px', color: '#3498db' }}>Dafa Ahmad Fahrisi</p>
                    <p style={{ color: '#666' }}>NRP: 3123522007</p>
                  </div>
                  <div className="member-card" style={{ backgroundColor: '#f8f9fa', borderRadius: '10px', padding: '20px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', transition: 'transform 0.3s ease', cursor: 'pointer' }}>
                    <h2 style={{ color: '#3498db', marginBottom: '10px', fontSize: '1.25rem' }}>Anggota 2</h2>
                    <p style={{ fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '5px', color: '#3498db' }}>Rahadyan Danang Susetyo Pranawa</p>
                    <p style={{ color: '#666' }}>NRP: 3123522018</p>
                  </div>
                  <div className="member-card" style={{ backgroundColor: '#f8f9fa', borderRadius: '10px', padding: '20px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', transition: 'transform 0.3s ease', cursor: 'pointer' }}>
                    <h2 style={{ color: '#3498db', marginBottom: '10px', fontSize: '1.25rem' }}>Anggota 3</h2>
                    <p style={{ fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '5px', color: '#3498db' }}>Tamisa Ulinda Marpaung</p>
                    <p style={{ color: '#666' }}>NRP: 3123522019</p>
                  </div>
                  <div className="member-card" style={{ backgroundColor: '#f8f9fa', borderRadius: '10px', padding: '20px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', transition: 'transform 0.3s ease', cursor: 'pointer' }}>
                    <h2 style={{ color: '#3498db', marginBottom: '10px', fontSize: '1.25rem' }}>Anggota 4</h2>
                    <p style={{ fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '5px', color: '#3498db' }}>Aqil Yoga Pramono</p>
                    <p style={{ color: '#666' }}>NRP: 3123522011</p>
                  </div>
                  <div className="member-card" style={{ backgroundColor: '#f8f9fa', borderRadius: '10px', padding: '20px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', transition: 'transform 0.3s ease', cursor: 'pointer' }}>
                    <h2 style={{ color: '#3498db', marginBottom: '10px', fontSize: '1.25rem' }}>Anggota 5</h2>
                    <p style={{ fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '5px', color: '#3498db' }}>Muhammad Ifzal Faidurrahman</p>
                    <p style={{ color: '#666' }}>NRP: 3123522006</p>
                  </div>
                  <div className="member-card" style={{ backgroundColor: '#f8f9fa', borderRadius: '10px', padding: '20px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', transition: 'transform 0.3s ease', cursor: 'pointer' }}>
                    <h2 style={{ color: '#3498db', marginBottom: '10px', fontSize: '1.25rem' }}>Anggota 6</h2>
                    <p style={{ fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '5px', color: '#3498db' }}>Agiel Maula</p>
                    <p style={{ color: '#666' }}>NRP: 3123522016</p>
                  </div>
                  <div className="member-card" style={{ backgroundColor: '#f8f9fa', borderRadius: '10px', padding: '20px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', transition: 'transform 0.3s ease', cursor: 'pointer' }}>
                    <h2 style={{ color: '#3498db', marginBottom: '10px', fontSize: '1.25rem' }}>Anggota 7</h2>
                    <p style={{ fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '5px', color: '#3498db' }}>R.P. A. Lexy Mangku Saputra</p>
                    <p style={{ color: '#666' }}>NRP: 3123522012</p>
                  </div>
                  <div className="member-card" style={{ backgroundColor: '#f8f9fa', borderRadius: '10px', padding: '20px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', transition: 'transform 0.3s ease', cursor: 'pointer' }}>
                    <h2 style={{ color: '#3498db', marginBottom: '10px', fontSize: '1.25rem' }}>Anggota 8</h2>
                    <p style={{ fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '5px', color: '#3498db' }}>A. Haidar Hafiz</p>
                    <p style={{ color: '#666' }}>NRP: 3123522015</p>
                  </div>
                </div>
              </div>
            } />
            <Route path="Guru/CreateTryout" element={<CreateTryout />} />
            <Route path="Siswa/DashBoard" element={<SiswaDashBoard />} />   
            <Route path="Siswa/landingpage" element={<SiswaLandingPage />} />   
            <Route path="Siswa/Tryout" element={<SiswaTryout />} />      
            <Route path="Siswa/Tryout/id/subjek" element={<SiswaTryoutDetail />} />      
          </Routes>
        </Layout>
      } />
    </Routes>
  );
}

export default App;
