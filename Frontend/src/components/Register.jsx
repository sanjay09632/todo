// Register.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('User');
    const navigate = useNavigate();

    const handleRegister = () => {
        if (!username || !password) { 
            alert('Username and password cannot be empty');
            return;  
        }

        axios.post('http://localhost:5000/api/auth/register', { username, password, role })
            .then(response => {
                navigate('/login', { state: { message: 'User registered successfully. Please log in.' } }); 
            })
            .catch(error => {
                console.error('There was an error registering the user!', error);
            });
    };

    return (
        <div className="register-container">
            <h2>Register</h2>
            <input 
                type="text" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                placeholder="Username" 
            />
            <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="Password" 
            />
            <select 
                value={role} 
                onChange={(e) => setRole(e.target.value)}
            >
                <option value="Admin">Admin</option>
                <option value="Manager">Manager</option>
                <option value="User">User</option>
            </select>
            <button onClick={handleRegister}>Register</button>
        </div>
    );
};

export default Register;
