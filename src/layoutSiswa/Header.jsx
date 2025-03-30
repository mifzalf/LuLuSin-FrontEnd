import { Link, useLocation, useNavigate } from "react-router-dom"
import { FiLogOut, FiHome, FiBook, FiUser } from "react-icons/fi"
import { motion } from "framer-motion"

const Header = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const isActiveLink = (path) => {
    return location.pathname.startsWith(`/siswa${path}`)
  }

  const handleLogout = () => {
    // Here you can add any logout logic (clear tokens, etc.)
    navigate("/login")
  }

  const navItems = [
    { path: "/dashboard", label: "Dashboard", icon: FiHome },
    { path: "/tryout", label: "Tryout", icon: FiBook },
    { path: "/profile", label: "Profile", icon: FiUser },
  ]

  return (
    <motion.header 
      className="bg-[#1B2B44] text-white shadow-lg"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <Link 
            to="/siswa/dashboard" 
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
                <motion.div
                  key={item.path}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to={`/siswa${item.path}`}
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
                </motion.div>
              )
            })}
          </nav>

          {/* Logout Button */}
          <motion.button 
            onClick={handleLogout}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
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
          </motion.button>
        </div>
      </div>
    </motion.header>
  )
}

export default Header