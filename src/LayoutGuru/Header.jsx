import { Link, useLocation, useNavigate } from "react-router-dom"
import { FiLogOut, FiHome, FiBook, FiList, FiGrid } from "react-icons/fi"

const Header = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const isActiveLink = (path) => {
    return location.pathname.startsWith(`/guru${path}`)
  }

  const handleLogout = () => {
    // Here you can add any logout logic (clear tokens, etc.)
    navigate("/login")
  }

  const navItems = [
    { path: "/dashboard", label: "Dashboard", icon: FiHome },
    { path: "/tryout", label: "Tryout", icon: FiBook },
    { path: "/subjek", label: "Subjek", icon: FiList },
    { path: "/kategorisubjek", label: "Kategori Subjek", icon: FiGrid },
  ]

  return (
    <header className="bg-[#1E2A4F] text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <Link 
            to="/guru/dashboard" 
            className="flex items-center space-x-2 hover:opacity-90 transition-opacity"
          >
            <div>
              <span className="text-xl font-bold tracking-tight">LuLuSin</span>
              <div className="text-xs text-gray-300 font-medium">Education Academy</div>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center space-x-1 ml-auto mr-8">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.path}
                  to={`/guru${item.path}`}
                  className={`
                    flex items-center space-x-2 px-4 py-2 rounded-lg
                    transition-all duration-200
                    ${isActiveLink(item.path) 
                      ? "bg-white/10 text-white" 
                      : "text-gray-300 hover:text-white hover:bg-white/5"
                    }
                  `}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              )
            })}
          </nav>

          {/* Logout Button */}
          <button 
            onClick={handleLogout}
            className="
              bg-[#374151] hover:bg-[#4B5563] 
              px-4 py-1.5 rounded-lg 
              text-white font-medium
              flex items-center gap-2 
              transition-all duration-200
              hover:shadow-md
              active:transform active:scale-95
            "
          >
            <span>Logout</span>
            <FiLogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header

