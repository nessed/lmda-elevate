import { Phone, Mail, MapPin, ArrowRight } from "lucide-react";
import content from "@/data/content";
import lmdaLogo from "@/assets/lmda-logo-white.png";

const Footer = () => {
  return (
    <footer id="contact" className="bg-foreground text-background">
      {/* CTA Section */}
      <div className="border-b border-background/10">
        <div className="container-wide py-16">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h2 className="heading-serif text-2xl md:text-3xl text-background mb-2">
                Ready to Transform Your Organization?
              </h2>
              <p className="text-background/60">
                Schedule a discovery call with our senior consultants.
              </p>
            </div>
            <a
              href={`mailto:${content.company.email}`}
              className="btn-gold flex-shrink-0"
            >
              Request a Strategy Consultation
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      {/* Footer Content */}
      <div className="container-wide py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <img
              src={lmdaLogo}
              alt="LMDA"
              className="h-10 w-auto mb-4"
            />
            <p className="text-background/50 text-sm leading-relaxed max-w-md">
              {content.company.fullName} — A management training and consulting firm with 20+ years of experience in Total Quality Management, Business Strategy, and Leadership Development.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold mb-4 text-background uppercase tracking-wide">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {content.navigation.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-sm text-background/50 hover:text-accent transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold mb-4 text-background uppercase tracking-wide">
              Contact
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href={`tel:${content.company.phone}`}
                  className="flex items-center gap-2 text-background/50 hover:text-accent transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  {content.company.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${content.company.email}`}
                  className="flex items-center gap-2 text-background/50 hover:text-accent transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  {content.company.email}
                </a>
              </li>
              <li className="flex items-start gap-2 text-background/50">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>{content.company.address}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-background/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-background/30 text-xs">
            {content.company.copyright}
          </p>
          <div className="flex items-center gap-6 text-xs text-background/30">
            <a href="#" className="hover:text-background/50 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-background/50 transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
