const VerificationPage = () => {
        return (
          <div className="d-flex align-items-center justify-content-center px-3" style={{ minHeight: '80vh' }}>
            <div className="card shadow-lg border-0 rounded-3 text-center p-5" style={{ maxWidth: '550px' }}>
              <div className="mb-4" style={{ fontSize: '80px' }}>
                ✅
              </div>
              <h2 className="fw-bold mb-3" style={{ color: '#16c79a' }}>Reservation Confirmed!</h2>
              <p className="lead mb-2">
                We've sent a confirmation email to your inbox.
              </p>
              <p className="text-muted mb-4">
                Please check your email for all the details about your reservation.
                If you don't see it, check your <strong>Spam</strong> or <strong>Junk</strong> folder.
              </p>
              <div className="d-flex gap-3 justify-content-center flex-wrap">
                <a href="/" className="btn btn-lg rounded-pill px-4" style={{ backgroundColor: '#16c79a', color: '#fff', fontWeight: '600' }}>
                  Back to Home
                </a>
                <a href="/reservations" className="btn btn-lg btn-outline-secondary rounded-pill px-4">
                  View My Reservations
                </a>
              </div>
            </div>
          </div>
        );
      };

      export default VerificationPage;