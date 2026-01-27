import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "./config";

export default function BookingStatus() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const guest = JSON.parse(localStorage.getItem("guest"));

  useEffect(() => {
    if (!guest || !guest.token) {
      alert("Please login to view your bookings");
      navigate("/guest");
      return;
    }

    const fetchBookings = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/bookings/user`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${guest.token}`,
          },
        });

        const data = await res.json();
        if (!res.ok) {
          alert(data.message || "Failed to fetch bookings");
          return;
        }

        setBookings(data.bookings || []);
        setLoading(false);
      } catch {
        alert("Server error");
      }
    };

    fetchBookings();
  }, []);

  const handleCancel = async (bookingId) => {
    if (!window.confirm("Cancel this booking?")) return;

    try {
      const res = await fetch(
        `${API_BASE_URL}/api/bookings/${bookingId}/cancel`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${guest.token}`,
          },
        }
      );

      const data = await res.json();
      if (!res.ok) {
        alert(data.message || "Failed to cancel");
        return;
      }

      alert(data.message);
      setBookings((prev) =>
        prev.map((b) =>
          b.bookingId === bookingId ? { ...b, status: "Cancelled" } : b
        )
      );
    } catch {
      alert("Server error");
    }
  };

  const menuItems = [
    { label: "Booking", path: "/guest-dashboard" },
    { label: "Hotel Info", path: "/hotel-info" },
    { label: "Contact", path: "/contact" },
    { label: "Feedback", path: "/feedback" },
    { label: "Status", path: "/booking-status" },
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-emerald-50 via-green-100 to-emerald-200">

      {/* ================= SIDEBAR DESKTOP ================= */}
      <aside className="hidden md:flex w-64 bg-emerald-800 text-white flex-col shadow-xl">
        <div className="px-6 py-6 border-b border-emerald-700">
          <h1 className="text-xl font-extrabold">Sunshine Hotel</h1>
          <p className="text-xs text-emerald-200 mt-1">Guest Panel</p>
        </div>

        <nav className="flex-grow px-4 py-6 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.label}
              onClick={() => navigate(item.path)}
              className={`w-full text-left px-4 py-3 rounded-xl transition font-medium
                ${
                  item.label === "Status"
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
            className="w-full bg-red-500 py-2.5 rounded-xl hover:bg-red-600 font-semibold"
          >
            Exit
          </button>
        </div>
      </aside>

      {/* ================= MOBILE SIDEBAR ================= */}
      <div className={`fixed inset-0 z-50 md:hidden ${sidebarOpen ? "visible" : "invisible"}`}>
        <div
          className={`absolute inset-0 bg-black/40 transition ${
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
                    item.label === "Status"
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
                My Bookings
              </h1>
              <p className="text-xs text-gray-500">
                View & manage your reservations
              </p>
            </div>
          </div>
        </header>

        {/* CONTENT */}
        <main className="flex-grow px-4 sm:px-6 py-8 max-w-5xl mx-auto w-full">

          {loading ? (
            <p>Loading bookings...</p>
          ) : bookings.length === 0 ? (
            <p>No bookings yet.</p>
          ) : (
            <div className="space-y-5">
              {bookings.map((b) => (
                <div
                  key={b.bookingId}
                  className="bg-white rounded-2xl shadow p-5 flex flex-col sm:flex-row sm:justify-between gap-4"
                >
                  <div className="space-y-1 text-sm sm:text-base">
                    <p><b>ID:</b> {b.bookingId}</p>
                    <p><b>Room:</b> {b.roomType}</p>
                    <p><b>Check-in:</b> {b.checkInDate}</p>
                    <p><b>Check-out:</b> {b.checkOutDate}</p>
                    <p><b>Total:</b> ₹{b.totalPrice || 0}</p>
                  </div>

                  <div className="flex sm:flex-col gap-3 sm:items-end">
                    <span
                      className={`px-4 py-1 rounded-full text-white text-sm font-semibold
                        ${
                          b.status === "Pending"
                            ? "bg-yellow-500"
                            : b.status === "Confirmed"
                            ? "bg-green-500"
                            : "bg-red-500"
                        }`}
                    >
                      {b.status}
                    </span>

                    {b.status !== "Cancelled" && (
                      <button
                        onClick={() => handleCancel(b.bookingId)}
                        className="px-4 py-1.5 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* POLICY */}
          <div className="mt-10 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg text-sm sm:text-base">
            <h2 className="font-bold text-yellow-800 mb-2">
              Cancellation Policy
            </h2>
            <ul className="list-disc list-inside text-yellow-800 space-y-1">
              <li>Cancel up to 24 hours before check-in.</li>
              <li>Within 24 hours → 50% charge.</li>
              <li>Confirmed bookings are guaranteed.</li>
            </ul>
          </div>
        </main>

        {/* FOOTER */}
        <footer className="text-center py-4 text-sm text-gray-600">
          © 2026 Sunshine Hotel • Guest Services
        </footer>
      </div>
    </div>
  );
}
