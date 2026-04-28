import React, { useState } from 'react';
import '../Components/Signup.css';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { registerUser } from '../Utils/auth';

const Signup = () => {
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        role: "user" 
    });

    const navigate = useNavigate();

    
    const handleInput = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (data.name && data.email && data.password) {
            registerUser(data); 
            toast.success("User registered Successfully"); 
            await new Promise(res => setTimeout(res, 1500));
            navigate("/login"); 
        } else {
            toast.error("Please fill all fields");
        }
    };

    return (
        <div className='main'>
            <Toaster />
            <form onSubmit={handleSubmit}>
                <div className='heading'>
                    <p>Signup</p>
                </div>
                <div className='account'>
                    <input type='text' name="name" placeholder='Enter your name' onChange={handleInput} required />
                    <input type='email' name="email" placeholder='Enter your email' onChange={handleInput} required />
                    <input type='password' name="password" placeholder='Enter password' onChange={handleInput} required />
                    
                    

                    <p>Already have an account? <a href="/login">Login</a></p>
                </div>
                <button type="submit">SignUp</button>
            </form>
        </div>
    );
}

export default Signup;