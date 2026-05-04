

// Predefined Admin Credentials
const PREDEFINED_ADMIN = {
    email: "admin@example.com",
    password: "admin123",
    role: "admin"
};

export const registerUser = (user) => {
    const localData = localStorage.getItem("user");
    const currentUsers = localData ? JSON.parse(localData) : [];
    const newUser = { ...user, role: "user" }; // Force "user" role for signups
    const updatedUsers = [...currentUsers, newUser];
    localStorage.setItem("user", JSON.stringify(updatedUsers));
    return true;
};

export const loginUser = (email, password, selectedRole) => {
    // 1. Check if trying to login as Admin with  credentials
    if (selectedRole === "admin") {
        if (email === PREDEFINED_ADMIN.email && password === PREDEFINED_ADMIN.password) {
            localStorage.setItem("isAuth", "true");
            localStorage.setItem("currentUser", JSON.stringify(PREDEFINED_ADMIN));
            return { success: true, role: "admin" };
        }
        return { success: false, message: "Invalid Admin Credentials" };
    }

    // 2. Check if trying to login as regular User from LocalStorage
    const storedUsers = JSON.parse(localStorage.getItem("user") || "[]");
    const userMatch = storedUsers.find(
        (u) => u.email === email && u.password === password
    );

    if (userMatch) {
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