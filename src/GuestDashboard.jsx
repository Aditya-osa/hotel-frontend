import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { API_BASE_URL } from "./config";
import "./GuestDashboard.css";

export default function GuestDashboard() {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false); // sidebar
  const [username, setUsername] = useState("");
  const [nights, setNights] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const roomTypes = [
    {
      id: "single",
      name: "Single Room",
      price: 2000,
      image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
      desc: "Perfect for solo travelers. Cozy & comfortable."
    },
    {
      id: "deluxe",
      name: "Deluxe Room",
      price: 3500,
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945",
      desc: "Spacious room with premium interiors."
    },
    {
      id: "suite",
      name: "Suite",
      price: 5500,
      image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb",
      desc: "Luxury suite with living area & best views."
    }
  ];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    roomType: "single",
    guests: 1,
    breakfast: false,
    checkInDate: "",
    checkOutDate: "",
    specialRequest: ""
  });

  useEffect(() => {
    const guest = JSON.parse(localStorage.getItem("guest"));
    if (guest) {
      setUsername(guest.name || "Guest");
      setFormData((prev) => ({
        ...prev,
        name: guest.name || "",
        email: guest.email || ""
      }));
    }
  }, []);

  useEffect(() => {
    if (formData.checkInDate && formData.checkOutDate) {
      const inDate = new Date(formData.checkInDate);
      const outDate = new Date(formData.checkOutDate);
      const diff = (outDate - inDate) / (1000 * 60 * 60 * 24);

      if (diff > 0) {
        setNights(diff);
        const roomPrice =
          roomTypes.find((r) => r.id === formData.roomType)?.price || 0;

        let price = diff * roomPrice;
        if (formData.breakfast) price += diff * 300;
        setTotalPrice(price);
      } else {
        setNights(0);
        setTotalPrice(0);
      }
    }
  }, [formData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const guest = JSON.parse(localStorage.getItem("guest"));
    if (!guest || !guest.token) {
      alert("Please login to book a room");
      navigate("/login");
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/api/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${guest.token}`
        },
        body: JSON.stringify({ ...formData, totalPrice })
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.message || "Booking failed");
        return;
      }

      alert(`Booking Confirmed 🎉\nTotal Amount: ₹${totalPrice}`);
    } catch (error) {
      console.error(error);
      alert("Server error");
    }
  };

  return (
    <div className="guest-dashboard">
      {/* SIDEBAR */}
      <aside className={`sidebar ${open ? "open" : ""}`}>
        <div className="sidebar-header">
          <h2>Sunshine Hotel</h2>
          <X onClick={() => setOpen(false)} />
        </div>

        <nav>
          <button onClick={() => navigate("/guest-dashboard")}>Booking</button>
          <button onClick={() => navigate("/hotel-info")}>Hotel Info</button>
          <button onClick={() => navigate("/contact")}>Contact</button>
          <button onClick={() => navigate("/feedback")}>Feedback</button>
          <button onClick={() => navigate("/booking-status")}>Status</button>
          <button className="exit" onClick={() => navigate("/")}>Exit</button>
        </nav>
      </aside>

      {open && <div className="overlay" onClick={() => setOpen(false)} />}

      {/* HEADER */}
      <header className="dashboard-header">
        <button className="menu-btn" onClick={() => setOpen(true)}>
          <Menu size={26} />
        </button>

        <div className="header-left">
          <h1>Welcome, {username}</h1>
          <p>Premium Hotel Booking Experience</p>
        </div>

        {/* Desktop buttons (unchanged logic) */}
        <div className="header-right">
          <button onClick={() => navigate("/guest-dashboard")}>Booking</button>
          <button onClick={() => navigate("/hotel-info")}>Hotel Info</button>
          <button onClick={() => navigate("/contact")}>Contact</button>
          <button onClick={() => navigate("/feedback")}>Feedback</button>
          <button onClick={() => navigate("/booking-status")}>Status</button>
          <button className="exit" onClick={() => navigate("/")}>Exit</button>
        </div>
      </header>

      {/* MAIN */}
      <main className="dashboard-main">
        {/* Room cards + booking form — UNCHANGED */}
        {/* ⬇️ EXACT SAME JSX YOU ALREADY WROTE ⬇️ */}
        {/* (No logic touched here) */}
      </main>

      <footer className="dashboard-footer">
        © 2026 Sunshine Hotel · Premium Guest Experience
      </footer>
    </div>
  );
}
