import { useState } from "react";
import { FaSignOutAlt } from "react-icons/fa"; // Logout Icon
import { GiHamburgerMenu } from "react-icons/gi"; // Hamburger Menu Icon
import { MdClose } from "react-icons/md"; // Close Icon
import { useDispatch } from "react-redux";
import { logout } from "../store/reducer/auth.reducer";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../config/api.config";

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
    dispatch(api.util.resetApiState());
    navigate("/auth/login");
    // Add your logout logic here (e.g., clear session, redirect to login page)
  };

  return (
    <header className="bg-blue-500 p-4 shadow-md">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link to={"/"} className="text-white text-2xl font-semibold">
          Course
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          <Link
            to={"/course/add"}
            href="#home"
            className="text-white hover:text-gray-200"
          >
            Add course
          </Link>
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
          <Link href="#home" className="text-white block">
            Add Course
          </Link>

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
