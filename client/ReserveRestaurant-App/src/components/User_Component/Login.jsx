import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginForm = () => {
    const [formData, setFormData] = useState({ emailOrUsername: '', password: '' });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            const response = await axios.post(`${import.meta.env.VITE_URL_BASE_API}/user/login`, formData);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            navigate('/');
        } catch (error) {
            setError(error.response?.data?.msg || 'Login failed. Please try again.');
        }
    };

    const handleGuest = () => {
        navigate('/guest');
    };

    return (
        <div className="container d-flex justify-content-center align-items-center min-vh-100">
            <div className="card p-4 shadow" style={{ maxWidth: '400px', width: '100%' }}>
                <h2 className="text-center mb-4">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="emailOrUsername" className="form-label">Username/E-mail</label>
                        <input
                            id="emailOrUsername"
                            name="emailOrUsername"
                            type="text"
                            className="form-control"
                            placeholder="Email or Username"
                            value={formData.emailOrUsername}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            className="form-control"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    {error && <div className="alert alert-danger py-1">{error}</div>}
                    <div className="d-grid gap-2">
                        <button type="submit" className="btn btn-primary">Login</button>
                        <button type="button" className="btn btn-outline-secondary" onClick={handleGuest}>
                            Continue as Guest
                        </button>
                    </div>
                    <div className="mt-3 text-center">
                        <p className="mb-1">
                            Don't have an account? <Link to="/register">Register</Link>
                        </p>
                        <p className="text-muted small">You don't want to be registered? No worries — continue as a guest above.</p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;
