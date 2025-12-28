import content from "@/data/content";

const TrustBar = () => {
  return (
    <section className="py-10 bg-foreground">
      <div className="container-wide">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-sm font-medium text-background/50 uppercase tracking-widest">
            Trusted by Leading Organizations
          </p>
          <div className="flex flex-wrap items-center justify-center gap-10 md:gap-14">
            {content.partners.slice(0, 5).map((partner) => (
              <div
                key={partner.name}
                className="flex items-center justify-center h-12"
              >
                {partner.logo ? (
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="h-10 w-auto object-contain brightness-0 invert opacity-70 hover:opacity-100 transition-opacity"
                  />
                ) : (
                  <span className="text-sm font-semibold text-background/50 uppercase tracking-wide">
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
