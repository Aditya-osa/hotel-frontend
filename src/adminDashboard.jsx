import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "./config";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const TOTAL_ROOMS = 60;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bookingRes = await fetch(`${API_BASE_URL}/api/admin/bookings`);
        const bookingData = await bookingRes.json();
        setBookings(bookingData.bookings || []);

        const feedbackRes = await fetch(`${API_BASE_URL}/api/admin/feedbacks`);
        const feedbackData = await feedbackRes.json();
        setFeedbacks(feedbackData.feedbacks || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const confirmed = bookings.filter(b => b.status === "Confirmed").length;
  const cancelled = bookings.filter(b => b.status === "Cancelled").length;
  const vacantRooms = TOTAL_ROOMS - confirmed;

  const pieData = {
    labels: ["Confirmed", "Cancelled", "Vacant"],
    datasets: [
      {
        data: [confirmed, cancelled, vacantRooms],
        backgroundColor: ["#16a34a", "#ef4444", "#2563eb"],
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "bottom" },
      title: { display: true, text: "Booking Status Overview" },
    },
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-slate-100 via-gray-100 to-emerald-50">

      {/* OVERLAY (Mobile) */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64
        bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900
        text-white p-6 shadow-2xl
        transform transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 md:static`}
      >
        <h2 className="text-2xl font-extrabold mb-10 tracking-wide">
          Sunshine Hotel
        </h2>

        <nav className="space-y-3 text-sm">
          {["dashboard", "bookings", "feedbacks"].map(tab => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setSidebarOpen(false);
              }}
              className={`w-full text-left px-4 py-2.5 rounded-xl transition-all duration-200
              ${activeTab === tab
                ? "bg-emerald-600 text-white shadow-lg"
                : "text-gray-300 hover:bg-slate-700 hover:translate-x-1"}`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </nav>
      </aside>

      {/* MAIN */}
      <div className="flex-1 md:ml-64">

        {/* HEADER */}
        <header className="sticky top-0 z-40 bg-white/90 backdrop-blur shadow flex items-center justify-between px-4 py-3 md:px-8">
          <button
            className="md:hidden text-2xl"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            ☰
          </button>

          <h1 className="text-lg md:text-xl font-bold text-gray-800">
            Admin Dashboard
          </h1>

          <button
            onClick={() => {
              localStorage.clear();
              sessionStorage.clear();
              navigate("/");
            }}
            className="bg-red-500/90 text-white px-4 py-2 rounded-xl text-sm font-semibold
            hover:bg-red-600 transition active:scale-95 shadow"
          >
            Logout
          </button>
        </header>

        {/* CONTENT */}
        <main className="p-4 md:p-8 space-y-8">

          {/* DASHBOARD */}
          {activeTab === "dashboard" && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <Stat title="Total Bookings" value={bookings.length} />
                <Stat title="Confirmed" value={confirmed} />
                <Stat title="Vacant Rooms" value={vacantRooms} />
              </div>

              <div className="bg-white/90 backdrop-blur rounded-2xl shadow-lg
              p-4 h-[280px] sm:h-[380px] max-w-md mx-auto">
                <Pie data={pieData} options={pieOptions} />
              </div>
            </>
          )}

          {/* BOOKINGS */}
          {activeTab === "bookings" && (
            <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6">
              <h2 className="font-bold mb-4 text-lg">All Bookings</h2>

              <div className="space-y-4">
                {bookings.map(b => (
                  <div
                    key={b._id}
                    className="rounded-2xl p-4 bg-white shadow-md
                    hover:shadow-xl transition-all duration-300 text-sm space-y-1"
                  >
                    <p><b>Name:</b> {b.name}</p>
                    <p><b>Mobile:</b> {b.phone}</p>
                    <p><b>Room:</b> {b.roomType}</p>
                    <p><b>Guests:</b> {b.guests}</p>
                    <p><b>Check-in:</b> {b.checkInDate}</p>
                    <p><b>Check-out:</b> {b.checkOutDate}</p>

                    <span
                      className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-bold
                      ${b.status === "Confirmed"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"}`}
                    >
                      {b.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* FEEDBACKS */}
          {activeTab === "feedbacks" && (
            <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6">
              <h2 className="font-bold mb-4 text-lg">Guest Feedbacks</h2>

              <div className="space-y-3">
                {feedbacks.map(f => (
                  <div
                    key={f._id}
                    className="rounded-xl bg-white shadow-sm border
                    p-4 text-sm hover:shadow-md transition"
                  >
                    <p><b>Name:</b> {f.name}</p>
                    <p><b>Mobile:</b> {f.mobile}</p>
                    <p><b>Feedback:</b> {f.feedback || f.message}</p>
                    <p><b>Rating:</b> ⭐ {f.rating || "N/A"}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

/* STAT CARD */
function Stat({ title, value }) {
  return (
    <div className="bg-white/90 backdrop-blur p-5 md:p-6 rounded-2xl shadow-md
    hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-center">
      <p className="text-gray-500 text-sm uppercase tracking-wide">
        {title}
      </p>
      <h2 className="text-3xl md:text-4xl font-extrabold mt-2 text-emerald-600">
        {value}
      </h2>
    </div>
  );
}
