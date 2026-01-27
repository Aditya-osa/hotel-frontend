import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function HotelInfo() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const menuItems = [
    { label: "Booking", path: "/guest-dashboard" },
    { label: "Hotel Info", path: "/hotel-info" },
    { label: "Contact", path: "/contact" },
    { label: "Feedback", path: "/feedback" },
    { label: "Status", path: "/booking-status" },
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-emerald-50 via-green-100 to-teal-50">

      {/* ================= SIDEBAR ================= */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-gradient-to-b from-emerald-900 to-emerald-800 text-white
        transform ${open ? "translate-x-0" : "-translate-x-full"}
        transition-transform duration-300 lg:translate-x-0 lg:static`}
      >
        <div className="flex items-center gap-3 px-6 py-5 border-b border-emerald-700">
          <img
            src="https://images.unsplash.com/photo-1560347876-aeef00ee58a1?auto=format&fit=crop&w=50&q=50"
            className="w-10 h-10 rounded-full"
            alt="logo"
          />
          <h2 className="text-lg font-bold">Sunshine Hotel</h2>
        </div>

        <nav className="px-4 py-6 space-y-2">
          {menuItems.map((item, i) => (
            <button
              key={i}
              onClick={() => {
                navigate(item.path);
                setOpen(false);
              }}
              className="w-full text-left px-4 py-3 rounded-xl hover:bg-emerald-700 transition"
            >
              {item.label}
            </button>
          ))}

          <button
            onClick={() => navigate("/")}
            className="w-full mt-4 bg-red-500 hover:bg-red-600 px-4 py-3 rounded-xl"
          >
            Exit
          </button>
        </nav>
      </aside>

      {/* Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
        />
      )}

      {/* ================= MAIN ================= */}
      <div className="flex-1 lg:ml-64">

        {/* Mobile Header */}
        <header className="lg:hidden sticky top-0 z-20 bg-emerald-700 text-white shadow">
          <div className="flex items-center justify-between px-4 py-3">
            <button onClick={() => setOpen(true)}>
              <Menu size={26} />
            </button>
            <h1 className="font-bold">Sunshine Hotel</h1>
          </div>
        </header>

        {/* ================= YOUR ORIGINAL CONTENT ================= */}
        <div className="min-h-screen">

          {/* ================= HEADER ================= */}
          <header className="hidden lg:block bg-emerald-700 text-white sticky top-0 z-10 shadow-lg">
            <div className="max-w-6xl mx-auto flex justify-between items-center py-3 px-6">
              <div className="flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1560347876-aeef00ee58a1?auto=format&fit=crop&w=50&q=50"
                  className="w-12 h-12 rounded-full"
                  alt="Hotel Logo"
                />
                <h1 className="text-2xl font-bold">Sunshine Hotel</h1>
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
                Modern interiors, luxury rooms, and dedicated staff make every
                guest feel at home.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-5">
              {[
                { title: "500+", label: "Happy Guests" },
                { title: "50+", label: "Luxury Rooms" },
                { title: "24×7", label: "Support" },
                { title: "4.8★", label: "Rating" },
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg text-center border border-emerald-100"
                >
                  <h3 className="text-3xl sm:text-4xl font-extrabold text-emerald-600">
                    {item.title}
                  </h3>
                  <p className="text-slate-500 mt-2 text-xs sm:text-sm">
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
                  "Secure Parking",
                ].map((amenity, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-emerald-50 to-green-100 border border-emerald-200 p-6 rounded-2xl text-center font-semibold text-emerald-800 shadow-md"
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
              className="bg-white text-emerald-800 px-8 sm:px-10 py-3 sm:py-4 rounded-xl font-bold"
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
      </div>
    </div>
  );
}
