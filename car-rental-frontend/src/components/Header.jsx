import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bars3Icon, XMarkIcon, GlobeAltIcon } from '@heroicons/react/24/outline';
import Logo from '../assets/logo.png';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeLanguage, setActiveLanguage] = useState('SK');
  const location = useLocation();

  const navigation = [
    { name: 'Domov', href: '/' },
    { name: 'Ponuka vozidiel', href: '/fleet' },
    { name: 'Cenník', href: '/cennik' },
    { name: 'Blog', href: '/blog' },
    { name: 'FAQ', href: '/faq' },
    { name: 'O nás', href: '/about' },
    { name: 'Kontakt', href: '/contact' },
  ];

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="fixed left-1/2 transform -translate-x-1/2 z-50 bg-white shadow-lg backdrop-blur-md" style={{ top: '50px', width: '80%', borderRadius: '40px' }}>
      <nav className="px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img src={Logo} alt="Nitra Car" className="h-12 w-auto" />
            </Link>
          </div>

          {/* Desktop Navigation - Center */}
          <div className="hidden lg:flex items-center space-x-10">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-base font-semibold transition-colors duration-200 relative pb-1 ${
                  isActive(item.href)
                    ? 'text-black'
                    : 'text-black hover:text-gray-700'
                }`}
                style={{
                  borderBottom: isActive(item.href) ? '2px solid black' : '2px solid transparent'
                }}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right Side - Language & Manage Booking */}
          <div className="hidden lg:flex items-center space-x-5">
            {/* Language Selector Toggle */}
            <div className="flex items-center space-x-3 text-gray-700">
              <button 
                onClick={() => setActiveLanguage('SK')}
                className={`flex items-center space-x-1 transition-colors duration-200 ${
                  activeLanguage === 'SK' ? 'opacity-100' : 'opacity-50 hover:opacity-75'
                }`}
              >
                <span className="text-lg">🇸🇰</span>
                <span className={`text-base font-semibold ${
                  activeLanguage === 'SK' ? 'text-black' : 'text-gray-600'
                }`}>SK</span>
              </button>
              <span className="text-gray-400">|</span>
              <button 
                onClick={() => setActiveLanguage('EN')}
                className={`flex items-center space-x-1 transition-colors duration-200 ${
                  activeLanguage === 'EN' ? 'opacity-100' : 'opacity-50 hover:opacity-75'
                }`}
              >
                <span className="text-lg">🇬🇧</span>
                <span className={`text-base font-semibold ${
                  activeLanguage === 'EN' ? 'text-black' : 'text-gray-600'
                }`}>EN</span>
              </button>
            </div>
            
            {/* Manage Booking Button */}
            <Link
              to="/fleet"
              className="bg-slate-900 hover:bg-slate-800 text-white px-5 py-3 rounded-md text-base font-medium transition-colors duration-200"
            >
              Objednať auto
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              type="button"
              className="text-black hover:text-gray-700 p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <XMarkIcon className="h-7 w-7" aria-hidden="true" />
              ) : (
                <Bars3Icon className="h-7 w-7" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white shadow-lg backdrop-blur-md rounded-lg mt-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block px-4 py-3 text-lg font-semibold rounded-md transition-colors duration-200 ${
                    isActive(item.href)
                      ? 'text-white bg-blue-600'
                      : 'text-black hover:text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="border-t border-white/20 pt-2">
                <Link
                  to="/booking"
                  className="block px-4 py-3 text-lg font-medium bg-blue-600 text-white rounded-md text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Objednať auto
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header; 