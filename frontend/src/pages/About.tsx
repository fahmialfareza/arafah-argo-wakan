import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { useDocumentMeta } from "../hooks/useDocumentMeta";

export default function About() {
  useDocumentMeta({
    title: "About Us - PT Arafah Agro Wakan",
    description:
      "Learn about our mission, values, and commitment to quality in Indonesian commodity trading.",
    keywords: "about us, company, mission, values, Indonesian commodities",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
    canonical: "https://arafahagro.com/about",
  });
  return (
    <div className="bg-gray-50 text-gray-800">
      <Navigation />

      {/* Hero Section */}
      <header
        className="h-[50vh] pt-20 flex items-center justify-center bg-cover bg-center relative"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(https://images.unsplash.com/photo-1543269865-0a740d43b91c?auto=format&fit=crop&w=1920&q=80)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="text-center max-w-3xl px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Strength in Collaboration
          </h1>
          <p className="text-xl text-gray-300">
            We are more than just traders. We are a strategic alliance dedicated
            to bringing Indonesia's best to the world stage.
          </p>
        </div>
      </header>

      {/* Our Story Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <h4 className="text-green-700 font-bold tracking-widest uppercase mb-2">
                Our Story
              </h4>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Born from Expertise,
                <br />
                United for Excellence.
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                <strong>PT Arafah Agro Wakan</strong> was established in 2025 as
                a strategic merger of three powerhouse entities in the
                Indonesian commodity sector.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Recognizing the fragmented nature of the local supply chain, we
                united our respective strengths—in logistics, farmer networking,
                and international marketing—to create a "one-stop" export
                solution. This collaboration ensures that our buyers receive not
                just products, but a seamless, reliable service from origin to
                destination.
              </p>
            </div>
            <div className="md:w-1/2 grid grid-cols-2 gap-4">
              <div className="bg-green-50 p-6 rounded-xl text-center">
                <i className="fas fa-handshake text-4xl text-green-700 mb-4"></i>
                <h3 className="font-bold text-xl mb-2">Trusted Partner</h3>
                <p className="text-gray-600 text-sm">
                  Building long-term relationships with global buyers.
                </p>
              </div>
              <div className="bg-yellow-50 p-6 rounded-xl text-center mt-8">
                <i className="fas fa-users text-4xl text-yellow-600 mb-4"></i>
                <h3 className="font-bold text-xl mb-2">Farmer Empowered</h3>
                <p className="text-gray-600 text-sm">
                  Direct positive impact on local communities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm border-t-4 border-green-700">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Our Vision
              </h3>
              <p className="text-gray-600">
                To become Indonesia's most reliable and integrated commodity
                export hub, recognized globally for quality and integrity.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm border-t-4 border-yellow-600">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Quality Mission
              </h3>
              <p className="text-gray-600">
                To consistently deliver commodities that meet or exceed
                international grading standards through rigorous QC.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm border-t-4 border-green-700">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Social Mission
              </h3>
              <p className="text-gray-600">
                To empower local farmers by providing fair trade access and
                sustainable agricultural education.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Meet the Team */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h4 className="text-green-700 font-bold tracking-widest uppercase mb-2">
              Leadership
            </h4>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Meet Our Core Team
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mt-4">
              The dedicated professionals driving our operations, logistics, and
              international relations.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            {[1, 2, 3, 4, 5].map((num) => (
              <div
                key={num}
                className="w-full sm:w-[calc(50%-2rem)] lg:w-[calc(33.33%-2rem)] group bg-gray-50 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition text-center"
              >
                <div className="h-80 overflow-hidden">
                  <img
                    src={`https://placehold.co/400x500/e2e8f0/1f2937?text=Photo+${num}`}
                    alt={`Team Member ${num}`}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition duration-500 filter grayscale group-hover:grayscale-0"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900">
                    [Name {num}]
                  </h3>
                  <p className="text-green-700 font-medium mb-3">
                    [Role/Position]
                  </p>
                  <a href="#" className="text-gray-400 hover:text-blue-700">
                    <i className="fab fa-linkedin text-lg"></i>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance */}
      <section className="py-12 bg-green-900 text-white text-center">
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="text-2xl font-bold mb-6">
            Fully Licensed & Compliant
          </h3>
          <div className="flex flex-wrap justify-center gap-8 opacity-80">
            <div className="flex items-center border border-green-600 px-6 py-3 rounded-full">
              <i className="fas fa-file-contract mr-3"></i> NIB Registered
            </div>
            <div className="flex items-center border border-green-600 px-6 py-3 rounded-full">
              <i className="fas fa-globe mr-3"></i> Export License (PEB)
            </div>
            <div className="flex items-center border border-green-600 px-6 py-3 rounded-full">
              <i className="fas fa-seedling mr-3"></i> Kementan Certified
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
