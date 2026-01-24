import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe, Mail, Phone } from 'lucide-react';
import logo from "../assets/logo.svg"


function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/over-ons', label: 'Over ons' },
    { path: '/projecten', label: 'Projecten' },
    { path: '/doneer', label: 'Doneer' },
    { path: '/contact', label: 'Contact' }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-sm z-50">
      <div className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-white py-2">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-2 text-sm">
          <a href="mailto:info@laassaarafoundation.nl" className="flex items-center gap-2 hover:opacity-80 transition">
            <Mail size={16} />
            <span>info@laassaarafoundation.nl</span>
          </a>
          <a href="tel:+31623044495" className="flex items-center gap-2 hover:opacity-80 transition">
            <Phone size={16} />
            <span>NL67 TRIO 0320 5916 89</span>
          </a>
        </div>
      </div>

      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-3 hover:opacity-90 transition">
            <div className="w-12 h-12  rounded-full flex items-center justify-center">
              <img className="text-white" src={logo} size={100} fetchPriority="high" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">Laassara Foundation</h1>
              <p className="text-xs text-gray-600">Samen maken we het verschil</p>
            </div>
          </Link>

          <div className="hidden md:flex gap-8">
            {navItems.map(item => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-gray-700 hover:text-emerald-600 transition font-medium ${
                  isActive(item.path) ? 'text-emerald-600 border-b-2 border-emerald-600' : ''
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <button
            className="md:hidden text-gray-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t pt-4">
            {navItems.map(item => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={`block w-full text-left py-2 px-4 hover:bg-emerald-50 rounded transition ${
                  isActive(item.path) ? 'bg-emerald-50 text-emerald-600 font-medium' : 'text-gray-700'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
}

export default Header;
