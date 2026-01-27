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
          <p>Premium Hotel Booking Experience</p>
        </div>
       
          {/* Right */}
          <div className="flex items-center gap-4">

              <button
              onClick={() => navigate("/guest-dashboard")}
              className="bg-white text-green-700 px-4 py-2 rounded-lg text-sm font-bold hover:bg-green-100 transition shadow"
            >
             Booking
            </button>
            
            <button
              onClick={() => navigate("/hotel-info")}
              className="bg-white text-green-700 px-4 py-2 rounded-lg text-sm font-bold hover:bg-green-100 transition shadow"
            >
              Hotel Info
            </button>

            <button
              onClick={() => navigate("/contact")}
              className="bg-white text-green-700 px-4 py-2 rounded-lg text-sm font-bold hover:bg-green-100 transition shadow"
            >
              Contact
            </button>

            <button
              onClick={() => navigate("/feedback")}
              className="bg-white text-green-700 px-4 py-2 rounded-lg text-sm font-bold hover:bg-green-100 transition shadow"
            >
              Feedback
            </button>

            <button
              onClick={() => navigate("/booking-status")}
              className="bg-white text-green-700 px-4 py-2 rounded-lg text-sm font-bold hover:bg-green-100 transition shadow"
            >
              Booking Status
            </button>
          <button
  onClick={() => navigate("/")}
  className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600 transition shadow"
>
  Exit
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

        {/* Booking Form */}
        <form onSubmit={handleSubmit} className="booking-form">
          <h2>Booking Details</h2>
          <input type="text" name="name" placeholder="Guest Name" value={formData.name} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required />
          <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required />

          <div className="date-inputs">
            <input type="date" name="checkInDate" value={formData.checkInDate} onChange={handleChange} required />
            <input type="date" name="checkOutDate" value={formData.checkOutDate} onChange={handleChange} required />
          </div>

          <input type="number" name="guests" min="1" placeholder="Number of Guests" value={formData.guests} onChange={handleChange} />
          <label className="checkbox-label">
            <input type="checkbox" name="breakfast" checked={formData.breakfast} onChange={handleChange} />
            Breakfast (+₹300/day)
          </label>
          <textarea name="specialRequest" placeholder="Any special requests?" value={formData.specialRequest} onChange={handleChange} />

          <div className="price-summary">
            <p>Nights: <b>{nights}</b></p>
            <p>Total: ₹{totalPrice}</p>
          </div>

          <button type="submit">Confirm Booking</button>
        </form>
      </main>

      {/* Footer */}
      <footer className="dashboard-footer">
        © 2026 Sunshine Hotel · Premium Guest Experience
      </footer>
    </div>
  );
}
