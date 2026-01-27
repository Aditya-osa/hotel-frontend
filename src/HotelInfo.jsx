import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function HotelInfo() {
  const navigate = useNavigate();
  const location = useLocation();
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
        className={`fixed inset-y-0 left-0 z-50 w-64
          bg-gradient-to-b from-emerald-900 to-emerald-800 text-white
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0`}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-6 py-5 border-b border-emerald-700">
          <img
            src="https://images.unsplash.com/photo-1560347876-aeef00ee58a1?auto=format&fit=crop&w=50&q=50"
            alt="logo"
            className="w-10 h-10 rounded-full"
          />
          <h2 className="text-lg font-bold tracking-wide">
            Sunshine Hotel
          </h2>

          {/* Close button (mobile) */}
          <button
            onClick={() => setOpen(false)}
            className="ml-auto lg:hidden"
          >
            <X size={22} />
          </button>
        </div>

        {/* Menu */}
        <nav className="px-4 py-6 space-y-2">
          {menuItems.map((item, i) => (
            <button
              key={i}
              onClick={() => {
                navigate(item.path);
                setOpen(false);
              }}
              className={`w-full text-left px-4 py-3 rounded-xl transition
                ${
                  location.pathname === item.path
                    ? "bg-emerald-600 shadow"
                    : "hover:bg-emerald-700"
                }`}
            >
              {item.label}
            </button>
          ))}

          <button
            onClick={() => navigate("/")}
            className="w-full mt-6 bg-red-500 hover:bg-red-600 px-4 py-3 rounded-xl font-semibold"
          >
            Exit
          </button>
        </nav>
      </aside>

      {/* ================= OVERLAY (MOBILE) ================= */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* ================= MAIN ================= */}
      <div className={`flex-1 flex flex-col ${open ? "overflow-hidden" : ""} lg:ml-64`}>

        {/* ================= HEADER ================= */}
        <header className="sticky top-0 z-20 bg-emerald-700 text-white shadow">
          <div className="flex items-center justify-between px-4 py-3">
            <button
              className="lg:hidden"
              onClick={() => setOpen(true)}
            >
              <Menu size={26} />
            </button>
            <h1 className="font-bold text-lg">
              Hotel Information
            </h1>
          </div>
        </header>

        {/* ================= CONTENT ================= */}
        <main className="flex-1">

          {/* HERO */}
          <section className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white py-16 text-center">
            <h1 className="text-3xl sm:text-5xl font-extrabold mb-4">
              Sunshine Hotel
            </h1>
            <p className="text-emerald-100 max-w-2xl mx-auto">
              Experience comfort, elegance, and world-class hospitality.
            </p>
          </section>

          {/* ABOUT */}
          <section className="max-w-6xl mx-auto px-4 py-14 grid md:grid-cols-2 gap-10">
            <div>
              <h2 className="text-2xl font-bold text-emerald-700 mb-4">
                About Our Hotel
              </h2>
              <p className="text-slate-600 mb-4 leading-relaxed">
                Sunshine Hotel is designed for travelers who seek comfort,
                convenience, and premium service.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Modern interiors and dedicated staff make every guest feel at home.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-5">
              {[
                { title: "500+", label: "Happy Guests" },
                { title: "50+", label: "Luxury Rooms" },
                { title: "24×7", label: "Support" },
                { title: "4.8★", label: "Rating" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-white p-6 rounded-2xl shadow text-center"
                >
                  <h3 className="text-3xl font-bold text-emerald-600">
                    {item.title}
                  </h3>
                  <p className="text-slate-500 text-sm mt-1">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* AMENITIES */}
          <section className="bg-white py-14 border-t">
            <div className="max-w-6xl mx-auto px-4">
              <h2 className="text-2xl font-bold text-emerald-700 text-center mb-10">
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
                ].map((a, i) => (
                  <div
                    key={i}
                    className="bg-emerald-50 border border-emerald-200 p-6 rounded-2xl text-center font-semibold text-emerald-800 shadow-sm"
                  >
                    {a}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* FOOTER */}
          <footer className="bg-emerald-950 text-emerald-200 py-6 text-center">
            <p className="text-sm">© 2026 Sunshine Hotel</p>
            <p className="text-xs text-emerald-400 mt-1">
              Premium Hospitality Experience
            </p>
          </footer>

        </main>
      </div>
    </div>
  );
}
