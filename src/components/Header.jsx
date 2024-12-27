import { useState } from "react";
import { FaSignOutAlt } from "react-icons/fa"; // Logout Icon
import { GiHamburgerMenu } from "react-icons/gi"; // Hamburger Menu Icon
import { MdClose } from "react-icons/md"; // Close Icon
import { useDispatch } from "react-redux";
import { logout } from "../store/reducer/auth.reducer";
import { useNavigate } from "react-router-dom";

const Header = () => {
  // menu responsive
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // dispatcher and navigate handler
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // toggle menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // handle logout handler
  const handleLogout = () => {
    dispatch(logout());
    navigate("/auth/login");
    // Add your logout logic here (e.g., clear session, redirect to login page)
  };

  return (
    <header className="bg-blue-500 p-4 shadow-md">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="text-white text-2xl font-semibold">MyApp</div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          <a href="#home" className="text-white hover:text-gray-200">
            Home
          </a>
          <a href="#about" className="text-white hover:text-gray-200">
            About
          </a>
          <a href="#services" className="text-white hover:text-gray-200">
            Services
          </a>
          <a href="#contact" className="text-white hover:text-gray-200">
            Contact
          </a>
        </nav>

        {/* Logout Icon */}
        <button
          onClick={handleLogout}
          className="hidden md:block text-white hover:text-gray-200"
        >
          <FaSignOutAlt size={20} />
        </button>

        {/* Hamburger Menu (Mobile) */}
        <button onClick={toggleMenu} className="md:hidden text-white">
          {isMenuOpen ? <MdClose size={24} /> : <GiHamburgerMenu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation (Hamburger Menu) */}
      {isMenuOpen && (
        <nav className="md:hidden bg-blue-600 p-4 space-y-4">
          <a href="#home" className="text-white block">
            Home
          </a>
          <a href="#about" className="text-white block">
            About
          </a>
          <a href="#services" className="text-white block">
            Services
          </a>
          <a href="#contact" className="text-white block">
            Contact
          </a>
          <button
            onClick={handleLogout}
            className="text-white block w-full text-left"
          >
            <FaSignOutAlt size={20} className="inline-block mr-2" />
            Logout
          </button>
        </nav>
      )}
    </header>
  );
};

export default Header;
