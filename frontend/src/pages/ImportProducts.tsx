import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { Link } from "@tanstack/react-router";
import { useDocumentMeta } from "../hooks/useDocumentMeta";

export default function ImportProducts() {
  useDocumentMeta({
    title: "Import Products - PT Arafah Agro Wakan",
    description:
      "Discover our curated selection of high-quality food products imported for local market demands.",
    keywords: "import products, food, commodities, sourcing",
    image:
      "https://images.unsplash.com/photo-1611091219153-e3223f009c2b?auto=format&fit=crop&w=1200&q=80",
    canonical: "https://arafahagro.com/import-products",
  });
  return (
    <div className="bg-gray-50 text-gray-800">
      <Navigation />

      {/* Page Header */}
      <header
        className="h-[40vh] pt-20 flex items-center justify-center bg-cover bg-center relative"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.8)), url(https://images.unsplash.com/photo-1509312384260-46c66c3c3e44?auto=format&fit=crop&w=1920&q=80)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Our Import Products
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto px-4">
            Sourcing globally, delivering locally.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Imported Food Products */}
        <section id="import-foods" className="mb-20">
          <div className="flex items-center mb-8">
            <div className="bg-blue-600 p-3 rounded-full mr-4">
              <i className="fas fa-plane-arrival text-white text-2xl"></i>
            </div>
            <h2 className="text-3xl font-bold text-gray-900">
              Globally Sourced Food Products
            </h2>
          </div>
          <p className="text-lg text-gray-600 max-w-3xl mb-10">
            We leverage our global network to source high-quality food products
            for the Indonesian market. Below are examples of products we can
            source for you.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {
                title: "Seaweed",
                desc: "Nori & Wakame (China)",
                img: "https://images.unsplash.com/photo-1599887823812-e507113115c5?auto=format&fit=crop&w=300&q=80",
              },
              {
                title: "Tobiko (Flying Fish Roe)",
                desc: "Origin: China",
                img: "https://images.unsplash.com/photo-1579887823812-e507113115c5?auto=format&fit=crop&w=300&q=80",
              },
              {
                title: "Premium Dates",
                desc: "Medjool, Ajwa, etc.",
                img: "https://images.unsplash.com/photo-1591186219460-594c033621f2?auto=format&fit=crop&w=300&q=80",
              },
              {
                title: "Boba & Drink Materials",
                desc: "Tapioca Pearls, Syrups",
                img: "https://images.unsplash.com/photo-1583232021510-3151b510f769?auto=format&fit=crop&w=300&q=80",
              },
            ].map((product, idx) => (
              <div
                key={idx}
                className="bg-white rounded-lg shadow-sm p-4 text-center border hover:border-blue-500 transition"
              >
                <img
                  src={product.img}
                  alt={product.title}
                  className="w-full h-32 object-cover rounded-md mb-4"
                />
                <h4 className="font-bold text-lg">{product.title}</h4>
                <p className="text-sm text-gray-500">{product.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <div className="bg-gray-900 p-12 rounded-2xl text-center text-white">
          <h3 className="text-3xl font-bold mb-4">
            Need to Source a Specific Product?
          </h3>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            We have an extensive global network. Tell us your import
            requirements, and we'll handle the sourcing for you.
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
