import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import { Toaster } from 'react-hot-toast'; 
import Login from './Components/Login'; 
import Signup from './Components/Signup'; 
import LandingPage from './Components/LandingPage';
import Home from './Components/Home';
import ForgotPassword from './Components/ForgotPassword';
import AdminDashboard from './Components/AdminDashboard'; 
import { ProtectedRoute, AdminRoute } from './Utils/ProtectedRoute';
import './index.css';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
    <BrowserRouter>
    
      <Toaster/>
      
      <Routes>
        {/* Public Routes */}
        <Route path='/' element={<LandingPage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        
        {/* Protected User Route */}
        <Route path='/home' element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } />

        {/* Protected Admin Route */}
        <Route path='/admin' element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        } />
      </Routes>
     
    </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;