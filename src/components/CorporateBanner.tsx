import { MessageCircle } from "lucide-react";
import { getWhatsAppLink } from "@/data/siteConfig";

const WHATSAPP_CORPORATE_LINK = getWhatsAppLink("Hi, I'd like to discuss a group training booking for our company.");

const CorporateBanner = () => {
  return (
    <section className="py-12 sm:py-16 bg-primary border-y border-accent/30">
      <div className="container-wide px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-12">
          
          {/* Copy */}
          <div className="text-center lg:text-left">
            <h3 className="heading-serif text-2xl sm:text-3xl lg:text-4xl text-accent font-bold leading-tight">
              Train Your Sales Force.
            </h3>
            <p className="text-white/70 text-base sm:text-lg mt-2 font-medium">
              Customize our modules for your organization.
            </p>
          </div>

          {/* CTA */}
          <a
            href={WHATSAPP_CORPORATE_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 px-8 py-4 min-h-[48px] bg-accent hover:bg-accent/90 text-primary font-bold text-base sm:text-lg rounded-full shadow-lg shadow-accent/20 hover:shadow-xl hover:shadow-accent/30 transition-all duration-300 active:scale-95"
          >
            <MessageCircle className="w-5 h-5" />
            Get Corporate Quote
          </a>

        </div>
      </div>
    </section>
  );
};

export default CorporateBanner;
