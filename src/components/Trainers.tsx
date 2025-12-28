import content from "@/data/content";

const Trainers = () => {
  // Helper to extract credentials from name/role
  const getCredentials = (name: string, role: string) => {
    const creds: string[] = [];
    if (name.includes("PhD")) creds.push("PhD (USA)");
    if (name.includes("T.I")) creds.push("T.I.");
    if (name.includes("Dr.") && !name.includes("PhD")) creds.push("PhD");
    if (name.includes("Engr.")) creds.push("Engineer");
    if (role.includes("Psychologist")) creds.push("Psychologist");
    return creds;
  };

  return (
    <section id="trainers" className="section-padding bg-background">
      <div className="container-wide">
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-px bg-accent" />
            <span className="text-sm font-medium text-accent uppercase tracking-widest">
              Our Experts
            </span>
          </div>
          <h2 className="heading-serif text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
            Led by Industry Authorities
          </h2>
          <p className="text-muted-foreground">
            Our team combines academic excellence with decades of real-world consulting experience.
          </p>
        </div>

        {/* Lead Expert - Prof. Ali Sajid */}
        <div className="mb-12 p-8 bg-foreground text-background flex flex-col md:flex-row gap-8 items-center">
          <div className="w-40 h-40 flex-shrink-0 overflow-hidden" style={{ borderRadius: 0 }}>
            {content.trainers[0].image ? (
              <img
                src={content.trainers[0].image}
                alt={content.trainers[0].name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-muted flex items-center justify-center">
                <span className="text-4xl font-bold text-muted-foreground">AS</span>
              </div>
            )}
          </div>
          <div>
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="badge-gold">PhD (USA)</span>
              <span className="badge-gold">T.I.</span>
              <span className="badge-gold">Lead Consultant</span>
            </div>
            <h3 className="heading-serif text-2xl md:text-3xl text-background mb-2">
              {content.trainers[0].name}
            </h3>
            <p className="text-background/70">
              {content.trainers[0].role}
            </p>
          </div>
        </div>

        {/* Other Experts Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {content.trainers.slice(1).map((trainer) => {
            const credentials = getCredentials(trainer.name, trainer.role);
            return (
              <div
                key={trainer.id}
                className="card-authority p-0 overflow-hidden"
              >
                {/* Photo */}
                <div className="aspect-[4/5] bg-muted">
                  {trainer.image ? (
                    <img
                      src={trainer.image}
                      alt={trainer.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-4xl font-bold text-muted-foreground/30">
                        {trainer.name.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="p-4">
                  {credentials.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-2">
                      {credentials.slice(0, 2).map((cred) => (
                        <span key={cred} className="badge-gold text-[10px]">{cred}</span>
                      ))}
                    </div>
                  )}
                  <h3 className="text-sm font-semibold text-foreground mb-1 line-clamp-1">
                    {trainer.name.replace(/, PhD.*| T\.I\.?|Dr\. |Engr\. /g, '')}
                  </h3>
                  <p className="text-xs text-muted-foreground line-clamp-1">
                    {trainer.role}
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
