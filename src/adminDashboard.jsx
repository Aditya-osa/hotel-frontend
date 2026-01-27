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
  const navigate = useNavigate(); // ✅ Fix: useNavigate hook
  const [bookings, setBookings] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [activeTab, setActiveTab] = useState("dashboard");

  const TOTAL_ROOMS = 60; // total rooms in hotel

  const fetchData = async () => {
    try {
      const bookingRes = await fetch(`${API_BASE_URL}/api/admin/bookings`);
      const bookingData = await bookingRes.json();
      setBookings(bookingData.bookings || []);

      const feedbackRes = await fetch(`${API_BASE_URL}/api/admin/feedbacks`);
      const feedbackData = await feedbackRes.json();
      setFeedbacks(feedbackData.feedbacks || []);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const markVacant = async (id) => {
    if (!window.confirm("Mark this booking as vacant?")) return;
    try {
      await fetch(`${API_BASE_URL}/api/admin/bookings/${id}/cancel`, {
        method: "PATCH",
      });
      fetchData();
    } catch (err) {
      console.error("Error marking vacant:", err);
    }
  };

  // Stats
  const confirmed = bookings.filter((b) => b.status === "Confirmed").length;
  const cancelled = bookings.filter((b) => b.status === "Cancelled").length;
  const vacantRooms = TOTAL_ROOMS - confirmed;

  const pieData = {
    labels: ["Confirmed", "Cancelled", "Vacant"],
    datasets: [
      {
        label: "Bookings",
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
      title: { display: true, text: "Bookings Status", font: { size: 20 } },
    },
  };

  return (
    <div className="flex bg-gray-100 h-screen overflow-hidden">
      {/* SIDEBAR */}
      <aside className="fixed left-0 top-0 h-screen w-64 bg-slate-900 text-slate-200 p-6">
        <h2 className="text-xl font-bold mb-10">Sunshine Hotel </h2>
        <nav className="space-y-4 text-sm">
          {["dashboard", "bookings", "feedbacks"].map((tab) => (
            <p
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`cursor-pointer ${
                activeTab === tab ? "text-emerald-400 font-semibold" : "opacity-70"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </p>
          ))}
        </nav>
      </aside>

      {/* MAIN */}
      <div className="flex-1 ml-64 flex flex-col">
        {/* HEADER */}
        <header className="fixed top-0 left-64 right-0 h-16 bg-white shadow z-40 flex items-center justify-between px-8">
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm">Administrator</span>
            <button
              onClick={() => {
                localStorage.clear();
                sessionStorage.clear();
                window.location.href = "http://localhost:3000/";
              }}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        </header>

        {/* MAIN CONTENT */}
        <main className="mt-16 p-8 overflow-y-auto">
          {/* DASHBOARD */}
          {activeTab === "dashboard" && (
            <>
              <div className="grid sm:grid-cols-3 gap-6 mb-10">
                <Stat title="Total Bookings" value={bookings.length} />
                <Stat title="Confirmed" value={confirmed} />
                <Stat title="Vacant Rooms" value={vacantRooms} />
              </div>

              {/* PIE CHART */}
              <div
                className="bg-white p-6 rounded-xl shadow"
                style={{ height: 400, width: 400, margin: "0 auto" }}
              >
                <Pie data={pieData} options={pieOptions} />
              </div>
            </>
          )}

          {/* BOOKINGS */}
          {activeTab === "bookings" && (
            <div className="bg-white p-6 rounded-xl shadow">
              <h2 className="font-bold mb-4">All Bookings</h2>
              {bookings.map((b) => (
                <div key={b._id} className="border p-4 rounded mb-4 bg-gray-50">
                  <p><b>Name:</b> {b.name}</p>
                  <p><b>Mobile:</b> {b.phone}</p>
                  <p><b>Room Type:</b> {b.roomType}</p>
                  <p><b>Guests:</b> {b.guests}</p>
                  <p><b>Check-in:</b> {b.checkInDate}</p>
                  <p><b>Check-out:</b> {b.checkOutDate}</p>
                  <p className="mt-2">
                    <b>Status:</b>{" "}
                    <span className={`font-semibold ${b.status === "Confirmed" ? "text-green-600" : "text-red-500"}`}>
                      {b.status}
                    </span>
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* FEEDBACKS */}
          {activeTab === "feedbacks" && (
            <div className="bg-white p-6 rounded-xl shadow">
              <h2 className="font-bold mb-4">Feedbacks</h2>
              {feedbacks.map((f) => (
                <div key={f._id} className="border p-3 rounded mb-3 bg-gray-50">
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

// ================= STAT CARD =================
function Stat({ title, value }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <p className="text-gray-900 text-sm">{title}</p>
      <h2 className="text-3xl font-bold">{value}</h2>
    </div>
  );
}
