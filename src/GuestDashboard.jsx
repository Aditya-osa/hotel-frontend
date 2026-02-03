import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { API_BASE_URL } from "./config";

import "./GuestDashboard.css"; // Import the CSS file



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

      {/* ================= SIDEBAR ================= */}

      <aside className="dashboard-sidebar">

        <div className="sidebar-header">

          <h2>Welcome, {username}</h2>

          <p>Premium Hotel Booking Experience</p>

        </div>

        <nav>

          <button

            className="active"

            onClick={() => navigate("/guest-dashboard")}

          >

            Booking

          </button>

          <button onClick={() => navigate("/hotel-info")}>

            Hotel Info

          </button>

          <button onClick={() => navigate("/contact")}>

            Contact

          </button>

          <button onClick={() => navigate("/feedback")}>

            Feedback

          </button>

          <button onClick={() => navigate("/booking-status")}>

            Booking Status

          </button>

        </nav>

        <button className="exit-btn" onClick={() => navigate("/")}>

          Exit

        </button>

      </aside>



      {/* ================= MAIN ================= */}

      <main className="dashboard-main">

        {/* Header */}

        <header className="dashboard-header">

          <div className="header-left">

            <img

              src="https://images.unsplash.com/photo-1560347876-aeef00ee58a1?auto=format&fit=crop&w=50&q=50"

              alt="Hotel Logo"

              className="header-logo"

            />

            <div>

              <h1>Sunshine Hotel</h1>

              <p>Hotel Booking Management</p>

            </div>

          </div>

          <div className="header-right">

            <div className="user-info">

              <span className="user-name">{username}</span>

              <span className="user-role">Guest</span>

            </div>

            <button className="logout-btn" onClick={() => navigate("/")}>

              Logout

            </button>

          </div>

        </header>

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



          <div className="form-group">

            <label>Guest Name</label>

            <input

              type="text"

              name="name"

              placeholder="Enter your full name"

              value={formData.name}

              onChange={handleChange}

              required

            />

          </div>



          <div className="form-group">

            <label>Email Address</label>

            <input

              type="email"

              name="email"

              placeholder="example@email.com"

              value={formData.email}

              onChange={handleChange}

              required

            />

          </div>



          <div className="form-group">

            <label>Phone Number</label>

            <input

              type="tel"

              name="phone"

              placeholder="10-digit mobile number"

              value={formData.phone}

              onChange={handleChange}

              required

            />

          </div>



          <div className="date-inputs">

            <div className="form-group">

              <label>Check-in</label>

              <input

                type="date"

                name="checkInDate"

                value={formData.checkInDate}

                onChange={handleChange}

                required

              />

            </div>



            <div className="form-group">

              <label>Check-out</label>

              <input

                type="date"

                name="checkOutDate"

                value={formData.checkOutDate}

                onChange={handleChange}

                required

              />

            </div>

          </div>



          <div className="form-group">

            <label>Number of Guests</label>

            <input

              type="number"

              name="guests"

              min="1"

              placeholder="e.g. 2"

              value={formData.guests}

              onChange={handleChange}

            />

          </div>



          <label className="checkbox-label">

            <input

              type="checkbox"

              name="breakfast"

              checked={formData.breakfast}

              onChange={handleChange}

            />

            Include Breakfast (+₹300/day)

          </label>



          <div className="form-group">

            <label>Special Requests</label>

            <textarea

              name="specialRequest"

              placeholder="Any special requests (optional)"

              value={formData.specialRequest}

              onChange={handleChange}

              rows="3"

            />

          </div>



          <div className="price-summary">

            <p>Nights: <b>{nights}</b></p>

            <p>Total Amount: <b>₹{totalPrice}</b></p>

          </div>



          <button type="submit">Confirm Booking</button>

        </form>

      </main>

    </div>

  );

}

