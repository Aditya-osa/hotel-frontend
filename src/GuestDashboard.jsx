import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "./config";
import "./GuestDashboard.css";

export default function GuestDashboard() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
    } catch {
      alert("Server error");
    }
  };

  const menu = [
    { label: "Booking", path: "/guest-dashboard" },
    { label: "Hotel Info", path: "/hotel-info" },
    { label: "Contact", path: "/contact" },
    { label: "Feedback", path: "/feedback" },
    { label: "Status", path: "/booking-status" }
  ];

  return (
    <div className="gd-layout">

      {/* SIDEBAR DESKTOP */}
      <aside className="gd-sidebar">
        <h2>Sunshine Hotel</h2>
        {menu.map((m) => (
          <button key={m.label} onClick={() => navigate(m.path)}>
            {m.label}
          </button>
        ))}
        <button className="exit" onClick={() => navigate("/")}>
          Exit
        </button>
      </aside>

      {/* MOBILE SIDEBAR */}
      {sidebarOpen && <div className="gd-overlay" onClick={() => setSidebarOpen(false)} />}
      <aside className={`gd-sidebar mobile ${sidebarOpen ? "open" : ""}`}>
        <h2>Sunshine Hotel</h2>
        {menu.map((m) => (
          <button
            key={m.label}
            onClick={() => {
              navigate(m.path);
              setSidebarOpen(false);
            }}
          >
            {m.label}
          </button>
        ))}
        <button className="exit" onClick={() => navigate("/")}>
          Exit
        </button>
      </aside>

      {/* MAIN */}
      <div className="gd-main">

        {/* HEADER */}
        <header className="gd-header">
          <button className="menu-btn" onClick={() => setSidebarOpen(true)}>☰</button>
          <div>
            <h1>Welcome, {username}</h1>
            <p>Premium Hotel Booking Experience</p>
          </div>
        </header>

        {/* CONTENT (UNCHANGED STRUCTURE) */}
        <main className="dashboard-main">
          {/* ROOM SELECTION */}
          <section className="room-selection">
            <h2>Choose Your Room</h2>
            <div className="room-cards">
              {roomTypes.map((room) => (
                <label
                  key={room.id}
                  className={`room-card ${formData.roomType === room.id ? "selected" : ""}`}
                >
                  <input
                    type="radio"
                    name="roomType"
                    value={room.id}
                    checked={formData.roomType === room.id}
                    onChange={handleChange}
                    hidden
                  />
                  <img src={room.image} alt={room.name} />
                  <div className="room-info">
                    <h3>{room.name}</h3>
                    <p>{room.desc}</p>
                    <p className="room-price">₹{room.price} / night</p>
                  </div>
                </label>
              ))}
            </div>
          </section>

          {/* FORM (UNCHANGED) */}
          {/* 👉 keep your existing booking form here EXACTLY SAME */}
          <form onSubmit={handleSubmit} className="booking-form">
            {/* your existing form content */}
            {/* (no logic touched) */}
          </form>
        </main>

        <footer className="dashboard-footer">
          © 2026 Sunshine Hotel · Premium Guest Experience
        </footer>
      </div>
    </div>
  );
}
