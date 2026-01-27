import { useState } from "react";

export default function Payment() {
  const [formData, setFormData] = useState({
    bookingId: "",
    amount: "",
    paymentMethod: "cash",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/api/payment/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    alert(data.message);
  };

  return (
    <div className="flex flex-col min-h-screen bg-linear-to-br from-amber-100 via-orange-50 to-yellow-100">
      
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm py-4 px-6 sticky top-0 z-50 border-b border-yellow-100 flex justify-center items-center">
        <h2 className="text-xl font-bold text-yellow-800 text-center">
          Sunshine Hotel
        </h2>
      </header>

      {/* Main Content */}
      <main className="relative grow flex items-center justify-center p-4 sm:p-6 overflow-hidden">
        {/* Soft glow background */}
        <div className="absolute -top-32 -left-32 w-72 h-72 sm:w-96 sm:h-96 bg-yellow-300/40 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-32 -right-32 w-72 h-72 sm:w-96 sm:h-96 bg-orange-300/40 rounded-full blur-3xl"></div>

        <form
          onSubmit={handleSubmit}
          className="relative bg-white shadow-2xl rounded-2xl p-6 sm:p-8 w-full max-w-[95%] sm:max-w-md border border-gray-100"
        >
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-2 text-center text-yellow-700">
            Payment
          </h2>

          <p className="text-center text-gray-500 mb-6 text-sm sm:text-base">
            Complete your booking payment
          </p>

          <div className="space-y-4">
            <input
              type="text"
              name="bookingId"
              placeholder="Booking ID"
              required
              onChange={handleChange}
              className="w-full p-3.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 text-base"
            />

            <input
              type="number"
              name="amount"
              placeholder="Amount"
              required
              onChange={handleChange}
              className="w-full p-3.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 text-base"
            />

            <select
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
              className="w-full p-3.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 text-base"
            >
              <option value="cash">Cash</option>
              <option value="card">Card</option>
              <option value="upi">UPI</option>
            </select>
          </div>

          <button className="w-full bg-yellow-600 text-white py-3.5 rounded-xl text-lg font-semibold hover:bg-yellow-700 transition duration-300 shadow-md active:scale-95 mt-6">
            Pay Now
          </button>
        </form>
      </main>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-md py-6 px-4 border-t border-yellow-100 flex flex-col items-center justify-center">
        <p className="text-gray-500 text-sm text-center">
          © 2026 Sunshine Hotel Management System
        </p>
        <p className="text-[10px] text-yellow-500 mt-1 uppercase tracking-widest font-bold">
          Secure & Simple Payments
        </p>
      </footer>
    </div>
  );
}
