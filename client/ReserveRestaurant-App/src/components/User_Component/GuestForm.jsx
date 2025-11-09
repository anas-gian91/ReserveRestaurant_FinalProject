import React, { useState } from 'react';
import axios from 'axios';

const GuestForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    Fname: '',
    Lname: '',
    DateOfBirth: '',
    phone: '',
    gender: ''
  });

  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await axios.post(`${import.meta.env.VITE_URL_BASE_API}/guest/guests`, formData);
      setSuccess('Guest created successfully!');
      setFormData({ email: '', Fname: '', Lname: '', DateOfBirth: '', phone: '', gender: '' });
      console.log(response.data); // optional
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Something went wrong.');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Guest Registration</h2>
      {success && <div className="alert alert-success">{success}</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email">Email:</label>
          <input id="email" type="email" name="email" className="form-control" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="Fname">First Name:</label>
          <input id="Fname" type="text" name="Fname" className="form-control" value={formData.Fname} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="Lname">Last Name:</label>
          <input id="Lname" type="text" name="Lname" className="form-control" value={formData.Lname} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="DateOfBirth">Date of Birth:</label>
          <input id="DateOfBirth" type="date" name="DateOfBirth" className="form-control" value={formData.DateOfBirth} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="phone">Phone:</label>
          <input id="phone" type="text" name="phone" className="form-control" value={formData.phone} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Gender:</label><br />
          <label className="me-2">
            <input type="radio" name="gender" value="Male" checked={formData.gender === 'Male'} onChange={handleChange} required /> Male
          </label>
          <label>
            <input type="radio" name="gender" value="Female" checked={formData.gender === 'Female'} onChange={handleChange} required /> Female
          </label>
        </div>
        <button type="submit" className="btn btn-primary">Create Guest</button>
      </form>
    </div>
  );
};

export default GuestForm;
