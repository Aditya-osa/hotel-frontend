import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Admin() {
  const navigate = useNavigate();

  const [adminId, setAdminId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // Fixed credentials
    if (
      adminId === "2023" &&
      email === "adityasahu@gmail.com" &&
      password === "Aditya@111"
    ) {
      navigate("/admin-dashboard");
    } else {
      setError("Invalid Admin Credentials");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-linear-to-br from-blue-200 via-sky-100 to-indigo-200">
      
      {/* Centered Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm py-4 px-6 sticky top-0 z-50 border-b border-blue-100 flex justify-center items-center">
        <h2 className="text-xl font-bold text-blue-800 text-center">
          Patil Bhandu Hospital
        </h2>
      </header>

      {/* Main Content Area */}
      <main className="relative grow flex items-center justify-center p-4 sm:p-6 overflow-hidden">
        {/* Soft glowing shapes */}
        <div className="absolute -top-32 -left-32 w-72 h-72 sm:w-96 sm:h-96 bg-blue-300/40 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-32 -right-32 w-72 h-72 sm:w-96 sm:h-96 bg-indigo-300/40 rounded-full blur-3xl"></div>

        <form
          onSubmit={handleLogin}
          className="relative bg-white shadow-2xl rounded-2xl p-6 sm:p-8 w-full max-w-[90%] sm:max-w-sm border border-gray-100"
        >
          <h2 className="text-2xl sm:text-3xl font-extrabold text-center mb-2 text-blue-700">
            Admin Login
          </h2>

          <p className="text-center text-gray-500 mb-6 text-sm sm:text-base">
            Secure access for hospital administrators
          </p>

          {error && (
            <div className="text-red-500 text-sm text-center mb-4 bg-red-50 p-2.5 rounded-lg border border-red-100">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <input
              type="text"
              placeholder="Admin ID"
              className="w-full p-3.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-base"
              value={adminId}
              onChange={(e) => setAdminId(e.target.value)}
              required
            />

            <input
              type="email"
              placeholder="Gmail"
              className="w-full p-3.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-base"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full p-3.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-base"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button className="w-full bg-blue-600 text-white py-3.5 rounded-xl text-lg font-semibold hover:bg-blue-700 transition duration-300 shadow-md active:scale-95 mt-8">
            Login
          </button>

          <p className="text-[10px] sm:text-xs text-gray-400 text-center mt-6">
            Authorized Personnel Only
          </p>
        </form>
      </main>

      {/* Centered Footer */}
      <footer className="bg-white/80 backdrop-blur-md py-6 px-4 border-t border-blue-100 flex flex-col items-center justify-center">
        <p className="text-gray-500 text-sm text-center">
          © 2025 Patil Bhandu Hospital Management System
        </p>
        <p className="text-[10px] text-blue-400 mt-1 uppercase tracking-widest font-bold">
          Secure Portal
        </p>
      </footer>
    </div>
  );
}