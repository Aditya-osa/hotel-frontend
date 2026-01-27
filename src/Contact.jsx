import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Contact() {
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
    <div className="flex min-h-screen bg-gradient-to-br from-slate-100 to-emerald-50">

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
          <h2 className="text-lg font-bold">Sunshine Hotel</h2>

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

      {/* ================= OVERLAY ================= */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* ================= MAIN ================= */}
      <div className={`flex-1 ${open ? "overflow-hidden" : ""} lg:ml-64`}>

        {/* ================= HEADER ================= */}
        <header className="fixed top-0 left-0 right-0 z-30 bg-green-600 text-white shadow lg:left-64 lg:w-[calc(100%-16rem)]">
          <div className="flex items-center gap-4 px-4 py-4">
            
            {/* Hamburger (mobile) */}
            <button className="lg:hidden" onClick={() => setOpen(true)}>
              <Menu size={26} />
            </button>

            {/* Logo */}
            <div className="flex items-center gap-2">
              <img
                src="https://images.unsplash.com/photo-1560347876-aeef00ee58a1?auto=format&fit=crop&w=50&q=50"
                alt="Hotel Logo"
                className="w-8 h-8 rounded-full"
              />
              <h1 className="text-lg sm:text-xl font-bold">
                Sunshine Hotel
              </h1>
            </div>
          </div>
        </header>

        {/* ================= PAGE CONTENT ================= */}
        <main className="pt-28 px-4 sm:px-6 pb-12">

          {/* Hero */}
          <section className="text-center mb-12">
            <h1 className="text-2xl sm:text-4xl font-extrabold text-emerald-700 mb-3">
              Contact Sunshine Hotel
            </h1>
            <p className="text-slate-600 max-w-xl mx-auto text-sm sm:text-base">
              We're here to assist you 24/7. Reach out via phone, email, or visit us.
            </p>
          </section>

          {/* Contact Cards */}
          <section className="max-w-6xl mx-auto grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {[
              ["Address", "Sunshine Hotel\n123 Sunshine Avenue\nMumbai, India"],
              ["Phone", "+91 98765 43210\n+91 91234 56789"],
              ["Email", "reservations@sunshinehotel.com\nsupport@sunshinehotel.com"],
            ].map(([title, content]) => (
              <div
                key={title}
                className="bg-white p-6 rounded-2xl shadow-md text-center"
              >
                <h2 className="text-lg font-bold text-emerald-600 mb-2">
                  {title}
                </h2>
                <p className="text-slate-600 whitespace-pre-line text-sm sm:text-base">
                  {content}
                </p>
              </div>
            ))}
          </section>

          {/* Map */}
          <section className="mt-16 max-w-6xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-emerald-700 text-center mb-2">
              Find Us Here
            </h2>
            <p className="text-center text-slate-600 mb-6 text-sm sm:text-base">
              Located in the heart of Mumbai for easy access
            </p>

            <div className="w-full h-64 sm:h-80 rounded-3xl overflow-hidden shadow-xl">
              <iframe
                title="hotel-map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3023.8235600311516!2d72.8777!3d19.0760"
                className="w-full h-full border-0"
                loading="lazy"
              />
            </div>
          </section>
        </main>

        {/* ================= FOOTER ================= */}
        <footer className="bg-emerald-950 text-emerald-200 py-6 text-center">
          <p className="text-sm">© 2026 Sunshine Hotel</p>
          <p className="text-[11px] uppercase tracking-widest text-emerald-400 mt-1">
            Premium Hospitality Experience
          </p>
        </footer>
      </div>
    </div>
  );
}
