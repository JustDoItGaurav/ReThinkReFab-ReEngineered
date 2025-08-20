// src/components/Navbar.jsx
import { useState } from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import { FaBars, FaTimes, FaPlus, FaSignOutAlt, FaUserCircle } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/config';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';

  const handleLogout = async () => {
    setIsOpen(false);
    await signOut(auth);
    navigate('/login');
  };

  const navLinks = [
    { name: 'Home', path: '/', isScroll: true, to: 'home' },
    { name: 'Projects', path: '/projects', isScroll: false },
    { name: 'Benefits', path: '/', isScroll: true, to: 'benefits' },
    { name: 'Gallery', path: '/', isScroll: true, to: 'gallery' },
  ];

  // A helper component to decide whether to use a scroll link or a router link
  const NavLink = ({ link, onClick }) => {
    if (isHomePage && link.isScroll) {
      return (
        <ScrollLink 
          to={link.to} 
          smooth={true} 
          duration={500}
          onClick={onClick}
          className="capitalize cursor-pointer text-slate-600 dark:text-slate-300 hover:text-green-500 dark:hover:text-green-400 transition-colors font-medium"
        >
          {link.name}
        </ScrollLink>
      );
    }
    return (
      <RouterLink 
        to={link.path}
        onClick={onClick}
        className="capitalize cursor-pointer text-slate-600 dark:text-slate-300 hover:text-green-500 dark:hover:text-green-400 transition-colors font-medium"
      >
        {link.name}
      </RouterLink>
    );
  };

  return (
    <nav className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg fixed w-full z-50 top-0 left-0 border-b border-slate-200 dark:border-slate-800">
      <div className="container mx-auto px-6 h-20 flex justify-between items-center">
        
        {/* Logo */}
        <motion.div whileHover={{ scale: 1.05 }}>
          <RouterLink to="/" className="text-2xl font-bold text-green-600 dark:text-green-400">
            ReThinkReFab
          </RouterLink>
        </motion.div>

        {/* Desktop Menu & Actions */}
        <div className="hidden md:flex items-center space-x-8">
          {/* Navigation Links */}
          <ul className="flex items-center space-x-8">
            {navLinks.map(link => (
              <li key={link.name}><NavLink link={link} /></li>
            ))}
          </ul>

          {/* Separator */}
          <div className="h-6 w-px bg-slate-200 dark:bg-slate-700"></div>

          {/* Auth-aware Action Buttons */}
          <div className="flex items-center space-x-4">
            {currentUser ? (
              <>
                <RouterLink to="/create-project" className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-sm text-sm">
                  <FaPlus /> Add Project
                </RouterLink>
                <button onClick={handleLogout} title="Logout" className="text-slate-500 hover:text-red-500 dark:text-slate-400 dark:hover:text-red-400 transition-colors">
                  <FaSignOutAlt size={20} />
                </button>
                <FaUserCircle size={28} className="text-slate-400" title={currentUser.email} />
              </>
            ) : (
              <>
                <RouterLink to="/login" className="font-medium text-slate-600 dark:text-slate-300 hover:text-green-500 transition-colors">
                  Login
                </RouterLink>
                <RouterLink to="/signup" className="bg-slate-800 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded-full transition-colors text-sm">
                  Sign Up
                </RouterLink>
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <div onClick={() => setIsOpen(!isOpen)} className="md:hidden cursor-pointer z-50">
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden absolute top-0 left-0 w-full min-h-screen bg-white dark:bg-slate-900"
          >
            <ul className="flex flex-col justify-center items-center pt-28">
              {navLinks.map(link => (
                <li key={link.name} className="py-4 text-2xl">
                  <NavLink link={link} onClick={() => setIsOpen(false)} />
                </li>
              ))}
              
              <li className="w-4/5 my-6 border-b border-slate-200 dark:border-slate-800"></li>

              {currentUser ? (
                <>
                  <li className="w-full px-8 mb-4">
                    <RouterLink to="/create-project" onClick={() => setIsOpen(false)} className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-full transition-colors">
                      <FaPlus /> Add Project
                    </RouterLink>
                  </li>
                  <li className="w-full px-8">
                     <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-4 rounded-full transition-colors">
                      <FaSignOutAlt /> Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li className="w-full px-8 mb-4">
                    <RouterLink to="/login" onClick={() => setIsOpen(false)} className="w-full block text-center bg-slate-200 dark:bg-slate-800 font-bold py-3 px-4 rounded-full transition-colors">
                      Login
                    </RouterLink>
                  </li>
                  <li className="w-full px-8">
                    <RouterLink to="/signup" onClick={() => setIsOpen(false)} className="w-full block text-center bg-slate-800 dark:bg-slate-200 text-white dark:text-slate-900 font-bold py-3 px-4 rounded-full transition-colors">
                      Sign Up
                    </RouterLink>
                  </li>
                </>
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
