import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { ROLES } from "../constants";

export default function Navbar() {
  const [role, setRole] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const parsedUser = JSON.parse(user);
      setRole(parsedUser.role);
      setUserName(parsedUser.name);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const getInitials = (name: string) => {
    const names = name.split(" ");
    return names.map((n) => n[0].toUpperCase()).join("");
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-black shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/home">
              <img className="h-10 w-auto" src="/logo.jpeg" alt="Logo" />
            </Link>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex md:items-center md:space-x-4 text-white">
            <Link
            to="/courses"
            onClick={() => setMenuOpen(false)}
            className="block px-3 py-2 rounded-md hover:bg-gray-800"
          >
            Courses
          </Link>
             <Link
              to="/videos"
              className="hover:text-gray-300 px-3 py-2 rounded-md font-medium"
            >
              Video
            </Link>
            {(role === ROLES.TEACHER || role === ROLES.ADMIN) && (
              <>
                <Link
                  to="/upload"
                  className="hover:text-gray-300 px-3 py-2 rounded-md font-medium"
                >
                  Upload
                </Link>
              </>
            )}

            {role === ROLES.ADMIN && (
              <Link
                to="/admin"
                className="hover:text-gray-300 px-3 py-2 rounded-md font-medium"
              >
                Admin
              </Link>
            )}

            {/* Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={toggleDropdown}
                className="flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 px-3 py-2 rounded-full focus:outline-none"
              >
                <div className="bg-gray-500 text-white w-8 h-8 flex items-center justify-center rounded-full">
                  {userName ? getInitials(userName) : "U"}
                </div>
                <span className="text-white">{dropdownOpen ? "▲" : "▼"}</span>
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-black text-white shadow-lg rounded-md py-2 z-50">
                  <Link
                    to="/profile"
                    onClick={() => setDropdownOpen(false)}
                    className="block px-4 py-2 hover:bg-gray-800"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={logout}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-800"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-white focus:outline-none"
          >
            {menuOpen ? "✖" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden px-2 pt-2 pb-3 space-y-1 bg-black text-white">
          <Link
            to="/courses"
            onClick={() => setMenuOpen(false)}
            className="block px-3 py-2 rounded-md hover:bg-gray-800"
          >
            Courses
          </Link>

          {(role === ROLES.TEACHER || role === ROLES.ADMIN) && (
            <>
              <Link
                to="/upload"
                onClick={() => setMenuOpen(false)}
                className="block px-3 py-2 rounded-md hover:bg-gray-800"
              >
                Upload
              </Link>
              <Link
                to="/create-playlist"
                onClick={() => setMenuOpen(false)}
                className="block px-3 py-2 rounded-md hover:bg-gray-800"
              >
                Create Playlist
              </Link>
            </>
          )}

          {role === ROLES.ADMIN && (
            <Link
              to="/admin"
              onClick={() => setMenuOpen(false)}
              className="block px-3 py-2 rounded-md hover:bg-gray-800"
            >
              Admin
            </Link>
          )}

          {/* Profile + Logout */}
          <div className="border-t border-gray-700 mt-3 pt-3">
            <div className="flex items-center gap-3 px-3">
              <div className="bg-gray-500 text-white w-8 h-8 flex items-center justify-center rounded-full">
                {userName ? getInitials(userName) : "U"}
              </div>
              <span className="text-sm">{userName || "User"}</span>
            </div>
            <Link
              to="/profile"
              onClick={() => setMenuOpen(false)}
              className="block px-3 py-2 rounded-md hover:bg-gray-800 mt-2"
            >
              Profile
            </Link>
            <button
              onClick={logout}
              className="w-full text-left px-3 py-2 rounded-md hover:bg-gray-800 mt-1"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
