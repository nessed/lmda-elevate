import { Phone, Mail, MapPin, ArrowRight, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import content from "@/data/content";
import lmdaLogo from "@/assets/lmda-logo.webp";
import { getWhatsAppLink } from "@/data/siteConfig";

const Footer = () => {
  return (
    <footer id="contact" className="bg-foreground text-background">
      {/* CTA Section */}
      <div className="border-b border-background/10">
        <div className="container-wide py-10 sm:py-12 lg:py-16 px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8 text-center lg:text-left">
            <div>
              <h2 className="heading-serif text-xl sm:text-2xl md:text-3xl text-background mb-2">
                Ready to Transform Your Organization?
              </h2>
              <p className="text-background/60 text-sm sm:text-base">
                Schedule a discovery call with our senior consultants.
              </p>
            </div>
            <a
              href={`mailto:${content.company.email}`}
              className="btn-gold flex-shrink-0 w-full sm:w-auto justify-center text-sm sm:text-base px-6 py-3 sm:px-8 sm:py-4"
            >
              Request Consultation
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </a>
          </div>
        </div>
      </div>

      {/* Footer Content */}
      <div className="container-wide py-10 sm:py-12 px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="sm:col-span-2">
            <img
              src={lmdaLogo}
              alt="LMDA"
              className="h-8 sm:h-10 w-auto mb-4"
            />
            <p className="text-background/50 text-sm leading-relaxed max-w-md">
              {content.company.fullName} — A management training and consulting firm with 20+ years of experience in Total Quality Management, Business Strategy, and Leadership Development.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold mb-3 sm:mb-4 text-background uppercase tracking-wide">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {content.navigation.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-sm text-background/50 hover:text-accent transition-colors py-1 inline-block"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold mb-3 sm:mb-4 text-background uppercase tracking-wide">
              Contact
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href={`tel:${content.company.phone}`}
                  className="flex items-center gap-2 text-background/50 hover:text-accent transition-colors py-1"
                >
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  <span>{content.company.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-background/50 hover:text-[#25D366] transition-colors py-1"
                >
                  <MessageCircle className="w-4 h-4 flex-shrink-0" />
                  <span>WhatsApp</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${content.company.email}`}
                  className="flex items-center gap-2 text-background/50 hover:text-accent transition-colors py-1"
                >
                  <Mail className="w-4 h-4 flex-shrink-0" />
                  <span className="break-all">{content.company.email}</span>
                </a>
              </li>
              <li className="flex items-start gap-2 text-background/50 py-1">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span className="text-sm">{content.company.address}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 sm:mt-12 pt-6 border-t border-background/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-background/30 text-xs text-center sm:text-left">
            {content.company.copyright}
          </p>
          <div className="flex items-center gap-4 sm:gap-6 text-xs text-background/30">
            <a href="#" className="hover:text-background/50 transition-colors py-1">
              Privacy
            </a>
            <a href="#" className="hover:text-background/50 transition-colors py-1">
              Terms
            </a>
            <Link to="/admin" className="hover:text-background/50 transition-colors py-1">
              Staff Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;