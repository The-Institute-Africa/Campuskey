import React from 'react';
import { Link } from 'react-router-dom';
import { Building2 } from 'lucide-react';

const Footer = () => {
    const footerLinkClasses = "text-sm text-gray-500 hover:text-campus-blue dark:text-gray-400 dark:hover:text-white transition-colors";

    return (
        <footer className="bg-gray-50 dark:bg-gray-900 border-t">
            <div className="container py-12">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
                    <div className="col-span-2 lg:col-span-1">
                         <Link to="/" className="flex items-center gap-2 font-bold text-xl text-campus-blue">
                            <Building2 className="h-7 w-7" />
                            <span>Campus Key</span>
                        </Link>
                        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                            Your key to student accommodation in Zimbabwe.
                        </p>
                    </div>

                    <div>
                        <p className="font-semibold text-gray-800 dark:text-white">Quick Links</p>
                        <ul className="mt-4 space-y-2">
                            <li><Link to="/properties" className={footerLinkClasses}>Find a Home</Link></li>
                            <li><Link to="/about" className={footerLinkClasses}>About Us</Link></li>
                            <li><Link to="/student-guide" className={footerLinkClasses}>Student Guide</Link></li>
                            <li><Link to="/help" className={footerLinkClasses}>FAQs</Link></li>
                        </ul>
                    </div>
                     <div>
                        <p className="font-semibold text-gray-800 dark:text-white">For Landlords</p>
                        <ul className="mt-4 space-y-2">
                            <li><Link to="/signup" className={footerLinkClasses}>List a Property</Link></li>
                            <li><Link to="/login" className={footerLinkClasses}>Login</Link></li>
                        </ul>
                    </div>
                     <div>
                        <p className="font-semibold text-gray-800 dark:text-white">Legal</p>
                        <ul className="mt-4 space-y-2">
                            <li><Link to="/terms" className={footerLinkClasses}>Terms & Conditions</Link></li>
                            <li><Link to="/privacy" className={footerLinkClasses}>Privacy Policy</Link></li>
                            <li><Link to="/disclaimer" className={footerLinkClasses}>Disclaimer</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t flex flex-col sm:flex-row justify-between items-center">
                    <p className="text-sm text-gray-500 dark:text-gray-400">&copy; {new Date().getFullYear()} Campus Key Zimbabwe. All rights reserved.</p>
                    <span className="mt-4 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">Created by The Institute</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
