import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
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

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${
        isScrolled
          ? "bg-white/80 backdrop-blur-md shadow-sm border-gray-100/50 py-2"
          : "bg-transparent border-transparent py-4"
      }`}
    >
      <div className="container-wide">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <img
              src={lmdaLogo}
              alt="LMDA"
              className={`w-auto transition-all duration-500 ${
                isScrolled ? "h-10" : "h-12 md:h-14"
              }`}
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-10">
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

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-6">
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
              className="relative overflow-hidden px-6 py-2.5 text-sm font-semibold text-white bg-lmda-blue hover:bg-lmda-blue/90 transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5"
              style={{ borderRadius: 0 }}
            >
              <span className="relative z-10">Enquire for Group Training</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`lg:hidden p-2 transition-colors ${
              isScrolled ? 'text-gray-900' : 'text-white'
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

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-white/95 backdrop-blur-xl border-t border-gray-100 shadow-xl lg:hidden animate-fade-up origin-top">
            <div className="flex flex-col p-6 space-y-4">
              <Link
                to="/"
                className="text-lg font-medium text-gray-800 hover:text-lmda-blue transition-colors px-4 py-2 hover:bg-gray-50/50 rounded-sm"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              {content.navigation.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-lg font-medium text-gray-800 hover:text-lmda-blue transition-colors px-4 py-2 hover:bg-gray-50/50 rounded-sm"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <Link
                to="/consultancy"
                className="text-lg font-medium text-gray-800 hover:text-lmda-blue transition-colors px-4 py-2 hover:bg-gray-50/50 rounded-sm"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Consultancy
              </Link>
              <div className="pt-6 mt-4 border-t border-gray-100">
                <a
                  href="#contact"
                  className="block w-full text-center px-6 py-3 text-base font-semibold text-white bg-lmda-blue hover:bg-lmda-blue/90 shadow-md transition-all rounded-none"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Enquire for Group Training
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
