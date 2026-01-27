import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "./config";

export default function BookingStatus() {
  const navigate = useNavigate();
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

  return (
    <div className="min-h-screen bg-gray-100">
      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-green-600 text-white shadow-md">
        <div className="flex items-center gap-4 px-4 py-3 overflow-x-auto">
          {/* Logo */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <img
              src="https://images.unsplash.com/photo-1560347876-aeef00ee58a1?auto=format&fit=crop&w=50&q=50"
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full"
              alt="logo"
            />
            <h1 className="font-bold text-lg sm:text-xl whitespace-nowrap">
              Sunshine Hotel
            </h1>
          </div>

          {/* Nav Buttons */}
          <div className="flex gap-2 ml-auto">
            {[
              ["Booking", "/guest-dashboard"],
              ["Hotel Info", "/hotel-info"],
              ["Contact", "/contact"],
              ["Feedback", "/feedback"],
              ["Status", "/booking-status"],
            ].map(([label, path]) => (
              <button
                key={label}
                onClick={() => navigate(path)}
                className="bg-white text-green-700 px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold hover:bg-green-100 shadow whitespace-nowrap"
              >
                {label}
              </button>
            ))}

            <button
              onClick={() => navigate("/")}
              className="bg-red-500 px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold hover:bg-red-600 whitespace-nowrap"
            >
              Exit
            </button>
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-emerald-700 mb-6">
          My Bookings
        </h1>

        {loading ? (
          <p>Loading bookings...</p>
        ) : bookings.length === 0 ? (
          <p>No bookings yet.</p>
        ) : (
          <div className="space-y-4">
            {bookings.map((b) => (
              <div
                key={b.bookingId}
                className="bg-white shadow rounded-xl p-4 flex flex-col gap-4 sm:flex-row sm:justify-between"
              >
                {/* Booking Info */}
                <div className="text-sm sm:text-base space-y-1">
                  <p><b>ID:</b> {b.bookingId}</p>
                  <p><b>Room:</b> {b.roomType}</p>
                  <p><b>Check-in:</b> {b.checkInDate}</p>
                  <p><b>Check-out:</b> {b.checkOutDate}</p>
                  <p><b>Price:</b> ₹{b.totalPrice || 0}</p>
                </div>

                {/* Status + Action */}
                <div className="flex flex-row sm:flex-col gap-2 items-start sm:items-end">
                  <span
                    className={`px-3 py-1 rounded-full text-white text-xs sm:text-sm font-semibold ${
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
                      className="px-4 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
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
        <div className="mt-8 bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400 text-sm sm:text-base">
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
    </div>
  );
}
