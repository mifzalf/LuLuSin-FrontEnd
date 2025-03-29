import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout() {
  return (
    <div className="layout-container w-full min-h-screen flex flex-col">
      <Header />
      <main className="main-content flex-grow w-full">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}