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
import SiswaTryoutHasil from "./Pages/Siswa/TryoutHasil";
import SiswaTryoutPembahasan from "./Pages/Siswa/TryoutPembahasan";
import SiswaTryoutPengerjaan from "./Pages/Siswa/TryoutPengerjaan";
import EditPembahasanSoalTryout from "./Pages/Guru/editpembahasansoaltryout";
import EditSoalCreatePembahasan from "./Pages/Guru/EditSoalCreatePembahasan";
import EditTryout from "./Pages/Guru/EditTryout";
import EditTryoutSubjek from "./Pages/Guru/EditTryoutSubjek";
import GuruTryout from "./Pages/Guru/GuruTryout";
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
              <div className="group-members-container" style={{ padding: '30px', maxWidth: '1200px', margin: '0 auto', background: 'linear-gradient(to bottom, #f5f7fa, #e4e8f0)', borderRadius: '15px' }}>
                <h1 style={{ textAlign: 'center', marginBottom: '40px', marginTop: '20px', color: '#2c3e50', fontSize: '2.5rem', textShadow: '1px 1px 2px rgba(0,0,0,0.1)', padding: '15px 0', borderBottom: '2px solid #e1e4e8' }}>Anggota Kelompok</h1>
                <div className="members-list" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
                  <div className="member-card" style={{ backgroundColor: '#f8f9fa', borderRadius: '10px', padding: '20px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', transition: 'all 0.3s ease', cursor: 'pointer', border: '1px solid #e1e4e8' }} onMouseOver={(e) => {e.currentTarget.style.transform = 'translateY(-10px)'; e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.15)';}} onMouseOut={(e) => {e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';}}>
                    <h2 style={{ color: '#3498db', marginBottom: '10px', fontSize: '1.25rem' }}>Anggota 1</h2>
                    <p style={{ fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '5px', color: '#3498db', transition: 'all 0.3s ease', textShadow: '0 0 1px rgba(52, 152, 219, 0.3)' }} className="member-name">Dafa Ahmad Fahrisi</p>
                    <p style={{ color: '#666' }}>NRP: 3123522007</p>
                  </div>
                  <div className="member-card" style={{ backgroundColor: '#f8f9fa', borderRadius: '10px', padding: '20px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', transition: 'all 0.3s ease', cursor: 'pointer', border: '1px solid #e1e4e8' }} onMouseOver={(e) => {e.currentTarget.style.transform = 'translateY(-10px)'; e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.15)';}} onMouseOut={(e) => {e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';}}>
                    <h2 style={{ color: '#3498db', marginBottom: '10px', fontSize: '1.25rem' }}>Anggota 2</h2>
                    <p style={{ fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '5px', color: '#3498db', transition: 'all 0.3s ease', textShadow: '0 0 1px rgba(52, 152, 219, 0.3)' }} className="member-name">Rahadyan Danang Susetyo Pranawa</p>
                    <p style={{ color: '#666' }}>NRP: 3123522018</p>
                  </div>
                  <div className="member-card" style={{ backgroundColor: '#f8f9fa', borderRadius: '10px', padding: '20px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', transition: 'all 0.3s ease', cursor: 'pointer', border: '1px solid #e1e4e8' }} onMouseOver={(e) => {e.currentTarget.style.transform = 'translateY(-10px)'; e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.15)';}} onMouseOut={(e) => {e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';}}>
                    <h2 style={{ color: '#3498db', marginBottom: '10px', fontSize: '1.25rem' }}>Anggota 3</h2>
                    <p style={{ fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '5px', color: '#3498db', transition: 'all 0.3s ease', textShadow: '0 0 1px rgba(52, 152, 219, 0.3)' }} className="member-name">Tamisa Ulinda Marpaung</p>
                    <p style={{ color: '#666' }}>NRP: 3123522019</p>
                  </div>
                  <div className="member-card" style={{ backgroundColor: '#f8f9fa', borderRadius: '10px', padding: '20px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', transition: 'all 0.3s ease', cursor: 'pointer', border: '1px solid #e1e4e8' }} onMouseOver={(e) => {e.currentTarget.style.transform = 'translateY(-10px)'; e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.15)';}} onMouseOut={(e) => {e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';}}>
                    <h2 style={{ color: '#3498db', marginBottom: '10px', fontSize: '1.25rem' }}>Anggota 4</h2>
                    <p style={{ fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '5px', color: '#3498db', transition: 'all 0.3s ease', textShadow: '0 0 1px rgba(52, 152, 219, 0.3)' }} className="member-name">Aqil Yoga Pramono</p>
                    <p style={{ color: '#666' }}>NRP: 3123522011</p>
                  </div>
                  <div className="member-card" style={{ backgroundColor: '#f8f9fa', borderRadius: '10px', padding: '20px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', transition: 'all 0.3s ease', cursor: 'pointer', border: '1px solid #e1e4e8' }} onMouseOver={(e) => {e.currentTarget.style.transform = 'translateY(-10px)'; e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.15)';}} onMouseOut={(e) => {e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';}}>
                    <h2 style={{ color: '#3498db', marginBottom: '10px', fontSize: '1.25rem' }}>Anggota 5</h2>
                    <p style={{ fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '5px', color: '#3498db', transition: 'all 0.3s ease', textShadow: '0 0 1px rgba(52, 152, 219, 0.3)' }} className="member-name">Muhammad Ifzal Faidurrahman</p>
                    <p style={{ color: '#666' }}>NRP: 3123522006</p>
                  </div>
                  <div className="member-card" style={{ backgroundColor: '#f8f9fa', borderRadius: '10px', padding: '20px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', transition: 'all 0.3s ease', cursor: 'pointer', border: '1px solid #e1e4e8' }} onMouseOver={(e) => {e.currentTarget.style.transform = 'translateY(-10px)'; e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.15)';}} onMouseOut={(e) => {e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';}}>
                    <h2 style={{ color: '#3498db', marginBottom: '10px', fontSize: '1.25rem' }}>Anggota 6</h2>
                    <p style={{ fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '5px', color: '#3498db', transition: 'all 0.3s ease', textShadow: '0 0 1px rgba(52, 152, 219, 0.3)' }} className="member-name">Agiel Maula</p>
                    <p style={{ color: '#666' }}>NRP: 3123522016</p>
                  </div>
                  <div className="member-card" style={{ backgroundColor: '#f8f9fa', borderRadius: '10px', padding: '20px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', transition: 'all 0.3s ease', cursor: 'pointer', border: '1px solid #e1e4e8' }} onMouseOver={(e) => {e.currentTarget.style.transform = 'translateY(-10px)'; e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.15)';}} onMouseOut={(e) => {e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';}}>
                    <h2 style={{ color: '#3498db', marginBottom: '10px', fontSize: '1.25rem' }}>Anggota 7</h2>
                    <p style={{ fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '5px', color: '#3498db', transition: 'all 0.3s ease', textShadow: '0 0 1px rgba(52, 152, 219, 0.3)' }} className="member-name">R.P. A. Lexy Mangku Saputra</p>
                    <p style={{ color: '#666' }}>NRP: 3123522012</p>
                  </div>
                  <div className="member-card" style={{ backgroundColor: '#f8f9fa', borderRadius: '10px', padding: '20px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', transition: 'all 0.3s ease', cursor: 'pointer', border: '1px solid #e1e4e8' }} onMouseOver={(e) => {e.currentTarget.style.transform = 'translateY(-10px)'; e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.15)';}} onMouseOut={(e) => {e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';}}>
                    <h2 style={{ color: '#3498db', marginBottom: '10px', fontSize: '1.25rem' }}>Anggota 8</h2>
                    <p style={{ fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '5px', color: '#3498db', transition: 'all 0.3s ease', textShadow: '0 0 1px rgba(52, 152, 219, 0.3)' }} className="member-name">A. Haidar Hafiz</p>
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
            <Route path="Siswa/Tryout/id/subjek/hasil" element={<SiswaTryoutHasil />} />      
            <Route path="Siswa/Tryout/id/subjek/pembahasan" element={<SiswaTryoutPembahasan />} />
            <Route path="Siswa/Tryout/id/subjek/pengerjaan" element={<SiswaTryoutPengerjaan />} />
            <Route path="Guru/Tryout/id/subjek/pembahasan/edit" element={<EditPembahasanSoalTryout />} />
            <Route path="Guru/Tryout/id/subjek/editpembahasan/create" element={<EditSoalCreatePembahasan />} />
            <Route path="Guru/Tryout/id/subjek/edit" element={<EditTryout />} />
            <Route path="Guru/Tryout/id/editsubjek" element={<EditTryoutSubjek />} />
            <Route path="Guru/Tryout" element={<GuruTryout />} />
          </Routes>
        </Layout>
      } />
    </Routes>
  );
}
    
export default App;
