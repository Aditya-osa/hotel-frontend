import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "./config";

export default function Guest() {
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const endpoint = isSignup ? "api/guests/signup" : "api/guests/login";
    const url = `${API_BASE_URL}/${endpoint}`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      if (!response.ok) {
        alert(data.message || "Login / Signup failed");
        return;
      }

      alert(data.message);

      if (isSignup) {
        setIsSignup(false);
        setFormData({ name: "", email: "", password: "" });
        return;
      }

      const guestData = {
        guestId: data.guest?._id || data.user?._id || data.guestId,
        name: data.guest?.name || data.user?.name || data.name,
        email: data.guest?.email || data.user?.email || data.email,
        token: data.token
      };

      localStorage.setItem("guest", JSON.stringify(guestData));
      navigate("/guest-dashboard");
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-emerald-50 via-green-100 to-teal-100">
      
      {/* Header */}
      <header className="bg-gradient-to-r from-emerald-900 to-emerald-700 text-white py-5 shadow-lg flex justify-between items-center px-6">
  <div>
    <h1 className="text-3xl font-extrabold tracking-wide">
      Sunshine Hotel
    </h1>
    <p className="text-sm text-emerald-200">
      Guest Access Portal
    </p>
    
  </div>

  {/* Login Button */}
  <button
    onClick={() => setIsSignup(false)}
    className="bg-emerald-500 hover:bg-emerald-500 text-white px-6 py-2 rounded-lg font-semibold transition shadow-md"
  >
    Login
  </button>
</header>


      {/* Main */}
      <main className="flex-grow flex items-center justify-center px-4">
        <form
          onSubmit={handleSubmit}
          className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-8 border border-emerald-100"
        >
          <h2 className="text-3xl font-extrabold text-center text-emerald-700 mb-2">
            {isSignup ? "Create Account" : "Welcome Back"}
          </h2>

          <p className="text-center text-gray-500 mb-6 text-sm">
            {isSignup
              ? "Register to enjoy a premium stay"
              : "Login to manage your bookings"}
          </p>

          <div className="space-y-4">
            {isSignup && (
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            )}

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>

          <button className="w-full mt-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-bold text-lg hover:opacity-90 transition shadow-md">
            {isSignup ? "Signup" : "Login"}
          </button>

          <p
            onClick={() => setIsSignup(!isSignup)}
            className="text-center text-sm text-emerald-600 font-medium mt-6 cursor-pointer hover:underline"
          >
            {isSignup
              ? "Already have an account? Login"
              : "New guest? Create account"}
          </p>
        </form>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-emerald-900 to-emerald-800 text-emerald-200 py-5 text-center">
        <p className="text-sm">
          © 2026 Sunshine Hotel
        </p>
        <p className="text-[11px] uppercase tracking-widest mt-1 text-emerald-300">
          Secure Guest System
        </p>
      </footer>
    </div>
  );
}
