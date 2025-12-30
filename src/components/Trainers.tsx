import { motion } from "framer-motion";
import imgAliSajid from "@/assets/lmda/1766914035711_alisajid.webp";

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
      image: imgAliSajid,
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
    <section id="facilitators" className="py-24 sm:py-32 bg-primary relative overflow-hidden">
      {/* Top Divider (Wave from Slate-50) */}
      <div className="absolute top-0 left-0 right-0 w-full overflow-hidden leading-none rotate-180">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-16 sm:h-24 fill-slate-50">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
        </svg>
      </div>

      <div className="container-wide px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4">
            <div className="w-8 sm:w-12 h-px bg-accent/60" />
            <span className="text-xs sm:text-sm font-medium text-accent uppercase tracking-widest">
              Elite Facilitators
            </span>
            <div className="w-8 sm:w-12 h-px bg-accent/60" />
          </div>
          <h2 className="heading-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white mb-6 font-bold">
            Elite Facilitators & <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-yellow-200">Industry Experts</span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-slate-300 font-medium px-4 leading-relaxed">
            Learn from a Retired Brigadier, a Former Ambassador, and a Presidential Award Winner.
          </p>
        </motion.div>

        {/* Facilitator Carousel (Mobile) / Grid (Desktop) */}
        <motion.div 
          className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 overflow-x-auto snap-x snap-mandatory pb-8 md:pb-0 px-4 md:px-0 -mx-4 md:mx-0 hide-scrollbar"
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
                className="flex-shrink-0 w-[85vw] md:w-auto snap-center md:snap-start bg-white/5 backdrop-blur-sm border border-white/10 hover:border-accent/50 transition-all group overflow-hidden rounded-3xl"
                variants={cardVariants}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                {/* Image for Prof. Dr. Ali Sajid */}
                {hasImage && (
                  <div className="aspect-square bg-white/5 flex items-center justify-center overflow-hidden">
                    <img
                      src={facilitator.image}
                      alt={facilitator.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}

                {/* Content */}
                <div className="p-6 sm:p-8">
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                    {facilitator.name}
                  </h3>
                  <p className="text-sm text-accent font-semibold mb-4 tracking-wide">
                    {facilitator.credentials}
                  </p>

                  {/* Highlight Badge */}
                  {facilitator.highlight && (
                    <div className="inline-block bg-accent/20 border border-accent/30 px-3 py-1 mb-5">
                      <p className="text-[10px] sm:text-xs font-bold text-accent uppercase tracking-wide">
                        {facilitator.highlight}
                      </p>
                    </div>
                  )}

                  {/* Mastery Tag */}
                  <div className="bg-white/5 border-l-2 border-accent px-4 py-3 mb-5 rounded-r-lg">
                    <p className="text-[10px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">
                      Mastery
                    </p>
                    <p className="text-sm font-bold text-slate-100">
                      {facilitator.mastery}
                    </p>
                  </div>

                  {/* Bio */}
                  <p className="text-sm text-slate-400 leading-relaxed line-clamp-3">
                    {facilitator.bio}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Bottom Divider (Wave to Slate-100) */}
      <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-16 sm:h-24 fill-slate-100">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
        </svg>
      </div>
    </section>
  );
};

export default Trainers;