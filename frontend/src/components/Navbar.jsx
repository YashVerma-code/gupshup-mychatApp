import { useEffect, useState } from "react";
import {
  Settings,
  User,
  LogOut,
  Menu,
  X,
  ChevronDown,
  Home,
} from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import "./navbar.css";
export default function Navbar() {
  const { logout, authUser } = useAuthStore();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const handleLogout = () => {
    setIsProfileDropdownOpen(false);
    setIsMobileMenuOpen(false);
    logout();
  };
  // console.log("Auth user at navbar : ",authUser)
  return (
    <nav className=" bg-white/10 backdrop-blur-lg border-b border-white/20 shadow-md  fixed w-full z-50">
      <div className="w-full px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to={"/"} onClick={() => setIsProfileDropdownOpen(false)}>
            <div className="flex items-center space-x-3 cursor-pointer group ">
              <div className="relative">
                <div className="w-13 h-13 bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/25 group-hover:shadow-purple-500/40 transition-all duration-300 group-hover:scale-110 rounded-full">
                  <img
                    src="/logo2.png"
                    alt="Logo"
                    className="w-full h-full text-white object-cover rounded-full"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Gupshup
                </h1>
                <p className="text-sm">A chatting application</p>
              </div>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {authUser ? (
              <>
                {/* Profile Dropdown */}
                <div className="relative">
                  <button
                    onClick={toggleProfileDropdown}
                    className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-white/5 border hover:bg-white/10 transition-all duration-300 group"
                  >
                    {(
                      authUser?.profilePic
                    ) ? (
                      <img
                        src={authUser.profilePic}
                        alt="Profile"
                        className="w-10 h-10 object-cover rounded-full"
                      />
                    ) : (
                      <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full p-1">
                        <User className="w-full h-full rounded-full text-white" />
                      </div>
                    )}
                    <span className="text-sm font-medium">
                      {authUser.fullName}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        isProfileDropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isProfileDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-slate-800/95 backdrop-blur-xl rounded-xl border border-white/10 shadow-2xl animate-fade-in">
                      <div className="p-2">
                        <div className="px-3 py-2 border-b border-white/10 mb-2">
                          <p className="text-sm font-medium text-white">
                            {authUser.fullName}
                          </p>
                          <p className="text-xs text-gray-400">
                            {authUser.email}
                          </p>
                        </div>
                        <Link
                          to={"/"}
                          onClick={() => setIsProfileDropdownOpen(false)}
                        >
                          <div className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors duration-200 flex items-center space-x-2">
                            <Home className="w-4 h-4" />
                            <span>Home</span>
                          </div>
                        </Link>
                        <Link
                          to={"/setting"}
                          onClick={() => setIsProfileDropdownOpen(false)}
                        >
                          <div className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors duration-200 flex items-center space-x-2">
                            <Settings className="w-4 h-4" />
                            <span>Settings</span>
                          </div>
                        </Link>
                        <Link
                          to={"/profile"}
                          onClick={() => setIsProfileDropdownOpen(false)}
                        >
                          <div className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors duration-200 flex items-center space-x-2">
                            <User className="w-4 h-4" />
                            <span>View Profile</span>
                          </div>
                        </Link>
                        <hr className="border-white/10 my-2" />
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-3 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors duration-200 flex items-center space-x-2"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Logout</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                {/* Settings for Non-logged in users */}
                <div className="relative">
                  <Link to={"/setting"}>
                    <div className="p-2 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300">
                      <Settings className="w-5 h-5" />
                    </div>
                  </Link>
                </div>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-slate-800/95 backdrop-blur-xl border-b border-white/10 shadow-2xl animate-fade-in">
            <div className="px-4 py-4 space-y-4">
              {authUser ? (
                <>
                  {/* Profile Section */}
                  <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-xl border border-white/10">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">
                        {authUser.fullName}
                      </p>
                      <p className="text-xs text-gray-400">{authUser.email}</p>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="space-y-2">
                    <Link to={"/"} onClick={() => setIsMobileMenuOpen(false)}>
                      <div className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors duration-200 flex items-center space-x-2">
                        <Home className="w-4 h-4" />
                        <span>Home</span>
                      </div>
                    </Link>
                    <Link
                      to={"/setting"}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <div className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors duration-200 flex items-center space-x-2">
                        <Settings className="w-4 h-4" />
                        <span>Settings</span>
                      </div>
                    </Link>
                    <Link
                      to={"/profile"}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <div className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors duration-200 flex items-center space-x-2">
                        <User className="w-4 h-4" />
                        <span>View Profile</span>
                      </div>
                    </Link>
                  </div>
                </>
              ) : (
                <>
                  {/* Settings for non-logged in users */}
                  <div className="space-y-2">
                    <button className="w-full text-left px-4 py-3 text-gray-300 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200 flex items-center space-x-3">
                      <Settings className="w-5 h-5" />
                      <span>Settings</span>
                    </button>
                    <Link to={"/login"}>
                      <div className="w-full text-left px-4 py-3 text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 rounded-xl transition-all duration-200 flex items-center space-x-3">
                        <User className="w-5 h-5" />
                        <span>Sign In</span>
                      </div>
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
