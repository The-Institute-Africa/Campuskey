import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Home, Building2, Info, Phone, LogIn, Sun, Moon, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useTheme } from '@/components/ThemeProvider';
import { motion } from 'framer-motion';

const Header = () => {
  const { toast } = useToast();
  const { theme, setTheme } = useTheme();

  const navLinkStyle = ({ isActive }) =>
    `flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
      isActive
        ? 'bg-campus-blue text-white'
        : 'hover:bg-gray-100 dark:hover:bg-gray-800'
    }`;
  
  const showToast = () => {
    toast({
      title: "🚧 Feature In Progress",
      description: "This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
      duration: 3000,
    });
  };

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl text-campus-blue">
          <Building2 className="h-7 w-7" />
          <span>Campus Key</span>
        </Link>
        <nav className="hidden md:flex items-center gap-4 text-sm font-medium">
          <NavLink to="/" className={navLinkStyle}>
            <Home className="h-4 w-4" /> Home
          </NavLink>
          <NavLink to="/listings" className={navLinkStyle}>
            <Building2 className="h-4 w-4" /> Listings
          </NavLink>
           <NavLink to="/student-guide" className={navLinkStyle}>
            <FileText className="h-4 w-4" /> Student Guide
          </NavLink>
          <NavLink to="/about" className={navLinkStyle}>
            <Info className="h-4 w-4" /> About Us
          </NavLink>
          <NavLink to="/contact" className={navLinkStyle}>
            <Phone className="h-4 w-4" /> Contact
          </NavLink>
        </nav>
        <div className="flex items-center gap-2">
           <Button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} variant="ghost" size="icon">
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
          <Button onClick={showToast} className="bg-campus-green hover:bg-campus-green/90 text-white hidden sm:flex items-center gap-2">
            <LogIn className="h-4 w-4" />
            Login
          </Button>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;