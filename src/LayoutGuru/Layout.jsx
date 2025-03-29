import React from "react";
import Header from "./LayoutGuru/Header";
import Footer from "./LayoutGuru/Footer";

export default function Layout({ children }) {
  return (
    <div className="layout-container w-full min-h-screen flex flex-col">
      <Header />
      <main className="main-content flex-grow w-full">{children}</main>
      <Footer />
    </div>
  );
}