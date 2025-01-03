/**
 * Navbar.jsx - Navigation component
 * Responsive navigation bar with mobile menu support
 * Features:
 * - Smooth scroll navigation
 * - Theme toggle (dark/light mode)
 * - Mobile-responsive design
 * - Animated transitions using Framer Motion
 * - Backdrop blur effect
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaSun, FaMoon } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import Profl from '../assets/Profl.jpg';

const Navbar = () => {
  // State for mobile menu visibility
  const [isOpen, setIsOpen] = useState(false);
  // Theme context for dark/light mode
  const { isDarkMode, toggleTheme } = useTheme();

  /**
   * Navigation items configuration
   * Each item contains:
   * - name: Display text
   * - href: Target section ID
   */
  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Blog', href: '#blog' },
    { name: 'Contact', href: '#contact' },
  ];

  /**
   * Handles smooth scroll navigation
   * @param {Event} e - Click event
   * @param {string} href - Target section ID
   */
  const handleNavClick = (e, href) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      // Close mobile menu first
      setIsOpen(false);
      // Wait for menu animation to complete
      setTimeout(() => {
        const offsetTop = element.offsetTop;
        window.scrollTo({
          top: offsetTop - 64, // Adjust for navbar height
          behavior: 'smooth'
        });
      }, 300);
    }
  };

  return (
    <nav className="fixed w-full z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Profile Image */}
          <motion.a
            href="#home"
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
            onClick={(e) => handleNavClick(e, '#home')}
          >
            <img
              src={Profl}
              alt="Profile"
              className="w-10 h-10 rounded-full object-cover border-2 border-primary dark:border-blue-400"
            />
          </motion.a>

          {/* Desktop Navigation Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Navigation Links */}
            {navItems.map((item) => (
              <motion.a
                key={item.name}
                href={item.href}
                className="text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary transition-colors"
                whileHover={{ scale: 1.1 }}
                onClick={(e) => handleNavClick(e, item.href)}
              >
                {item.name}
              </motion.a>
            ))}
            {/* Theme Toggle Button */}
            <motion.button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {isDarkMode ? (
                <FaSun className="w-5 h-5 text-yellow-500" />
              ) : (
                <FaMoon className="w-5 h-5 text-gray-700 dark:text-gray-200" />
              )}
            </motion.button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-md text-gray-800 dark:text-gray-200 bg-transparent dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            whileTap={{ scale: 0.95 }}
          >
            {isOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-gray-900 shadow-lg"
          >
            <div className="container mx-auto px-4 py-4">
              {/* Mobile Theme Toggle */}
              <div className="flex items-center justify-between mb-4">
                <motion.button
                  onClick={toggleTheme}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isDarkMode ? (
                    <FaSun className="w-5 h-5 text-yellow-500" />
                  ) : (
                    <FaMoon className="w-5 h-5 text-gray-700 dark:text-gray-200" />
                  )}
                </motion.button>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                </span>
              </div>
              {/* Mobile Navigation Links */}
              {navItems.map((item) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  className="block py-2 text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary transition-colors"
                  whileHover={{ x: 10 }} // Slide effect on hover
                  onClick={(e) => handleNavClick(e, item.href)}
                >
                  {item.name}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
