import React from "react";

export default function Dashboard() {
  return (
    <div className="flex bg-gray-100 w-screen h-screen fixed inset-0  overflow-hidden">
      {/* Sidebar */}
      <div className="w-64 bg-white p-6 shadow-md h-full">
        <h1 className="text-xl font-bold text-blue-900">LuLuSin</h1>
        <p className="text-xs text-gray-500">Education Academi</p>
        <nav className="mt-6">
          <ul className="space-y-4">
            <li className="flex items-center space-x-2 text-gray-700 hover:text-blue-900 cursor-pointer">
              <a href="/admin/dashboard">
                <span className="text-lg">📊</span>
                <span>Dashboard</span>
              </a>
            </li>
            <li className="flex items-center space-x-2 text-gray-700 hover:text-blue-900 cursor-pointer">
              <a href="/admin/detailguru">
                <span className="text-lg">👨‍🏫</span>
                <span>Guru</span>
              </a>
            </li>
            <li className="flex items-center space-x-2 text-gray-700 hover:text-blue-900 cursor-pointer">
              <a href="/admin/detailmurid">
                <span className="text-lg">👩‍🎓</span>
                <span>Murid</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>

      {/* Content */}
      <div className="flex-1 p-10 h-full overflow-hidden">
        {/* Navbar */}
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-blue-600">Dashboard</h2>
          <button className="text-2xl">☰</button>
        </div>

        {/* Welcome Card */}
        <div className="mt-6 bg-white p-6 rounded-lg shadow-md w-full h-full flex flex-col justify-center items-center">
          <h3 className="text-lg font-semibold">Selamat Datang</h3>
          <p className="text-gray-700">LuLuSin Admin</p>
          <div className="mt-6 flex gap-6 w-full max-w-4xl flex-wrap">
            <div className="bg-[#F5F0E9] p-6 rounded-lg shadow-md text-center flex-1">
              <p className="text-gray-700 font-semibold">Guru Terdaftar</p>
              <p className="text-2xl text-black font-bold">23</p>
            </div>
            <div className="bg-[#F5F0E9] p-6 rounded-lg shadow-md text-center flex-1">
              <p className="text-gray-700 font-semibold">Murid Terdaftar</p>
              <p className="text-2xl text-black font-bold">234</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
