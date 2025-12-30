import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, ChevronRight } from "lucide-react";
import content from "@/data/content";
import lmdaLogo from "@/assets/lmda-logo.png";

interface HeaderProps {
  variant?: "default" | "solid";
}

const Header = ({ variant = "default" }: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    // Initial check
    handleScroll();
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isSolid = variant === "solid" || isScrolled;
  const isHome = location.pathname === "/";

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

  // Helper to determine link properties
  const getLinkProps = (href: string) => {
    const isAnchor = href.startsWith("#");
    const isInternal = href.startsWith("/");
    
    // For hash links: if on home, strict hash. If not, prepend /. 
    // BUT we must allow re-navigation to home.
    let targetHref = href;
    if (isAnchor && !isHome) {
      targetHref = `/${href}`;
    }

    // Return properties for <a /> tag if it's an anchor (even cross-page anchor needs reload or hash link)
    // or <Link /> if it's a pure route.
    // Simplifying: Use <Link> for things starting with '/', use <a> for things starting with # (with smart href).
    // Actually, cross-page anchor linking works best with simple <a> in standard setups unless using HashLink.
    // If we use <a href="/#foo"> it triggers a reload which is reliable.
    
    if (isInternal) {
      return { as: Link, to: href };
    }
    return { as: "a", href: targetHref };
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b hidden sm:block ${
        isSolid
          ? "bg-white/95 backdrop-blur-md shadow-sm border-gray-100/50 py-2"
          : "bg-transparent border-transparent py-3 sm:py-4"
      }`}
    >
      <div className="container-wide px-4 sm:px-6">
        <nav className="relative flex items-center h-[60px] sm:h-[72px]">
          {/* Logo - Left */}
          <Link to="/" className="flex-shrink-0 flex items-center group relative z-20 mr-8">
            <img
              src={lmdaLogo}
              alt="LMDA"
              className={`w-auto transition-all duration-500 ${
                isSolid ? "h-12 sm:h-14" : "h-14 sm:h-16 md:h-20"
              }`}
            />
          </Link>

          {/* Desktop Navigation - flexible center */}
          <div className="hidden lg:flex flex-1 items-center justify-center gap-6 xl:gap-8 px-4">
            {content.navigation.map((item) => {
              const { as: Component, ...props } = getLinkProps(item.href);
              // @ts-ignore
              return (
                <Component
                  key={item.label}
                  {...props}
                  className={`relative text-sm font-medium tracking-wide transition-colors duration-300 group py-2 whitespace-nowrap ${
                    isSolid
                      ? "text-gray-700 hover:text-lmda-blue"
                      : "text-white/90 hover:text-white"
                  }`}
                >
                  {item.label}
                  <span className={`absolute bottom-0 left-0 w-0 h-[2px] transition-all duration-300 ease-out group-hover:w-full opacity-80 ${
                    isSolid ? "bg-lmda-blue" : "bg-white"
                  }`} />
                </Component>
              );
            })}
          </div>

          {/* Desktop CTA - Right */}
          <div className="hidden lg:flex flex-shrink-0 items-center gap-4 xl:gap-6 ml-auto">
            <a
              href={`tel:${content.company.phone}`}
              className={`flex items-center gap-2 text-sm font-medium transition-colors duration-300 ${
                isSolid
                  ? "text-gray-600 hover:text-lmda-blue"
                  : "text-white/80 hover:text-white"
              }`}
            >
              <Phone className="w-4 h-4" />
              <span>{content.company.phone}</span>
            </a>
            <Link
              to="/consultancy"
              className="relative overflow-hidden px-5 xl:px-6 py-2.5 text-sm font-semibold text-white bg-lmda-blue hover:bg-lmda-blue/90 transition-all duration-300 shadow-md hover:shadow-lg rounded-full"
            >
              <span className="relative z-10">Consultancy</span>
            </Link>
          </div>

          {/* Mobile Menu Button - Right (replacing CTA on mobile) */}
          <button
            className={`lg:hidden ml-auto p-2.5 transition-colors rounded-lg relative z-50 ${
              isMobileMenuOpen 
                ? 'text-gray-900' 
                : isSolid 
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
            {/* Removed Duplicate Home Link here, as it's likely in content.navigation. 
                If 'Home' is in navigation, we just map it. */}
            {content.navigation.map((item) => {
              const { as: Component, ...props } = getLinkProps(item.href);
              // @ts-ignore
              return (
                <Component
                  key={item.label}
                  {...props}
                  className="flex items-center justify-between py-4 text-lg font-medium text-gray-900 border-b border-gray-100 active:bg-gray-50 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </Component>
              );
            })}
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