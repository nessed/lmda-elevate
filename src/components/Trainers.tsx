const Trainers = () => {
  const facilitators = [
    {
      name: "Prof. Dr. Ali Sajid",
      credentials: "T.I. (Tamgha-e-Imtiaz)",
      mastery: "Inspirational Leadership & Sales Growth",
      image: "/src/assets/lmda/1766914035711_alisajid.jpg",
      bio: "Presidential Award Winner with 28+ years of transforming organizations across Pakistan and internationally.",
      highlight: "Presidential Award Winner",
    },
    {
      name: "Max Babri",
      credentials: "Clinical Psychologist & Certified Hypnotherapist",
      mastery: "Performance Coaching & Behavioral Excellence",
      image: null,
      bio: "40+ years of clinical practice with UN agencies and the Pakistan Cricket Board. Elite corporate coach specializing in high-performance mindsets.",
      highlight: "UN & PCB Consultant",
    },
    {
      name: "Ambassador Khayyam Akbar",
      credentials: "Former Pakistani Ambassador to Spain",
      mastery: "Executive Diplomacy & Refined Communication",
      image: null,
      bio: "30+ years in international diplomacy and executive communication. Master of high-stakes negotiation and cross-cultural leadership.",
      highlight: "International Diplomat",
    },
    {
      name: "Brig. (R) Tariq Javed",
      credentials: "Former Commandant, NUST College of E&ME",
      mastery: "Leadership Presence & Strategic Decision-Making",
      image: null,
      bio: "35+ years of military leadership. Expert in professional presence, command authority, and strategic thinking under pressure.",
      highlight: "Military Leadership Expert",
    },
    {
      name: "Adeel Anwar",
      credentials: "CHRO, Air Link Communication",
      mastery: "Organizational Development & Talent Strategy",
      image: null,
      bio: "23+ years in HR leadership with Coca-Cola, EY, and Air Link. Fortune 500 experience in building high-performance cultures.",
      highlight: "Fortune 500 CHRO",
    },
  ];

  return (
    <section id="facilitators" className="py-24 bg-secondary">
      <div className="container-wide">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-px bg-accent" />
            <span className="text-sm font-medium text-accent uppercase tracking-widest">
              Elite Board of Facilitators
            </span>
            <div className="w-12 h-px bg-accent" />
          </div>
          <h2 className="heading-serif text-4xl md:text-5xl text-primary mb-4 font-bold">
            Learn from Pakistan's Top Minds
          </h2>
          <p className="text-lg text-muted-foreground font-medium">
            A Retired Brigadier. A Former Ambassador. A Presidential Award Winner. This is elite-tier corporate access.
          </p>
        </div>

        {/* Facilitator Grid - Only show Prof. Dr. Ali Sajid with photo */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {facilitators.map((facilitator, index) => {
            // Only render if we have an image (Prof. Dr. Ali Sajid)
            if (!facilitator.image && index !== 0) {
              return (
                <div
                  key={index}
                  className="bg-white border-2 border-border hover:border-accent transition-all group p-8"
                >
                  {/* No image placeholder - just content */}
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-primary mb-2">
                      {facilitator.name}
                    </h3>
                    <p className="text-sm text-accent font-semibold mb-3">
                      {facilitator.credentials}
                    </p>

                    {/* Highlight Badge */}
                    {facilitator.highlight && (
                      <div className="inline-block bg-accent px-3 py-1 mb-4">
                        <p className="text-xs font-bold text-primary uppercase tracking-wide">
                          {facilitator.highlight}
                        </p>
                      </div>
                    )}

                    {/* Mastery Tag */}
                    <div className="bg-primary/5 border-l-4 border-primary px-4 py-3 mb-4">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                        Mastery
                      </p>
                      <p className="text-sm font-bold text-primary">
                        {facilitator.mastery}
                      </p>
                    </div>

                    {/* Bio */}
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {facilitator.bio}
                    </p>
                  </div>
                </div>
              );
            }

            // Render with image for Prof. Dr. Ali Sajid
            return (
              <div
                key={index}
                className="bg-white border-2 border-border hover:border-accent transition-all group"
              >
                {/* Image */}
                <div className="aspect-square bg-secondary flex items-center justify-center overflow-hidden">
                  <img
                    src={facilitator.image}
                    alt={facilitator.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-primary mb-2">
                    {facilitator.name}
                  </h3>
                  <p className="text-sm text-accent font-semibold mb-3">
                    {facilitator.credentials}
                  </p>

                  {/* Highlight Badge */}
                  {facilitator.highlight && (
                    <div className="inline-block bg-accent px-3 py-1 mb-4">
                      <p className="text-xs font-bold text-primary uppercase tracking-wide">
                        {facilitator.highlight}
                      </p>
                    </div>
                  )}

                  {/* Mastery Tag */}
                  <div className="bg-primary/5 border-l-4 border-primary px-4 py-3 mb-4">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                      Mastery
                    </p>
                    <p className="text-sm font-bold text-primary">
                      {facilitator.mastery}
                    </p>
                  </div>

                  {/* Bio */}
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {facilitator.bio}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Trainers;
