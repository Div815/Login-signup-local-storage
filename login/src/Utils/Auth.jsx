// Predefined Admin Credentials
const PREDEFINED_ADMIN = {
    email: "admin@example.com",
    password: "admin123",
    role: "admin"
};

export const registerUser = (user) => {
    // Synchronized key to "users"
    const localData = localStorage.getItem("users");
    const currentUsers = localData ? JSON.parse(localData) : [];
    
    // Add metadata for the Admin Dashboard (Status & Date)
    const newUser = { 
        ...user, 
        role: "user", 
        status: "active", // Required for Active/Inactive count
        signupDate: new Date().toISOString() // Required for Growth Reports
    }; 

    const updatedUsers = [...currentUsers, newUser];
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    return true;
};

export const loginUser = (email, password, selectedRole) => {
    // 1. Admin Login Logic
    if (selectedRole === "admin") {
        if (email === PREDEFINED_ADMIN.email && password === PREDEFINED_ADMIN.password) {
            localStorage.setItem("isAuth", "true");
            localStorage.setItem("currentUser", JSON.stringify(PREDEFINED_ADMIN));
            return { success: true, role: "admin" };
        }
        return { success: false, message: "Invalid Admin Credentials" };
    }

    // 2. User Login Logic - Synchronized key to "users"
    const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
    const userMatch = storedUsers.find(
        (u) => u.email === email && u.password === password
    );

    if (userMatch) {
        // Optional: Prevent login if admin has blocked the user
        if (userMatch.status === "blocked") {
            return { success: false, message: "Your account has been blocked." };
        }

        localStorage.setItem("isAuth", "true");
        localStorage.setItem("currentUser", JSON.stringify(userMatch));
        return { success: true, role: "user" };
    }
    
    return { success: false, message: "Invalid User Credentials" };
};

export const isAuthenticated = () => localStorage.getItem("isAuth") === "true";

export const getUserRole = () => {
    const user = JSON.parse(localStorage.getItem("currentUser") || "{}");
    return user.role || null;
};

export const logout = () => {
    localStorage.removeItem("isAuth");
    localStorage.removeItem("currentUser");
};