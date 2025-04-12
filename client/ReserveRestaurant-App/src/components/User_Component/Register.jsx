import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const RegisterForm = ()=> {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        Fname: '',
        Lname: '',
        DateOfBirth: '',
        gender: '',
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        const token = localStorage.getItem('token');
        try {
            const response = await axios.post('http://localhost:8020/user/register', formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
            );
            navigate('/login');
        } catch (error) {
            setError(error.response?.data?.msg || 'Registration failed. Please try again.');
        }

    };

    
    return(
        <>
            <h1>Register</h1>
            <form action="POST" method="POST">
                <input type="text" placeholder="Username" required />
                <input type="password" placeholder="Password" required />
                <input type="email" placeholder="Email" required />
                <button type="submit">Register</button>
            </form>
            <p>Already have an account? <a href="/login">Login here</a></p>
        </>
    )
}
export default RegisterForm