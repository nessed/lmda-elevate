import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Phone, ChevronRight } from "lucide-react";
import content from "@/data/content";
import lmdaLogo from "@/assets/lmda-logo.png";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b hidden sm:block ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-gray-100/50 py-2"
          : "bg-transparent border-transparent py-3 sm:py-4"
      }`}
    >
      <div className="container-wide px-4 sm:px-6">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center group relative z-50">
            <img
              src={lmdaLogo}
              alt="LMDA"
              className={`w-auto transition-all duration-500 ${
                isScrolled ? "h-8 sm:h-10" : "h-10 sm:h-12 md:h-14"
              }`}
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8 xl:gap-10">
            {content.navigation.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`relative text-sm font-medium tracking-wide transition-colors duration-300 group py-2 ${
                  isScrolled
                    ? "text-gray-700 hover:text-lmda-blue"
                    : "text-white/90 hover:text-white"
                }`}
              >
                {item.label}
                <span className={`absolute bottom-0 left-0 w-0 h-[2px] transition-all duration-300 ease-out group-hover:w-full opacity-80 ${
                  isScrolled ? "bg-lmda-blue" : "bg-white"
                }`} />
              </a>
            ))}
            <Link
              to="/consultancy"
              className={`relative text-sm font-medium tracking-wide transition-colors duration-300 group py-2 ${
                isScrolled
                  ? "text-gray-700 hover:text-lmda-blue"
                  : "text-white/90 hover:text-white"
              }`}
            >
              Consultancy
              <span className={`absolute bottom-0 left-0 w-0 h-[2px] transition-all duration-300 ease-out group-hover:w-full opacity-80 ${
                isScrolled ? "bg-lmda-blue" : "bg-white"
              }`} />
            </Link>
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4 xl:gap-6">
            <a
              href={`tel:${content.company.phone}`}
              className={`flex items-center gap-2 text-sm font-medium transition-colors duration-300 ${
                isScrolled
                  ? "text-gray-600 hover:text-lmda-blue"
                  : "text-white/80 hover:text-white"
              }`}
            >
              <Phone className="w-4 h-4" />
              <span className="hidden xl:inline">{content.company.phone}</span>
            </a>
            <a
              href="#contact"
              className="relative overflow-hidden px-5 xl:px-6 py-2.5 text-sm font-semibold text-white bg-lmda-blue hover:bg-lmda-blue/90 transition-all duration-300 shadow-md hover:shadow-lg"
              style={{ borderRadius: 0 }}
            >
              <span className="relative z-10">Group Training</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`lg:hidden p-2.5 -mr-2 transition-colors rounded-lg relative z-50 ${
              isMobileMenuOpen 
                ? 'text-gray-900' 
                : isScrolled 
                  ? 'text-gray-900' 
                  : 'text-white'
            }`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </nav>
      </div>

      {/* Mobile Menu - Full Screen Overlay */}
      <div 
        className={`fixed inset-0 bg-white z-40 lg:hidden transition-all duration-300 ease-out ${
          isMobileMenuOpen 
            ? 'opacity-100 translate-x-0' 
            : 'opacity-0 translate-x-full pointer-events-none'
        }`}
      >
        <div className="flex flex-col h-full pt-20 pb-8 px-6 overflow-y-auto">
          {/* Navigation Links */}
          <nav className="flex-1 space-y-1">
            <Link
              to="/"
              className="flex items-center justify-between py-4 text-lg font-medium text-gray-900 border-b border-gray-100 active:bg-gray-50 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </Link>
            {content.navigation.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="flex items-center justify-between py-4 text-lg font-medium text-gray-900 border-b border-gray-100 active:bg-gray-50 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </a>
            ))}
            <Link
              to="/consultancy"
              className="flex items-center justify-between py-4 text-lg font-medium text-gray-900 border-b border-gray-100 active:bg-gray-50 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Consultancy
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </Link>
          </nav>

          {/* Bottom Actions */}
          <div className="space-y-4 pt-6 border-t border-gray-100">
            {/* Phone */}
            <a
              href={`tel:${content.company.phone}`}
              className="flex items-center justify-center gap-3 py-3 text-gray-700 font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Phone className="w-5 h-5 text-lmda-blue" />
              {content.company.phone}
            </a>
            
            {/* CTA Button */}
            <a
              href="#contact"
              className="block w-full text-center px-6 py-4 text-base font-bold text-white bg-lmda-blue active:bg-lmda-blue/90 shadow-lg transition-all"
              style={{ borderRadius: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Enquire for Group Training
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;