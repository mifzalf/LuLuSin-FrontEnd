import React from "react";

const DetailGuru = () => {
  const teachers = [
    {
      id: 1,
      nama: "Muhammad",
      nuptk: "0064748392929",
      email: "jane@microsoft.com",
      status: "Active",
    },
    {
      id: 2,
      nama: "Yanto",
      nuptk: "0064748392929",
      email: "floyd@yahoo.com",
      status: "Inactive",
    },
    {
      id: 3,
      nama: "Sutardi",
      nuptk: "0064748392929",
      email: "ronald@adobe.com",
      status: "Inactive",
    },
    {
      id: 4,
      nama: "Sutarmo",
      nuptk: "0064748392929",
      email: "marvin@tesla.com",
      status: "Active",
    },
    {
      id: 5,
      nama: "Sutikno",
      nuptk: "0064748392929",
      email: "jerome@google.com",
      status: "Active",
    },
    {
      id: 6,
      nama: "Ani",
      nuptk: "0064748392929",
      email: "kathryn@microsoft.com",
      status: "Active",
    },
    {
      id: 7,
      nama: "Yani",
      nuptk: "0064748392929",
      email: "jacob@yahoo.com",
      status: "Active",
    },
    {
      id: 8,
      nama: "Dewi",
      nuptk: "0064748392929",
      email: "kristin@facebook.com",
      status: "Inactive",
    },
  ];

  return (
    <div className="flex bg-gray-100 min-h-screen w-screen  fixed inset-0  overflow-hidden" >
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
            <a href="/Admin/DeaailMurid"></a>
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
        <h1 className="text-2xl font-bold text-blue-600">Akun Guru</h1>
        <div className="bg-white p-6 rounded-lg shadow mt-4">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-3 text-left text-blue-600">Id</th>
                <th className="p-3 text-left text-blue-600">Nama</th>
                <th className="p-3 text-left text-blue-600">NUPTK</th>
                <th className="p-3 text-left text-blue-600">Email</th>
                <th className="p-3 text-left text-blue-600">Status</th>
              </tr>
            </thead>
            <tbody>
              {teachers.map((teacher) => (
                <tr key={teacher.id} className="border-b">
                  <td className="p-3 text-blue-600">{teacher.id}</td>
                  <td className="p-3 text-blue-600">{teacher.nama}</td>
                  <td className="p-3 text-blue-600">{teacher.nuptk}</td>
                  <td className="p-3 text-blue-600">{teacher.email}</td>
                  <td className="p-3">
                    <span
                      className={`px-3 py-1 rounded text-white ${
                        teacher.status === "Active"
                          ? "bg-green-500"
                          : "bg-red-500"
                      }`}
                    >
                      {teacher.status}
                    </span>
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

export default DetailGuru;
