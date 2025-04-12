import React, { useState } from 'react';
import {Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
const LoginForm =()=>{
    const [formData, setFormData] = useState({ username: '', password: '' });
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        const token = localStorage.getItem('token');
        try {
            const response = await axios.post('http://localhost:8020/user/login', formData,{
                headers:{
                    Authorization: `Bearer ${token}`,
                },
            }
        );
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            navigate('/home');
        }catch (error){
            setError(error.response?.data?.msg || 'Login failed. Please try again.');
        };
    };
    return(
        <div className="login-form">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input name="emailOrUsername" type="text" placeholder="Email/Username" value={formData.emailOrUsername} onChange={handleChange} required />
                <input type="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
                <button type="submit">Login</button>
                {error && <p className="error">{error}</p>}
                <p>Don't have an account? <Link to="/register">Register</Link></p>
            </form>
        </div>
    );
};

export default LoginForm;