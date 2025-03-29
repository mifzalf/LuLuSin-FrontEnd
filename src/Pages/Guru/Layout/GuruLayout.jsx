import { FiLogOut } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";

const GuruLayout = ({ children }) => {
  const location = useLocation();

  const isActiveLink = (path) => {
    return location.pathname.includes(path);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      {/* Header */}
      <header className="bg-[#1E2A4F] text-white">
        <div className="container mx-auto">
          <div className="flex items-center justify-between h-16 px-4">
            {/* Logo and Brand */}
            <Link to="/guru/dashboard" className="flex items-center space-x-2">
              <span className="text-lg font-semibold text-blue-300">LuLuSin</span>
              <span className="text-sm text-gray-300">Education Academy</span>
            </Link>

            {/* Main Navigation */}
            <nav className="flex space-x-6">
              <Link
                to="/guru/dashboard"
                className={`${
                  isActiveLink("/dashboard")
                    ? "text-white border-b-2 border-blue-400"
                    : "text-blue-300 hover:text-white"
                } py-4 px-2 transition-colors duration-200`}
              >
                Dashboard
              </Link>
              <Link
                to="/guru/tryout"
                className={`${
                  isActiveLink("/tryout")
                    ? "text-white border-b-2 border-blue-400"
                    : "text-blue-300 hover:text-white"
                } py-4 px-2 transition-colors duration-200`}
              >
                Tryout
              </Link>
              <Link
                to="/guru/subjek"
                className={`${
                  isActiveLink("/subjek")
                    ? "text-white border-b-2 border-blue-400"
                    : "text-blue-300 hover:text-white"
                } py-4 px-2 transition-colors duration-200`}
              >
                Subjek
              </Link>
              <Link
                to="/guru/kategori-subjek"
                className={`${
                  isActiveLink("/kategori-subjek")
                    ? "text-white border-b-2 border-blue-400"
                    : "text-blue-300 hover:text-white"
                } py-4 px-2 transition-colors duration-200`}
              >
                Kategori Subjek
              </Link>
            </nav>

            {/* Logout Button */}
            <button className="text-blue-300 hover:text-white flex items-center gap-2">
              <span>Logout</span>
              <FiLogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
};

export default GuruLayout; 