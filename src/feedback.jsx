import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "./config";

export default function Feedback() {
  const navigate = useNavigate(); // ✅ FIX: define navigate

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

      // reset form
      setFormData({ name: "", mobile: "", feedback: "" });
      setRating(0);
    } catch (error) {
      console.error(error);
      alert("Server error");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-green-50 via-green-100 to-green-200">

      {/* ================= HEADER ================= */}
      <header className="bg-green-600 text-white sticky top-0 z-50 shadow-md">
        <div className="flex justify-between items-center py-4 px-6">

          {/* Left */}
          <div className="flex items-center gap-3">
            <img
              src="https://images.unsplash.com/photo-1560347876-aeef00ee58a1?auto=format&fit=crop&w=50&q=50"
              alt="Hotel Logo"
              className="w-10 h-10 rounded-full"
            />
            <div>
              <h1 className="text-2xl font-bold tracking-wide">
                Sunshine Hotel
              </h1>
              <p className="text-xs text-green-100">
                Premium Hotel Booking Experience
              </p>
            </div>
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
        </div>
      </header>

      {/* ================= MAIN ================= */}
      <main className="flex-grow flex items-center justify-center p-4 sm:p-6 relative overflow-hidden">

        {/* Glow background */}
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-green-300/40 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-green-400/30 rounded-full blur-3xl"></div>

        <form
          onSubmit={handleSubmit}
          className="relative bg-white shadow-2xl rounded-2xl p-6 sm:p-8 w-full max-w-md border border-green-100"
        >
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-2 text-center text-green-700">
            Guest Feedback
          </h2>

          <p className="text-center text-gray-600 mb-6 text-sm sm:text-base">
            Help us improve your stay experience 💚
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
                  className={`text-4xl transition-transform ${
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

          <button className="w-full bg-green-500 text-white py-3.5 rounded-xl text-lg font-semibold hover:bg-green-600 transition shadow-md active:scale-95 mt-6">
            Submit Feedback
          </button>
        </form>
      </main>

      {/* ================= FOOTER ================= */}
      <footer className="bg-green-700 text-white py-6 px-4 text-center">
        <p className="text-sm">© 2026 Sunshine Hotel</p>
        <p className="text-[10px] uppercase tracking-widest font-bold mt-1 text-green-200">
          Guest Satisfaction & Quality Service
        </p>
      </footer>
    </div>
  );
}
