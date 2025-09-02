import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, User, LogOut, Home, Building, Phone, HelpCircle, LayoutDashboard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';
import { ThemeToggle } from '@/components/ThemeToggle';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account.",
    });
    navigate('/');
  };

  const handleDashboardClick = () => {
    if (user.role === 'student') navigate('/student/dashboard');
    if (user.role === 'landlord') navigate('/landlord/dashboard');
    if (user.role === 'admin') navigate('/admin/dashboard');
  };

  return (
    <header className="bg-background/95 backdrop-blur-sm shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 campus-gradient rounded-lg flex items-center justify-center">
              <Building className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold campus-text-gradient">Campus Key Zimbabwe</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-foreground/80 hover:text-foreground transition-colors flex items-center space-x-1">
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Link>
            <Link to="/listings" className="text-foreground/80 hover:text-foreground transition-colors">
              Listings
            </Link>
            <Link to="/about" className="text-foreground/80 hover:text-foreground transition-colors">
              About
            </Link>
            <Link to="/contact" className="text-foreground/80 hover:text-foreground transition-colors flex items-center space-x-1">
              <Phone className="h-4 w-4" />
              <span>Contact</span>
            </Link>
            <Link to="/help" className="text-foreground/80 hover:text-foreground transition-colors flex items-center space-x-1">
              <HelpCircle className="h-4 w-4" />
              <span>Help</span>
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-4">
                  <span className="text-sm">
                    Welcome, {user.name || user.email}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleDashboardClick}
                  >
                    <LayoutDashboard className="h-4 w-4 mr-2" />
                    Dashboard
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleLogout}
                    className="flex items-center space-x-1"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </Button>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate('/student/login')}
                    className="flex items-center space-x-1"
                  >
                    <User className="h-4 w-4" />
                    <span>Student Login</span>
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => navigate('/landlord/login')}
                  >
                    Landlord Login
                  </Button>
                </div>
              )}
            </div>

            <ThemeToggle />
            
            <button
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden py-4 border-t border-border"
          >
            <div className="flex flex-col space-y-4">
              <Link
                to="/"
                className="text-foreground/80 hover:text-foreground transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/listings"
                className="text-foreground/80 hover:text-foreground transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Listings
              </Link>
              <Link
                to="/about"
                className="text-foreground/80 hover:text-foreground transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                to="/contact"
                className="text-foreground/80 hover:text-foreground transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <Link
                to="/help"
                className="text-foreground/80 hover:text-foreground transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Help
              </Link>
              
              {user ? (
                <div className="pt-4 border-t border-border space-y-2">
                  <p className="text-sm">Welcome, {user.name || user.email}</p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      handleDashboardClick();
                      setIsMenuOpen(false);
                    }}
                    className="w-full"
                  >
                    Dashboard
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="w-full"
                  >
                    Logout
                  </Button>
                </div>
              ) : (
                <div className="pt-4 border-t border-border space-y-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      navigate('/student/login');
                      setIsMenuOpen(false);
                    }}
                    className="w-full"
                  >
                    Student Login
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => {
                      navigate('/landlord/login');
                      setIsMenuOpen(false);
                    }}
                    className="w-full"
                  >
                    Landlord Login
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </header>
  );
};

export default Header;