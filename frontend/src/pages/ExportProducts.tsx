import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { Link } from "@tanstack/react-router";
import { useDocumentMeta } from "../hooks/useDocumentMeta";

export default function ExportProducts() {
  useDocumentMeta({
    title: "Export Products - PT Arafah Agro Wakan",
    description:
      "Explore our premium export products including Briquettes, Spices, Coffee, and Agricultural commodities.",
    keywords: "export products, briquettes, spices, coffee, commodities",
    image:
      "https://images.unsplash.com/photo-1621034424647-1f9b4e53c43f?auto=format&fit=crop&w=1200&q=80",
    canonical: "https://arafahagro.com/export-products",
  });
  return (
    <div className="bg-gray-50 text-gray-800">
      <Navigation />

      {/* Hero Section */}
      <header
        className="h-[40vh] pt-20 flex items-center justify-center bg-cover bg-center relative"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.8)), url(https://images.unsplash.com/photo-1555939594-58d7cb561818?auto=format&fit=crop&w=1920&q=80)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Our Export Products
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto px-4">
            Premium Indonesian commodities sourced directly from our network of
            trusted farmers.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Briquettes Section */}
        <section id="briquettes" className="mb-20">
          <div className="flex items-center mb-8">
            <div className="bg-orange-600 p-3 rounded-full mr-4">
              <i className="fas fa-fire text-white text-2xl"></i>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">
                Energy Products (Briquettes)
              </h2>
              <p className="text-gray-600">
                Premium charcoal briquettes for global markets
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="flex flex-col bg-white rounded-lg shadow-md overflow-hidden border border-gray-100">
              <img
                src="https://images.unsplash.com/photo-1621034424647-1f9b4e53c43f?auto=format&fit=crop&w=600&q=80"
                alt="Coconut Charcoal Briquettes"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900">
                  Coconut Charcoal Briquettes (Premium)
                </h3>
                <p className="text-gray-600 mt-2 text-sm">
                  High-quality briquettes for Shisha, with extended burn time
                  and minimal ash.
                </p>
              </div>
            </div>
            <div className="flex flex-col bg-white rounded-lg shadow-md overflow-hidden border border-gray-100">
              <img
                src="https://images.unsplash.com/photo-1585314062340-f0ee78e40cc7?auto=format&fit=crop&w=600&q=80"
                alt="BBQ Briquettes"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900">
                  BBQ Briquettes (Hexagonal)
                </h3>
                <p className="text-gray-600 mt-2 text-sm">
                  Perfect for grilling and BBQ, with uniform shape and
                  consistent quality.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Spices & Coffee Section */}
        <section id="spices" className="mb-20 pt-10 border-t border-gray-200">
          <div className="flex items-center mb-8">
            <div className="bg-amber-600 p-3 rounded-full mr-4">
              <i className="fas fa-mortar-pestle text-white text-2xl"></i>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">
                Spices & Coffee
              </h2>
              <p className="text-gray-600">
                Authentic Indonesian spices and premium coffee beans
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="flex flex-col bg-white rounded-lg shadow-md overflow-hidden border border-gray-100">
              <img
                src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=600&q=80"
                alt="Coffee Beans"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900">
                  Coffee Beans (Arabica & Robusta)
                </h3>
                <p className="text-gray-600 mt-2 text-sm">
                  Premium grades from Indonesia's finest coffee regions.
                </p>
              </div>
            </div>
            <div className="flex flex-col bg-white rounded-lg shadow-md overflow-hidden border border-gray-100">
              <img
                src="https://images.unsplash.com/photo-1599599810694-b5ac4dd8e3a0?auto=format&fit=crop&w=600&q=80"
                alt="Spices"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900">
                  Premium Spices
                </h3>
                <p className="text-gray-600 mt-2 text-sm">
                  Cloves, Pepper, Nutmeg, Cinnamon - authentic Indonesian
                  quality.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Other Products Section */}
        <section id="other" className="mb-20 pt-10 border-t border-gray-200">
          <div className="flex items-center mb-8">
            <div className="bg-green-600 p-3 rounded-full mr-4">
              <img src="/logo.png" alt="Logo" className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">
                Other Agricultural Products
              </h2>
              <p className="text-gray-600">
                Additional specialty products available on demand
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {[
              {
                title: "Coconut Products",
                desc: "Dried coconut, copra, and coconut oil.",
                img: "https://images.unsplash.com/photo-1585518419759-473daa8e1f2d?auto=format&fit=crop&w=600&q=80",
              },
              {
                title: "Palm Sugar",
                desc: "Organic coconut palm sugar in block or granulated form.",
                img: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&w=600&q=80",
              },
              {
                title: "Agarwood (Gaharu)",
                desc: "High-resin agarwood chips and powder.",
                img: "https://images.unsplash.com/photo-1550608796-a3c30d32c4f1?auto=format&fit=crop&w=600&q=80",
              },
              {
                title: "Additional Products",
                desc: "Cassava, Dates, and more on request.",
                img: "https://images.unsplash.com/photo-1599599810694-b5ac4dd8e3a0?auto=format&fit=crop&w=600&q=80",
              },
            ].map((product, idx) => (
              <div
                key={idx}
                className="flex flex-col bg-white rounded-lg shadow-md overflow-hidden border border-gray-100"
              >
                <img
                  src={product.img}
                  alt={product.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900">
                    {product.title}
                  </h3>
                  <p className="text-gray-600 mt-2 text-sm">{product.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-gray-600 mt-8">
            Also available: Cassava and Dates.
          </p>
        </section>

        {/* MSME Products */}
        <section id="msme" className="mb-20 pt-10 border-t border-gray-200">
          <div className="flex items-center mb-8">
            <div className="bg-yellow-500 p-3 rounded-full mr-4">
              <i className="fas fa-store text-white text-2xl"></i>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">
                Featured MSME Export Product
              </h2>
              <p className="text-gray-600">
                Supporting local small businesses reach the global stage.
              </p>
            </div>
          </div>
          <div className="bg-yellow-50 rounded-2xl p-8 border-2 border-yellow-400 shadow-lg flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-1/3">
              <img
                src="https://images.unsplash.com/photo-1606913084618-09093e000c25?auto=format&fit=crop&w=500&q=80"
                alt="Kurcoku Product"
                className="rounded-xl shadow-md w-full"
              />
            </div>
            <div className="md:w-2/3">
              <div className="inline-block bg-yellow-600 text-white px-4 py-1 rounded-full text-sm font-bold mb-4">
                EXCLUSIVE
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Kurcoku</h3>
              <p className="text-xl text-gray-700 italic mb-6">
                "A unique blend of dates and chocolates to serve your sweet
                tooth with joy."
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Kurcoku offers a delightful fusion of premium Middle Eastern
                dates coated in rich, high-quality chocolate. Perfect for retail
                distribution and specialty food stores.
              </p>
              <ul className="mb-8 space-y-2 text-gray-700">
                <li>
                  <i className="fas fa-check text-green-600 mr-2"></i> Halal
                  Certified
                </li>
                <li>
                  <i className="fas fa-check text-green-600 mr-2"></i> Premium
                  Export Packaging Available
                </li>
                <li>
                  <i className="fas fa-check text-green-600 mr-2"></i>{" "}
                  Customizable for private label
                </li>
              </ul>
              <Link
                to="/contact"
                className="bg-yellow-600 hover:bg-yellow-700 text-white px-8 py-3 rounded-md font-bold transition shadow-md inline-block"
              >
                Inquire About Kurcoku
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <div className="bg-gray-900 p-12 rounded-2xl text-center text-white">
          <h3 className="text-3xl font-bold mb-4">
            Can't find what you're looking for?
          </h3>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            We have an extensive network of farmers. Tell us your specific
            requirements, and we'll source it for you.
          </p>
          <Link
            to="/contact"
            className="bg-green-600 hover:bg-green-700 text-white px-10 py-4 rounded-full font-bold transition text-lg inline-block"
          >
            Contact Sourcing Team
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
