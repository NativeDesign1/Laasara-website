import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram, faWhatsapp } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="bg-darkGreen text-white sm:text-left py-10 w-full">
      <div className="container mx-auto flex flex-col md:flex-row justify-between text-left  space-y-8 md:space-y-0">
        {/* Contact Section */}
        <div className="space-y-2 flex-1 text-left">
          <h2 className="text-lg font-bold">CONTACT</h2>
          <p>Laassaara Foundation</p>
          <p>Keulseplein 11</p>
          <p>6043EX Roermond, NL</p>
          <p>Email: <a href="mailto:info@laassaarafoundation.nl" className="hover:underline">info@laassaarafoundation.nl</a></p>
          <p>Phone: +31 623044495</p>
          <p>KvK: 85161144</p>
          <p>NL67 TRIO 0320 5916 89</p>
        </div>

        {/* Links Section */}
        <div className="space-y-2 flex-1">
          <h2 className="text-lg font-bold">LINKS</h2>
          <ul className="space-y-2">
            <li><a href="#" className="hover:underline">Home</a></li>
            <li><a href="#" className="hover:underline">Over Ons</a></li>
            <li><a href="#" className="hover:underline">Projecten</a></li>
            <li><a href="#" className="hover:underline">Doneer</a></li>
            <li><a href="#" className="hover:underline">Contact</a></li>
            <li><a href="#" className="hover:underline">Anbi</a></li>
          </ul>
        </div>

        {/* Newsletter Signup Section */}
        <div className="flex-1">
          <h2 className="text-lg font-bold">BLIJF OP DE HOOGTE</h2>
          <p className="mb-4">Blijf op de hoogte van onze nieuwste weetjes door je aan te melden op onze nieuwsbrief!</p>
          <form className="space-y-2">
            <div className="flex">
              <input type="text" placeholder="Naam" className="px-4 py-2 rounded-l-lg bg-green-700 text-white focus:outline-none" />
              <input type="email" placeholder="Email" className="px-4 py-2 bg-green-700 text-white focus:outline-none" />
              <button type="submit" className="px-4 py-2 bg-green-800 rounded-r-lg">
                <FontAwesomeIcon icon={faWhatsapp} className="text-white" />
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Social Media Links & Copyright */}
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center mt-8 border-t border-green-800 pt-4">
        <div className="space-x-4">
          <a href="#" className="hover:text-gray-400">
            <FontAwesomeIcon icon={faFacebookF} className="text-white" />
          </a>
          <a href="#" className="hover:text-gray-400">
            <FontAwesomeIcon icon={faInstagram} className="text-white" />
          </a>
          <a href="#" className="hover:text-gray-400">
            <FontAwesomeIcon icon={faWhatsapp} className="text-white" />
          </a>
        </div>
        <p className="mt-4 md:mt-0">&copy; Copyright 2024</p>
      </div>
    </footer>
  );
};

export default Footer;
