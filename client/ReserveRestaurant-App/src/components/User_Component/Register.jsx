import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    Fname: '',
    Lname: '',
    DateOfBirth: '',
    phone: '',
    gender: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(formData.email)) {
      return 'Please enter a valid email address.';
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      return 'Password must be at least 8 characters, with uppercase, lowercase, a number, and a special character.';
    }

    const today = new Date();
    const birthDate = new Date(formData.DateOfBirth);
    const age = today.getFullYear() - birthDate.getFullYear();
    if (age < 18) {
      return 'You must be at least 18 years old to register.';
    }

    if (!formData.gender) {
      return 'Please select your gender.';
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      setLoading(false);
      return;
    }

    try {
      await axios.post(`${import.meta.env.VITE_URL_BASE_API}/user/register`, formData);
      const loginRes = await axios.post(`${import.meta.env.VITE_URL_BASE_API}/user/login`, {
        emailOrUsername: formData.email,
        password: formData.password,
      });

      localStorage.setItem('token', loginRes.data.token);
      localStorage.setItem('user', JSON.stringify(loginRes.data.user));

      navigate('/');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.msg || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <div className="card shadow-lg border-0 rounded-3">
            <div className="card-body p-5">
              <div className="text-center mb-4">
                <div className="mb-3" style={{ fontSize: '48px' }}>👤</div>
                <h2 className="fw-bold" style={{ color: '#1a1a2e' }}>Create Account</h2>
                <p className="text-muted">Join us and start making reservations</p>
              </div>

              {error && <div className="alert alert-danger">{error}</div>}

              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-semibold">First Name</label>
                    <input
                      type="text"
                      name="Fname"
                      className="form-control form-control-lg"
                      value={formData.Fname}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-semibold">Last Name</label>
                    <input
                      type="text"
                      name="Lname"
                      className="form-control form-control-lg"
                      value={formData.Lname}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Username</label>
                  <input
                    type="text"
                    name="username"
                    className="form-control form-control-lg"
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control form-control-lg"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Password</label>
                  <input
                    type="password"
                    name="password"
                    className="form-control form-control-lg"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <small className="text-muted">
                    Must be 8+ characters with uppercase, lowercase, number, and special character
                  </small>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-semibold">Date of Birth</label>
                    <input
                      type="date"
                      name="DateOfBirth"
                      className="form-control form-control-lg"
                      value={formData.DateOfBirth}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-semibold">Phone Number</label>
                    <input
                      type="text"
                      name="phone"
                      className="form-control form-control-lg"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="form-label fw-semibold">Gender</label>
                  <select
                    name="gender"
                    className="form-select form-select-lg"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
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
                      Creating Account...
                    </>
                  ) : (
                    'Create Account'
                  )}
                </button>

                <div className="mt-4 text-center">
                  <p className="mb-0">
                    Already have an account? <Link to="/login" style={{ color: '#16c79a', fontWeight: '600' }}>Login</Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
