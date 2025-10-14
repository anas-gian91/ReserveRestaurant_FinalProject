import React from 'react';
function Home() {
  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold text-primary">Restaurant Reservation App</h1>
        <h3 className="text-muted mt-3">Welcome to your seamless dining experience</h3>
      </div>

      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow p-4 border-0">
            <p className="lead">
              Find and reserve a table without any hassle. Manage your reservations, receive updates instantly, and enjoy a smooth booking process — all in one place.
            </p>
            <p>
              Need help? Visit our <a href="/contact" className="text-decoration-underline">Contact</a> page and we’ll assist you right away.
            </p>
            <div className="d-flex justify-content-center mt-4">
              <a href="/reservation" className="btn btn-primary btn-lg">Make a Reservation</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
