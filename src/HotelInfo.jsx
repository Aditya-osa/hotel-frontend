import { useNavigate, useLocation } from "react-router-dom";

export default function HotelInfo() {
  const navigate = useNavigate();
  const location = useLocation();

  const menu = [
    { label: "Dashboard", path: "/guest-dashboard" },
    { label: "Bookings", path: "/bookings" },
    { label: "Hotel Info", path: "/hotel-info" },
    { label: "Feedback", path: "/feedback" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* ================= SIDEBAR ================= */}
      <aside className="w-64 bg-gradient-to-b from-slate-900 to-slate-800 text-white hidden md:flex flex-col">
        
        {/* Logo */}
        <div className="px-6 py-6 text-2xl font-bold tracking-wide border-b border-slate-700">
          Sunshine Hotel
        </div>

        {/* Menu */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {menu.map((item, i) => (
            <button
              key={i}
              onClick={() => navigate(item.path)}
              className={`w-full text-left px-4 py-3 rounded-lg transition font-medium
                ${
                  location.pathname === item.path
                    ? "bg-emerald-600 text-white"
                    : "text-slate-300 hover:bg-slate-700"
                }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-slate-700">
          <button
            onClick={() => navigate("/")}
            className="w-full bg-red-500 hover:bg-red-600 py-2 rounded-lg font-semibold"
          >
            Exit
          </button>
        </div>
      </aside>

      {/* ================= MAIN CONTENT ================= */}
      <main className="flex-1 overflow-y-auto">

        {/* Header */}
        <header className="bg-white shadow sticky top-0 z-20">
          <div className="px-6 py-4 flex justify-between items-center">
            <h1 className="text-xl font-bold text-slate-700">
              Hotel Information
            </h1>
          </div>
        </header>

        {/* HERO */}
        <section className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white">
          <div className="px-6 py-16 text-center">
            <h2 className="text-4xl font-extrabold mb-3">
              Sunshine Hotel
            </h2>
            <p className="text-emerald-100 max-w-xl mx-auto">
              Comfort, elegance & premium hospitality
            </p>
          </div>
        </section>

        {/* ABOUT */}
        <section className="px-6 py-12 grid md:grid-cols-2 gap-10">
          <div>
            <h3 className="text-2xl font-bold text-emerald-700 mb-4">
              About Our Hotel
            </h3>
            <p className="text-slate-600 mb-4">
              Sunshine Hotel offers luxury rooms, modern interiors and world-class service.
            </p>
            <p className="text-slate-600">
              Perfect for business and leisure travelers alike.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-5">
            {[
              { title: "500+", label: "Guests" },
              { title: "50+", label: "Rooms" },
              { title: "24×7", label: "Support" },
              { title: "4.8★", label: "Rating" },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-xl shadow text-center"
              >
                <h4 className="text-3xl font-bold text-emerald-600">
                  {item.title}
                </h4>
                <p className="text-slate-500 text-sm mt-1">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* FOOTER */}
        <footer className="bg-slate-900 text-slate-300 py-6 text-center">
          <p className="text-sm">© 2026 Sunshine Hotel</p>
        </footer>

      </main>
    </div>
  );
}
