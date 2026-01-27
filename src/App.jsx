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
    <div className="flex flex-col min-h-screen">
      {/* HEADER */}
      <header className="bg-white shadow px-4 py-3 text-center font-bold">
        Welcome to Sunshine Hotel
      </header>

      {/* MAIN */}
      <main className="relative grow flex items-center justify-center">
        <img
          src={hotelBg}
          alt="Hotel"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="relative bg-white p-6 rounded-xl text-center">
          <h1 className="text-2xl font-bold mb-4">Sunshine Hotel</h1>

          <button onClick={() => navigate("/admin")}>Admin Login</button>
          <button onClick={() => navigate("/guest")}>Guest Login</button>
          <button onClick={() => navigate("/hotel-info")}>Hotel Info</button>
        </div>
      </main>
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
