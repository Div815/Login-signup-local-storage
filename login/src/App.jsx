import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import Login from './Components/Login'; 
import Signup from './Components/Signup'; 
import Home from './Components/Home';
import AdminDashboard from './Components/AdminDashboard'; // You will create this
import { ProtectedRoute, AdminRoute } from './Utils/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path='/' element={<Signup />} />
        <Route path='/login' element={<Login />} />

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
  );
}

export default App;