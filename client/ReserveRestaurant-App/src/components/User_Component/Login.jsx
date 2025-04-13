import React, { useState } from 'react';
import {Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
const LoginForm =()=>{
    const [formData, setFormData] = useState({ emailOrUsername: '', password: '' });
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            const response = await axios.post('http://localhost:8020/user/login', formData,
        );
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            navigate('/home');
        }catch (error){
            setError(error.response?.data?.msg || 'Login failed. Please try again.');
        }
    };
    return(
        <div className="login-form">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="emailOrUsername">Username/E-mail:</label>
                <input id="emailOrUsername"name="emailOrUsername" type="text" placeholder="Email/Username" value={formData.emailOrUsername} onChange={handleChange} required />
                <label htmlFor="password">Password:</label>
                <input id="password"type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
                <button type="submit">Login</button>
                {error && <p className="error">{error}</p>}
                <p>Don't have an account? <Link to="/register">Register</Link></p>
            </form>
        </div>
    );
};

export default LoginForm;