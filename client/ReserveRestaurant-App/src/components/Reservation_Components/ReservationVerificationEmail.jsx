    const VerificationPage = () => {
        return (
          <div className="d-flex vh-100 justify-content-center align-items-center bg-light px-3">
            <div className="card shadow-lg p-5 text-center border-0" style={{ maxWidth: '500px', borderRadius: '1rem' }}>
              <div className="mb-4">
                <i className="bi bi-envelope-check-fill text-success display-4"></i>
              </div>
              <h2 className="text-success mb-3">Verify Your Email</h2>
              <p className="text-dark mb-2">
                We've sent a verification link to your email address.
              </p>
              <p className="text-muted small">
                If you don't see it, please check your <strong>Spam</strong> or <strong>Junk</strong> folder.
              </p>
            </div>
          </div>
        );
      };
      
      export default VerificationPage;