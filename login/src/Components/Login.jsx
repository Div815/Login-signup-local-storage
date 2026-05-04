import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import { loginUser } from '../Utils/auth';

const Login = () => {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const [role, setRole] = useState("user"); // Tracks active button ('user' or 'admin')
    const navigate = useNavigate();

    const handleInput = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = loginUser(credentials.email, credentials.password, role);

        if (result.success) {
            toast.success(`Logged in as ${result.role}`);
            setTimeout(() => {
                navigate(result.role === "admin" ? "/admin" : "/home");
            }, 1000);
        } else {
            toast.error(result.message || "Invalid Credentials");
        }
    };

    return (
        <div className='main'>
            <Toaster />
            <form onSubmit={handleSubmit}>
                <div className='heading'>
                    <p>Login</p>
                </div>

                {/* Role Selection Buttons */}
                <div className="role-container">
                    <button 
                        type="button" 
                        className={`role-btn ${role === 'user' ? 'active' : ''}`}
                        onClick={() => setRole('user')}
                    >
                        User
                    </button>
                    <button 
                        type="button" 
                        className={`role-btn ${role === 'admin' ? 'active' : ''}`}
                        onClick={() => setRole('admin')}
                    >
                        Admin
                    </button>
                </div>

                <div className='account'>
                    <input type='email' name="email" placeholder='Email' onChange={handleInput} required />
                    <input type='password' name="password" placeholder='Password' onChange={handleInput} required />
                    <button type="submit" className="login-submit-btn">Login</button>
                    <p>New User? <a href="/">Register</a></p>
                </div>
            </form>
        </div>
    );
};

export default Login;