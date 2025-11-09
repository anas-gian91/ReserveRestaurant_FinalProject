import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginForm = () => {
    const [formData, setFormData] = useState({ emailOrUsername: '', password: '' });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:8020/user/login', formData);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            navigate('/');
        } catch (error) {
            setError(error.response?.data?.msg || 'Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleGuest = () => {
        navigate('/guest');
    };

    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '90vh' }}>
            <div className="card shadow-lg border-0 rounded-3" style={{ maxWidth: '450px', width: '100%' }}>
                <div className="card-body p-5">
                    <div className="text-center mb-4">
                        <div className="mb-3" style={{ fontSize: '48px' }}>🔐</div>
                        <h2 className="fw-bold" style={{ color: '#1a1a2e' }}>Welcome Back</h2>
                        <p className="text-muted">Login to manage your reservations</p>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="emailOrUsername" className="form-label fw-semibold">Email or Username</label>
                            <input
                                id="emailOrUsername"
                                name="emailOrUsername"
                                type="text"
                                className="form-control form-control-lg"
                                placeholder="Enter your email or username"
                                value={formData.emailOrUsername}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="form-label fw-semibold">Password</label>
                            <input
                                id="password"
                                type="password"
                                name="password"
                                className="form-control form-control-lg"
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        {error && <div className="alert alert-danger">{error}</div>}
                        <div className="d-grid gap-3">
                            <button
                                type="submit"
                                className="btn btn-lg rounded-pill"
                                style={{ backgroundColor: '#16c79a', color: '#fff', fontWeight: '600' }}
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm me-2"></span>
                                        Logging in...
                                    </>
                                ) : (
                                    'Login'
                                )}
                            </button>
                            <button
                                type="button"
                                className="btn btn-outline-secondary btn-lg rounded-pill"
                                onClick={handleGuest}
                            >
                                Continue as Guest
                            </button>
                        </div>
                        <div className="mt-4 text-center">
                            <p className="mb-0">
                                Don't have an account? <Link to="/register" style={{ color: '#16c79a', fontWeight: '600' }}>Sign Up</Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
