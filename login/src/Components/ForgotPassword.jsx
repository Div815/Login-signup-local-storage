import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const navigate = useNavigate();

    const handleReset = (e) => {
        e.preventDefault();
        const users = JSON.parse(localStorage.getItem("user") || "[]");
        const userIndex = users.findIndex(u => u.email === email);

        if (userIndex !== -1) {
            users[userIndex].password = newPassword;
            localStorage.setItem("user", JSON.stringify(users));
            toast.success("Password updated successfully!");
            setTimeout(() => navigate("/login"), 1500);
        } else {
            toast.error("Email not found");
        }
    };

    return (
        <div className='main'>
            <Toaster />
            <form onSubmit={handleReset}>
                <p>Reset Password</p>
                <input type="email" placeholder="Enter Registered Email" onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" placeholder="Enter New Password" onChange={(e) => setNewPassword(e.target.value)} required />
                <button type="submit">Update Password</button>
            </form>
        </div>
    );
};

export default ForgotPassword;