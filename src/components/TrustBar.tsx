import content from "@/data/content.json";

const TrustBar = () => {
  // Double the partners array for seamless infinite scroll
  const partners = [...content.partners, ...content.partners];

  return (
    <section className="py-12 bg-secondary/30 border-y border-border overflow-hidden">
      <div className="container-wide mb-6">
        <p className="text-center text-sm font-medium text-muted-foreground uppercase tracking-wider">
          Organizations Who Benefited From Our Training
        </p>
      </div>

      <div className="relative">
        {/* Gradient masks for smooth edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-secondary/30 to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-secondary/30 to-transparent z-10" />

        <div className="flex marquee">
          {partners.map((partner, index) => (
            <div
              key={`${partner.name}-${index}`}
              className="flex-shrink-0 px-8 md:px-12"
            >
              <div className="flex items-center justify-center h-16 px-6 py-3 bg-background rounded-lg border border-border/50 hover:border-primary/30 transition-colors">
                <span className="text-lg font-semibold text-foreground/70 whitespace-nowrap">
                  {partner.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBar;
