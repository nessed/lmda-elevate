import { ArrowRight, Award, Sparkles, Zap } from "lucide-react";
import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import heroImage from "@/assets/cover.png";
import lmdaLogo from "@/assets/lmda-logo.png";

gsap.registerPlugin(ScrollTrigger);

// Count-up animation hook
const useCountUp = (end: number, duration: number = 2000, trigger: boolean) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    if (!trigger) return;
    
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
  }, [end, duration, trigger]);
  
  return count;
};

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const heroImageRef = useRef<HTMLImageElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const pecBadgeRef = useRef<HTMLSpanElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsVisible, setStatsVisible] = useState(false);
  
  const years = useCountUp(28, 1500, statsVisible);
  const professionals = useCountUp(10, 1500, statsVisible);
  const partners = useCountUp(50, 1500, statsVisible);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax effect on hero image
      if (heroImageRef.current) {
        gsap.to(heroImageRef.current, {
          yPercent: 30,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      // Content fade-in and slide-up
      if (contentRef.current) {
        const elements = contentRef.current.querySelectorAll('.gsap-fade-up');
        gsap.from(elements, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          delay: 0.3,
        });
      }

      // Floating badge animation (yoyo)
      if (badgeRef.current) {
        gsap.to(badgeRef.current, {
          y: 8,
          duration: 2,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      }

      // PEC badge floating
      if (pecBadgeRef.current) {
        gsap.to(pecBadgeRef.current, {
          y: 6,
          duration: 2.5,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: 0.5,
        });
      }

      // Stats intersection observer
      if (statsRef.current) {
        ScrollTrigger.create({
          trigger: statsRef.current,
          start: "top 80%",
          onEnter: () => setStatsVisible(true),
          once: true,
        });

        // Stats slide up
        gsap.from(statsRef.current, {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 85%",
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="home" className="relative min-h-[70vh] sm:min-h-[100svh] flex items-center bg-primary overflow-hidden">
      {/* Mobile Header with Logo */}
      <div className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-4 py-3 sm:hidden">
        <img src={lmdaLogo} alt="LMDA" className="h-10 w-auto drop-shadow-lg" />
        <a href="#programs" className="bg-accent/90 text-primary text-xs font-bold uppercase tracking-wider px-3 py-1.5 shadow-lg">
          Explore
        </a>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute top-1/4 right-1/4 w-[200px] sm:w-[400px] lg:w-[500px] h-[200px] sm:h-[400px] lg:h-[500px] bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
      <div className="absolute bottom-1/4 left-1/4 w-[150px] sm:w-[300px] lg:w-[400px] h-[150px] sm:h-[300px] lg:h-[400px] bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '2s' }} />
      
      {/* Background Image with Parallax */}
      <div className="absolute inset-0 bg-primary">
        <div className="absolute right-0 top-0 h-full w-full lg:w-[65%] will-change-transform">
          <img
            ref={heroImageRef}
            src={heroImage}
            alt="Prof. Dr. Ali Sajid"
            className="w-full h-full object-cover object-[75%_center] sm:object-center lg:object-[center_20%] opacity-50 sm:opacity-50 lg:opacity-60 mix-blend-overlay lg:mix-blend-normal"
          />
          {/* Gradient Masks - Softer for better image visibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-transparent sm:from-primary sm:via-primary/80 lg:via-primary/80 lg:to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/60 to-transparent" />
        </div>
        
        {/* Grid Overlay */}
        <div className="absolute inset-0 opacity-[0.03] sm:opacity-10" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '30px 30px'
        }} />
      </div>

      <div className="container-wide py-20 pt-28 sm:pt-32 lg:py-32 relative z-10 px-4 sm:px-6">
        <div ref={contentRef} className="max-w-4xl">
          {/* PEC Partnership Badge - Floating */}
          <div className="flex items-center gap-3 sm:gap-6 mb-6 sm:mb-8 flex-wrap gsap-fade-up">
            <div ref={badgeRef} className="flex items-center gap-2 sm:gap-3 bg-accent px-3 sm:px-5 py-2 sm:py-2.5 shadow-xl shadow-accent/30 will-change-transform">
              <Award className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
              <span className="text-xs sm:text-sm font-bold text-primary uppercase tracking-wide">
                Official Partner
              </span>
            </div>
            <span ref={pecBadgeRef} className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-[0.15em] sm:tracking-[0.2em] px-4 sm:px-6 py-1.5 sm:py-2 border-2 border-accent/40 bg-white/5 backdrop-blur-md will-change-transform">
              PEC
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="gsap-fade-up heading-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-[1.1] sm:leading-[1.05] text-white mb-4 sm:mb-6 font-bold drop-shadow-2xl">
            Pakistan's Premier 
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-accent via-yellow-200 to-accent">
              Sales & Leadership
            </span>
            Training Ecosystem
          </h1>

          {/* Sub-headline */}
          <p className="gsap-fade-up text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 max-w-3xl leading-relaxed mb-6 sm:mb-8 lg:mb-10 font-medium">
            <strong className="text-accent">28+ Years.</strong>{" "}
            <strong className="text-accent">10,000+ Professionals.</strong>{" "}
            <span className="hidden sm:inline">Led by </span>
            <strong className="text-accent">Prof. Dr. Ali Sajid (T.I.)</strong>
          </p>

          {/* CTA Buttons */}
          <div className="gsap-fade-up flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 sm:mb-12">
            <a
              href="#programs"
              className="shimmer-gold group inline-flex items-center justify-center gap-2 text-base sm:text-lg px-6 sm:px-10 py-4 sm:py-5 bg-gradient-to-r from-accent to-yellow-500 text-primary font-bold hover:shadow-2xl hover:shadow-accent/30 transition-all duration-300 active:scale-95 shadow-lg shadow-accent/20 rounded-lg sm:rounded-none"
            >
              <Zap className="w-4 h-4 sm:w-5 sm:h-5" />
              View Workshops
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transform group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#contact"
              className="group inline-flex items-center justify-center gap-2 px-6 sm:px-10 py-4 sm:py-5 text-base sm:text-lg font-semibold border-2 border-white/50 text-white hover:bg-white hover:text-primary hover:border-white transition-all duration-300 backdrop-blur-sm active:scale-95"
              style={{ borderRadius: 0 }}
            >
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
              Free Power Talk
            </a>
          </div>

          {/* Quick Stats - Count-up animation */}
          <div 
            ref={statsRef}
            className="grid grid-cols-3 gap-4 sm:gap-6 lg:gap-8 pt-6 sm:pt-8 border-t border-white/20"
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
          </div>
        </div>
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