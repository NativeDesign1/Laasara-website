import React, { useState } from 'react';
import logo from '../assets/Laassaara Foundation (2).svg';


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const menuLinks = [
    { href: '/', label: 'Home' },
    { href: '/over', label: 'Over ons' },
    { href: '/projecten', label: 'Projecten' },
    { href: '/doneer', label: 'Doneer' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <nav >
      <div className="bg-gradient-to-r from-green-400 w-full h-10 to-blue-400 p-4">

      </div>
      <div className="container mx-auto md:mt-10  flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <img
            src={logo} // replace with your logo URL
            alt="Logo"
            className="h-[119px] w-[119px]"
          />
          
        </div>

        {/* Hamburger Menu Icon for Mobile */}
        <div className="md:hidden m-2 mr-5">
          <button
            onClick={toggleMenu}
            className="text-gray-800 focus:outline-none"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            <svg
              className="w-7 h-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-10">
          {menuLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative text-gray-800 text-lg font-semibold  hover:text-green-600 border-b-2 border-transparent gradient-border tracking-widest"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-full h-0.5 hover:bg-gradient-to-r from-green-400 to-blue-400 transform scale-x-0 transition-transform duration-300 ease-out hover:scale-x-100"></span>
            </a>
          ))}
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden bg-opacity-95 absolute h-[100%] pb-5 z-50 top-26  w-full bg-white transition-all items-center duration-300 ease-in-out ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        <div className="flex flex-col   justify-center items-center w-full space-y-8 mt-4">
          {menuLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={toggleMenu} // Close the menu when the link is clicked
              className="text-gray-800 text-lg font-semibold tracking-widest  hover:text-green-600 hover:border-b-2 border-transparent hover:border-green-600"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
