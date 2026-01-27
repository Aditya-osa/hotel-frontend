import { Routes, Route, useNavigate } from "react-router-dom";
import Guest from "./Guest";
import Admin from "./admin";
import AdminDashboard from "./adminDashboard";
import HotelInfo from "./HotelInfo";
import GuestDashboard from "./GuestDashboard";
import BookingStatus from "./BookingStatus";
import Feedback from "./feedback";
import Contact from "./Contact";
import "./App.css";
import hotelBg from "./assets/hotelBg.jpg";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* ================= HEADER ================= */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-center">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-blue-700">
            Sunshine Hotel
          </h1>
        </div>
      </header>

      {/* ================= MAIN ================= */}
      <main className="relative flex-1 flex items-center justify-center px-4 py-10">
        {/* Background Image */}
        <img
          src={hotelBg}
          alt="Hotel Background"
          className="absolute inset-0 w-full h-full object-cover brightness-90"
        />
        <div className="absolute inset-0 bg-black/30"></div>

        {/* CARD */}
        <div className="relative w-full max-w-lg md:max-w-xl bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-6 sm:p-10 text-center border border-white/40 flex flex-col gap-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-blue-700">
            Welcome to Sunshine
          </h2>
          <p className="text-gray-700 text-sm sm:text-base">
            Luxury Stay • Comfort • Premium Service
          </p>

          {/* BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate("/admin")}
              className="flex-1 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-base sm:text-lg transition shadow-md active:scale-95"
            >
              Admin Login
            </button>

            <button
              onClick={() => navigate("/guest")}
              className="flex-1 py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold text-base sm:text-lg transition shadow-md active:scale-95"
            >
              Guest Login / Signup
            </button>
          </div>
        </div>
      </main>

      {/* ================= FOOTER ================= */}
      <footer className="bg-gray-900 text-gray-300 py-5 text-center">
        <p className="text-sm sm:text-base">
          © 2026{" "}
          <span className="text-blue-400 font-semibold">
            Sunshine Hotel
          </span>{" "}
          • All rights reserved
        </p>
      </footer>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/guest" element={<Guest />} />
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
      <Route path="/hotel-info" element={<HotelInfo />} />
      <Route path="/guest-dashboard" element={<GuestDashboard />} />
      <Route path="/booking-status" element={<BookingStatus />} />
      <Route path="/feedback" element={<Feedback />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  );
}

export default App;
