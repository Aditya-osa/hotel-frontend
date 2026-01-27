import { useNavigate } from "react-router-dom";

export default function Contact() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-emerald-50">
{/* HEADER */}
<header className="fixed top-0 left-0 w-full h-20 bg-green-600 text-white z-50 shadow-md flex items-center px-6">
  
  {/* Logo */}
  <div className="flex items-center gap-3 flex-shrink-0">
    <img
      src="https://images.unsplash.com/photo-1560347876-aeef00ee58a1?auto=format&fit=crop&w=50&q=50"
      alt="Hotel Logo"
      className="w-9 h-9 rounded-full"
    />
    <h1 className="text-xl font-bold whitespace-nowrap">
      Sunshine Hotel
    </h1>
  </div>

  {/* Buttons */}
  <div className="flex gap-3 ml-auto flex-nowrap overflow-x-auto">
     <div className="flex items-center gap-4">

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
<br/><br/><br/><br/><br/> 

      {/* CONTENT */}
      <div className="p-8">

        {/* Hero Section */}
        <section className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-emerald-700 mb-4">
            Contact Sunshine Hotel
          </h1>
          <p className="text-slate-600 max-w-xl mx-auto">
            We're here to assist you 24/7. Reach out to us via phone, email, or visit us directly.
          </p>
        </section>

        {/* Contact Cards */}
        <section className="max-w-6xl mx-auto grid sm:grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-md text-center">
            <h2 className="text-xl font-bold text-emerald-600 mb-2">Address</h2>
            <p className="text-slate-600">
              Sunshine Hotel<br />
              123 Sunshine Avenue<br />
              Mumbai, Maharashtra, India
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md text-center">
            <h2 className="text-xl font-bold text-emerald-600 mb-2">Phone</h2>
            <p className="text-slate-600">
              +91 98765 43210<br />
              +91 91234 56789
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md text-center">
            <h2 className="text-xl font-bold text-emerald-600 mb-2">Email</h2>
            <p className="text-slate-600">
              reservations@sunshinehotel.com<br />
              support@sunshinehotel.com
            </p>
          </div>
        </section>

        {/* Map */}
       <section className="mt-16 max-w-6xl mx-auto px-6">
  <h2 className="text-3xl font-extrabold text-emerald-700 text-center mb-3">
    Find Us Here
  </h2>
  <p className="text-center text-slate-600 mb-8">
    Located in the heart of Mumbai for easy access & comfort
  </p>
{/* Map */}
<div className="w-full h-72 rounded-3xl overflow-hidden shadow-xl mb-16">
  <iframe
    title="hotel-map"
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3023.8235600311516!2d72.8777!3d19.0760!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c63f4b9c7f7f%3A0x0!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1600000000000!5m2!1sen!2sin"
    width="100%"
    height="100%"
    style={{ border: 0 }}
    loading="lazy"
  />
</div></section> 
    <footer className="bg-emerald-950 text-emerald-200 py-6 text-center">
        <p className="text-sm">© 2026 Sunshine Hotel</p>
        <p className="text-[11px] uppercase tracking-widest text-emerald-400 mt-1">
          Premium Hospitality Experience
        </p>
      </footer>
     </div>
    </div>
  );
}