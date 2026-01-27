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
      title: { display: true, text: "Booking Status" },
    },
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* SIDEBAR */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-white p-6
        transform transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 md:static`}
      >
        <h2 className="text-xl font-bold mb-8">Sunshine Hotel</h2>

        <nav className="space-y-4 text-sm">
          {["dashboard", "bookings", "feedbacks"].map(tab => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setSidebarOpen(false);
              }}
              className={`block w-full text-left px-3 py-2 rounded-lg transition
                ${activeTab === tab
                  ? "bg-emerald-600 text-white"
                  : "text-gray-300 hover:bg-slate-800"}`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </nav>
      </aside>

      {/* MAIN */}
      <div className="flex-1 md:ml-64">
        {/* HEADER */}
        <header className="sticky top-0 z-40 bg-white shadow flex items-center justify-between px-4 py-3 md:px-8">
          <button
            className="md:hidden text-2xl"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            ☰
          </button>

          <h1 className="text-lg md:text-xl font-bold">Admin Dashboard</h1>

          <button
            onClick={() => {
              localStorage.clear();
              sessionStorage.clear();
              navigate("/");
            }}
            className="bg-red-600 text-white px-3 py-1.5 rounded-lg text-sm hover:bg-red-700"
          >
            Logout
          </button>
        </header>

        {/* CONTENT */}
        <main className="p-4 md:p-8 space-y-6">
          {activeTab === "dashboard" && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Stat title="Total Bookings" value={bookings.length} />
                <Stat title="Confirmed" value={confirmed} />
                <Stat title="Vacant Rooms" value={vacantRooms} />
              </div>

              <div className="bg-white rounded-xl shadow p-4 h-[280px] sm:h-[380px] max-w-md mx-auto">
                <Pie data={pieData} options={pieOptions} />
              </div>
            </>
          )}

          {activeTab === "bookings" && (
            <div className="bg-white rounded-xl shadow p-4 md:p-6">
              <h2 className="font-bold mb-4">All Bookings</h2>

              <div className="space-y-4">
                {bookings.map(b => (
                  <div key={b._id} className="border rounded-lg p-4 bg-gray-50 text-sm">
                    <p><b>Name:</b> {b.name}</p>
                    <p><b>Mobile:</b> {b.phone}</p>
                    <p><b>Room:</b> {b.roomType}</p>
                    <p><b>Guests:</b> {b.guests}</p>
                    <p><b>Check-in:</b> {b.checkInDate}</p>
                    <p><b>Check-out:</b> {b.checkOutDate}</p>
                    <p className="mt-2 font-semibold">
                      Status:{" "}
                      <span className={
                        b.status === "Confirmed"
                          ? "text-green-600"
                          : "text-red-500"
                      }>
                        {b.status}
                      </span>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "feedbacks" && (
            <div className="bg-white rounded-xl shadow p-4 md:p-6">
              <h2 className="font-bold mb-4">Guest Feedbacks</h2>

              <div className="space-y-3">
                {feedbacks.map(f => (
                  <div key={f._id} className="border rounded-lg p-3 bg-gray-50 text-sm">
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

function Stat({ title, value }) {
  return (
    <div className="bg-white p-4 md:p-6 rounded-xl shadow text-center">
      <p className="text-gray-500 text-sm">{title}</p>
      <h2 className="text-2xl md:text-3xl font-bold mt-1">{value}</h2>
    </div>
  );
}
