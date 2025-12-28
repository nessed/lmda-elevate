import { useState, useEffect } from "react";
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="container-wide">
        <nav className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#home" className="flex items-center">
            <img
              src={lmdaLogo}
              alt="LMDA"
              className="h-10 md:h-12 w-auto transition-all"
            />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {content.navigation.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`text-sm font-medium transition-colors ${
                  isScrolled 
                    ? 'text-foreground/70 hover:text-foreground' 
                    : 'text-background/70 hover:text-background'
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href={`tel:${content.company.phone}`}
              className={`flex items-center gap-2 text-sm transition-colors ${
                isScrolled 
                  ? 'text-muted-foreground hover:text-foreground' 
                  : 'text-background/60 hover:text-background'
              }`}
            >
              <Phone className="w-4 h-4" />
              <span className="hidden xl:inline">{content.company.phone}</span>
            </a>
            <a
              href="#contact"
              className="px-5 py-2.5 text-sm font-semibold bg-accent text-accent-foreground hover:bg-accent/90 transition-colors"
              style={{ borderRadius: 0 }}
            >
              Request Consultation
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`lg:hidden p-2 ${isScrolled ? 'text-foreground' : 'text-background'}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </nav>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-background border-t border-border">
            <div className="py-4 space-y-1">
              {content.navigation.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="block px-4 py-3 text-sm text-foreground/80 hover:text-accent hover:bg-secondary transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <div className="px-4 pt-4 border-t border-border mt-2">
                <a
                  href="#contact"
                  className="block w-full text-center px-5 py-3 text-sm font-semibold bg-accent text-accent-foreground"
                  style={{ borderRadius: 0 }}
                >
                  Request Consultation
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
