import { Link, useLocation } from "react-router-dom"
import { FiLogOut } from "react-icons/fi"

const GuruLayout = ({ children }) => {
  const location = useLocation()

  const isActiveLink = (path) => {
    return location.pathname.startsWith(`/guru${path}`)
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-[#1E2A4F] text-white">
        <div className="container mx-auto">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Brand */}
            <Link to="/guru/dashboard" className="flex items-center ml-4">
              <div>
                <span className="text-xl font-bold">LuLuSin</span>
                <div className="text-xs text-gray-300">Education Academy</div>
              </div>
            </Link>

            {/* Navigation (moved more to the right) */}
            <nav className="flex items-center space-x-8 ml-auto mr-8">
              <Link
                to="/guru/dashboard"
                className={`${
                  isActiveLink("/dashboard") ? "text-white" : "text-gray-300 hover:text-white"
                } transition-colors duration-200`}
              >
                Dashboard
              </Link>
              <Link
                to="/guru/tryout"
                className={`${
                  isActiveLink("/tryout") ? "text-white" : "text-gray-300 hover:text-white"
                } transition-colors duration-200`}
              >
                Tryout
              </Link>
              <Link
                to="/guru/subjek"
                className={`${
                  isActiveLink("/subjek") ? "text-white" : "text-gray-300 hover:text-white"
                } transition-colors duration-200`}
              >
                Subjek
              </Link>
              <Link
                to="/guru/kategori-subjek"
                className={`${
                  isActiveLink("/kategori-subjek") ? "text-white" : "text-gray-300 hover:text-white"
                } transition-colors duration-200`}
              >
                Kategori Subjek
              </Link>
            </nav>

            {/* Logout Button */}
            <button className="bg-[#374151] px-4 py-1 rounded-full text-white flex items-center gap-2 transition-colors duration-200 mr-4">
              <span>Logout</span>
              <FiLogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto py-8">{children}</main>
    </div>
  )
}

export default GuruLayout

