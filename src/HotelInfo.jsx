import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* ================= SIDEBAR ================= */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64
        bg-emerald-800 text-white
        transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-emerald-700">
          <h2 className="text-lg font-bold">Sunshine Hotel</h2>

          {/* Close button (mobile) */}
          <button
            className="lg:hidden"
            onClick={() => setOpen(false)}
          >
            <X size={22} />
          </button>
        </div>

        {/* Sidebar Menu */}
        <nav className="px-4 py-6 space-y-3">
          {[
            { name: "Dashboard", path: "/admin-dashboard" },
            { name: "Bookings", path: "/bookings" },
            { name: "Rooms", path: "/rooms" },
            { name: "Guests", path: "/guests" },
          ].map((item, i) => (
            <button
              key={i}
              onClick={() => {
                navigate(item.path);
                setOpen(false);
              }}
              className={`w-full text-left px-4 py-3 rounded-lg transition
                ${
                  location.pathname === item.path
                    ? "bg-emerald-600"
                    : "hover:bg-emerald-700"
                }`}
            >
              {item.name}
            </button>
          ))}

          <button
            onClick={() => navigate("/")}
            className="w-full mt-6 bg-red-500 hover:bg-red-600 px-4 py-3 rounded-lg font-semibold"
          >
            Logout
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
      <div className={`flex-1 flex flex-col lg:ml-64 ${open ? "overflow-hidden" : ""}`}>

        {/* ================= HEADER ================= */}
        <header className="sticky top-0 z-20 bg-white shadow">
          <div className="flex items-center justify-between px-4 py-3">
            <button
              className="lg:hidden"
              onClick={() => setOpen(true)}
            >
              <Menu size={26} />
            </button>

            <h1 className="font-bold text-lg">
              Admin Dashboard
            </h1>

            <button
              onClick={() => navigate("/")}
              className="bg-red-500 text-white px-4 py-1.5 rounded-lg text-sm"
            >
              Logout
            </button>
          </div>
        </header>

        {/* ================= DASHBOARD CONTENT (UNCHANGED) ================= */}
        <main className="p-4 space-y-6">

          {/* Cards */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white p-6 rounded-xl shadow text-center">
              <p className="text-gray-500">TOTAL BOOKINGS</p>
              <h2 className="text-3xl font-bold text-emerald-600">4</h2>
            </div>

            <div className="bg-white p-6 rounded-xl shadow text-center">
              <p className="text-gray-500">CONFIRMED</p>
              <h2 className="text-3xl font-bold text-emerald-600">4</h2>
            </div>

            <div className="bg-white p-6 rounded-xl shadow text-center">
              <p className="text-gray-500">VACANT ROOMS</p>
              <h2 className="text-3xl font-bold text-emerald-600">56</h2>
            </div>
          </div>

          {/* Chart Section */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-lg font-semibold mb-4">
              Booking Status Overview
            </h3>

            {/* Your existing chart stays EXACTLY same */}
            <div className="flex justify-center">
              {/* chart component here */}
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}
