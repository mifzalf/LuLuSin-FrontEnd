import React from "react";

const DetailMurid = () => {
  const students = [
    { id: 1, nama: "Muhammad", nim: "0064748392929", email: "jane@microsoft.com" },
    { id: 2, nama: "Yanto", nim: "0064748392929", email: "floyd@yahoo.com" },
    { id: 3, nama: "Sutardi", nim: "0064748392929", email: "ronald@adobe.com" },
    { id: 4, nama: "Sutarmo", nim: "0064748392929", email: "marvin@tesla.com" },
    { id: 5, nama: "Sutikno", nim: "0064748392929", email: "jerome@google.com" },
    { id: 6, nama: "Ani", nim: "0064748392929", email: "kathryn@microsoft.com" },
    { id: 7, nama: "Yani", nim: "0064748392929", email: "jacob@yahoo.com" },
    { id: 8, nama: "Dewi", nim: "0064748392929", email: "kristin@facebook.com" },
  ];

  return (
    <div className="flex bg-gray-100 min-h-screen w-screen  fixed inset-0  overflow-hidden">
      {/* Sidebar */}
      <div className="w-64 bg-white p-6 shadow-md">
        <h1 className="text-xl font-bold text-blue-900">LuLuSin</h1>
        <p className="text-xs text-gray-500">Education Academi</p>
        <nav className="mt-6">
          <ul className="space-y-4">
            <li className="flex items-center space-x-2 text-gray-700 hover:text-blue-900 cursor-pointer">
              <a href="/Admin/DashBoard">
                <span className="text-lg">📊</span>
                <span>Dashboard</span>
              </a>
            </li>

            <li className="flex items-center space-x-2 text-gray-700 hover:text-blue-900 cursor-pointer">
              <a href="/Admin/DetailGuru">
                <span className="text-lg">👨‍🏫</span>
                <span>Guru</span>
              </a>
            </li>
            <li className="flex items-center space-x-2 text-gray-700 hover:text-blue-900 cursor-pointer">
              <a href="/Admin/DetailMurid">
              <span className="text-lg">👩‍🎓</span>
              <span>Murid</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="p-6 bg-gray-100 flex-1">
        <h1 className="text-2xl font-bold text-blue-600">Akun Murid</h1>
        <div className="bg-white p-6 rounded-lg shadow mt-4">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-3 text-left text-blue-600">Id</th>
                <th className="p-3 text-left text-blue-600">Nama</th>
                <th className="p-3 text-left text-blue-600">NIM</th>
                <th className="p-3 text-left text-blue-600">Email</th>
                <th className="p-3 text-left text-blue-600">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id} className="border-b">
                  <td className="p-3 text-blue-600">{student.id}</td>
                  <td className="p-3 text-blue-600">{student.nama}</td>
                  <td className="p-3 text-blue-600">{student.nim}</td>
                  <td className="p-3 text-blue-600">{student.email}</td>
                  <td className="p-3">
                    <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DetailMurid;