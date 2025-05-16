import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, QrCode, LogOut } from 'lucide-react';
import { useTray } from '../../context/TrayContext';
import { useAuth } from '../../context/AuthContext';

const Header: React.FC = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { getTotalItems } = useTray();
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className="flex items-center">
              <QrCode size={24} className="text-green-500 mr-2" />
              <span className="font-bold text-xl">Scan-n-Go</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/scan" className="text-gray-700 hover:text-green-500 transition-colors">
              Scan QR
            </Link>
            {isAdmin && (
              <Link to="/admin" className="text-gray-700 hover:text-green-500 transition-colors">
                Admin
              </Link>
            )}
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-700">{user.name}</span>
                <button
                  onClick={handleLogout}
                  className="flex items-center text-gray-700 hover:text-red-500 transition-colors"
                >
                  <LogOut size={18} className="mr-1" />
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/login" className="flex items-center text-gray-700 hover:text-green-500 transition-colors">
                <User size={18} className="mr-1" />
                Login
              </Link>
            )}
            <Link to="/tray" className="relative">
              <ShoppingCart size={24} className="text-gray-700 hover:text-green-500 transition-colors" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </Link>
          </nav>

          {/* Mobile Icons */}
          <div className="flex items-center md:hidden">
            <Link to="/tray" className="relative mr-4">
              <ShoppingCart size={24} className="text-gray-700" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </Link>
            <button
              onClick={() => setIsNavOpen(!isNavOpen)}
              className="text-gray-700 focus:outline-none"
            >
              {isNavOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isNavOpen && (
        <div className="md:hidden bg-white shadow-md absolute top-full left-0 right-0 z-50">
          <div className="container mx-auto px-4 py-3">
            <nav className="flex flex-col space-y-3">
              <Link 
                to="/scan" 
                className="text-gray-700 py-2 hover:text-green-500 transition-colors"
                onClick={() => setIsNavOpen(false)}
              >
                Scan QR
              </Link>
              {isAdmin && (
                <Link 
                  to="/admin" 
                  className="text-gray-700 py-2 hover:text-green-500 transition-colors"
                  onClick={() => setIsNavOpen(false)}
                >
                  Admin
                </Link>
              )}
              {user ? (
                <>
                  <span className="text-gray-700 py-2">{user.name}</span>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsNavOpen(false);
                    }}
                    className="flex items-center text-gray-700 py-2 hover:text-red-500 transition-colors"
                  >
                    <LogOut size={18} className="mr-1" />
                    Logout
                  </button>
                </>
              ) : (
                <Link 
                  to="/login" 
                  className="flex items-center text-gray-700 py-2 hover:text-green-500 transition-colors"
                  onClick={() => setIsNavOpen(false)}
                >
                  <User size={18} className="mr-1" />
                  Login
                </Link>
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;