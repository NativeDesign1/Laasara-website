import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe, ChevronDown } from 'lucide-react';

const languages = [
  { code: 'nl', name: 'Nederlands', flag: '🇳🇱' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'da', name: 'Dansk', flag: '🇩🇰' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'ar', name: 'العربية', flag: '🇲🇦', rtl: true }
];

const LanguageSelector = ({ variant = 'default' }) => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Update document direction for RTL languages
  useEffect(() => {
    document.documentElement.dir = currentLanguage.rtl ? 'rtl' : 'ltr';
    document.documentElement.lang = currentLanguage.code;
  }, [currentLanguage]);

  const changeLanguage = (langCode) => {
    i18n.changeLanguage(langCode);
    setIsOpen(false);
  };

  const isTopbar = variant === 'topbar';

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-1.5 transition-colors ${
          isTopbar 
            ? 'bg-white/20 hover:bg-white/30 px-2 py-0.5 rounded text-white font-medium' 
            : 'text-gray-700 hover:text-emerald-600 text-sm p-2 -m-2 md:p-0 md:m-0'
        }`}
        aria-label="Select language"
      >
        {!isTopbar && <Globe className="w-7 h-7 md:w-5 md:h-5" />}
        <span>{currentLanguage.flag}</span>
        {!isTopbar && <span className="hidden sm:inline">{currentLanguage.code.toUpperCase()}</span>}
        <ChevronDown className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className={`absolute ${isTopbar ? 'top-full mt-1 right-0' : 'top-full mt-2 right-0'} bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-50 min-w-[140px]`}>
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => changeLanguage(lang.code)}
              className={`w-full px-3 py-2 text-left text-sm flex items-center gap-2 hover:bg-emerald-50 transition-colors ${
                currentLanguage.code === lang.code ? 'bg-emerald-50 text-emerald-700' : 'text-gray-700'
              }`}
              dir={lang.rtl ? 'rtl' : 'ltr'}
            >
              <span>{lang.flag}</span>
              <span>{lang.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
