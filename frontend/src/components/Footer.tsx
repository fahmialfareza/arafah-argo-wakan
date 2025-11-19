import { Link } from "@tanstack/react-router";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <div className="col-span-1 md:col-span-2">
          <Link
            to="/"
            className="text-2xl font-bold mb-4 tracking-wide hover:text-yellow-300 transition flex items-center"
            style={{ color: "#E9D53D" }}
          >
            <img src="/logo.png" alt="ARAFAH Logo" className="w-8 h-8 mr-2" />
            ARAFAH
          </Link>
          <p className="mb-6 pr-8">
            Your reliable partner for sourcing premium Indonesian commodities.
            We connect local farmers with the global market through fair trade
            and rigorous quality assurance.
          </p>
        </div>

        <div>
          <h4 className="text-white font-bold mb-4 uppercase tracking-wider">
            Quick Links
          </h4>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:text-white transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-white transition">
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="/export-products"
                className="hover:text-white transition"
              >
                Export Products
              </Link>
            </li>
            <li>
              <Link
                to="/import-products"
                className="hover:text-white transition"
              >
                Import Products
              </Link>
            </li>
            <li>
              <Link to="/facility" className="hover:text-white transition">
                Facility
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-white transition">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-4 uppercase tracking-wider">
            Contact Info
          </h4>
          <ul className="space-y-4 text-sm">
            <li className="flex items-start">
              <i className="fas fa-map-marker-alt mt-1 mr-3 text-yellow-500 shrink-0"></i>
              <span>
                Jl. Cahaya Kemang Permai No.77, RT.003/RW.007, Jatimakmur, Kec.
                Pd. Gede, Kota Bekasi, Jawa Barat 16969
              </span>
            </li>
            <li className="flex items-center">
              <i className="fas fa-phone-alt mr-3 text-yellow-500 shrink-0"></i>
              <span>+62 853-3756-9638 (Intl. Sales)</span>
            </li>
            <li className="flex items-center">
              <i className="fas fa-envelope mr-3 text-yellow-500 shrink-0"></i>
              <span>business@arafahagro.com</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-gray-800 pt-8 text-center md:text-left flex flex-col md:flex-row justify-between items-center">
        <p>© 2025 PT Arafah Agro Wakan. All Rights Reserved.</p>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <a
            href="#"
            className="text-gray-400 hover:text-white text-xl transition"
            title="Facebook"
          >
            <i className="fab fa-facebook-f"></i>
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-white text-xl transition"
            title="Instagram"
          >
            <i className="fab fa-instagram"></i>
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-white text-xl transition"
            title="TikTok"
          >
            <i className="fab fa-tiktok"></i>
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-white text-xl transition"
            title="YouTube"
          >
            <i className="fab fa-youtube"></i>
          </a>
        </div>
      </div>
    </footer>
  );
}
