import { Navigate } from "react-router-dom";
import { isAuthenticated, getUserRole } from "./auth";

// Protects routes from unauthenticated users
export const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated()) {
        return <Navigate to="/login" />;
    }
    return children;
};

// Protects routes specifically for Admin users
export const AdminRoute = ({ children }) => {
    const isAuth = isAuthenticated();
    const role = getUserRole();

    if (!isAuth) return <Navigate to="/login" />;
    if (role !== "admin") return <Navigate to="/home" />; // Redirect regular users to Home

    return children;
};