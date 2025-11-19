import { Link, useLocation } from "@tanstack/react-router";
import { useState } from "react";

export default function Navigation() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-md fixed w-full z-50 top-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-bold text-green-800 tracking-wide hover:text-green-900 transition"
          >
            <i className="fas fa-leaf mr-2"></i>ARAFAH
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 items-center font-medium text-sm lg:text-base">
            <Link
              to="/"
              className={`px-1 pt-1 transition ${
                isActive("/")
                  ? "text-green-700 border-b-2 border-green-700"
                  : "text-gray-600 hover:text-green-700"
              }`}
            >
              Home
            </Link>
            <Link
              to="/about"
              className={`px-1 pt-1 transition ${
                isActive("/about")
                  ? "text-green-700 border-b-2 border-green-700"
                  : "text-gray-600 hover:text-green-700"
              }`}
            >
              About Us
            </Link>
            <Link
              to="/export-products"
              className={`px-1 pt-1 transition ${
                isActive("/export-products")
                  ? "text-green-700 border-b-2 border-green-700"
                  : "text-gray-600 hover:text-green-700"
              }`}
            >
              Products Exports
            </Link>
            <Link
              to="/import-products"
              className={`px-1 pt-1 transition ${
                isActive("/import-products")
                  ? "text-green-700 border-b-2 border-green-700"
                  : "text-gray-600 hover:text-green-700"
              }`}
            >
              Products Imports
            </Link>
            <Link
              to="/facility"
              className={`px-1 pt-1 transition ${
                isActive("/facility")
                  ? "text-green-700 border-b-2 border-green-700"
                  : "text-gray-600 hover:text-green-700"
              }`}
            >
              Facility
            </Link>
            <Link
              to="/contact"
              className={`px-1 pt-1 transition ${
                isActive("/contact")
                  ? "text-green-700 border-b-2 border-green-700"
                  : "text-gray-600 hover:text-green-700"
              }`}
            >
              Contact Us
            </Link>
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex items-center">
            <Link
              to="/contact"
              className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-3 rounded-md font-semibold transition duration-300"
            >
              Request a Quote
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="text-gray-600 focus:outline-none"
              aria-label="Toggle mobile menu"
            >
              <i
                className={`fas ${
                  isMobileMenuOpen ? "fa-times" : "fa-bars"
                } text-2xl`}
              ></i>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                to="/"
                onClick={closeMobileMenu}
                className={`block px-3 py-2 rounded-md text-base font-medium transition ${
                  isActive("/")
                    ? "bg-green-50 text-green-700"
                    : "text-gray-600 hover:bg-gray-50 hover:text-green-700"
                }`}
              >
                Home
              </Link>
              <Link
                to="/about"
                onClick={closeMobileMenu}
                className={`block px-3 py-2 rounded-md text-base font-medium transition ${
                  isActive("/about")
                    ? "bg-green-50 text-green-700"
                    : "text-gray-600 hover:bg-gray-50 hover:text-green-700"
                }`}
              >
                About Us
              </Link>
              <Link
                to="/export-products"
                onClick={closeMobileMenu}
                className={`block px-3 py-2 rounded-md text-base font-medium transition ${
                  isActive("/export-products")
                    ? "bg-green-50 text-green-700"
                    : "text-gray-600 hover:bg-gray-50 hover:text-green-700"
                }`}
              >
                Products Exports
              </Link>
              <Link
                to="/import-products"
                onClick={closeMobileMenu}
                className={`block px-3 py-2 rounded-md text-base font-medium transition ${
                  isActive("/import-products")
                    ? "bg-green-50 text-green-700"
                    : "text-gray-600 hover:bg-gray-50 hover:text-green-700"
                }`}
              >
                Products Imports
              </Link>
              <Link
                to="/facility"
                onClick={closeMobileMenu}
                className={`block px-3 py-2 rounded-md text-base font-medium transition ${
                  isActive("/facility")
                    ? "bg-green-50 text-green-700"
                    : "text-gray-600 hover:bg-gray-50 hover:text-green-700"
                }`}
              >
                Facility
              </Link>
              <Link
                to="/contact"
                onClick={closeMobileMenu}
                className={`block px-3 py-2 rounded-md text-base font-medium transition ${
                  isActive("/contact")
                    ? "bg-green-50 text-green-700"
                    : "text-gray-600 hover:bg-gray-50 hover:text-green-700"
                }`}
              >
                Contact Us
              </Link>
              <Link
                to="/contact"
                onClick={closeMobileMenu}
                className="block px-3 py-2 mx-2 mt-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-md font-semibold text-center transition duration-300"
              >
                Request a Quote
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
