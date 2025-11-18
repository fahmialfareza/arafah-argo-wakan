import { Link, useLocation } from "@tanstack/react-router";

export default function Navigation() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

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
            <button className="text-gray-600">
              <i className="fas fa-bars text-2xl"></i>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
