import { ArrowRight } from "lucide-react";
import content from "@/data/content";

// Import hero photo for background
import heroBg from "@/assets/hero.jpg";

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center bg-primary">
      {/* Background Image with Dark Overlay */}
      <div className="absolute inset-0 -z-10">
        <img
          src={heroBg}
          alt="LMDA Leadership Training"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-transparent" />
      </div>

      <div className="container-wide py-32">
        <div className="max-w-3xl">
          {/* Eyebrow with Gold accent */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-px bg-accent" />
            <span className="text-sm font-medium text-accent uppercase tracking-widest">
              Management Consulting & Training
            </span>
          </div>

          {/* Authority Headline */}
          <h1 className="heading-serif text-4xl md:text-5xl lg:text-6xl leading-[1.1] text-white mb-6">
            20+ Years of Transforming Corporate Culture Through Strategic TQM & Leadership
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-white/70 max-w-2xl leading-relaxed mb-10">
            Led by Prof. Ali Sajid (PhD USA, T.I.), LMDA delivers world-class in-house training that drives measurable organizational transformation.
          </p>

          {/* CTA Buttons - Sharp, professional */}
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#contact"
              className="btn-gold"
            >
              Schedule a Senior Consultant Discovery Call
              <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="#trainers"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold border-2 border-background/30 text-background hover:bg-background hover:text-foreground transition-all"
              style={{ borderRadius: 0 }}
            >
              Meet Our Experts
            </a>
          </div>

          {/* Authority Markers */}
          <div className="mt-16 pt-8 border-t border-background/20">
            <div className="flex flex-wrap items-center gap-8 text-background/60">
              <div className="flex items-center gap-2">
                <span className="text-3xl font-bold text-accent">1000+</span>
                <span className="text-sm">Executives Trained</span>
              </div>
              <div className="hidden sm:block w-px h-8 bg-background/20" />
              <div className="flex items-center gap-2">
                <span className="text-3xl font-bold text-accent">20+</span>
                <span className="text-sm">Years Experience</span>
              </div>
              <div className="hidden sm:block w-px h-8 bg-background/20" />
              <div className="flex items-center gap-2">
                <span className="text-3xl font-bold text-accent">92%</span>
                <span className="text-sm">Client Satisfaction</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
