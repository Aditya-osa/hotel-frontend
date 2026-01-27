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
          method: "GET",
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
      } catch (error) {
        console.error(error);
        alert("Server error");
      }
    };

    fetchBookings();
  }, []);

  // Cancel booking function
  const handleCancel = async (bookingId) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;

    try {
      const res = await fetch(`${API_BASE_URL}/api/bookings/${bookingId}/cancel`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${guest.token}`,
        },
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.message || "Failed to cancel booking");
        return;
      }

      alert(data.message);

      // Update UI immediately
      setBookings((prev) =>
        prev.map((b) =>
          b.bookingId === bookingId ? { ...b, status: "Cancelled" } : b
        )
      );
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-green-600 text-white sticky top-0 z-50 shadow-md">
        <div className="max-w-6xl mx-auto flex justify-between items-center py-4 px-6">
          {/* Left: Logo + Name */}
          <div className="flex items-center gap-3">
            <img
              src="https://images.unsplash.com/photo-1560347876-aeef00ee58a1?auto=format&fit=crop&w=50&q=50"
              alt="Hotel Logo"
              className="w-12 h-12 rounded-full"
            />
            <h1 className="text-2xl font-bold tracking-wide">Sunshine Hotel</h1>
          </div>

          {/* Right: Navigation Buttons */}
          <div className="flex gap-4">
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
              onClick={() => navigate("/guest-dashboard")}
              className="bg-white text-green-700 px-4 py-2 rounded-lg text-sm font-bold hover:bg-green-100 transition shadow"
            >
              Booking
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

      {/* Main Content */}
      <div className="max-w-5xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-emerald-700 mb-6">My Bookings</h1>

        {loading ? (
          <p>Loading bookings...</p>
        ) : bookings.length === 0 ? (
          <p>You have no bookings yet.</p>
        ) : (
          <div className="space-y-4">
            {bookings.map((b) => (
              <div
                key={b.bookingId}
                className="bg-white shadow-md rounded-xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center"
              >
                <div>
                  <p className="font-semibold text-gray-700">
                    Booking ID: <span className="text-gray-900">{b.bookingId}</span>
                  </p>
                  <p>
                    Room Type: <span className="text-gray-900">{b.roomType}</span>
                  </p>
                  <p>
                    Check-in: <span className="text-gray-900">{b.checkInDate}</span>
                  </p>
                  <p>
                    Check-out: <span className="text-gray-900">{b.checkOutDate}</span>
                  </p>
                  <p>
                    Total Price: <span className="text-gray-900">₹{b.totalPrice || 0}</span>
                  </p>
                </div>

                <div className="mt-2 sm:mt-0 flex flex-col sm:flex-row gap-2 items-start sm:items-center">
                  <span
                    className={`px-3 py-1 rounded-full font-semibold text-white ${
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
                      className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Cancel Booking
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Cancellation Policy */}
        <div className="mt-8 bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
          <h2 className="font-bold text-yellow-800 mb-2">Cancellation Policy</h2>
          <ul className="list-disc list-inside text-yellow-800">
            <li>Bookings can be cancelled up to 24 hours before check-in.</li>
            <li>Cancellations within 24 hours may incur a 50% charge.</li>
            <li>Confirmed bookings are guaranteed until the check-in date.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
