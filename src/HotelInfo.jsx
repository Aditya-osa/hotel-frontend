import { useNavigate } from "react-router-dom";

export default function HotelInfo() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-100 to-teal-50">

      {/* ================= HEADER ================= */}
      <header className="bg-emerald-700 text-white sticky top-0 z-50 shadow-lg">
        <div className="max-w-6xl mx-auto flex flex-wrap gap-3 justify-between items-center py-3 px-4 sm:px-6">
          
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img
              src="https://images.unsplash.com/photo-1560347876-aeef00ee58a1?auto=format&fit=crop&w=50&q=50"
              alt="Hotel Logo"
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full"
            />
            <h1 className="text-lg sm:text-2xl font-bold tracking-wide">
              Sunshine Hotel
            </h1>
          </div>

          {/* Navigation */}
          <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
            {[
              { label: "Booking", path: "/guest-dashboard" },
              { label: "Hotel Info", path: "/hotel-info" },
              { label: "Contact", path: "/contact" },
              { label: "Feedback", path: "/feedback" },
              { label: "Status", path: "/booking-status" }
            ].map((item, i) => (
              <button
                key={i}
                onClick={() => navigate(item.path)}
                className="bg-white text-emerald-700 px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold hover:bg-emerald-100 transition shadow"
              >
                {item.label}
              </button>
            ))}

            <button
              onClick={() => navigate("/")}
              className="bg-red-500 text-white px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold hover:bg-red-600 transition shadow"
            >
              Exit
            </button>
          </div>
        </div>
      </header>

      {/* ================= HERO ================= */}
      <section className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white shadow-xl">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20 text-center">
          <h1 className="text-3xl sm:text-5xl font-extrabold mb-4">
            Sunshine Hotel
          </h1>
          <p className="text-emerald-100 max-w-2xl mx-auto text-base sm:text-lg">
            Experience comfort, elegance, and world-class hospitality in the
            heart of the city.
          </p>
        </div>
      </section>

      {/* ================= ABOUT ================= */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-14 grid md:grid-cols-2 gap-10">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-emerald-700 mb-4">
            About Our Hotel
          </h2>
          <p className="text-slate-600 mb-4 leading-relaxed text-base sm:text-lg">
            Sunshine Hotel is designed for travelers who seek comfort,
            convenience, and premium service. Whether you are visiting for
            business or leisure, we ensure a memorable stay.
          </p>
          <p className="text-slate-600 leading-relaxed text-base sm:text-lg">
            Modern interiors, luxury rooms, and dedicated staff make every guest
            feel at home.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-5">
          {[
            { title: "500+", label: "Happy Guests" },
            { title: "50+", label: "Luxury Rooms" },
            { title: "24×7", label: "Support" },
            { title: "4.8★", label: "Rating" }
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg text-center border border-emerald-100 hover:shadow-xl transition"
            >
              <h3 className="text-3xl sm:text-4xl font-extrabold text-emerald-600">
                {item.title}
              </h3>
              <p className="text-slate-500 mt-2 text-xs sm:text-sm uppercase tracking-wide">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= AMENITIES ================= */}
      <section className="bg-white py-14 border-t border-emerald-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-emerald-700 text-center mb-10">
            Our Amenities
          </h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              "24×7 Room Service",
              "Free High-Speed Wi-Fi",
              "Luxury Rooms & Suites",
              "In-House Restaurant",
              "Airport Pickup & Drop",
              "Secure Parking"
            ].map((amenity, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-emerald-50 to-green-100 border border-emerald-200 p-6 rounded-2xl text-center font-semibold text-emerald-800 shadow-md hover:shadow-lg transition"
              >
                {amenity}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-16 sm:py-20 text-center bg-gradient-to-r from-emerald-600 to-emerald-700 text-white">
        <h2 className="text-2xl sm:text-3xl font-bold mb-3">
          Ready to Book Your Stay?
        </h2>
        <p className="text-emerald-100 mb-8 text-base sm:text-lg">
          Premium comfort & exceptional service await you.
        </p>
        <button
          onClick={() => window.history.back()}
          className="bg-white text-emerald-800 px-8 sm:px-10 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg hover:bg-emerald-50 transition shadow-lg"
        >
          Back to Booking
        </button>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-emerald-950 text-emerald-200 py-6 text-center">
        <p className="text-sm">© 2026 Sunshine Hotel</p>
        <p className="text-[11px] uppercase tracking-widest text-emerald-400 mt-1">
          Premium Hospitality Experience
        </p>
      </footer>

    </div>
  );
}
