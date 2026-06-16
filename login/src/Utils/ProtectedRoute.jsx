import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, database } from "../firebaseConfig"; // 🟢 Make sure paths match your project structure

// Protects routes from unauthenticated users
export const ProtectedRoute = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Automatically listens to Firebase's live auth token handshake
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => unsubscribe(); // Cleanup listener on unmount
    }, []);

    if (loading) {
        return (
            <div className="h-screen w-full flex items-center justify-center bg-primary text-emerald-500 font-bold">
                Loading Session...
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

// Protects routes specifically for Admin users
export const AdminRoute = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);
            
            if (currentUser) {
                try {
                    // Fetch the live authorization role payload directly from Firestore
                    const userDocRef = doc(database, "users", currentUser.uid);
                    const userDocSnap = await getDoc(userDocRef);
                    
                    if (userDocSnap.exists() && userDocSnap.data().role === "admin") {
                        setIsAdmin(true);
                    }
                } catch (error) {
                    console.error("Error verifying admin permissions:", error);
                }
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    if (loading) {
        return (
            <div className="h-screen w-full flex items-center justify-center bg-primary text-cyan-500 font-bold">
                Verifying Credentials...
            </div>
        );
    }

    if (!user) return <Navigate to="/login" replace />;
    if (!isAdmin) return <Navigate to="/home" replace />; // Redirect non-admins to Home

    return children;
};