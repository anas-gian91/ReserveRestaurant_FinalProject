import React from 'react';

function ContactForm() {
  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h2 className="mb-4 text-center">Contact Us</h2>

        <form>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input type="text" className="form-control" placeholder="Name" required />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" placeholder="Email" required />
          </div>

          <div className="mb-4">
            <label className="form-label">Message</label>
            <textarea className="form-control" placeholder="Message" rows="5" required></textarea>
          </div>

          <button type="submit" className="btn btn-primary w-100">Send</button>
        </form>

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
