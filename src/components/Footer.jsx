// src/components/Footer.jsx
import { FaTwitter, FaInstagram, FaFacebook } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-slate-900 dark:bg-black text-slate-400 py-8 border-t border-slate-800">
      <div className="container mx-auto px-6 text-center">
        
        {/* Logo/Brand */}
        <Link 
          to="/" 
          className="text-2xl font-bold text-green-500 dark:text-green-400 hover:opacity-80 transition-opacity"
        >
          ReThinkReFab
        </Link>

        {/* Tagline */}
        <p className="mt-2 text-sm text-slate-500">
          Reimagining everyday living through creative and sustainable DIY projects.
        </p>

        {/* Social Media */}
        <div className="flex justify-center space-x-6 mt-6">
          <a href="#" aria-label="Twitter" className="hover:text-green-400 transition-colors">
            <FaTwitter size={20} />
          </a>
          <a href="#" aria-label="Instagram" className="hover:text-green-400 transition-colors">
            <FaInstagram size={20} />
          </a>
          <a href="#" aria-label="Facebook" className="hover:text-green-400 transition-colors">
            <FaFacebook size={20} />
          </a>
        </div>

        {/* Copyright */}
        <p className="mt-6 text-xs text-slate-600">
          &copy; {new Date().getFullYear()} ReThinkReFab. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
