import { ArrowRight, Award } from "lucide-react";
import heroImage from "@/assets/lmda/1766914035711_alisajid.jpg";

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center bg-primary">
      {/* Background Image with Dark Overlay */}
      <div className="absolute inset-0 -z-10">
        <img
          src={heroImage}
          alt="Prof. Dr. Ali Sajid delivering workshop"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/95 to-primary/80" />
      </div>

      <div className="container-wide py-32">
        <div className="max-w-4xl">
          {/* PEC Partnership Badge with Text Branding */}
          <div className="flex items-center gap-6 mb-8 flex-wrap">
            <div className="flex items-center gap-3 bg-accent px-4 py-2 border-l-4 border-accent shadow-lift">
              <Award className="w-5 h-5 text-primary" />
              <span className="text-sm font-bold text-primary uppercase tracking-wide">
                Official Training Partner
              </span>
            </div>
            <span className="text-2xl md:text-3xl font-black text-white tracking-[0.2em] px-6 py-2 border-2 border-accent/30 bg-primary/20 backdrop-blur-sm">
              PEC
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="heading-serif text-5xl md:text-6xl lg:text-7xl leading-[1.05] text-white mb-6 font-bold">
            Pakistan's Premier Sales & Leadership Training Ecosystem
          </h1>

          {/* Sub-headline with Authority Stats */}
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl leading-relaxed mb-10 font-medium">
            <strong className="text-accent">28+ Years of Expertise.</strong>{" "}
            <strong className="text-accent">10,000+ Professionals Trained.</strong>{" "}
            Led by <strong className="text-accent">Prof. Dr. Ali Sajid (T.I.)</strong> and Pakistan's elite facilitators.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <a
              href="#programs"
              className="btn-gold text-lg px-10 py-5"
            >
              View Upcoming Workshops
              <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 px-10 py-5 text-lg font-semibold border-2 border-white text-white hover:bg-white hover:text-primary transition-all"
              style={{ borderRadius: 0 }}
            >
              Join Next Free Power Talk
            </a>
          </div>

          {/* Quick Stats */}
          <div className="flex flex-wrap items-center gap-8 pt-8 border-t border-white/20">
            <div className="flex items-center gap-2">
              <span className="text-3xl font-bold text-accent">28+</span>
              <span className="text-sm text-white/80 font-medium">Years of Excellence</span>
            </div>
            <div className="hidden sm:block w-px h-8 bg-white/20" />
            <div className="flex items-center gap-2">
              <span className="text-3xl font-bold text-accent">10,000+</span>
              <span className="text-sm text-white/80 font-medium">Professionals Trained</span>
            </div>
            <div className="hidden sm:block w-px h-8 bg-white/20" />
            <div className="flex items-center gap-2">
              <span className="text-3xl font-bold text-accent">50+</span>
              <span className="text-sm text-white/80 font-medium">Partner Organizations</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
