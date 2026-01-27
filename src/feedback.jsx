import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "./config";

export default function Feedback() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [rating, setRating] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    feedback: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API_BASE_URL}/api/feedback/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, rating })
      });

      const data = await res.json();
      alert(data.message);

      setFormData({ name: "", mobile: "", feedback: "" });
      setRating(0);
    } catch (error) {
      console.error(error);
      alert("Server error");
    }
  };

  const menuItems = [
    { label: "Booking", path: "/guest-dashboard" },
    { label: "Hotel Info", path: "/hotel-info" },
    { label: "Contact", path: "/contact" },
    { label: "Feedback", path: "/feedback" },
    { label: "Status", path: "/booking-status" }
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-green-50 via-green-100 to-green-200">

      {/* ================= SIDEBAR (DESKTOP) ================= */}
      <aside className="hidden md:flex w-64 bg-green-700 text-white flex-col p-5">
        <h2 className="text-xl font-bold mb-8">Sunshine Hotel</h2>

        <nav className="space-y-3 flex-grow">
          {menuItems.map((item) => (
            <button
              key={item.label}
              onClick={() => navigate(item.path)}
              className="w-full text-left px-4 py-2 rounded-lg hover:bg-green-600 transition"
            >
              {item.label}
            </button>
          ))}
        </nav>

        <button
          onClick={() => navigate("/")}
          className="mt-auto bg-red-500 py-2 rounded-lg hover:bg-red-600 transition"
        >
          Exit
        </button>
      </aside>

      {/* ================= MOBILE SIDEBAR ================= */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setSidebarOpen(false)}
          ></div>

          <div className="absolute left-0 top-0 h-full w-64 bg-green-700 text-white p-5">
            <h2 className="text-xl font-bold mb-6">Sunshine Hotel</h2>

            <nav className="space-y-3">
              {menuItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => {
                    navigate(item.path);
                    setSidebarOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 rounded-lg hover:bg-green-600"
                >
                  {item.label}
                </button>
              ))}
            </nav>

            <button
              onClick={() => navigate("/")}
              className="mt-6 w-full bg-red-500 py-2 rounded-lg"
            >
              Exit
            </button>
          </div>
        </div>
      )}

      {/* ================= MAIN CONTENT ================= */}
      <div className="flex flex-col flex-grow">

        {/* HEADER (NO NAV BUTTONS) */}
        <header className="bg-green-600 text-white sticky top-0 z-40 shadow-md">
          <div className="flex items-center gap-4 px-4 py-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden text-2xl"
            >
              ☰
            </button>

            <div className="flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1560347876-aeef00ee58a1?auto=format&fit=crop&w=50&q=50"
                alt="Hotel Logo"
                className="w-9 h-9 rounded-full"
              />
              <div>
                <h1 className="text-lg font-bold">Sunshine Hotel</h1>
                <p className="text-[11px] text-green-100">
                  Guest Feedback Portal
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* ================= FEEDBACK FORM ================= */}
        <main className="flex-grow flex items-center justify-center px-4 py-10 relative">
          <div className="absolute -top-32 -left-32 w-80 h-80 bg-green-300/30 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-green-400/30 rounded-full blur-3xl"></div>

          <form
            onSubmit={handleSubmit}
            className="relative bg-white shadow-2xl rounded-2xl p-6 sm:p-8 w-full max-w-md border border-green-100"
          >
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-2 text-center text-green-700">
              Guest Feedback
            </h2>

            <p className="text-center text-gray-600 mb-6">
              Help us improve your stay 💚
            </p>

            <div className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-3.5 border border-green-200 rounded-xl focus:ring-2 focus:ring-green-400 outline-none"
              />

              <input
                type="tel"
                name="mobile"
                placeholder="Mobile Number"
                value={formData.mobile}
                onChange={handleChange}
                required
                className="w-full p-3.5 border border-green-200 rounded-xl focus:ring-2 focus:ring-green-400 outline-none"
              />

              {/* Rating */}
              <div className="flex justify-center gap-1 py-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className={`text-3xl transition ${
                      star <= rating ? "text-green-500 scale-110" : "text-gray-300"
                    }`}
                  >
                    ★
                  </button>
                ))}
              </div>

              <textarea
                name="feedback"
                placeholder="Write your feedback..."
                rows="4"
                value={formData.feedback}
                onChange={handleChange}
                required
                className="w-full p-3.5 border border-green-200 rounded-xl focus:ring-2 focus:ring-green-400 outline-none resize-none"
              />
            </div>

            <button className="w-full bg-green-500 text-white py-3.5 rounded-xl text-lg font-semibold hover:bg-green-600 transition shadow-md mt-6">
              Submit Feedback
            </button>
          </form>
        </main>

        {/* ================= FOOTER ================= */}
        <footer className="bg-green-700 text-white py-4 text-center">
          <p className="text-sm">© 2026 Sunshine Hotel</p>
          <p className="text-[10px] uppercase tracking-widest text-green-200 mt-1">
            Guest Satisfaction & Quality Service
          </p>
        </footer>
      </div>
    </div>
  );
}
