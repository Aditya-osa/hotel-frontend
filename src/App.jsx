import { Routes, Route, useNavigate } from "react-router-dom";
import Guest from "./Guest"; // Guest login/signup
import Admin from "./admin";
import AdminDashboard from "./adminDashboard";
import HotelInfo from "./HotelInfo"; // Previously HospitalInfo
import GuestDashboard from "./GuestDashboard"; // Dashboard after login
import BookingStatus from "./BookingStatus"; // Appointment status
import OrderFood from "./foodOrder"; // Renamed for hotel context
import Payment from "./Payment"; // Insurance module as hotel payment
import Feedback from "./feedback";
import "./App.css";
import Contact from "./Contact";
import hotelBg from './assets/hotelBg.jpg';
function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md shadow-sm sticky top-0 z-50 px-4 py-3 flex justify-center items-center border-b border-blue-100">
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 p-2 rounded-lg text-white font-bold text-xl">
            Welcome to Sunshine  Hotel
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative grow flex items-center justify-center p-4">
        {/* Background Image */}
        <img
          src={hotelBg}
          alt="Hotel Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-white/20"></div>

        {/* Card */}
        <div className="relative bg-white/95 backdrop-blur-sm shadow-2xl rounded-3xl p-6 sm:p-8 w-full max-w-[90%] sm:max-w-md text-center border border-white/50">
          <h1 className="text-2xl sm:text-3xl font-extrabold mb-2 text-blue-700 leading-tight">
            Sunshine Hotel
          </h1>

          <p className="text-gray-600 mb-6 sm:mb-8 text-base sm:text-lg">
            Luxury Stay & Exceptional Services
          </p>

          <div className="flex flex-col gap-3 sm:gap-4">
            <button
              onClick={() => navigate("/admin")}
              className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-lg font-semibold transition duration-300 shadow-md active:scale-95"
            >
              Admin Login
            </button>

            <button
              onClick={() => navigate("/guest")}
              className="w-full py-3.5 bg-green-600 hover:bg-green-700 text-white rounded-xl text-lg font-semibold transition duration-300 shadow-md active:scale-95"
            >
              Guest Login / Signup
            </button>

            <button
              onClick={() => navigate("/hotel-info")}
              className="w-full py-3.5 bg-gray-800 hover:bg-gray-900 text-white rounded-xl text-lg font-semibold transition duration-300 shadow-md active:scale-95"
            >
              Hotel Info
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-6 px-4 text-center">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-center items-center gap-4">
          <p className="text-sm">
            © 2025 <span className="text-blue-400 font-semibold">Grand Royale Hotel</span>. All rights reserved.
          </p>
        </div>
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
      <Route path="/order-food" element={<OrderFood guestId={JSON.parse(localStorage.getItem("guest"))?.guestId} />} />
      <Route path="/payment" element={<Payment />} />
      <Route path="/feedback" element={<Feedback />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  );
}

export default App;
