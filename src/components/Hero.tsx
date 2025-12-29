import { ArrowRight, Award, Sparkles, Zap } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import heroImage from "@/assets/cover.png";

// Count-up animation hook
const useCountUp = (end: number, duration: number = 2000, inView: boolean) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    if (!inView) return;
    
    let startTime: number;
    let animationFrame: number;
    
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };
    
    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, inView]);
  
  return count;
};

const Hero = () => {
  const statsRef = useRef<HTMLDivElement>(null);
  const isStatsInView = useInView(statsRef, { once: true, margin: "-100px" });
  
  const years = useCountUp(28, 1500, isStatsInView);
  const professionals = useCountUp(10, 1500, isStatsInView);
  const partners = useCountUp(50, 1500, isStatsInView);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section id="home" className="relative min-h-[85vh] sm:min-h-[100svh] flex items-center bg-primary overflow-hidden">
      {/* Simple Mobile Header */}
      <div className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-4 py-4 sm:hidden">
        <img src={heroImage} alt="Logo" className="h-8 w-auto opacity-0" /> {/* Spacer */}
        <span className="text-white/90 text-sm font-bold tracking-widest uppercase">LMDA</span>
        <a href="#programs" className="text-accent text-xs font-bold uppercase tracking-wider">
          Explore
        </a>
      </div>

      {/* Animated Background Elements - Smaller on Mobile */}
      <div className="absolute top-1/4 right-1/4 w-[200px] sm:w-[400px] lg:w-[500px] h-[200px] sm:h-[400px] lg:h-[500px] bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
      <div className="absolute bottom-1/4 left-1/4 w-[150px] sm:w-[300px] lg:w-[400px] h-[150px] sm:h-[300px] lg:h-[400px] bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '2s' }} />
      
      {/* Background Image */}
      <div className="absolute inset-0 bg-primary">
        <div className="absolute right-0 top-0 h-full w-full lg:w-[65%] transition-all duration-700">
          <img
            src={heroImage}
            alt="Prof. Dr. Ali Sajid"
            className="w-full h-full object-cover object-[75%_center] sm:object-center lg:object-[center_20%] opacity-30 sm:opacity-50 lg:opacity-60 mix-blend-overlay lg:mix-blend-normal"
          />
          {/* Gradient Masks */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/95 to-primary/60 lg:via-primary/80 lg:to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-transparent sm:to-transparent" />
        </div>
        
        {/* Grid Overlay */}
        <div className="absolute inset-0 opacity-[0.03] sm:opacity-10" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '30px 30px'
        }} />
      </div>

      <div className="container-wide py-20 pt-28 sm:pt-32 lg:py-32 relative z-10 px-4 sm:px-6">
        <motion.div 
          className="max-w-4xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* PEC Partnership Badge */}
          <motion.div 
            className="flex items-center gap-3 sm:gap-6 mb-6 sm:mb-8 flex-wrap"
            variants={itemVariants}
          >
            <div className="flex items-center gap-2 sm:gap-3 bg-accent px-3 sm:px-5 py-2 sm:py-2.5 shadow-xl shadow-accent/30">
              <Award className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
              <span className="text-xs sm:text-sm font-bold text-primary uppercase tracking-wide">
                Official Partner
              </span>
            </div>
            <span className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-[0.15em] sm:tracking-[0.2em] px-4 sm:px-6 py-1.5 sm:py-2 border-2 border-accent/40 bg-white/5 backdrop-blur-md">
              PEC
            </span>
          </motion.div>

          {/* Main Headline - Slide up animation */}
          <motion.h1 
            className="heading-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-[1.1] sm:leading-[1.05] text-white mb-4 sm:mb-6 font-bold drop-shadow-2xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Pakistan's Premier 
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-accent via-yellow-200 to-accent animate-pulse-slow">
              Sales & Leadership
            </span>
            Training Ecosystem
          </motion.h1>

          {/* Sub-headline */}
          <motion.p 
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 max-w-3xl leading-relaxed mb-6 sm:mb-8 lg:mb-10 font-medium"
            variants={itemVariants}
          >
            <strong className="text-accent">28+ Years.</strong>{" "}
            <strong className="text-accent">10,000+ Professionals.</strong>{" "}
            <span className="hidden sm:inline">Led by </span>
            <strong className="text-accent">Prof. Dr. Ali Sajid (T.I.)</strong>
          </motion.p>

          {/* CTA Buttons - Staggered fade-in */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 sm:mb-12"
            variants={containerVariants}
          >
            <motion.a
              href="#programs"
              className="group inline-flex items-center justify-center gap-2 text-base sm:text-lg px-6 sm:px-10 py-4 sm:py-5 bg-gradient-to-r from-accent to-yellow-500 text-primary font-bold hover:bg-white hover:text-primary transition-all duration-300 active:scale-95 shadow-lg shadow-accent/20 rounded-lg sm:rounded-none"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Zap className="w-4 h-4 sm:w-5 sm:h-5" />
              View Workshops
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transform group-hover:translate-x-1 transition-transform" />
            </motion.a>
            <motion.a
              href="#contact"
              className="group inline-flex items-center justify-center gap-2 px-6 sm:px-10 py-4 sm:py-5 text-base sm:text-lg font-semibold border-2 border-white/50 text-white hover:bg-white hover:text-primary hover:border-white transition-all duration-300 backdrop-blur-sm active:scale-95"
              style={{ borderRadius: 0 }}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
              Free Power Talk
            </motion.a>
          </motion.div>

          {/* Quick Stats - Count-up animation */}
          <motion.div 
            ref={statsRef}
            className="grid grid-cols-3 gap-4 sm:gap-6 lg:gap-8 pt-6 sm:pt-8 border-t border-white/20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="flex flex-col items-center sm:flex-row sm:items-center gap-1 sm:gap-3 group text-center sm:text-left">
              <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-accent drop-shadow-lg">{years}+</span>
              <span className="text-[10px] sm:text-xs lg:text-sm text-white/80 font-medium leading-tight">Years of<br className="hidden sm:block"/>Excellence</span>
            </div>
            <div className="flex flex-col items-center sm:flex-row sm:items-center gap-1 sm:gap-3 group text-center sm:text-left border-x border-white/10 sm:border-0 sm:border-l sm:pl-6">
              <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-accent drop-shadow-lg">{professionals}K+</span>
              <span className="text-[10px] sm:text-xs lg:text-sm text-white/80 font-medium leading-tight">Professionals<br className="hidden sm:block"/>Trained</span>
            </div>
            <div className="flex flex-col items-center sm:flex-row sm:items-center gap-1 sm:gap-3 group text-center sm:text-left sm:border-l sm:border-white/10 sm:pl-6">
              <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-accent drop-shadow-lg">{partners}+</span>
              <span className="text-[10px] sm:text-xs lg:text-sm text-white/80 font-medium leading-tight">Partner<br className="hidden sm:block"/>Organizations</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Scroll Indicator - Hidden on mobile */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 animate-bounce hidden sm:block">
        <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-1.5 sm:p-2">
          <div className="w-1 h-2 sm:w-1.5 sm:h-3 bg-accent rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default Hero;