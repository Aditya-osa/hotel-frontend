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
    <div className="flex min-h-screen bg-gradient-to-br from-emerald-50 via-green-100 to-emerald-200">

      {/* ================= SIDEBAR DESKTOP ================= */}
      <aside className="hidden md:flex w-64 bg-emerald-800 text-white flex-col shadow-xl">
        <div className="px-6 py-6 border-b border-emerald-700">
          <h1 className="text-xl font-extrabold tracking-wide">
            Sunshine Hotel
          </h1>
          <p className="text-xs text-emerald-200 mt-1">
            Guest Panel
          </p>
        </div>

        <nav className="flex-grow px-4 py-6 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.label}
              onClick={() => navigate(item.path)}
              className={`w-full text-left px-4 py-3 rounded-xl transition font-medium
                ${
                  item.label === "Feedback"
                    ? "bg-white text-emerald-800 shadow"
                    : "hover:bg-emerald-700"
                }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4">
          <button
            onClick={() => navigate("/")}
            className="w-full bg-red-500 py-2.5 rounded-xl hover:bg-red-600 transition font-semibold"
          >
            Exit
          </button>
        </div>
      </aside>

      {/* ================= MOBILE SIDEBAR ================= */}
      <div
        className={`fixed inset-0 z-50 md:hidden transition ${
          sidebarOpen ? "visible" : "invisible"
        }`}
      >
        <div
          className={`absolute inset-0 bg-black/40 transition-opacity ${
            sidebarOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setSidebarOpen(false)}
        />

        <aside
          className={`absolute left-0 top-0 h-full w-64 bg-emerald-800 text-white p-5
          transform transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
          <h2 className="text-xl font-bold mb-6">Sunshine Hotel</h2>

          <nav className="space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.label}
                onClick={() => {
                  navigate(item.path);
                  setSidebarOpen(false);
                }}
                className={`w-full text-left px-4 py-3 rounded-xl
                  ${
                    item.label === "Feedback"
                      ? "bg-white text-emerald-800"
                      : "hover:bg-emerald-700"
                  }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <button
            onClick={() => navigate("/")}
            className="mt-6 w-full bg-red-500 py-2.5 rounded-xl"
          >
            Exit
          </button>
        </aside>
      </div>

      {/* ================= MAIN ================= */}
      <div className="flex flex-col flex-grow">

        {/* HEADER */}
        <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b">
          <div className="flex items-center gap-4 px-4 py-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden text-2xl text-emerald-700"
            >
              ☰
            </button>

            <div>
              <h1 className="text-lg font-bold text-emerald-800">
                Guest Feedback
              </h1>
              <p className="text-xs text-gray-500">
                Tell us about your experience
              </p>
            </div>
          </div>
        </header>

        {/* FORM */}
        <main className="flex-grow flex items-center justify-center px-4 py-12">
          <form
            onSubmit={handleSubmit}
            className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-7 sm:p-8 border"
          >
            <h2 className="text-2xl font-extrabold text-center text-emerald-700">
              We Value Your Feedback 💚
            </h2>

            <p className="text-center text-gray-500 text-sm mt-1 mb-6">
              Your opinion helps us serve you better
            </p>

            <div className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-3.5 rounded-xl border focus:ring-2 focus:ring-emerald-400 outline-none"
              />

              <input
                type="tel"
                name="mobile"
                placeholder="Mobile Number"
                value={formData.mobile}
                onChange={handleChange}
                required
                className="w-full p-3.5 rounded-xl border focus:ring-2 focus:ring-emerald-400 outline-none"
              />

              {/* Stars */}
              <div className="flex justify-center gap-1 pt-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className={`text-4xl transition-transform ${
                      star <= rating
                        ? "text-emerald-500 scale-110"
                        : "text-gray-300"
                    }`}
                  >
                    ★
                  </button>
                ))}
              </div>

              <textarea
                name="feedback"
                rows="4"
                placeholder="Write your feedback..."
                value={formData.feedback}
                onChange={handleChange}
                required
                className="w-full p-3.5 rounded-xl border focus:ring-2 focus:ring-emerald-400 outline-none resize-none"
              />
            </div>

            <button
              type="submit"
              className="mt-6 w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3.5 rounded-xl text-lg font-semibold transition active:scale-95"
            >
              Submit Feedback
            </button>
          </form>
        </main>

        {/* FOOTER */}
        <footer className="text-center py-4 text-sm text-gray-600">
          © 2026 Sunshine Hotel • Guest Experience Team
        </footer>
      </div>
    </div>
  );
}
