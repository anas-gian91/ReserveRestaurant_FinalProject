// import React from 'react';
// function Home() {
//   return (
//     <div className="container py-5">
//       <div className="text-center mb-5">
//         <h1 className="display-4 fw-bold text-primary">Restaurant Reservation App</h1>
//         <h3 className="text-muted mt-3">Welcome to your seamless dining experience</h3>
//       </div>

//       <div className="row justify-content-center">
//         <div className="col-md-8">
//           <div className="card shadow p-4 border-0">
//             <p className="lead">
//               Find and reserve a table without any hassle. Manage your reservations, receive updates instantly, and enjoy a smooth booking process — all in one place.
//             </p>
//             <p>
//               Need help? Visit our <a href="/contact" className="text-decoration-underline">Contact</a> page and we’ll assist you right away.
//             </p>
//             <div className="d-flex justify-content-center mt-4">
//               <a href="/reservation" className="btn btn-primary btn-lg">Make a Reservation</a>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Home;


import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <div className="bg-light" style={{ minHeight: '70vh', display: 'flex', alignItems: 'center' }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-4 mb-lg-0">
              <h1 className="display-3 fw-bold mb-4" style={{ color: '#1a1a2e', lineHeight: '1.2' }}>
                Your Table is Waiting
              </h1>
              <p className="lead mb-4" style={{ fontSize: '1.25rem', color: '#555' }}>
                Experience seamless dining reservations. Book your table in seconds, manage reservations effortlessly, and enjoy instant confirmations.
              </p>
              <div className="d-flex gap-3 flex-wrap">
                <Link
                  to="/reservation"
                  className="btn btn-lg px-4 py-3 rounded-pill shadow-sm"
                  style={{ backgroundColor: '#16c79a', color: '#fff', fontWeight: '600', border: 'none' }}
                >
                  Reserve a Table
                </Link>
                <Link
                  to="/menu"
                  className="btn btn-lg btn-outline-dark px-4 py-3 rounded-pill"
                  style={{ fontWeight: '600' }}
                >
                  View Menu
                </Link>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="text-center">
                <div className="p-5 rounded-circle bg-white shadow-lg d-inline-block">
                  <div style={{ fontSize: '120px', lineHeight: '1' }}>🍽️</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-5">
        <div className="text-center mb-5">
          <h2 className="fw-bold mb-3" style={{ color: '#1a1a2e' }}>Why Choose Us?</h2>
          <p className="text-muted">Making dining reservations simple and efficient</p>
        </div>
        <div className="row g-4">
          <div className="col-md-4">
            <div className="card border-0 shadow-sm h-100 text-center p-4">
              <div className="mb-3" style={{ fontSize: '48px' }}>⚡</div>
              <h4 className="fw-bold mb-3">Instant Booking</h4>
              <p className="text-muted">
                Reserve your table in just a few clicks. No waiting, no phone calls.
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card border-0 shadow-sm h-100 text-center p-4">
              <div className="mb-3" style={{ fontSize: '48px' }}>✉️</div>
              <h4 className="fw-bold mb-3">Email Confirmation</h4>
              <p className="text-muted">
                Receive instant email confirmations for every reservation you make.
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card border-0 shadow-sm h-100 text-center p-4">
              <div className="mb-3" style={{ fontSize: '48px' }}>📱</div>
              <h4 className="fw-bold mb-3">Manage Anytime</h4>
              <p className="text-muted">
                View, modify, or cancel your reservations from any device.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="py-5" style={{ backgroundColor: '#f8f9fa' }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <h3 className="fw-bold mb-3">Ready to Dine With Us?</h3>
              <p className="text-muted mb-4">
                Join us for an exceptional dining experience. Need assistance? Our support team is here to help.
              </p>
              <div className="d-flex gap-3 justify-content-center flex-wrap">
                <Link to="/reservation" className="btn btn-lg px-4 py-3 rounded-pill" style={{ backgroundColor: '#16c79a', color: '#fff', fontWeight: '600' }}>
                  Book Now
                </Link>
                <Link to="/contact" className="btn btn-lg btn-outline-secondary px-4 py-3 rounded-pill" style={{ fontWeight: '600' }}>
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
