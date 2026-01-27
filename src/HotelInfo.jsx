import { useNavigate } from "react-router-dom";

export default function HotelInfo() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-100 to-teal-50">

      {/* Header with Navigation */}
      <header className="bg-emerald-600 text-white sticky top-0 z-50 shadow-md">
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
              onClick={() => navigate("/guest-dashboard")}
              className="bg-white text-green-700 px-4 py-2 rounded-lg text-sm font-bold hover:bg-green-100 transition shadow"
            >
              Booking
            </button>
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
  onClick={() => navigate("/")}
  className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600 transition shadow"
>
  Exit
</button>

          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-emerald-600 to-emerald-600 text-white shadow-xl">
        <div className="max-w-6xl mx-auto px-6 py-20 text-center">
          <h1 className="text-5xl font-extrabold mb-4 tracking-wide">
            Sunshine Hotel
          </h1>
          <p className="text-emerald-100 max-w-2xl mx-auto text-lg">
            Experience comfort, elegance, and world-class hospitality in the
            heart of the city.
          </p>
        </div>
      </section>

      {/* About Section */}
      <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-3xl font-bold text-emerald-700 mb-4">
            About Our Hotel
          </h2>
          <p className="text-slate-600 mb-4 leading-relaxed text-lg">
            Sunshine Hotel is designed for travelers who seek comfort,
            convenience, and premium service. Whether you are visiting for
            business or leisure, our hotel ensures a memorable stay with
            personalized hospitality.
          </p>
          <p className="text-slate-600 leading-relaxed text-lg">
            With modern interiors, luxury rooms, and dedicated staff, we focus
            on making every guest feel at home.
          </p>
        </div>

        {/* Highlights */}
        <div className="grid grid-cols-2 gap-6">
          {[
            { title: "500+", label: "Happy Guests" },
            { title: "50+", label: "Luxury Rooms" },
            { title: "24×7", label: "Service Support" },
            { title: "4.8★", label: "Guest Rating" }
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-lg text-center border border-emerald-100 hover:shadow-xl transition"
            >
              <h3 className="text-4xl font-extrabold text-emerald-600">
                {item.title}
              </h3>
              <p className="text-slate-500 mt-2 text-sm uppercase tracking-wide">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Amenities */}
      <section className="bg-white py-16 border-t border-emerald-100">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-emerald-700 text-center mb-12">
            Our Amenities
          </h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
            {[
              "24×7 Room Service",
              "Free High-Speed Wi-Fi",
              "Luxury Rooms & Suites",
              "In-House Restaurant",
              "Airport Pickup & Drop",
              "Secure Parking Facility"
            ].map((amenity, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-emerald-50 to-green-100 border border-emerald-200 p-6 rounded-2xl text-center font-semibold text-emerald-800 shadow-md hover:shadow-lg transition"
              >
                {amenity}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 text-center bg-gradient-to-r from-emerald-600 to-emerald-700 text-white">
        <h2 className="text-3xl font-bold mb-3">
          Ready to Book Your Stay?
        </h2>
        <p className="text-emerald-100 mb-8 text-lg">
          Experience premium comfort and exceptional service.
        </p>
        <button
          onClick={() => window.history.back()}
          className="bg-white text-emerald-800 px-10 py-4 rounded-xl font-bold text-lg hover:bg-emerald-50 transition shadow-lg"
        >
          Back to Booking
        </button>
      </section>

      {/* Footer */}
      <footer className="bg-emerald-950 text-emerald-200 py-6 text-center">
        <p className="text-sm">© 2026 Sunshine Hotel</p>
        <p className="text-[11px] uppercase tracking-widest text-emerald-400 mt-1">
          Premium Hospitality Experience
        </p>
      </footer>

    </div>
  );
}
