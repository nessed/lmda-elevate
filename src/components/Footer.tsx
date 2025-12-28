import { Phone, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import content from "@/data/content.json";
import lmdaLogo from "@/assets/lmda-logo.png";

const Footer = () => {
  return (
    <footer id="contact" className="bg-foreground text-background">
      <div className="container-wide section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-6">
            <img
              src={lmdaLogo}
              alt="LMDA Logo"
              className="h-16 w-auto brightness-0 invert"
            />
            <p className="text-background/70 max-w-md leading-relaxed">
              {content.company.description}
            </p>
            <Button className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-8">
              Work With Us
            </Button>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-background">Quick Links</h4>
            <ul className="space-y-3">
              {content.navigation.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-background/70 hover:text-accent transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-background">Contact Us</h4>
            <ul className="space-y-4">
              <li>
                <a
                  href={`tel:${content.company.phone}`}
                  className="flex items-start gap-3 text-background/70 hover:text-accent transition-colors"
                >
                  <Phone className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <span>
                    {content.company.phone}
                    <br />
                    {content.company.landline}
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${content.company.email}`}
                  className="flex items-start gap-3 text-background/70 hover:text-accent transition-colors"
                >
                  <Mail className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  {content.company.email}
                </a>
              </li>
              <li className="flex items-start gap-3 text-background/70">
                <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" />
                {content.company.address}
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-background/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-background/60 text-sm">
            {content.company.copyright}
          </p>
          <div className="flex items-center gap-6 text-sm text-background/60">
            <a href="#" className="hover:text-accent transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-accent transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
