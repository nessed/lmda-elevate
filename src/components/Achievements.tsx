import { useState, useRef } from "react";
import leadershipCamp1 from "@/assets/lmda/1766913795323_leadership camp.webp";
import leadershipCamp2 from "@/assets/lmda/1766913791083_dynamic professional.webp";
import workshop1 from "@/assets/lmda/1766913733562_one.webp";
import workshop2 from "@/assets/lmda/1766913752284_four.webp";
import workshop3 from "@/assets/lmda/1766913760550_five.webp";
import workshop4 from "@/assets/lmda/1766913771732_six.webp";
import { ChevronLeft, ChevronRight, X, Users, Clock, Building2, Award } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Gallery Data
const cases = [
  {
    image: leadershipCamp1,
    tag: "Government",
    caption: "Punjab Police College, Sihala",
    title: "Leading with Empathy",
    date: "Dec 2024",
  },
  {
    image: workshop1,
    tag: "Executive",
    caption: "PPMI Complex, Islamabad",
    title: "AI for Excellence",
    date: "Nov 2024",
  },
  {
    image: workshop2,
    tag: "Corporate",
    caption: "TEVTA Bahawalpur",
    title: "Conflict Resolution",
    date: "Oct 2024",
  },
  {
    image: leadershipCamp2,
    tag: "Summit",
    caption: "Lahore Training Center",
    title: "Sales KPI Analysis",
    date: "Sep 2024",
  },
  {
    image: workshop3,
    tag: "Engineering",
    caption: "Engineering Academy",
    title: "NLP Communication",
    date: "Aug 2024",
  },
  {
    image: workshop4,
    tag: "Banking",
    caption: "Allied Bank HQ, Karachi",
    title: "Strategic Leadership",
    date: "Jul 2024",
  },
];

const stats = [
  { icon: Users, value: "10,000+", label: "Professionals Trained" },
  { icon: Clock, value: "28+", label: "Years Experience" },
  { icon: Building2, value: "50+", label: "Organizations" },
  { icon: Award, value: "Govt & Corporate", label: "Clients" },
];

const Achievements = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState(2);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev < cases.length - 1 ? prev + 1 : prev));
  };

  return (
    <section id="gallery" className="py-20 lg:py-28 bg-slate-50 relative overflow-hidden">
      
      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors p-2.5 bg-white/10 hover:bg-white/20 border border-white/10"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-6 h-6" />
            </button>
            <motion.img 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              src={selectedImage} 
              alt="Gallery Preview" 
              className="max-w-full max-h-[90vh] object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container-wide relative z-10 px-4 sm:px-6">
        
        {/* Minimal Header */}
        <div className="mb-16 lg:mb-20 max-w-2xl">
          <p className="text-accent font-semibold text-sm tracking-widest uppercase mb-4">
            Training Archive
          </p>
          <h2 className="heading-serif text-3xl md:text-4xl lg:text-5xl font-bold text-primary leading-tight">
            Organizations We've Transformed
          </h2>
        </div>

        {/* Desktop Gallery - Center Dominant */}
        <div className="hidden lg:block relative h-[560px] w-full max-w-6xl mx-auto">
          <div className="absolute inset-0 flex items-center justify-center">
            {cases.map((item, index) => {
              const isActive = index === activeIndex;
              const offset = index - activeIndex;
              
              if (Math.abs(offset) > 2) return null;

              return (
                <motion.div
                  key={index}
                  className={`absolute top-1/2 left-1/2 w-[620px] aspect-[4/3] rounded-xl overflow-hidden cursor-pointer ${
                    isActive 
                      ? "z-30 ring-4 ring-accent/30 shadow-[0_25px_80px_-20px_rgba(0,0,0,0.5)]" 
                      : "z-10"
                  }`}
                  initial={false}
                  animate={{
                    x: offset * 520 - 310,
                    y: "-50%",
                    scale: isActive ? 1.08 : 0.75,
                    opacity: isActive ? 1 : 0.25,
                    filter: isActive ? "blur(0px) brightness(1)" : "blur(2px) brightness(0.7)",
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 20
                  }}
                  onClick={() => {
                    if (isActive) setSelectedImage(item.image);
                    else setActiveIndex(index);
                  }}
                >
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover" />

                  {/* Bottom Overlay - Only on Active */}
                  {isActive && (
                    <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                      <h3 className="text-2xl lg:text-3xl font-bold text-white mb-1">
                        {item.title}
                      </h3>
                      <div className="flex items-center gap-3 text-white/70 text-sm">
                        <span>{item.caption}</span>
                        <span className="w-1 h-1 rounded-full bg-white/40" />
                        <span>{item.date}</span>
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Navigation - Minimal */}
          <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 flex items-center gap-10 z-40">
            <button 
              onClick={handlePrev}
              disabled={activeIndex === 0}
              className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-primary transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Previous</span>
            </button>
            
            <div className="flex items-center gap-1 text-sm font-medium text-primary">
              <span className="text-accent">{String(activeIndex + 1).padStart(2, '0')}</span>
              <span className="text-slate-400">/</span>
              <span className="text-slate-400">{String(cases.length).padStart(2, '0')}</span>
            </div>

            <button 
              onClick={handleNext}
              disabled={activeIndex === cases.length - 1}
              className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-primary transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Mobile Gallery */}
        <div className="lg:hidden">
          <div 
             ref={scrollContainerRef}
             className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-6 -mx-4 px-4"
          >
            {cases.map((item, index) => (
              <div 
                key={index} 
                className="flex-shrink-0 w-[80vw] snap-center relative aspect-[4/3] rounded-lg overflow-hidden shadow-lg"
                onClick={() => setSelectedImage(item.image)}
              >
                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />

                <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-black/80 to-transparent">
                  <h3 className="text-xl font-bold text-white mb-0.5">
                    {item.title}
                  </h3>
                  <p className="text-white/70 text-sm">
                    {item.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center gap-1.5 mt-4">
            {cases.map((_, i) => (
              <div key={i} className="w-1.5 h-1.5 rounded-full bg-slate-300" />
            ))}
          </div>
        </div>

        {/* Credibility Strip */}
        <div className="mt-24 lg:mt-32 pt-8 border-t border-slate-200">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-12 h-12 border border-accent/20 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-xl lg:text-2xl font-bold text-primary">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Achievements;
