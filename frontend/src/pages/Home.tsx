import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { Link } from "@tanstack/react-router";
import { useDocumentMeta } from "../hooks/useDocumentMeta";

export default function Home() {
  useDocumentMeta({
    title: "PT Arafah Agro Wakan - Premium Indonesian Commodities",
    description:
      "Your trusted partner for high-quality Briquettes, Spices, Coffee, and Agricultural products from Indonesia.",
    keywords:
      "Indonesian commodities, briquettes, spices, coffee, export, import",
    image:
      "https://images.unsplash.com/photo-1511920183864-4143ba26b6f0?auto=format&fit=crop&w=1200&q=80",
    canonical: "https://arafahagro.com/",
  });

  return (
    <div className="bg-gray-50 text-gray-800">
      <Navigation />

      {/* Hero Section */}
      <section
        className="h-screen pt-20 flex items-center bg-cover bg-center relative"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url(https://images.unsplash.com/photo-1511920183864-4143ba26b6f0?auto=format&fit=crop&w=1920&q=80)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center md:text-left md:w-2/3">
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
            Premium Indonesian Commodities for the
            <span className="text-yellow-400"> Global Market</span>
          </h1>
          <p className="text-xl text-gray-200 mb-8 leading-relaxed">
            Your trusted partner for high-quality Briquettes, Spices, Coffee,
            and Agricultural products, sourced directly from the rich
            archipelago of Indonesia.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center md:justify-start">
            <Link
              to="/export-products"
              className="bg-green-700 hover:bg-green-800 text-white px-8 py-4 rounded-md font-bold text-lg transition duration-300 text-center"
            >
              Explore Exports
            </Link>
            <Link
              to="/contact"
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-green-900 px-8 py-4 rounded-md font-bold text-lg transition duration-300 text-center"
            >
              Contact Our Team
            </Link>
          </div>
        </div>
      </section>

      {/* Product Clusters */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h4 className="text-green-700 font-bold tracking-widest uppercase mb-2">
              Our Commodities
            </h4>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Explore Our Core Products
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We specialize in export and import categories, sourced from
              Indonesia's best producers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Energy (Briquettes)",
                desc: "High-quality Coconut Charcoal Briquettes for Shisha (Premium) and BBQ (Hexagonal).",
                img: "https://images.unsplash.com/photo-1621034424647-1f9b4e53c43f?auto=format&fit=crop&w=600&q=80",
                link: "/export-products",
              },
              {
                title: "Spices & Coffee",
                desc: "Authentic Indonesian spices (Cloves, Pepper, Nutmeg) and premium Coffee Beans (Arabica, Robusta).",
                img: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=600&q=80",
                link: "/export-products",
              },
              {
                title: "Import Products",
                desc: "We source high-quality food products from around the globe to meet local market demands.",
                img: "https://images.unsplash.com/photo-1611091219153-e3223f009c2b?auto=format&fit=crop&w=600&q=80",
                link: "/import-products",
              },
            ].map((cluster, idx) => (
              <Link
                key={idx}
                to={cluster.link}
                className="block group rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-500 transform hover:-translate-y-2"
              >
                <div className="h-64 overflow-hidden relative">
                  <img
                    src={cluster.img}
                    alt={cluster.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent"></div>
                  <h3 className="absolute bottom-6 left-6 text-3xl font-bold text-white z-10">
                    {cluster.title}
                  </h3>
                </div>
                <div className="p-6 bg-white">
                  <p className="text-gray-600 mb-4">{cluster.desc}</p>
                  <span className="font-semibold text-green-700 group-hover:text-green-900 transition">
                    View &rarr;
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h4 className="text-green-700 font-bold tracking-widest uppercase mb-2">
              How We Work
            </h4>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our End-to-End Process
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We manage every step, from the farm to your port, ensuring quality
              and transparency.
            </p>
          </div>

          <div className="relative">
            <div
              className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 border-t-2 border-dashed border-gray-300"
              style={{ transform: "translateY(-50%)" }}
            ></div>
            <div className="relative grid md:grid-cols-3 gap-16">
              {[
                {
                  step: 1,
                  icon: "fas fa-seedling",
                  title: "Sourcing & QC",
                  desc: "We partner directly with farmer co-ops and perform rigorous inbound inspections.",
                },
                {
                  step: 2,
                  icon: "fas fa-boxes",
                  title: "Processing & Packing",
                  desc: "Our facility handles sorting, grading, and packing into export-ready 50kg bags.",
                },
                {
                  step: 3,
                  icon: "fas fa-shipping-fast",
                  title: "Global Logistics",
                  desc: "We manage all documentation and provide seamless container loading and shipping.",
                },
              ].map((process) => (
                <div
                  key={process.step}
                  className="relative bg-white p-8 rounded-xl shadow-lg border border-gray-200 z-10"
                >
                  <div className="w-16 h-16 bg-green-700 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-6 absolute -top-8 -left-4 shadow-lg">
                    {process.step}
                  </div>
                  <i
                    className={`${process.icon} text-4xl text-green-700 mb-4`}
                  ></i>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {process.title}
                  </h3>
                  <p className="text-gray-600">{process.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-16">
            <Link
              to="/facility"
              className="bg-gray-800 hover:bg-gray-900 text-white px-8 py-3 rounded-md font-semibold transition duration-300 inline-block"
            >
              See Our Full Facility
            </Link>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h4 className="text-green-700 font-bold tracking-widest uppercase mb-2">
              Gallery
            </h4>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Activities
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Transparency in action. See our team, facility, and products.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                img: "https://images.unsplash.com/photo-1588444968576-f76e39065d62?auto=format&fit=crop&w=600&q=80",
                title: "Warehouse & Sorting",
                span: "col-span-2 row-span-2 h-80",
              },
              {
                img: "https://images.unsplash.com/photo-1543269865-cbf427c388db?auto=format&fit=crop&w=600&q=80",
                title: "Our Team",
                span: "h-40",
              },
              {
                img: "https://images.unsplash.com/photo-1566576721346-d4a3b4ea9c4C?auto=format&fit=crop&w=600&q=80",
                title: "Packaging",
                span: "h-40",
              },
              {
                img: "https://images.unsplash.com/photo-1578575437136-7242e3f43f70?auto=format&fit=crop&w=600&q=80",
                title: "Shipment",
                span: "h-40",
              },
              {
                img: "https://images.unsplash.com/photo-1492496913980-20e3700b5674?auto=format&fit=crop&w=600&q=80",
                title: "Farmer Partners",
                span: "h-40",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className={`group ${item.span} rounded-xl overflow-hidden shadow-lg relative`}
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent"></div>
                <h3 className="absolute bottom-4 left-4 text-xl font-bold text-white z-10">
                  {item.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured MSME */}
      <section className="py-20 bg-yellow-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2">
              <img
                src="https://images.unsplash.com/photo-1606913084618-09093e000c25?auto=format&fit=crop&w=600&q=80"
                alt="Kurcoku Product"
                className="rounded-xl shadow-2xl w-full transform transition duration-500 hover:scale-105"
              />
            </div>
            <div className="md:w-1/2">
              <h4 className="text-yellow-700 font-bold tracking-widest uppercase mb-2">
                Featured MSME Export Product
              </h4>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Kurcoku
              </h2>
              <p className="text-xl text-gray-700 italic mb-6">
                "A unique blend of dates and chocolates to serve your sweet
                tooth with joy."
              </p>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                As part of our commitment to supporting local entrepreneurs, we
                proudly feature Kurcoku for export. This product combines
                premium dates with high-quality chocolate, perfect for retail
                distribution.
              </p>
              <ul className="mb-8 space-y-2 text-gray-700">
                <li>
                  <i className="fas fa-check text-green-600 mr-2"></i> Halal
                  Certified & Premium Packaging
                </li>
                <li>
                  <i className="fas fa-check text-green-600 mr-2"></i> Available
                  for Private Label
                </li>
              </ul>
              <Link
                to="/export-products"
                className="bg-yellow-600 hover:bg-yellow-700 text-white px-8 py-3 rounded-md font-bold transition shadow-md inline-block"
              >
                Learn More & Inquire
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-16 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h4 className="text-gray-500 font-bold tracking-widest uppercase mb-8">
            Our Strategic Partners
          </h4>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition duration-500">
            {[1, 2, 3, 4, 5].map((i) => (
              <img
                key={i}
                src={`https://placehold.co/150x80/e2e8f0/64748b?text=Partner+Logo+${i}`}
                alt={`Partner ${i}`}
                className="h-12 md:h-16 object-contain"
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 bg-yellow-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Source from Indonesia?
          </h2>
          <p className="text-xl text-white opacity-90 mb-8 max-w-2xl mx-auto">
            Let our team know your requirements, and we will provide a
            competitive, no-obligation quotation within 24 hours.
          </p>
          <Link
            to="/contact"
            className="bg-white text-yellow-700 hover:bg-gray-100 px-10 py-4 rounded-full font-bold text-lg transition duration-300 inline-block shadow-md"
          >
            Get a Free Quote Now
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
