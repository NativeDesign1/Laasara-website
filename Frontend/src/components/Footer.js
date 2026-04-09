import React from "react";
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import { faPaperPlane as faPaperPlaneSolid } from "@fortawesome/free-solid-svg-icons"; // Import solid paper plane icon for the send button
import beleidsplanPDF from "../assets/Beleidsplan.pdf";
import jaarafrekening2025 from "../assets/Jaarafrekening2025.xlsx";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-darkGreen text-white sm:text-left py-12 w-full ">
      <div className="container mx-auto flex flex-col md:flex-row justify-between text-left  space-y-8 md:space-y-0 px-4">
        {/* Contact Section */}
        <div className="space-y-2  flex-1 sm:text-left">
          <h2 className="text-lg font-bold">{t('footer.contact').toUpperCase()}</h2>
          <p>Laassaara Foundation</p>
          <p>Keulseplein 11</p>
          <p>6043EX Roermond, NL</p>
          <p>
            {t('footer.email')}:{" "}
            <a
              href="mailto:Info@laassarafoundation.nl"
              className="hover:underline"
            >
              Info@laassarafoundation.nl
            </a>
          </p>
          <p>Phone: +31 623044495</p>
          <p>KvK: 85161144</p>
          <p>NL67 TRIO 0320 5916 89</p>
        </div>

        {/* Links Section */}
        <div className="space-y-2 flex-1">
          <h2 className="text-lg font-bold">{t('footer.links').toUpperCase()}</h2>
          <ul className="space-y-2">
            <li>
              <a href="/" className="hover:underline">
                {t('nav.home')}
              </a>
            </li>
            <li>
              <a href="/over-ons" className="hover:underline">
                {t('nav.about')}
              </a>
            </li>
            <li>
              <a href="/projecten" className="hover:underline">
                {t('nav.projects')}
              </a>
            </li>
            <li>
              <a href="/doneer" className="hover:underline">
                {t('nav.donate')}
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:underline">
                {t('nav.contact')}
              </a>
            </li>
            <li>
              <a
                href={beleidsplanPDF}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                ANBI
              </a>
            </li>
            <li>
              <a
                href={jaarafrekening2025}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                Jaarafrekening 2025
              </a>
            </li>
          </ul>
        </div>

        {/* Newsletter Signup Section */}
        <div className="flex-1">
          <h2 className="text-lg font-bold">{t('footer.newsletter').toUpperCase()}</h2>
          <p className="mb-4">
            {t('footer.newsletterDescription')}
          </p>
          <form className="space-y-2">
            <div className="flex flex-col space-y-5 ">
              <input
                type="text"
                placeholder={t('footer.name')}
                className="px-4 py-2 rounded-lg bg-green-700 text-white focus:outline-none"
              />
              <input
                type="email"
                placeholder={t('footer.email')}
                className="px-4 py-2 bg-green-700 text-white focus:outline-none rounded-lg"
              />
              <button
                type="submit"
                className="px-2 py-1 bg-green-800 rounded-lg"
              >
                <FontAwesomeIcon
                  icon={faPaperPlaneSolid}
                  className="text-white text-2xl py-2"
                />
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Social Media Links & Copyright */}
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center mt-8 border-t border-green-800 pt-4">
        <div className="space-x-4">
          
          
          <a href="#" className="hover:text-gray-400">
            <FontAwesomeIcon
              icon={faWhatsapp}
              className="text-white text-2xl hover:text-3xl transition-all duration-200 "
            />
          </a>
        </div>
        <p className="mt-4 md:mt-0">&copy; {new Date().getFullYear()} {t('footer.rights')}</p>
      </div>
    </footer>
  );
};

export default Footer;
