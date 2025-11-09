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
      const response = await axios.post(`${import.meta.env.VITE_URL_BASE_API}/contact/contact`, formData);

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
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h2 className="mb-4 text-center">Contact Us</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="form-label">Message</label>
            <textarea
              className="form-control"
              placeholder="Message"
              name="message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? 'Sending...' : 'Send'}
          </button>
        </form>

        {responseMessage && (
          <div className="alert alert-info mt-4 text-center">
            {responseMessage}
          </div>
        )}

        <hr className="my-4" />

        <p className="text-center">For immediate assistance, call us at <strong>123-456-7890</strong>.</p>

        <p className="text-center">Follow us on social media:</p>
        <ul className="list-inline text-center">
          <li className="list-inline-item mx-2">
            <a href="https://www.facebook.com" className="text-decoration-none">Facebook</a>
          </li>
          <li className="list-inline-item mx-2">
            <a href="https://www.twitter.com" className="text-decoration-none">Twitter</a>
          </li>
          <li className="list-inline-item mx-2">
            <a href="https://www.instagram.com" className="text-decoration-none">Instagram</a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default ContactForm;
