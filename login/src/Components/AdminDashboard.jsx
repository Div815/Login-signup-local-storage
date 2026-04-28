import React from 'react';
import { logout } from '../Utils/auth';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        logout(); 
        navigate("/login");
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1>Admin Dashboard</h1>
            <p>Welcome, Admin! You can manage users here.</p>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};
export default AdminDashboard;