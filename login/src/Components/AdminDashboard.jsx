import React, { useState, useEffect } from 'react';
import { logout } from '../Utils/auth';
import { useNavigate } from 'react-router-dom';
import { 
    LayoutDashboard, 
    BarChart3, 
    Settings, 
    LogOut, 
    Bell, 
    Search, 
    Users, 
    Trash2, 
    ShieldAlert, 
    ShieldCheck,
    TrendingUp
} from 'lucide-react';
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

const notificationColors = {
    info: "border-cyan-500 bg-cyan-950 text-cyan-300",
    success: "border-emerald-500 bg-emerald-950 text-emerald-300",
    warning: "border-yellow-500 bg-yellow-950 text-yellow-300",
};

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("All");

    useEffect(() => {
        const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
        setUsers(storedUsers);
    }, []);

    const totalUsers = users.length;
    const activeUsers = users.filter(u => u.status === 'active').length;
    const blockedUsers = users.filter(u => u.status === 'blocked').length;

    const filteredUsers = users.filter(user => {
        const matchesSearch = user.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              user.email?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === "All" || user.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    const dynamicNotifications = [...users].reverse().slice(0, 3).map(user => ({
        text: `New user '${user.name}' joined`,
        time: "Recently", 
        type: "info"
    }));

    const chartData = {
        labels: ['Total', 'Active', 'Blocked'],
        datasets: [{
            label: 'User Statistics',
            data: [totalUsers, activeUsers, blockedUsers],
            backgroundColor: ['#22d3ee', '#10b981', '#f43f5e'],
            borderRadius: 6,
        }],
    };

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
        <div className="flex min-h-screen bg-black font-questrial text-white">
            {/* Sidebar */}
            <aside className="w-64 bg-emerald-950 text-zinc-100 hidden md:flex flex-col p-6">
                <div className="flex items-center gap-2 mb-8 text-emerald-300">
                    <ShieldCheck size={28} />
                    <h2 className="text-2xl font-bold">AdminPro</h2>
                </div>
                <nav className="flex-1 space-y-4">
                    <SidebarItem icon={<LayoutDashboard size={20}/>} label="Dashboard" active />
                    <SidebarItem icon={<BarChart3 size={20}/>} label="Analytics" />
                    <SidebarItem icon={<Settings size={20}/>} label="Settings" />
                </nav>
                <button 
                    onClick={() => { logout(); navigate("/login"); }}
                    className="mt-auto flex items-center justify-center gap-2 bg-rose-900 hover:bg-rose-950 p-2 rounded font-semibold transition text-rose-100"
                >
                    <LogOut size={18} /> Logout
                </button>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-4 md:p-8 overflow-y-auto bg-zinc-950">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-zinc-100">Dashboard Overview</h1>
                    <div className="relative">
                        <span className="absolute -top-1 -right-1 bg-cyan-500 text-black text-[10px] rounded-full h-4 w-4 flex items-center justify-center font-bold">
                            {dynamicNotifications.length}
                        </span>
                        <Bell className="text-cyan-500 cursor-pointer hover:text-cyan-400 transition" size={24} />
                    </div>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <StatCard icon={<Users size={20}/>} title="Total Users" value={totalUsers} color="border-cyan-500" />
                    <StatCard icon={<ShieldCheck size={20}/>} title="Active Users" value={activeUsers} color="border-emerald-500" />
                    <StatCard icon={<ShieldAlert size={20}/>} title="Blocked Users" value={blockedUsers} color="border-rose-500" />
                    <StatCard icon={<TrendingUp size={20}/>} title="Monthly Growth" value="+14%" color="border-cyan-500" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                    <div className="lg:col-span-2 bg-zinc-900 p-6 rounded-xl border border-emerald-950">
                        <h3 className="text-lg font-bold mb-4 text-emerald-300">User Activity Analytics</h3>
                        <div className="h-64">
                            <Bar data={chartData} options={{ 
                                maintainAspectRatio: false,
                                scales: {
                                    y: { ticks: { color: "#71717a" } },
                                    x: { ticks: { color: "#71717a" } }
                                },
                                plugins: { legend: { labels: { color: "#d1d5db" } } }
                            }} />
                        </div>
                    </div>

                    <div className="bg-zinc-900 p-6 rounded-xl border border-emerald-950">
                        <h3 className="text-lg font-bold mb-4 text-emerald-300">Recent Activity</h3>
                        <div className="space-y-4">
                            {dynamicNotifications.map((note, index) => (
                                <NotificationItem key={index} text={note.text} time={note.time} type={note.type} />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Table */}
                <div className="bg-zinc-900 rounded-xl border border-emerald-950 overflow-hidden">
                    <div className="p-6 border-b border-emerald-950 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <h3 className="text-lg font-bold text-emerald-300">User Management</h3>
                        <div className="flex gap-2">
                            <div className="relative">
                                <Search className="absolute left-3 top-2.5 text-emerald-700" size={16} />
                                <input 
                                    type="text" 
                                    placeholder="Search..." 
                                    className="pl-10 pr-4 py-2 bg-emerald-950 border border-emerald-800 text-sm rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none"
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-emerald-950 text-emerald-300 uppercase text-xs">
                                <tr>
                                    <th className="px-6 py-4">User</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-emerald-900">
                                {filteredUsers.map((user, idx) => (
                                    <tr key={idx} className="hover:bg-emerald-950/50 transition">
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-zinc-100">{user.name}</div>
                                            <div className="text-xs text-zinc-500">{user.email}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                                                user.status === 'blocked' ? 'bg-rose-950 text-rose-400' : 'bg-emerald-950 text-emerald-400'
                                            }`}>
                                                {user.status || 'active'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right space-x-3">
                                            <button onClick={() => toggleBlock(user.email)} className="text-cyan-500 hover:text-cyan-300 transition">
                                                {user.status === 'blocked' ? <ShieldCheck size={18}/> : <ShieldAlert size={18}/>}
                                            </button>
                                            <button onClick={() => handleDelete(user.email)} className="text-rose-500 hover:text-rose-300 transition">
                                                <Trash2 size={18} />
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

// Helpers
const SidebarItem = ({ icon, label, active = false }) => (
    <div className={`flex items-center gap-3 p-2 rounded cursor-pointer transition ${active ? 'bg-emerald-800 text-white' : 'text-emerald-500 hover:bg-emerald-900/50 hover:text-emerald-300'}`}>
        {icon}
        <span className="font-medium">{label}</span>
    </div>
);

const StatCard = ({ icon, title, value, color }) => (
    <div className={`bg-zinc-900 p-5 rounded-xl border-l-4 ${color} border-emerald-950`}>
        <div className="flex justify-between items-start mb-2">
            <p className="text-xs text-zinc-500 font-bold uppercase tracking-wider">{title}</p>
            <div className="text-zinc-600">{icon}</div>
        </div>
        <p className="text-2xl font-bold text-zinc-100">{value}</p>
    </div>
);

const NotificationItem = ({ text, time, type }) => (
    <div className={`flex items-start p-3 rounded-lg border-l-4 ${notificationColors[type]}`}>
        <div className="flex-1">
            <p className="text-sm font-medium">{text}</p>
            <p className="text-[10px] opacity-70 uppercase font-bold">{time}</p>
        </div>
    </div>
);

export default AdminDashboard;