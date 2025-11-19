import { useState } from "react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { useSubmitContactForm } from "../hooks/useSubmitContactForm";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    message: "",
    products: [] as string[],
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const submitMutation = useSubmitContactForm();

  const products = [
    "Coffee Beans",
    "Cloves (Cengkeh)",
    "Briquettes",
    "Spices (Other)",
    "Agri-Products",
    "Imports / Other",
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field when user starts typing
    if (formErrors[name]) {
      setFormErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleProductChange = (product: string) => {
    setFormData((prev) => ({
      ...prev,
      products: prev.products.includes(product)
        ? prev.products.filter((p) => p !== product)
        : [...prev.products, product],
    }));
    // Clear products error when user selects a product
    if (formErrors["products"]) {
      setFormErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors["products"];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormErrors({});

    // Validate locally
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) errors["name"] = "Name is required";
    if (!formData.company.trim()) errors["company"] = "Company is required";
    if (!formData.email.trim()) errors["email"] = "Email is required";
    if (!formData.message.trim()) errors["message"] = "Message is required";
    if (formData.products.length === 0)
      errors["products"] = "Please select at least one product";

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    // Submit form
    submitMutation.mutate(formData, {
      onSuccess: () => {
        // Reset form
        setFormData({
          name: "",
          company: "",
          email: "",
          phone: "",
          message: "",
          products: [],
        });
        setFormErrors({});
      },
      onError: (error) => {
        setFormErrors({
          submit: error.message || "Failed to submit inquiry",
        });
      },
    });
  };

  return (
    <div className="bg-gray-50 text-gray-800">
      <Navigation />

      {/* Hero Section */}
      <header
        className="h-[40vh] pt-20 flex items-center justify-center bg-cover bg-center relative"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(https://images.unsplash.com/photo-1534972195531-c529ca45A476?auto=format&fit=crop&w=1920&q=80)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="text-center max-w-3xl px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Let's Connect
          </h1>
          <p className="text-xl text-gray-300">
            Ready to source premium Indonesian commodities? Our team is here to
            assist with quotations, samples, and logistics.
          </p>
        </div>
      </header>

      {/* Main Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-16">
            {/* Inquiry Form */}
            <div className="lg:w-2/3 bg-gray-50 p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Send Us an Inquiry
              </h2>

              {/* Success Message */}
              {submitMutation.isSuccess && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-800 font-medium">
                    ✓ {submitMutation.data?.message}
                  </p>
                  {submitMutation.data?.data?.reference_id && (
                    <p className="text-green-700 text-sm mt-2">
                      Reference ID: {submitMutation.data.data.reference_id}
                    </p>
                  )}
                </div>
              )}

              {/* Error Messages */}
              {formErrors.submit && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-800 font-medium">
                    ✗ {formErrors.submit}
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-md border shadow-sm focus:ring-green-500 focus:border-green-500 ${
                        formErrors.name
                          ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="John Doe"
                      disabled={submitMutation.isPending}
                    />
                    {formErrors.name && (
                      <p className="mt-1 text-sm text-red-600">
                        {formErrors.name}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company Name *
                    </label>
                    <input
                      type="text"
                      name="company"
                      required
                      value={formData.company}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-md border shadow-sm focus:ring-green-500 focus:border-green-500 ${
                        formErrors.company
                          ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="Global Trading Ltd."
                      disabled={submitMutation.isPending}
                    />
                    {formErrors.company && (
                      <p className="mt-1 text-sm text-red-600">
                        {formErrors.company}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-md border shadow-sm focus:ring-green-500 focus:border-green-500 ${
                        formErrors.email
                          ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="john@company.com"
                      disabled={submitMutation.isPending}
                    />
                    {formErrors.email && (
                      <p className="mt-1 text-sm text-red-600">
                        {formErrors.email}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone / WhatsApp (Optional)
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-md border border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                      placeholder="+1 234 567 890"
                      disabled={submitMutation.isPending}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Interested Products *
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {products.map((product) => (
                      <label
                        key={product}
                        className="inline-flex items-center p-3 bg-white border rounded-md cursor-pointer hover:bg-green-50"
                      >
                        <input
                          type="checkbox"
                          checked={formData.products.includes(product)}
                          onChange={() => handleProductChange(product)}
                          className="h-5 w-5 text-green-600 rounded focus:ring-green-500"
                          disabled={submitMutation.isPending}
                        />
                        <span className="ml-2 text-gray-700">{product}</span>
                      </label>
                    ))}
                  </div>
                  {formErrors.products && (
                    <p className="mt-2 text-sm text-red-600">
                      {formErrors.products}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message / Specifications *
                  </label>
                  <textarea
                    name="message"
                    rows={5}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-md border shadow-sm focus:ring-green-500 focus:border-green-500 ${
                      formErrors.message
                        ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                        : "border-gray-300"
                    }`}
                    placeholder="Please specify grade, estimated volume (e.g., 1x20ft container), and destination port..."
                    disabled={submitMutation.isPending}
                  ></textarea>
                  {formErrors.message && (
                    <p className="mt-1 text-sm text-red-600">
                      {formErrors.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={
                    submitMutation.isPending || submitMutation.isSuccess
                  }
                  className={`w-full md:w-auto px-8 py-4 rounded-md font-bold text-lg transition duration-300 shadow-md text-white ${
                    submitMutation.isPending
                      ? "bg-gray-400 cursor-not-allowed"
                      : submitMutation.isSuccess
                      ? "bg-green-600 cursor-default"
                      : "bg-green-700 hover:bg-green-800"
                  }`}
                >
                  {submitMutation.isPending ? (
                    <>
                      <span className="inline-block animate-spin mr-2">⟳</span>
                      Sending...
                    </>
                  ) : submitMutation.isSuccess ? (
                    <>✓ Sent Successfully</>
                  ) : (
                    <>Send Inquiry Now</>
                  )}
                </button>
                <p className="text-sm text-gray-500 mt-4 text-center md:text-left">
                  <i className="fas fa-lock mr-1"></i> Your information is
                  secure and will only be used for this inquiry.
                </p>
              </form>
            </div>

            {/* Direct Contact Info */}
            <div className="lg:w-1/3 space-y-8">
              {/* International Sales */}
              <div className="bg-white p-8 rounded-xl shadow-md border-t-4 border-yellow-600">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  International Sales
                </h3>
                <p className="text-gray-600 mb-6">
                  For urgent inquiries or partnership opportunities, contact our
                  team directly.
                </p>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-center">
                    <i className="fab fa-whatsapp text-green-600 w-8 text-xl"></i>
                    <a
                      href="https://wa.me/6285337569638"
                      className="hover:text-green-700 font-medium"
                    >
                      +62 853-3756-9638
                    </a>
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-envelope text-gray-400 w-8"></i>
                    <a
                      href="mailto:business@arafahagro.com"
                      className="hover:text-green-700"
                    >
                      business@arafahagro.com
                    </a>
                  </li>
                </ul>
              </div>

              {/* Locations */}
              <div className="bg-white p-8 rounded-xl shadow-md border-t-4 border-green-800">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Our Locations
                </h3>
                <div className="mb-6">
                  <h5 className="font-bold text-gray-800 flex items-center mb-2">
                    <i className="fas fa-building text-green-700 mr-2"></i> Main
                    Office
                  </h5>
                  <p className="text-gray-600 text-sm ml-6">
                    Jl. Cahaya Kemang Permai No.77, RT.003/RW.007, Jatimakmur,
                    Kec. Pd. Gede, Kota Bekasi, Jawa Barat 16969
                  </p>
                </div>
                <div>
                  <h5 className="font-bold text-gray-800 flex items-center mb-2">
                    <i className="fas fa-warehouse text-yellow-600 mr-2"></i>
                    Operational Office
                  </h5>
                  <p className="text-gray-600 text-sm ml-6">
                    Jl. Raya Jatiasih No.340, RT.001/RW.011, Jatimekar, Kec.
                    Jatiasih, Kota Bekasi, Jawa Barat 17422
                  </p>
                </div>
              </div>

              {/* Operating Hours */}
              <div className="bg-gray-900 text-gray-300 p-6 rounded-xl text-sm">
                <h4 className="text-white font-bold mb-3 uppercase tracking-wider">
                  Operating Hours
                </h4>
                <p className="flex justify-between mb-2">
                  <span>Monday - Friday:</span>
                  <span className="text-white">09:00 - 17:00 (GMT+7)</span>
                </p>
                <p className="flex justify-between">
                  <span>Saturday - Sunday:</span>
                  <span className="text-yellow-500">Closed</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="h-96 bg-gray-200 relative">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.864775836894!2d106.92381507499069!3d-6.28018289370617!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e698d0f135118a1%3A0x83e8a51f35f266fd!2sJl.%20Cahaya%20Kemang%20Permai%20No.77%2C%20Jatimakmur%2C%20Kec.%20Pd.%20Gede%2C%20Kota%20Bks%2C%20Jawa%20Barat%2016969!5e0!3m2!1sen!2sid!4v1731810134589!5m2!1sen!2sid"
          width="100%"
          height="100%"
          style={{ border: "0", filter: "grayscale(100%) contrast(1.2)" }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
        <div className="absolute inset-0 bg-green-900 opacity-10 pointer-events-none"></div>
      </section>

      <Footer />
    </div>
  );
}
