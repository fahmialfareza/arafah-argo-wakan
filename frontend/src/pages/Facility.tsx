import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

export default function Facility() {
  return (
    <div className="bg-gray-50 text-gray-800">
      <Navigation />

      {/* Hero Section */}
      <header
        className="h-[50vh] pt-20 flex items-center justify-center bg-cover bg-center relative"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(https://images.unsplash.com/photo-1565610222209-5c6f09315266?auto=format&fit=crop&w=1920&q=80)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="text-center max-w-3xl px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Where Quality Meets Capacity
          </h1>
          <p className="text-xl text-gray-300">
            Our modern processing and warehousing facility is designed to ensure
            every shipment meets rigorous international standards.
          </p>
        </div>
      </header>

      {/* Main Facility Overview */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="lg:w-1/2">
              <div className="grid grid-cols-2 gap-4">
                <img
                  src="https://images.unsplash.com/photo-1616428745322-a81d4a041f92?auto=format&fit=crop&w=400&q=80"
                  alt="Warehouse Interior"
                  className="rounded-lg shadow-lg w-full h-64 object-cover"
                />
                <img
                  src="https://images.unsplash.com/photo-1623910243400-03ada6ebc6dc?auto=format&fit=crop&w=400&q=80"
                  alt="Sorting Process"
                  className="rounded-lg shadow-lg w-full h-64 object-cover mt-8"
                />
              </div>
            </div>
            <div className="lg:w-1/2">
              <h4 className="text-green-700 font-bold tracking-widest uppercase mb-2">
                Our Hub
              </h4>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Strategically Located for Efficiency
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Berlokasi di{" "}
                <strong>Jl. Raya Jatiasih No.340, Kota Bekasi</strong>,
                fasilitas operasional kami berfungsi sebagai hub utama untuk
                menerima, memproses, dan mengkonsolidasikan komoditas dari
                petani mitra kami di seluruh nusantara.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                We maintain a clean, dry, and pest-controlled environment
                essential for preserving the quality of sensitive products like
                spices and coffee beans before they are shipped worldwide.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="border-l-4 border-yellow-500 pl-4">
                  <h3 className="text-4xl font-bold text-gray-900">1000+ m²</h3>
                  <p className="text-gray-600">Storage Capacity</p>
                </div>
                <div className="border-l-4 border-green-700 pl-4">
                  <h3 className="text-4xl font-bold text-gray-900">500 MT</h3>
                  <p className="text-gray-600">Monthly Output</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quality Control Process */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our Quality Control Process
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              We don't just trade; we ensure quality. Every batch undergoes a
              rigorous 4-step inspection process before it leaves our facility.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: 1,
                title: "Inbound Inspection",
                desc: "Raw materials from farmers are checked for moisture content and physical defects upon arrival.",
              },
              {
                step: 2,
                title: "Sorting & Grading",
                desc: "Products are meticulously sorted by size, color, and quality grade to meet specific orders.",
              },
              {
                step: 3,
                title: "Final Lab Test",
                desc: "Random samples are tested for chemical standards and purity.",
              },
              {
                step: 4,
                title: "Pre-Shipment Check",
                desc: "Final visual inspection during container stuffing to ensure secure loading.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="bg-gray-800 p-8 rounded-xl text-center group hover:bg-gray-700 transition duration-300"
              >
                <div
                  className={`w-16 h-16 ${
                    item.step === 4 ? "bg-yellow-600" : "bg-green-600"
                  } rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold`}
                >
                  {item.step}
                </div>
                <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                <p className="text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">
              Operations Gallery
            </h2>
            <p className="text-lg text-gray-600">
              Transparency is key. See our team in action.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              "https://images.unsplash.com/photo-1559329007-40ec44d1dc1a?auto=format&fit=crop&w=600&q=80",
              "https://images.unsplash.com/photo-1517057011417-0d7d3ab2c65a?auto=format&fit=crop&w=600&q=80",
              "https://images.unsplash.com/photo-1563483697-3d961099b6f4?auto=format&fit=crop&w=600&q=80",
              "https://images.unsplash.com/photo-1587132137056-bf604c08b30e?auto=format&fit=crop&w=600&q=80",
            ].map((img, idx) => (
              <div
                key={idx}
                className="h-64 overflow-hidden rounded-lg shadow-md hover:opacity-90 transition"
              >
                <img
                  src={img}
                  alt={`Gallery ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Bar */}
      <section className="bg-green-700 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between">
          <div className="text-white mb-6 md:mb-0 text-center md:text-left">
            <h3 className="text-2xl font-bold mb-2">
              Want to visit our facility?
            </h3>
            <p className="opacity-90">
              We welcome prospective buyers for a facility tour. Schedule your
              visit today.
            </p>
          </div>
          <a
            href="/contact"
            className="bg-white text-green-800 hover:bg-gray-100 px-8 py-3 rounded-full font-bold transition shadow-md"
          >
            Schedule a Visit
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
