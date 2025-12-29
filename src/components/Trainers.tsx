import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Trainers = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header badge fade-in
      if (headerRef.current) {
        const badge = headerRef.current.querySelector('.header-badge');
        const subtitle = headerRef.current.querySelector('.header-subtitle');
        
        gsap.from(badge, {
          y: 20,
          opacity: 0,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
          },
        });

        gsap.from(subtitle, {
          y: 20,
          opacity: 0,
          duration: 0.6,
          delay: 0.3,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
          },
        });
      }

      // Text scrubbing - word by word fade in
      if (headlineRef.current) {
        const words = headlineRef.current.querySelectorAll('.scrub-word');
        
        gsap.from(words, {
          opacity: 0.1,
          y: 10,
          stagger: 0.05,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: headlineRef.current,
            start: "top 80%",
            end: "top 50%",
            scrub: 1,
          },
        });
      }

      // Trainer cards stagger
      if (cardsContainerRef.current) {
        const cards = cardsContainerRef.current.querySelectorAll('.trainer-card');
        
        gsap.from(cards, {
          y: 50,
          opacity: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardsContainerRef.current,
            start: "top 80%",
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Split headline into words for text scrubbing
  const headline = "Learn from Pakistan's Top Minds";
  const headlineWords = headline.split(' ');

  return (
    <section ref={sectionRef} id="facilitators" className="py-12 sm:py-16 lg:py-24 bg-secondary">
      <div className="container-wide px-4 sm:px-6">
        {/* Section Header */}
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 lg:mb-16">
          <div className="header-badge flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <div className="w-8 sm:w-12 h-px bg-accent" />
            <span className="text-xs sm:text-sm font-medium text-accent uppercase tracking-widest">
              Elite Facilitators
            </span>
            <div className="w-8 sm:w-12 h-px bg-accent" />
          </div>
          <h2 
            ref={headlineRef}
            className="heading-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-primary mb-3 sm:mb-4 font-bold"
          >
            {headlineWords.map((word, index) => (
              <span key={index} className="scrub-word inline-block mr-2 sm:mr-3">
                {word}
              </span>
            ))}
          </h2>
          <p className="header-subtitle text-sm sm:text-base lg:text-lg text-muted-foreground font-medium px-4">
            A Retired Brigadier. A Former Ambassador. A Presidential Award Winner.
          </p>
        </div>

        {/* Facilitator Carousel (Mobile) / Grid (Desktop) */}
        <div 
          ref={cardsContainerRef}
          className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 overflow-x-auto snap-x snap-mandatory pb-4 md:pb-0 px-4 md:px-0 -mx-4 md:mx-0 hide-scrollbar"
        >
          {facilitators.map((facilitator, index) => {
            const hasImage = facilitator.image && index === 0;
            
            return (
              <div
                key={index}
                className="trainer-card flex-shrink-0 w-[80vw] md:w-auto snap-center md:snap-start bg-white border border-border hover:border-accent transition-all group overflow-hidden rounded-2xl md:rounded-none will-change-transform"
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
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Trainers;