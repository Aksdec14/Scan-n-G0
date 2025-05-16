import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Pages
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ScanPage from './pages/ScanPage';
import MenuItemPage from './pages/MenuItemPage';
import TrayPage from './pages/TrayPage';
import CheckoutPage from './pages/CheckoutPage';
import SuccessPage from './pages/SuccessPage';
import AdminDashboard from './pages/admin/Dashboard';
import AdminMenuItems from './pages/admin/MenuItems';
import AdminOrders from './pages/admin/Orders';

// Context
import { TrayProvider } from './context/TrayContext';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <Router>
      <AuthProvider>
        <TrayProvider>
          <ToastContainer position="top-center" autoClose={3000} />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/scan" element={<ScanPage />} />
            <Route path="/menu/item/:id" element={<MenuItemPage />} />
            <Route path="/tray" element={<TrayPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/success" element={<SuccessPage />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/menu-items" element={<AdminMenuItems />} />
            <Route path="/admin/orders" element={<AdminOrders />} />
          </Routes>
        </TrayProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;