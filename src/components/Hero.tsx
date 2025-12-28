import { ArrowRight, Award, Sparkles, Zap } from "lucide-react";
import heroImage from "@/assets/cover.png";

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center bg-primary overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
      <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '2s' }} />
      
      {/* Background - Soft Split Layout */}
      <div className="absolute inset-0 bg-primary">
          {/* Right-aligned Image Container for Desktop, Full Height/Width for Mobile */}
          <div className="absolute right-0 top-0 h-full w-full lg:w-[65%] transition-all duration-700">
            <img
              src={heroImage}
              alt="Prof. Dr. Ali Sajid"
              className="w-full h-full object-cover object-[75%_center] sm:object-center lg:object-[center_20%] opacity-50 sm:opacity-60 mix-blend-overlay lg:mix-blend-normal hover:scale-105 transition-transform duration-1000"
            />
            {/* Gradient Masks */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-primary/20 lg:via-primary/80 lg:to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent" />
          </div>
          
          {/* Animated Grid Overlay - Full Width */}
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }} />
      </div>

      <div className="container-wide py-32 relative z-10">
        <div className="max-w-4xl">
          {/* PEC Partnership Badge with Animation */}
          <div className="flex items-center gap-6 mb-8 flex-wrap animate-fade-in">
            <div className="flex items-center gap-3 bg-accent px-5 py-2.5 shadow-xl shadow-accent/30 group hover:scale-105 transition-transform duration-300">
              <Award className="w-5 h-5 text-primary" />
              <span className="text-sm font-bold text-primary uppercase tracking-wide">
                Official Training Partner
              </span>
            </div>
            <span className="text-2xl md:text-3xl font-black text-white tracking-[0.2em] px-6 py-2 border-2 border-accent/40 bg-white/5 backdrop-blur-md hover:bg-accent/10 transition-colors duration-300">
              PEC
            </span>
          </div>

          {/* Main Headline with Gradient */}
          <h1 className="heading-serif text-5xl md:text-6xl lg:text-7xl leading-[1.05] text-white mb-6 font-bold drop-shadow-2xl">
            Pakistan's Premier 
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-accent via-yellow-400 to-accent animate-pulse" style={{ animationDuration: '3s' }}>
              Sales & Leadership
            </span>
            Training Ecosystem
          </h1>

          {/* Sub-headline with Authority Stats */}
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl leading-relaxed mb-10 font-medium">
            <strong className="text-accent">28+ Years of Expertise.</strong>{" "}
            <strong className="text-accent">10,000+ Professionals Trained.</strong>{" "}
            Led by <strong className="text-accent">Prof. Dr. Ali Sajid (T.I.)</strong> and Pakistan's elite facilitators.
          </p>

          {/* CTA Buttons with Enhanced Hover */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <a
              href="#programs"
              className="group inline-flex items-center justify-center gap-2 text-lg px-10 py-5 bg-accent text-primary font-bold hover:bg-white hover:shadow-2xl hover:shadow-accent/30 transition-all duration-300 transform hover:-translate-y-1"
              style={{ borderRadius: 0 }}
            >
              <Zap className="w-5 h-5 group-hover:animate-bounce" />
              View Upcoming Workshops
              <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#contact"
              className="group inline-flex items-center justify-center gap-2 px-10 py-5 text-lg font-semibold border-2 border-white/50 text-white hover:bg-white hover:text-primary hover:border-white transition-all duration-300 backdrop-blur-sm"
              style={{ borderRadius: 0 }}
            >
              <Sparkles className="w-5 h-5 group-hover:animate-spin" style={{ animationDuration: '2s' }} />
              Join Next Free Power Talk
            </a>
          </div>

          {/* Quick Stats with Animated Counters */}
          <div className="flex flex-wrap items-center gap-8 pt-8 border-t border-white/20">
            <div className="flex items-center gap-3 group">
              <span className="text-4xl font-bold text-accent drop-shadow-lg group-hover:scale-110 transition-transform">28+</span>
              <span className="text-sm text-white/80 font-medium">Years of<br/>Excellence</span>
            </div>
            <div className="hidden sm:block w-px h-10 bg-white/20" />
            <div className="flex items-center gap-3 group">
              <span className="text-4xl font-bold text-accent drop-shadow-lg group-hover:scale-110 transition-transform">10K+</span>
              <span className="text-sm text-white/80 font-medium">Professionals<br/>Trained</span>
            </div>
            <div className="hidden sm:block w-px h-10 bg-white/20" />
            <div className="flex items-center gap-3 group">
              <span className="text-4xl font-bold text-accent drop-shadow-lg group-hover:scale-110 transition-transform">50+</span>
              <span className="text-sm text-white/80 font-medium">Partner<br/>Organizations</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-accent rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
