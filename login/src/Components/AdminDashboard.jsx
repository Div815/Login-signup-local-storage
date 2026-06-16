import React, { useState, useEffect } from 'react';
import { logout } from '../Utils/auth';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar'; // 🟢 Imported your custom navigation bar
import { useTheme } from '../context/ThemeContext'; // 🟢 Listening to your context state
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
    TrendingUp,
    ChevronRight
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
    infoDark: "border-cyan-500/30 bg-cyan-500/5 text-cyan-400",
    infoLight: "border-emerald-500/30 bg-emerald-500/5 text-emerald-600",
};

const AdminDashboard = () => {
    const { theme } = useTheme(); // 🟢 Destructured active color scheme status
    const isDark = theme === 'dark';
    
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
        text: `New user '${user.name}' joined the platform`,
        time: "2m ago", 
    }));

    // 🟢 Dynamic Chart configuration adapting color transparency layers 
    const chartData = {
        labels: ['Total Metrics', 'Active Pool', 'Restricted'],
        datasets: [{
            label: 'Users',
            data: [totalUsers, activeUsers, blockedUsers],
            backgroundColor: isDark 
                ? ['rgba(34, 211, 238, 0.2)', 'rgba(20, 184, 166, 0.2)', 'rgba(244, 63, 94, 0.2)']
                : ['rgba(16, 185, 129, 0.15)', 'rgba(20, 184, 166, 0.15)', 'rgba(239, 68, 68, 0.15)'],
            borderColor: isDark
                ? ['#22d3ee', '#14b8a6', '#f43f5e']
                : ['#10b981', '#14b8a6', '#ef4444'],
            borderWidth: 1.5,
            borderRadius: 8,
            barThickness: 24,
        }],
    };

    const chartOptions = {
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
            y: { 
                grid: { color: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.04)' },
                ticks: { color: isDark ? "#9ca3af" : "#4b5563", font: { family: 'Questrial' } } 
            },
            x: { 
                grid: { display: false },
                ticks: { color: isDark ? "#9ca3af" : "#4b5563", font: { family: 'Questrial' } } 
            }
        }
    };

    const saveAndUpdate = (newData) => {
        localStorage.setItem('users', JSON.stringify(newData));
        setUsers(newData);
    };

    const handleDelete = (email) => {
        if (window.confirm("Are you sure you want to permanently remove this user?")) {
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
        <div className={`flex flex-col min-h-screen font-questrial antialiased transition-colors duration-500 w-full
            ${isDark ? 'bg-[#0b0f19] text-slate-100' : 'bg-[#f8fafc] text-slate-900'}`}>
            
            {/* Top Navigation Bar */}
            <NavBar />

            {/* Split Screen Container layout */}
            <div className="flex flex-1 w-full relative">
                
                {/* Responsive Left Sidebar */}
                <aside className={`fixed top-20 left-0 h-[calc(100vh-5rem)] w-64 backdrop-blur-xl hidden md:flex flex-col p-6 z-20 transition-all duration-500 border-r
                    ${isDark ? 'bg-[#0f172a]/60 border-slate-800 text-zinc-100' : 'bg-white/80 border-slate-200 text-slate-800'}`}>
                    
                    <div className="flex items-center gap-3 mb-10 px-2">
                        <div className={`p-2 rounded-xl border transition-colors ${isDark ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20' : 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20'}`}>
                            <ShieldCheck size={22} />
                        </div>
                        <h2 className={`text-xl font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                            Admin<span className={isDark ? 'text-cyan-400' : 'text-emerald-500'}>Pro</span>
                        </h2>
                    </div>

                    <nav className="flex-1 space-y-1.5">
                        <SidebarItem icon={<LayoutDashboard size={18}/>} label="Dashboard" active isDark={isDark} />
                        <SidebarItem icon={<BarChart3 size={18}/>} label="Analytics" isDark={isDark} />
                        <SidebarItem icon={<Settings size={18}/>} label="Settings" isDark={isDark} />
                    </nav>

                    <button 
                        onClick={() => { logout(); navigate("/login"); }}
                        className={`flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold transition-all duration-300 cursor-pointer text-sm border
                            ${isDark 
                                ? 'bg-slate-800/50 hover:bg-rose-950/40 border-slate-700/50 hover:border-rose-500/30 text-slate-300 hover:text-rose-400' 
                                : 'bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-600 border-slate-200 hover:border-rose-200'}`}
                    >
                        <LogOut size={16} /> Logout Session
                    </button>
                </aside>

                {/* Right Interactive Workspace */}
                <main className="flex-1 min-h-[calc(100vh-5rem)] p-6 md:p-10 md:pl-72 w-full mt-20 transition-all duration-500">
                    
                    {/* Workspace Header Subsections */}
                    <header className={`flex justify-between items-center mb-10 pb-5 border-b ${isDark ? 'border-slate-800/60' : 'border-slate-200'}`}>
                        <div>
                            <h1 className={`text-2xl md:text-3xl font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>Dashboard Overview</h1>
                            <p className={`text-sm mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Real-time control center & platform metrics.</p>
                        </div>
                        <div className={`relative p-2.5 border rounded-xl transition cursor-pointer group
                            ${isDark ? 'bg-slate-800/40 border-slate-700/50 hover:bg-slate-800/80' : 'bg-white border-slate-200 hover:bg-slate-50'}`}>
                            <span className={`absolute -top-1 -right-1 text-[10px] rounded-full h-4 w-4 flex items-center justify-center font-black ring-4 
                                ${isDark ? 'bg-cyan-500 text-slate-950 ring-[#0b0f19]' : 'bg-emerald-500 text-white ring-[#f8fafc]'}`}>
                                {dynamicNotifications.length}
                            </span>
                            <Bell className={`transition ${isDark ? 'text-slate-300 group-hover:text-cyan-400' : 'text-slate-600 group-hover:text-emerald-500'}`} size={18} />
                        </div>
                    </header>

                    {/* Analytics Summary Parameter Layout */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
                        <StatCard icon={<Users size={20}/>} title="Total Profiles" value={totalUsers} percentage="+4.2%" trendColor={isDark ? "text-cyan-400" : "text-emerald-600"} bgAccent={isDark ? "bg-blue-500/10 text-blue-400" : "bg-blue-500/5 text-blue-600"} isDark={isDark} />
                        <StatCard icon={<ShieldCheck size={20}/>} title="Active Status" value={activeUsers} percentage="Live" trendColor={isDark ? "text-teal-400" : "text-teal-600"} bgAccent={isDark ? "bg-emerald-500/10 text-emerald-400" : "bg-emerald-500/5 text-emerald-600"} isDark={isDark} />
                        <StatCard icon={<ShieldAlert size={20}/>} title="Restricted Access" value={blockedUsers} percentage="Filtered" trendColor="text-slate-400" bgAccent={isDark ? "bg-rose-500/10 text-rose-400" : "bg-rose-500/5 text-rose-600"} isDark={isDark} />
                        <StatCard icon={<TrendingUp size={20}/>} title="Platform Growth" value="+14%" percentage="Monthly" trendColor={isDark ? "text-cyan-400" : "text-emerald-600"} bgAccent={isDark ? "bg-amber-500/10 text-amber-400" : "bg-amber-500/5 text-amber-600"} isDark={isDark} />
                    </div>

                    {/* Data Matrices Plots Row */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                        <div className={`lg:col-span-2 p-6 rounded-2xl border shadow-sm transition-all duration-500
                            ${isDark ? 'bg-[#111726] border-slate-800/80 shadow-black/20' : 'bg-white border-slate-200'}`}>
                            <h3 className={`text-base font-bold mb-6 flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-800'}`}>
                                <span className={`h-2 w-2 rounded-full ${isDark ? 'bg-cyan-400' : 'bg-emerald-500'}`}></span> User Lifecycle Analysis
                            </h3>
                            <div className="h-64">
                                <Bar data={chartData} options={chartOptions} />
                            </div>
                        </div>

                        <div className={`p-6 rounded-2xl border shadow-sm flex flex-col transition-all duration-500
                            ${isDark ? 'bg-[#111726] border-slate-800/80 shadow-black/20' : 'bg-white border-slate-200'}`}>
                            <h3 className={`text-base font-bold mb-5 flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-800'}`}>
                                <span className={`h-2 w-2 rounded-full ${isDark ? 'bg-amber-400' : 'bg-amber-500'}`}></span> Live Activity Stream
                            </h3>
                            <div className="space-y-3 flex-1 overflow-y-auto max-h-[250px] pr-1">
                                {dynamicNotifications.map((note, index) => (
                                    <NotificationItem key={index} text={note.text} time={note.time} isDark={isDark} />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Operational Management Database Table Area */}
                    <div className={`rounded-2xl border shadow-sm overflow-hidden transition-all duration-500
                        ${isDark ? 'bg-[#111726] border-slate-800/80 shadow-black/20' : 'bg-white border-slate-200'}`}>
                        <div className={`p-6 border-b flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${isDark ? 'border-slate-800/60' : 'border-slate-200'}`}>
                            <div>
                                <h3 className={`text-base font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>Identity Access Control</h3>
                                <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Modify user security dimensions and profile statuses.</p>
                            </div>
                            <div className="relative">
                                <Search className={`absolute left-3.5 top-3.5 ${isDark ? 'text-slate-500' : 'text-slate-400'}`} size={14} />
                                <input 
                                    type="text" 
                                    placeholder="Search credentials..." 
                                    className={`pl-10 pr-4 py-2.5 border text-sm rounded-xl outline-none w-full sm:w-64 transition-all duration-300
                                        ${isDark 
                                            ? 'bg-[#0f1322] border-slate-800 text-white focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/10' 
                                            : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/10'}`}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>
                        
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead className={`uppercase text-[10px] font-black tracking-wider border-b ${isDark ? 'bg-[#0f1322] text-slate-400 border-slate-800' : 'bg-slate-50 text-slate-500 border-slate-200'}`}>
                                    <tr>
                                        <th className="px-6 py-4">User Metadata</th>
                                        <th className="px-6 py-4">Status Token</th>
                                        <th className="px-6 py-4 text-right">Actions Panel</th>
                                    </tr>
                                </thead>
                                <tbody className={`divide-y ${isDark ? 'divide-slate-800/50' : 'divide-slate-200/60'}`}>
                                    {filteredUsers.length === 0 ? (
                                        <tr>
                                            <td colSpan="3" className="px-6 py-10 text-center text-slate-500 text-sm">No user accounts indexed matching conditions.</td>
                                        </tr>
                                    ) : (
                                        filteredUsers.map((user, idx) => (
                                            <tr key={idx} className={`transition-colors group ${isDark ? 'hover:bg-slate-800/20' : 'hover:bg-slate-50'}`}>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className={`h-9 w-9 rounded-xl border flex items-center justify-center font-bold text-xs transition-colors
                                                            ${isDark 
                                                                ? 'bg-slate-800 border-slate-700/60 text-cyan-400 group-hover:text-cyan-300' 
                                                                : 'bg-slate-100 border-slate-200 text-emerald-600 group-hover:text-emerald-700'}`}>
                                                            {user.name ? user.name.substring(0, 2).toUpperCase() : "US"}
                                                        </div>
                                                        <div>
                                                            <div className={`font-semibold text-sm transition-colors ${isDark ? 'text-white group-hover:text-cyan-400' : 'text-slate-800 group-hover:text-emerald-600'}`}>{user.name}</div>
                                                            <div className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{user.email}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium border ${
                                                        user.status === 'blocked' 
                                                            ? 'bg-rose-500/5 border-rose-500/20 text-rose-400' 
                                                            : (isDark ? 'bg-cyan-500/5 border-cyan-500/20 text-cyan-400' : 'bg-emerald-50/60 border-emerald-500/20 text-emerald-600')
                                                    }`}>
                                                        <span className={`h-1.5 w-1.5 rounded-full ${user.status === 'blocked' ? 'bg-rose-400' : (isDark ? 'bg-cyan-400' : 'bg-emerald-500')}`}></span>
                                                        {user.status || 'active'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-right space-x-2">
                                                    <button 
                                                        onClick={() => toggleBlock(user.email)} 
                                                        className={`p-2 rounded-xl border transition-all hover:scale-105 cursor-pointer text-sm
                                                            ${isDark 
                                                                ? 'bg-slate-800/40 border-slate-700/50 hover:bg-slate-700/60 text-cyan-400' 
                                                                : 'bg-white border-slate-200 hover:bg-slate-50 text-emerald-600'}`}
                                                    >
                                                        {user.status === 'blocked' ? <ShieldCheck size={14}/> : <ShieldAlert size={14}/>}
                                                    </button>
                                                    <button 
                                                        onClick={() => handleDelete(user.email)} 
                                                        className={`p-2 rounded-xl border transition-all hover:scale-105 cursor-pointer text-sm text-rose-400
                                                            ${isDark ? 'bg-slate-800/40 border-slate-700/50 hover:bg-rose-500/10' : 'bg-white border-slate-200 hover:bg-rose-50'}`}
                                                    >
                                                        <Trash2 size={14} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

// Component Helpers Matrix
const SidebarItem = ({ icon, label, active = false, isDark }) => (
    <div className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all duration-300 group border ${
        active 
            ? (isDark 
                ? 'bg-gradient-to-r from-cyan-500/20 to-teal-500/5 border-cyan-500/20 text-cyan-400 font-bold' 
                : 'bg-gradient-to-r from-emerald-500/10 to-teal-500/5 border-emerald-500/20 text-emerald-600 font-bold')
            : (isDark
                ? 'text-slate-400 hover:bg-slate-800/40 hover:text-white border-transparent'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 border-transparent')
    }`}>
        <div className="flex items-center gap-3">
            <span className={active ? '' : (isDark ? 'text-slate-400 group-hover:text-cyan-400' : 'text-slate-500 group-hover:text-emerald-600')}>{icon}</span>
            <span className="text-sm tracking-tight">{label}</span>
        </div>
        {active && <ChevronRight size={14} className={isDark ? "text-cyan-400/70" : "text-emerald-500/70"} />}
    </div>
);

const StatCard = ({ icon, title, value, percentage, bgAccent, trendColor, isDark }) => (
    <div className={`p-5 rounded-2xl border transition-all duration-300 shadow-sm flex flex-col justify-between
        ${isDark ? 'bg-[#111726] border-slate-800/80 hover:border-slate-700/80' : 'bg-white border-slate-200 hover:border-slate-300/70'}`}>
        <div className="flex justify-between items-center mb-4">
            <p className={`text-xs font-bold tracking-tight uppercase ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{title}</p>
            <div className={`p-2 rounded-xl text-xs ${bgAccent}`}>{icon}</div>
        </div>
        <div className="flex items-baseline gap-2">
            <p className={`text-2xl font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-800'}`}>{value}</p>
            <span className={`text-[11px] font-bold ${trendColor}`}>{percentage}</span>
        </div>
    </div>
);

const NotificationItem = ({ text, time, isDark }) => (
    <div className={`flex items-start p-3 rounded-xl border-l-2 transition-all duration-300 hover:translate-x-1
        ${isDark 
            ? 'border-cyan-500/30 bg-cyan-500/5 text-slate-200' 
            : 'border-emerald-500/30 bg-emerald-500/5 text-slate-700'}`}>
        <div className="flex-1">
            <p className={`text-xs font-semibold tracking-tight ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>{text}</p>
            <p className={`text-[10px] mt-1 font-bold ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>{time}</p>
        </div>
    </div>
);

export default AdminDashboard;