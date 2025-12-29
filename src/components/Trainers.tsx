import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

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
      credentials: "Clinical Psychologist & Hypnotherapist",
      mastery: "Performance Coaching & Behavioral Excellence",
      image: null,
      bio: "40+ years of clinical practice with UN agencies and the Pakistan Cricket Board.",
      highlight: "UN & PCB Consultant",
    },
    {
      name: "Ambassador Khayyam Akbar",
      credentials: "Former Ambassador to Spain",
      mastery: "Executive Diplomacy & Communication",
      image: null,
      bio: "30+ years in international diplomacy and executive communication.",
      highlight: "International Diplomat",
    },
    {
      name: "Brig. (R) Tariq Javed",
      credentials: "Former Commandant, NUST College",
      mastery: "Leadership & Strategic Decision-Making",
      image: null,
      bio: "35+ years of military leadership. Expert in professional presence and command authority.",
      highlight: "Military Leadership Expert",
    },
    {
      name: "Adeel Anwar",
      credentials: "CHRO, Air Link Communication",
      mastery: "Organizational Development & Talent Strategy",
      image: null,
      bio: "23+ years in HR leadership with Coca-Cola, EY, and Air Link.",
      highlight: "Fortune 500 CHRO",
    },
  ];

  return (
    <section id="facilitators" className="py-12 sm:py-16 lg:py-24 bg-secondary">
      <div className="container-wide px-4 sm:px-6">
        {/* Section Header */}
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 lg:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <div className="w-8 sm:w-12 h-px bg-accent" />
            <span className="text-xs sm:text-sm font-medium text-accent uppercase tracking-widest">
              Elite Facilitators
            </span>
            <div className="w-8 sm:w-12 h-px bg-accent" />
          </div>
          <h2 className="heading-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-primary mb-3 sm:mb-4 font-bold">
            Learn from Pakistan's Top Minds
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground font-medium px-4">
            A Retired Brigadier. A Former Ambassador. A Presidential Award Winner.
          </p>
        </motion.div>

        {/* Facilitator Carousel (Mobile) / Grid (Desktop) */}
        <motion.div 
          className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 overflow-x-auto snap-x snap-mandatory pb-4 md:pb-0 px-4 md:px-0 -mx-4 md:mx-0 hide-scrollbar"
          style={{ scrollSnapType: 'x mandatory' }}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {facilitators.map((facilitator, index) => {
            const hasImage = facilitator.image && index === 0;
            
            return (
              <motion.div
                key={index}
                className="flex-shrink-0 w-[80vw] md:w-auto snap-center md:snap-start bg-white border border-border hover:border-accent transition-all group overflow-hidden rounded-2xl md:rounded-none"
                style={{ scrollSnapAlign: 'center' }}
                variants={cardVariants}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                {/* Image for Prof. Dr. Ali Sajid */}
                {hasImage && (
                  <div className="aspect-square bg-secondary flex items-center justify-center overflow-hidden">
                    <img
                      src={facilitator.image}
                      alt={facilitator.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}

                {/* Content */}
                <div className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-primary mb-1 sm:mb-2">
                    {facilitator.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-accent font-semibold mb-2 sm:mb-3">
                    {facilitator.credentials}
                  </p>

                  {/* Highlight Badge */}
                  {facilitator.highlight && (
                    <div className="inline-block bg-accent px-2 sm:px-3 py-0.5 sm:py-1 mb-3 sm:mb-4 rounded">
                      <p className="text-[10px] sm:text-xs font-bold text-primary uppercase tracking-wide">
                        {facilitator.highlight}
                      </p>
                    </div>
                  )}

                  {/* Mastery Tag */}
                  <div className="bg-primary/5 border-l-2 sm:border-l-4 border-primary px-3 sm:px-4 py-2 sm:py-3 mb-3 sm:mb-4 rounded-r-lg">
                    <p className="text-[10px] sm:text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-0.5 sm:mb-1">
                      Mastery
                    </p>
                    <p className="text-xs sm:text-sm font-bold text-primary">
                      {facilitator.mastery}
                    </p>
                  </div>

                  {/* Bio */}
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-3">
                    {facilitator.bio}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Trainers;