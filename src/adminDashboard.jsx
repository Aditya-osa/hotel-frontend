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
  const [openSidebar, setOpenSidebar] = useState(false);

  const TOTAL_ROOMS = 60;

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

  useEffect(() => {
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
      title: { display: true, text: "Bookings Status" },
    },
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      {/* SIDEBAR */}
      <aside
        className={`fixed md:static z-50 top-0 left-0 h-full w-64 bg-slate-900 text-white p-6
        transform ${openSidebar ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 transition-transform`}
      >
        <h2 className="text-xl font-bold mb-8">Sunshine Hotel</h2>

        <nav className="space-y-4 text-sm">
          {["dashboard", "bookings", "feedbacks"].map(tab => (
            <p
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setOpenSidebar(false);
              }}
              className={`cursor-pointer ${
                activeTab === tab
                  ? "text-emerald-400 font-semibold"
                  : "opacity-70"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </p>
          ))}
        </nav>
      </aside>

      {/* MAIN */}
      <div className="flex-1 md:ml-64">
        {/* HEADER */}
        <header className="fixed top-0 left-0 md:left-64 right-0 h-16 bg-white shadow z-40 flex items-center justify-between px-4 md:px-8">
          <button
            className="md:hidden text-xl"
            onClick={() => setOpenSidebar(!openSidebar)}
          >
            ☰
          </button>

          <h1 className="text-lg md:text-xl font-bold">Admin Dashboard</h1>

          <button
            onClick={() => {
              localStorage.clear();
              sessionStorage.clear();
              window.location.href = "http://localhost:3000/";
            }}
            className="bg-red-600 text-white px-3 py-1 md:px-4 md:py-2 rounded text-sm"
          >
            Logout
          </button>
        </header>

        {/* CONTENT */}
        <main className="pt-20 p-4 md:p-8">
          {activeTab === "dashboard" && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <Stat title="Total Bookings" value={bookings.length} />
                <Stat title="Confirmed" value={confirmed} />
                <Stat title="Vacant Rooms" value={vacantRooms} />
              </div>

              <div className="bg-white p-4 rounded-xl shadow max-w-md mx-auto h-[300px] sm:h-[400px]">
                <Pie data={pieData} options={pieOptions} />
              </div>
            </>
          )}

          {activeTab === "bookings" && (
            <div className="bg-white p-4 md:p-6 rounded-xl shadow">
              <h2 className="font-bold mb-4">All Bookings</h2>

              {bookings.map(b => (
                <div key={b._id} className="border p-4 rounded mb-4 bg-gray-50 text-sm">
                  <p><b>Name:</b> {b.name}</p>
                  <p><b>Mobile:</b> {b.phone}</p>
                  <p><b>Room:</b> {b.roomType}</p>
                  <p><b>Guests:</b> {b.guests}</p>
                  <p><b>Check-in:</b> {b.checkInDate}</p>
                  <p><b>Check-out:</b> {b.checkOutDate}</p>
                  <p className="mt-2">
                    <b>Status:</b>{" "}
                    <span className={`font-semibold ${
                      b.status === "Confirmed"
                        ? "text-green-600"
                        : "text-red-500"
                    }`}>
                      {b.status}
                    </span>
                  </p>
                </div>
              ))}
            </div>
          )}

          {activeTab === "feedbacks" && (
            <div className="bg-white p-4 md:p-6 rounded-xl shadow">
              <h2 className="font-bold mb-4">Feedbacks</h2>

              {feedbacks.map(f => (
                <div key={f._id} className="border p-3 rounded mb-3 bg-gray-50 text-sm">
                  <p><b>Name:</b> {f.name}</p>
                  <p><b>Mobile:</b> {f.mobile}</p>
                  <p><b>Feedback:</b> {f.feedback || f.message}</p>
                  <p><b>Rating:</b> {f.rating || "N/A"}</p>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

function Stat({ title, value }) {
  return (
    <div className="bg-white p-4 md:p-6 rounded-xl shadow">
      <p className="text-gray-600 text-sm">{title}</p>
      <h2 className="text-2xl md:text-3xl font-bold">{value}</h2>
    </div>
  );
}
