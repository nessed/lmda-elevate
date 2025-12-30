import { ArrowRight, Sparkles } from "lucide-react";
import { useRef, useEffect, useState } from "react";
import { motion, useInView, useSpring, useTransform } from "framer-motion";
import heroImage from "@/assets/cover.webp";
import lmdaLogo from "@/assets/lmda-logo.webp";
import { getWhatsAppLink } from "@/data/siteConfig";

// Count-up animation component
const CountUp = ({ to }: { to: number }) => {
  const spring = useSpring(0, { mass: 0.8, stiffness: 75, damping: 20 });
  const display = useTransform(spring, (current) => Math.floor(current));
  const [value, setValue] = useState(0);

  useEffect(() => {
    const unsubscribe = display.on("change", (latest) => setValue(latest));
    // Set initial value
    spring.set(0);
    // Animate to target
    setTimeout(() => spring.set(to), 500);
    return unsubscribe;
  }, [spring, to, display]);

  return <span>{value}</span>;
}

const Hero = () => {
  const statsRef = useRef<HTMLDivElement>(null);
  const isStatsInView = useInView(statsRef, { once: true, margin: "-100px" });

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.8, 
        delay: custom * 0.15 + 0.3 
      }
    })
  };

  const floatingVariant = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 4,
        ease: "easeInOut",
        repeat: Infinity,
      }
    }
  };

  const floatingBadgeVariant = {
    animate: {
      y: [0, -8, 0],
      transition: {
        duration: 3,
        ease: "easeInOut",
        repeat: Infinity,
        delay: 0.5
      }
    }
  };

  return (
    <section id="home" className="relative min-h-[70vh] sm:min-h-[100svh] flex items-center bg-primary overflow-hidden">
      {/* Mobile Header with Logo */}
      <div className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-4 py-3 sm:hidden">
        <img src={lmdaLogo} alt="LMDA" className="h-10 w-auto drop-shadow-lg" />
        <a href="#programs" className="bg-accent/90 text-primary text-xs font-bold uppercase tracking-wider px-3 py-1.5 shadow-lg">
          Explore
        </a>
      </div>

      {/* Animated Background Elements */}
      <motion.div 
        animate={{ opacity: [0.5, 0.8, 0.5], scale: [1, 1.05, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 right-1/4 w-[200px] sm:w-[400px] lg:w-[500px] h-[200px] sm:h-[400px] lg:h-[500px] bg-accent/10 rounded-full blur-3xl" 
      />
      <motion.div 
        animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.1, 1] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-1/4 left-1/4 w-[150px] sm:w-[300px] lg:w-[400px] h-[150px] sm:h-[300px] lg:h-[400px] bg-blue-500/10 rounded-full blur-3xl" 
      />
      
      {/* Background Image */}
      <div className="absolute inset-0 bg-primary">
        <div className="absolute right-0 top-0 h-full w-full lg:w-[65%]">
          <img
            src={heroImage}
            alt="Prof. Dr. Ali Sajid"
            className="w-full h-full object-cover object-[75%_center] sm:object-center lg:object-[center_20%] opacity-80 sm:opacity-70 lg:opacity-70 mix-blend-overlay lg:mix-blend-normal"
            // @ts-ignore - fetchpriority is not yet in all TS React types
            fetchpriority="high"
          />
          {/* Gradient Masks */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/70 via-primary/40 to-transparent sm:from-primary sm:via-primary/80 lg:via-primary/80 lg:to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/60 to-transparent" />
        </div>
        
        {/* Grid Overlay */}
        <div className="absolute inset-0 opacity-[0.05] sm:opacity-[0.15]" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '30px 30px'
        }} />
      </div>

      <div className="container-wide py-20 pt-28 sm:pt-32 lg:py-32 relative z-10 px-4 sm:px-6">
        <div className="max-w-4xl">
          {/* PEC Partnership Badge */}
          <motion.div 
            className="mb-6 sm:mb-8"
            initial="hidden"
            animate="visible"
            custom={0}
            variants={fadeUpVariants}
          >
            <p className="text-sm sm:text-base font-semibold tracking-wide">
              <span className="text-white/60">Official Training Partner of</span>{" "}
              <span className="text-accent">Pakistan Engineering Council</span>
            </p>
          </motion.div>

          {/* Main Headline */}
          <motion.h1 
            className="heading-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-[1.1] sm:leading-[1.05] text-white mb-4 sm:mb-6 font-bold drop-shadow-2xl"
            initial="hidden"
            animate="visible"
            custom={1}
            variants={fadeUpVariants}
          >
            Pakistan's Premier 
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-accent via-yellow-200 to-accent">
              Sales & Leadership
            </span>
            Training Ecosystem
          </motion.h1>

          {/* Sub-headline */}
          <motion.p 
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 max-w-3xl leading-relaxed mb-8 sm:mb-10 lg:mb-12 font-medium"
            initial="hidden"
            animate="visible"
            custom={2}
            variants={fadeUpVariants}
          >
            <strong className="text-accent">28+ Years.</strong>{" "}
            <strong className="text-accent">10,000+ Professionals.</strong>{" "}
            <span className="hidden sm:inline">Led by </span>
            <strong className="text-accent">Prof. Dr. Ali Sajid (T.I.)</strong>
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-col gap-4 mb-10 sm:mb-16"
            initial="hidden"
            animate="visible"
            custom={3}
            variants={fadeUpVariants}
          >
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.a
                href="#programs"
                className="shimmer-gold group inline-flex items-center justify-center gap-3 text-lg px-8 py-4 min-h-[48px] bg-gradient-to-r from-accent to-yellow-500 text-primary font-bold hover:shadow-2xl hover:shadow-accent/40 transition-all duration-300 active:scale-95 shadow-xl shadow-accent/20"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >

                View Workshops
                <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
              </motion.a>
            </div>
            
            {/* Corporate WhatsApp Link */}
            <a 
              href={getWhatsAppLink("Hi LMDA, I'm interested in corporate training for my team.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-white/70 hover:text-accent transition-colors text-sm sm:text-base font-medium"
            >
              <span>Looking for corporate training?</span>
              <span className="text-accent underline underline-offset-4">Contact us on WhatsApp →</span>
            </a>
          </motion.div>

          {/* Quick Stats */}
          <motion.div 
            ref={statsRef}
            className="grid grid-cols-3 gap-4 sm:gap-6 lg:gap-8 pt-6 sm:pt-8 border-t border-white/20"
            initial={{ opacity: 0, y: 30 }}
            animate={isStatsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="flex flex-col items-center sm:flex-row sm:items-center gap-1 sm:gap-3 group text-center sm:text-left">
              <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-accent drop-shadow-lg flex items-center">
                {isStatsInView && <CountUp to={28} />}+
              </span>
              <span className="text-[10px] sm:text-xs lg:text-sm text-white/80 font-medium leading-tight">Years of<br className="hidden sm:block"/>Excellence</span>
            </div>
            <div className="flex flex-col items-center sm:flex-row sm:items-center gap-1 sm:gap-3 group text-center sm:text-left border-x border-white/10 sm:border-0 sm:border-l sm:pl-6">
              <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-accent drop-shadow-lg flex items-center">
                {isStatsInView && <CountUp to={10} />}K+
              </span>
              <span className="text-[10px] sm:text-xs lg:text-sm text-white/80 font-medium leading-tight">Professionals<br className="hidden sm:block"/>Trained</span>
            </div>
            <div className="flex flex-col items-center sm:flex-row sm:items-center gap-1 sm:gap-3 group text-center sm:text-left sm:border-l sm:border-white/10 sm:pl-6">
              <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-accent drop-shadow-lg flex items-center">
                {isStatsInView && <CountUp to={50} />}+
              </span>
              <span className="text-[10px] sm:text-xs lg:text-sm text-white/80 font-medium leading-tight">Partner<br className="hidden sm:block"/>Organizations</span>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Scroll Indicator - Hidden on mobile */}
      <motion.div 
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 hidden sm:block"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-white/20 rounded-md flex items-start justify-center p-1.5 sm:p-2">
          <motion.div 
            className="w-1 h-2 sm:w-1.5 sm:h-3 bg-accent"
            animate={{ height: ["20%", "50%", "20%"], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;