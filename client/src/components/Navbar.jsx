import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Menu, X } from "lucide-react"; // for icons

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-[#111] text-white p-4 shadow-md">
      <div className="flex justify-between items-center">
        {/* Brand */}
        <div className="text-2xl font-bold text-[#f3b24d]">
          <span className="text-white">CAR</span> RENTAL
        </div>

        {/* Hamburger Icon */}
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-6 text-sm items-center">
          <li><Link to="/" className="hover:text-orange-300">Home</Link></li>
          <li><Link to="/cars" className="hover:text-orange-300">Cars</Link></li>
          <li><Link to="/about" className="hover:text-orange-300">About</Link></li>
          <li><Link to="/contact" className="hover:text-orange-300">Contact</Link></li>

          {user?.role === "admin" && (
            <>
              <li><Link to="/add-car" className="hover:text-orange-300">Add Car</Link></li>
              <li><Link to="/admin/upload-home-images" className="hover:text-orange-300">Upload Images</Link></li>
              <li><Link to="/admin/bookings" className="hover:text-orange-300">Admin Bookings</Link></li>
            </>
          )}

          {user?.role === "user" && (
            <li><Link to="/bookings" className="hover:text-orange-300">My Bookings</Link></li>
          )}

          {user ? (
            <>
              <span className="text-sm text-gray-300">Welcome, {user.name}</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm">Login</Link>
              <Link to="/signup" className="border border-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm">Signup</Link>
            </>
          )}
        </ul>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="md:hidden mt-4 flex flex-col gap-3 text-sm">
          <li><Link to="/" onClick={toggleMenu}>Home</Link></li>
          <li><Link to="/cars" onClick={toggleMenu}>Cars</Link></li>
          <li><Link to="/about" onClick={toggleMenu}>About</Link></li>
          <li><Link to="/contact" onClick={toggleMenu}>Contact</Link></li>

          {user?.role === "admin" && (
            <>
              <li><Link to="/add-car" onClick={toggleMenu}>Add Car</Link></li>
              <li><Link to="/admin/upload-home-images" onClick={toggleMenu}>Upload Images</Link></li>
              <li><Link to="/admin/bookings" onClick={toggleMenu}>Admin Bookings</Link></li>
            </>
          )}

          {user?.role === "user" && (
            <li><Link to="/bookings" onClick={toggleMenu}>My Bookings</Link></li>
          )}

          {user ? (
            <>
              <li className="text-gray-300">Welcome, {user.name}</li>
              <li>
                <button onClick={() => { handleLogout(); toggleMenu(); }} className="bg-red-500 px-3 py-1 rounded text-sm">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li><Link to="/login" className="bg-yellow-500 px-3 py-1 rounded text-sm" onClick={toggleMenu}>Login</Link></li>
              <li><Link to="/signup" className="border border-yellow-500 px-3 py-1 rounded text-sm" onClick={toggleMenu}>Signup</Link></li>
            </>
          )}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
