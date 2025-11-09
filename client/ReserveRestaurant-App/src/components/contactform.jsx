import React, { useState } from 'react';
import axios from 'axios';

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [responseMessage, setResponseMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponseMessage('');  // Clear previous messages

    try {
      // Send POST request to the backend API
      const response = await axios.post('http://localhost:8020/contact/contact', formData);

      // Set the response message
      setResponseMessage(response.data.message);
      // Reset the form fields after successful submission
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error submitting the contact form:', error);
      setResponseMessage('There was an error submitting your message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="text-center mb-5">
            <h2 className="fw-bold" style={{ color: '#1a1a2e' }}>Get In Touch</h2>
            <p className="text-muted">Have a question or feedback? We'd love to hear from you!</p>
          </div>

          <div className="card shadow-lg border-0 rounded-3">
            <div className="card-body p-5">
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="form-label fw-semibold">Name</label>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Your name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label fw-semibold">Email</label>
                  <input
                    type="email"
                    className="form-control form-control-lg"
                    placeholder="your.email@example.com"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label fw-semibold">Message</label>
                  <textarea
                    className="form-control form-control-lg"
                    placeholder="Tell us what's on your mind..."
                    name="message"
                    rows="6"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="btn btn-lg w-100 rounded-pill"
                  style={{ backgroundColor: '#16c79a', color: '#fff', fontWeight: '600' }}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      Sending...
                    </>
                  ) : (
                    'Send Message'
                  )}
                </button>
              </form>

              {responseMessage && (
                <div className="alert alert-success mt-4 text-center border-0">
                  {responseMessage}
                </div>
              )}
            </div>
          </div>

          <div className="row g-4 mt-4">
            <div className="col-md-4 text-center">
              <div className="p-4">
                <div style={{ fontSize: '40px' }}>📞</div>
                <h5 className="mt-3 fw-bold">Phone</h5>
                <p className="text-muted">123-456-7890</p>
              </div>
            </div>
            <div className="col-md-4 text-center">
              <div className="p-4">
                <div style={{ fontSize: '40px' }}>✉️</div>
                <h5 className="mt-3 fw-bold">Email</h5>
                <p className="text-muted">info@reserverestaurant.com</p>
              </div>
            </div>
            <div className="col-md-4 text-center">
              <div className="p-4">
                <div style={{ fontSize: '40px' }}>🌐</div>
                <h5 className="mt-3 fw-bold">Social Media</h5>
                <div className="d-flex justify-content-center gap-3 mt-3">
                  <a href="https://www.facebook.com" className="text-decoration-none" style={{ color: '#16c79a', fontSize: '24px' }}>
                    📘
                  </a>
                  <a href="https://www.twitter.com" className="text-decoration-none" style={{ color: '#16c79a', fontSize: '24px' }}>
                    🐦
                  </a>
                  <a href="https://www.instagram.com" className="text-decoration-none" style={{ color: '#16c79a', fontSize: '24px' }}>
                    📷
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactForm;
