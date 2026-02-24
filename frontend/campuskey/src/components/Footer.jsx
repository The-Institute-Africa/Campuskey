import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, Facebook, Twitter, Instagram } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const Footer = () => {
    const { toast } = useToast();
    const showToast = (e) => {
        e.preventDefault();
        toast({
            title: "🚧 Feature In Progress",
            description: "This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
            duration: 3000,
        });
    };

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
                            <li><Link to="/listings" className={footerLinkClasses}>Find a Home</Link></li>
                            <li><Link to="/about" className={footerLinkClasses}>About Us</Link></li>
                            <li><Link to="/student-guide" className={footerLinkClasses}>Student Guide</Link></li>
                            <li><a href="#" onClick={showToast} className={footerLinkClasses}>FAQs</a></li>
                        </ul>
                    </div>
                     <div>
                        <p className="font-semibold text-gray-800 dark:text-white">For Landlords</p>
                        <ul className="mt-4 space-y-2">
                            <li><a href="#" onClick={showToast} className={footerLinkClasses}>List a Property</a></li>
                            <li><a href="#" onClick={showToast} className={footerLinkClasses}>Login</a></li>
                            <li><a href="#" onClick={showToast} className={footerLinkClasses}>Agent Login</a></li>
                        </ul>
                    </div>
                     <div>
                        <p className="font-semibold text-gray-800 dark:text-white">Legal</p>
                        <ul className="mt-4 space-y-2">
                            <li><a href="#" onClick={showToast} className={footerLinkClasses}>Terms & Conditions</a></li>
                            <li><a href="#" onClick={showToast} className={footerLinkClasses}>Privacy Policy</a></li>
                            <li><a href="#" onClick={showToast} className={footerLinkClasses}>Disclaimer</a></li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t flex flex-col sm:flex-row justify-between items-center">
                    <p className="text-sm text-gray-500 dark:text-gray-400">&copy; {new Date().getFullYear()} Campus Key Zimbabwe. All rights reserved.</p>
                    <div className="flex items-center gap-4 mt-4 sm:mt-0">
                        <a href="#" onClick={showToast} className="text-gray-500 hover:text-campus-blue dark:hover:text-white"><Facebook size={20} /></a>
                        <a href="#" onClick={showToast} className="text-gray-500 hover:text-campus-blue dark:hover:text-white"><Twitter size={20} /></a>
                        <a href="#" onClick={showToast} className="text-gray-500 hover:text-campus-blue dark:hover:text-white"><Instagram size={20} /></a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
