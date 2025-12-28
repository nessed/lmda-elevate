import { useState, useEffect } from "react";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import content from "@/data/content.json";
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
          ? "bg-background/95 backdrop-blur-md shadow-subtle"
          : "bg-transparent"
      }`}
    >
      {/* Top bar */}
      <div className="hidden md:block bg-foreground text-background">
        <div className="container-wide py-2 flex justify-between items-center text-sm">
          <div className="flex items-center gap-6">
            <a href={`tel:${content.company.phone}`} className="flex items-center gap-2 hover:text-accent transition-colors">
              <Phone className="w-4 h-4" />
              {content.company.phone}
            </a>
            <a href={`mailto:${content.company.email}`} className="hover:text-accent transition-colors">
              {content.company.email}
            </a>
          </div>
          <span className="text-muted-foreground">
            World Class Customized In House Training at your Doorstep
          </span>
        </div>
      </div>

      {/* Main navigation */}
      <div className="container-wide">
        <nav className="flex items-center justify-between py-4">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-3">
            <img
              src={lmdaLogo}
              alt="LMDA - Leadership and Management Development Associates"
              className="h-12 w-auto"
            />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {content.navigation.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6">
              Get a Quote
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-background border-t border-border animate-fade-up">
            <div className="py-4 space-y-4">
              {content.navigation.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="block px-4 py-2 text-foreground hover:text-primary hover:bg-secondary/50 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <div className="px-4 pt-4 border-t border-border">
                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
                  Get a Quote
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
