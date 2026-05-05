import React, { useState, useEffect } from 'react';
import { logout } from '../Utils/auth';
import { useNavigate } from 'react-router-dom';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("All");

    useEffect(() => {
        const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
        setUsers(storedUsers);
    }, []);

    // Analytics Calculations
    const totalUsers = users.length;
    const activeUsers = users.filter(u => u.status === 'active').length;
    const blockedUsers = users.filter(u => u.status === 'blocked').length;

    // Filter Logic
    const filteredUsers = users.filter(user => {
        const matchesSearch = user.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              user.email?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === "All" || user.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    const chartData = {
        labels: ['Total', 'Active', 'Blocked'],
        datasets: [{
            label: 'User Statistics',
            data: [totalUsers, activeUsers, blockedUsers],
            backgroundColor: ['#3b82f6', '#10b981', '#ef4444'],
            borderRadius: 6,
        }],
    };

    // Actions
    const saveAndUpdate = (newData) => {
        localStorage.setItem('users', JSON.stringify(newData));
        setUsers(newData);
    };

    const handleDelete = (email) => {
        if (window.confirm("Delete this user permanently?")) {
            saveAndUpdate(users.filter(u => u.email !== email));
        }
    };

    const toggleBlock = (email) => {
        const updated = users.map(u => u.email === email 
            ? { ...u, status: u.status === 'blocked' ? 'active' : 'blocked' } 
            : u
        );
        saveAndUpdate(updated);
    };

    return (
        <div className="flex min-h-screen bg-gray-100 font-sans">
            {/* Sidebar */}
            <aside className="w-64 bg-slate-900 text-white hidden md:flex flex-col p-6">
                <h2 className="text-2xl font-bold mb-8">AdminPro</h2>
                <nav className="flex-1 space-y-4">
                    <div className="hover:bg-slate-800 p-2 rounded cursor-pointer transition">Dashboard</div>
                    <div className="hover:bg-slate-800 p-2 rounded cursor-pointer transition">Analytics</div>
                    <div className="hover:bg-slate-800 p-2 rounded cursor-pointer transition">Settings</div>
                </nav>
                <button 
                    onClick={() => { logout(); navigate("/login"); }}
                    className="mt-auto bg-red-500 hover:bg-red-600 p-2 rounded font-semibold transition"
                >
                    Logout
                </button>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-4 md:p-8 overflow-y-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Dashboard Overview</h1>
                    <div className="relative">
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">3</span>
                        <button className="text-2xl text-gray-600">🔔</button>
                    </div>
                </div>

                {/* 1. Statistics Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <StatCard title="Total Users" value={totalUsers} color="border-blue-500" />
                    <StatCard title="Active Users" value={activeUsers} color="border-green-500" />
                    <StatCard title="Blocked Users" value={blockedUsers} color="border-red-500" />
                    <StatCard title="Monthly Growth" value="+14%" color="border-purple-500" />
                </div>

                {/* 2. Charts & Notifications Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                    <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                        <h3 className="text-lg font-bold mb-4">User Activity Analytics</h3>
                        <div className="h-64">
                            <Bar data={chartData} options={{ maintainAspectRatio: false }} />
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                        <h3 className="text-lg font-bold mb-4">Notifications Panel</h3>
                        <div className="space-y-4">
                            <NotificationItem text="New user 'Sarah' joined" time="2 min ago" color="bg-blue-100" />
                            <NotificationItem text="Backup completed successfully" time="1 hr ago" color="bg-green-100" />
                            <NotificationItem text="High traffic alert" time="3 hrs ago" color="bg-yellow-100" />
                        </div>
                    </div>
                </div>

                {/* 3. User Management Table */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="p-6 border-b border-gray-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <h3 className="text-lg font-bold">User Management</h3>
                        <div className="flex gap-2">
                            <input 
                                type="text" 
                                placeholder="Search email/name..." 
                                className="border rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <select 
                                className="border rounded-lg px-3 py-2 text-sm outline-none"
                                onChange={(e) => setFilterStatus(e.target.value)}
                            >
                                <option value="All">All</option>
                                <option value="active">Active</option>
                                <option value="blocked">Blocked</option>
                            </select>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 text-gray-600 uppercase text-xs font-semibold">
                                <tr>
                                    <th className="px-6 py-4">User</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filteredUsers.map((user, idx) => (
                                    <tr key={idx} className="hover:bg-gray-50 transition">
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-gray-800">{user.name}</div>
                                            <div className="text-sm text-gray-500">{user.email}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                                user.status === 'blocked' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'
                                            }`}>
                                                {user.status || 'active'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 space-x-2">
                                            <button 
                                                onClick={() => toggleBlock(user.email)}
                                                className="text-sm bg-indigo-50 text-indigo-600 px-3 py-1 rounded hover:bg-indigo-100"
                                            >
                                                {user.status === 'blocked' ? 'Unblock' : 'Block'}
                                            </button>
                                            <button 
                                                onClick={() => handleDelete(user.email)}
                                                className="text-sm bg-red-50 text-red-600 px-3 py-1 rounded hover:bg-red-100"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
};

// Sub-components for cleaner code
const StatCard = ({ title, value, color }) => (
    <div className={`bg-white p-6 rounded-xl shadow-sm border-l-4 ${color}`}>
        <p className="text-sm text-gray-500 font-medium">{title}</p>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
    </div>
);

const NotificationItem = ({ text, time, color }) => (
    <div className={`flex items-start p-3 rounded-lg ${color}`}>
        <div className="flex-1">
            <p className="text-sm font-medium text-gray-800">{text}</p>
            <p className="text-xs text-gray-500">{time}</p>
        </div>
    </div>
);

export default AdminDashboard;