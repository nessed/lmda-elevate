import usaidLogo from "@/assets/lmda/1766913965236_logo-usaid.png";
import haierLogo from "@/assets/lmda/1766913968918_haier.png";
import ksbLogo from "@/assets/lmda/1766913993449_Ksblogo.png";
import uolLogo from "@/assets/lmda/1766914004535_University_of_Lahore_(logo).png";

const TrustBar = () => {
  const partners = [
    { name: "USAID", logo: usaidLogo },
    { name: "Haier", logo: haierLogo },
    { name: "KSB", logo: ksbLogo },
    { name: "Allied Bank", logo: null }, // Will use text fallback
    { name: "University of Lahore", logo: uolLogo },
  ];

  return (
    <section className="py-12 bg-secondary border-y border-border">
      <div className="container-wide">
        <div className="flex flex-col items-center gap-8">
          <p className="text-sm font-semibold text-muted-foreground uppercase tracking-widest text-center">
            Trusted by Leading Organizations
          </p>
          <div className="flex flex-wrap items-center justify-center gap-12 md:gap-16">
            {partners.map((partner) => (
              <div key={partner.name} className="flex items-center justify-center h-16">
                {partner.logo ? (
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="h-12 w-auto object-contain opacity-60 hover:opacity-100 transition-opacity grayscale hover:grayscale-0"
                  />
                ) : (
                  <span className="text-base font-bold text-muted-foreground uppercase tracking-wide">
                    {partner.name}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustBar;
