import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X, Mail, Phone, Heart, BadgeCheck } from 'lucide-react';
import LanguageSelector from './LanguageSelector';
import logo from "../assets/logo.svg"


function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { t } = useTranslation();

  const navItems = [
    { path: '/', label: t('nav.home') },
    { path: '/over-ons', label: t('nav.about') },
    { path: '/projecten', label: t('nav.projects') },
    { path: '/doneer', label: t('nav.donate') },
    { path: '/contact', label: t('nav.contact') }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 bg-white z-50">
      <div className="bg-emerald-600 text-white py-2">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-2 text-sm">
          {/* Contact info links */}
          <div className="flex items-center gap-4">
            <a href="mailto:info@laassaarafoundation.nl" className="flex items-center gap-1.5 hover:text-emerald-100 transition">
              <Mail size={14} />
              <span>info@laassaarafoundation.nl</span>
            </a>
            <a href="tel:+31623044495" className="hidden sm:flex items-center gap-1.5 hover:text-emerald-100 transition">
              <Phone size={14} />
              <span>+31 6 2304 4495</span>
            </a>
          </div>
          
          {/* ANBI + IBAN + Language rechts */}
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 bg-white/15 px-2.5 py-0.5 rounded text-xs font-medium">
              <BadgeCheck size={12} />
              {t('nav.anbi')}
            </span>
            <span className="hidden sm:block w-px h-4 bg-white/30"></span>
            <span className="flex items-center gap-1.5">
              <Heart size={14} />
              <span className="font-medium">NL67 TRIO 0320 5916 89</span>
            </span>
            <span className="hidden sm:block w-px h-4 bg-white/30"></span>
            <LanguageSelector variant="topbar" />
          </div>
        </div>
      </div>

      <nav className="container mx-auto px-4 py-4 border-b border-gray-100">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-3 hover:opacity-90 transition">
            <div className="w-12 h-12  rounded-full flex items-center justify-center">
              <img className="text-white" src={logo} size={100} fetchPriority="high" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">Laassara Foundation</h1>
              <p className="text-xs text-gray-600">{t('nav.slogan')}</p>
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
