import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "./config";
import "./GuestDashboard.css"; // Import the CSS file

export default function GuestDashboard() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [nights, setNights] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const roomTypes = [
    {
      id: "single",
      name: "Single Room",
      price: 2000,
      image:
        "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
      desc: "Perfect for solo travelers. Cozy & comfortable."
    },
    {
      id: "deluxe",
      name: "Deluxe Room",
      price: 3500,
      image:
        "https://images.unsplash.com/photo-1566073771259-6a8506099945",
      desc: "Spacious room with premium interiors."
    },
    {
      id: "suite",
      name: "Suite",
      price: 5500,
      image:
        "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb",
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

  // Price calculation
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
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-left">
          <h1>Welcome, {username}</h1>
          <p className="desktop-only">Premium Hotel Booking Experience</p>
        </div>
        
        <div className="header-right">
          <button
            onClick={() => navigate("/guest-dashboard")}
            className="nav-button"
          >
            <span className="desktop-only">Booking</span>
            <span className="mobile-only">🏠</span>
          </button>
          
          <button
            onClick={() => navigate("/hotel-info")}
            className="nav-button"
          >
            <span className="desktop-only">Hotel Info</span>
            <span className="mobile-only">ℹ️</span>
          </button>

          <button
            onClick={() => navigate("/contact")}
            className="nav-button"
          >
            <span className="desktop-only">Contact</span>
            <span className="mobile-only">📞</span>
          </button>

          <button
            onClick={() => navigate("/booking-status")}
            className="nav-button"
          >
            <span className="desktop-only">My Bookings</span>
            <span className="mobile-only">📅</span>
          </button>
          
          <button
            onClick={() => navigate("/")}
            className="nav-button bg-red-500 text-white hover:bg-red-600"
          >
            <span className="desktop-only">Exit</span>
            <span className="mobile-only">🚪</span>
          </button>
        </div>
      </header>

      {/* Main */}
      <main className="dashboard-main">
        {/* Room Selection */}
        <section className="room-selection">
          <h2>Choose Your Room</h2>
          <div className="room-cards">
            {roomTypes.map((room) => (
              <label
                key={room.id}
                className={`room-card ${
                  formData.roomType === room.id ? "selected" : ""
                }`}
                htmlFor={`room-${room.id}`}
              >
                <input
                  type="radio"
                  id={`room-${room.id}`}
                  name="roomType"
                  value={room.id}
                  checked={formData.roomType === room.id}
                  onChange={handleChange}
                  className="sr-only"
                />
                <img 
                  src={room.image} 
                  alt={room.name} 
                  loading="lazy"
                  className="room-image"
                />
                <div className="room-info">
                  <h3>{room.name}</h3>
                  <p>{room.desc}</p>
                  <p className="room-price">₹{room.price.toLocaleString()} / night</p>
                </div>
              </label>
            ))}
          </div>
        </section>

        {/* Booking Form */}
        <form onSubmit={handleSubmit} className="booking-form">
          <h2>Booking Details</h2>
          
          <div className="form-group">
            <label htmlFor="name" className="sr-only">Guest Name</label>
            <input 
              id="name"
              type="text" 
              name="name" 
              placeholder="Guest Name" 
              value={formData.name} 
              onChange={handleChange} 
              required 
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="email" className="sr-only">Email</label>
            <input 
              id="email"
              type="email" 
              name="email" 
              placeholder="Email Address" 
              value={formData.email} 
              onChange={handleChange} 
              required 
              inputMode="email"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="phone" className="sr-only">Phone Number</label>
            <input 
              id="phone"
              type="tel" 
              name="phone" 
              placeholder="Phone Number" 
              value={formData.phone} 
              onChange={handleChange} 
              required 
              inputMode="tel"
            />
          </div>

          <div className="date-inputs">
            <div className="form-group">
              <label htmlFor="checkInDate">Check-in</label>
              <input 
                id="checkInDate"
                type="date" 
                name="checkInDate" 
                value={formData.checkInDate} 
                onChange={handleChange} 
                required 
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="checkOutDate">Check-out</label>
              <input 
                id="checkOutDate"
                type="date" 
                name="checkOutDate" 
                value={formData.checkOutDate} 
                onChange={handleChange} 
                required 
                min={formData.checkInDate || new Date().toISOString().split('T')[0]}
                disabled={!formData.checkInDate}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="guests">Number of Guests</label>
            <input 
              id="guests"
              type="number" 
              name="guests" 
              min="1" 
              max="10"
              value={formData.guests} 
              onChange={handleChange} 
            />
          </div>
          
          <div className="form-group checkbox-container">
            <label className="checkbox-label">
              <input 
                type="checkbox" 
                name="breakfast" 
                checked={formData.breakfast} 
                onChange={handleChange} 
                className="checkbox-input"
              />
              <span className="checkbox-custom"></span>
              <span className="checkbox-text">Breakfast (+₹300/day)</span>
            </label>
          </div>
          
          <div className="form-group">
            <label htmlFor="specialRequest" className="sr-only">Special Requests</label>
            <textarea 
              id="specialRequest" 
              name="specialRequest" 
              placeholder="Any special requests?" 
              rows="3"
              value={formData.specialRequest} 
              onChange={handleChange} 
            />
          </div>

          <div className="price-summary">
            <div className="price-row">
              <span>Nights:</span>
              <span><b>{nights}</b></span>
            </div>
            <div className="price-row total">
              <span>Total:</span>
              <span>₹{totalPrice.toLocaleString()}</span>
            </div>
          </div>

          <button type="submit" className="book-now-btn">
            {totalPrice > 0 ? `Book Now - ₹${totalPrice.toLocaleString()}` : 'Select Dates to Book'}
          </button>
        </form>
      </main>

      {/* Footer */}
      <footer className="dashboard-footer">
        © 2026 Sunshine Hotel · Premium Guest Experience
      </footer>
    </div>
  );
}
