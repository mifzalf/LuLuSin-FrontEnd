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
              <div>
                <a href="https://vite.dev" target="_blank">
                  <img src={viteLogo} className="logo" alt="Vite logo" />
                </a>
                <a href="https://react.dev" target="_blank">
                  <img src={reactLogo} className="logo react" alt="React logo" />
                </a>
                <h1>Vite + React</h1>
                <div className="card">
                  <button onClick={() => setCount(count + 1)}>
                    count is {count}
                  </button>
                  <p>Edit <code>src/App.jsx</code> and save to test HMR</p>
                </div>
                <p className="read-the-docs">
                  Click on the Vite and React logos to learn more
                </p>
              </div>
            } />
            <Route path="Guru/CreateTryout" element={<CreateTryout />} />
          </Routes>
        </Layout>
      } />
    </Routes>
  );
}

export default App;
