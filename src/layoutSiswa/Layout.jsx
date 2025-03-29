import React from "react";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <div className="layout-container w-full min-h-screen flex flex-col">
      <Header />
      <main className="main-content flex-grow w-full">{children}</main>
      <Footer />
    </div>
  );
}