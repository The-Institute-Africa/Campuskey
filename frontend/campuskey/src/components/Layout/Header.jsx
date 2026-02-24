import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  LogOut,
  Home,
  Building,
  Phone,
  HelpCircle,
  LayoutDashboard,
  User,
  MessageCircle,
  Info
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { useAuth } from '@/pages/auth/api/store/auth.store';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  /* =========================
     ROLE NORMALIZATION
  ========================== */
  const roles = user?.roles ?? [];

  const getUserRole = () => {
    if (roles.includes('ROLE_ADMIN')) return 'ADMIN';
    if (roles.includes('ROLE_LANDLORD')) return 'LANDLORD';
    if (roles.includes('ROLE_STUDENT')) return 'STUDENT';
    return null;
  };

  const userRole = getUserRole();

  /* =========================
     ACTIONS
  ========================== */
  const handleLogout = () => {
    logout();
    toast({
      title: 'Logged out successfully',
      description: 'You have been logged out of your account.',
    });
    navigate('/');
  };

  const handleDashboardClick = () => {
    if (userRole === 'STUDENT') navigate('/student');
    if (userRole === 'LANDLORD') navigate('/landlord');
    if (userRole === 'ADMIN') navigate('/admin');
  };

  /* =========================
     ROLE BASED MENUS
  ========================== */
  const menuByRole = {
    STUDENT: [
      { label: 'Profile', icon: User, action: () => navigate('student/profile') },
      { label: 'Messages', icon: MessageCircle, action: () => navigate('student/messages') },
      { label: 'Dashboard', icon: LayoutDashboard, action: handleDashboardClick },
      { label: 'Need Help', icon: HelpCircle, action: () => navigate('/help') },
    ],
    LANDLORD: [
      { label: 'Profile', icon: User, action: () => navigate('account') },
      { label: 'Messages', icon: MessageCircle, action: () => navigate('messages') },
      { label: 'Dashboard', icon: LayoutDashboard, action: handleDashboardClick },
      { label: 'Need Help', icon: HelpCircle, action: () => navigate('/help') },
    ],
    ADMIN: [
      { label: 'Dashboard', icon: LayoutDashboard, action: handleDashboardClick },
      { label: 'Need Help', icon: HelpCircle, action: () => navigate('/help') },
    ],
  };

  return (
    <header className="bg-background/95 backdrop-blur-sm shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 campus-gradient rounded-lg flex items-center justify-center">
              <Building className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold campus-text-gradient">
              CampusKey
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="nav-link flex items-center gap-1">
              <Home className="h-4 w-4" /> Home
            </Link>

            <Link to="/properties" className="nav-link flex items-center gap-1">
              <Building className="h-4 w-4" /> Properties
            </Link>

            <Link to="/about" className="nav-link flex items-center gap-1">
              <Info className="h-4 w-4" /> About
            </Link>

            <Link to="/contact" className="nav-link flex items-center gap-1">
              <Phone className="h-4 w-4" /> Contact
            </Link>

            <Link to="/help" className="nav-link flex items-center gap-1">
              <HelpCircle className="h-4 w-4" /> Help
            </Link>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center space-x-4">
            {/* Desktop Avatar Menu */}
            {user ? (
              <div className="relative hidden md:block">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="w-9 h-9 rounded-full bg-muted flex items-center justify-center hover:ring-2 hover:ring-primary transition"
                >
                  <User className="h-5 w-5" />
                </button>

                <AnimatePresence>
                  {isUserMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      className="absolute right-0 mt-2 w-52 rounded-md border border-border bg-background shadow-lg z-50"
                    >
                      <div className="px-4 py-2 text-sm border-b font-medium">
                        {user.name || user.email}
                      </div>

                      {menuByRole[userRole]?.map((item) => (
                        <button
                          key={item.label}
                          onClick={() => {
                            item.action();
                            setIsUserMenuOpen(false);
                          }}
                          className="w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-muted"
                        >
                          <item.icon className="h-4 w-4" />
                          {item.label}
                        </button>
                      ))}

                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-muted border-t"
                      >
                        <LogOut className="h-4 w-4" />
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Button variant="outline" size="sm" onClick={() => navigate('/login')}>
                Login
              </Button>
            )}

            {/* Mobile Toggle */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden py-4 border-t border-border"
            >
              <div className="flex flex-col space-y-4">
                <Link to="/" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2">
                  <Home className="h-4 w-4" /> Home
                </Link>

                <Link to="/properties" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2">
                  <Building className="h-4 w-4" /> Properties
                </Link>

                <Link to="/about" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2">
                  <Info className="h-4 w-4" /> About
                </Link>

                <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2">
                  <Phone className="h-4 w-4" /> Contact
                </Link>

                <Link to="/help" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2">
                  <HelpCircle className="h-4 w-4" /> Help
                </Link>

                {user && (
                  <div className="pt-4 border-t space-y-2">
                    {menuByRole[userRole]?.map((item) => (
                      <Button
                        key={item.label}
                        variant="outline"
                        size="sm"
                        className="w-full"
                        onClick={() => {
                          item.action();
                          setIsMenuOpen(false);
                        }}
                      >
                        <item.icon className="h-4 w-4 mr-2" />
                        {item.label}
                      </Button>
                    ))}

                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full text-red-500"
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </Button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;
