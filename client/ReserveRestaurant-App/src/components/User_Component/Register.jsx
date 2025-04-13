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
        gender: '',
    });

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        // Email Validation
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailRegex.test(formData.email)) {
            return 'Please enter a valid email address.';
        }

        // Password Strength Validation
        const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(formData.password)) {
            return 'Password must be at least 8 characters, with uppercase, lowercase, a number, and a special character.';
        }

        // Age Validation
        const today = new Date();
        const birthDate = new Date(formData.DateOfBirth);
        const age = today.getFullYear() - birthDate.getFullYear();
        if (age < 18) {
            return 'You must be at least 18 years old to register.';
        }

        // Gender Validation
        if (!formData.gender) {
            return 'Please select your gender.';
        }

        return null; // No error
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // Validate form inputs
        const validationError = validateForm();
        if (validationError) {
            setError(validationError);
            setLoading(false);
            return;
        }

        try {
            // Register the user
            await axios.post('http://localhost:8020/user/register', formData);

            // Login the user right after registration
            const loginRes = await axios.post('http://localhost:8020/user/login', {
                emailOrUsername: formData.email,
                password: formData.password
            });

            // Save token and user info
            localStorage.setItem('token', loginRes.data.token);
            localStorage.setItem('user', JSON.stringify(loginRes.data.user));

            // Redirect to homepage
            navigate('/');
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.msg || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register-form">
            <h2>Register</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="Fname"
                    placeholder="First Name"
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="Lname"
                    placeholder="Last Name"
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    required
                />
                <input
                    type="date"
                    name="DateOfBirth"
                    placeholder="Date of Birth"
                    onChange={handleChange}
                    required
                />
                <select
                    name="gender"
                    onChange={handleChange}
                    required
                >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
                <button type="submit" disabled={loading}>
                    {loading ? 'Registering...' : 'Register'}
                </button>
            </form>
        </div>
    );
};

export default Register;
