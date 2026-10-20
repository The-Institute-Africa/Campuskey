import React from 'react';
import { Link } from 'react-router-dom';
import { Building, Phone, Mail, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 campus-gradient rounded-lg flex items-center justify-center">
                <Building className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-bold">CampusKey Zimbabwe</span>
            </div>
            <p className="text-gray-300 text-sm">
              Connecting students with quality accommodation across Zimbabwe's universities.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
              <Twitter className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
              <Instagram className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <span className="text-lg font-semibold">Quick Links</span>
            <div className="flex flex-col space-y-2">
              <Link to="/properties" className="text-gray-300 hover:text-white transition-colors text-sm">
                Find Accommodation
              </Link>
              <Link to="/student-guide" className="text-gray-300 hover:text-white transition-colors text-sm">
                Student Guide
              </Link>
              <Link to="/signup" className="text-gray-300 hover:text-white transition-colors text-sm">
                List Your Property
              </Link>
              <Link to="/help" className="text-gray-300 hover:text-white transition-colors text-sm">
                Help Center
              </Link>
            </div>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <span className="text-lg font-semibold">Legal</span>
            <div className="flex flex-col space-y-2">
              <Link to="/terms" className="text-gray-300 hover:text-white transition-colors text-sm">
                Terms & Conditions
              </Link>
              <Link to="/privacy" className="text-gray-300 hover:text-white transition-colors text-sm">
                Privacy Policy
              </Link>
              <Link to="/disclaimer" className="text-gray-300 hover:text-white transition-colors text-sm">
                Disclaimer
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <span className="text-lg font-semibold">Contact Us</span>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-green-500" />
                <span className="text-gray-300 text-sm">+263 77 459 2474</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-green-500" />
                <span className="text-gray-300 text-sm">info@campuskeyzim.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-green-500" />
                <span className="text-gray-300 text-sm">Bulawayo, Zimbabwe</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2025 CampusKey Zimbabwe. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
