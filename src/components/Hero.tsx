import { ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import content from "@/data/content.json";
import heroImage from "@/assets/hero-consulting.jpg";

const Hero = () => {
  const highlights = [
    "Total Quality Management",
    "Strategic Planning",
    "Leadership Development",
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-32 lg:pt-24">
      <div className="container-wide">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8 fade-in">
            <div className="space-y-4">
              <span className="inline-block px-4 py-1.5 bg-accent/10 text-accent-foreground font-medium text-sm rounded-full border border-accent/20">
                Elite Management Training & Consulting
              </span>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-foreground">
                {content.company.headline.split(' ').slice(0, 2).join(' ')}{' '}
                <span className="accent-underline">
                  {content.company.headline.split(' ').slice(2).join(' ')}
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed">
                {content.company.subheadline}. Professionalism, ethics and hard work are our core values.
              </p>
            </div>

            {/* Highlights */}
            <div className="space-y-3">
              {highlights.map((item, index) => (
                <div
                  key={item}
                  className={`flex items-center gap-3 fade-in fade-in-delay-${index + 1}`}
                >
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-foreground font-medium">{item}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-6 text-base group"
              >
                Work With Us
                <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-border hover:border-primary hover:text-primary font-semibold px-8 py-6 text-base"
              >
                View Our Process
              </Button>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative fade-in fade-in-delay-2">
            <div className="relative rounded-2xl overflow-hidden shadow-lift">
              <img
                src={heroImage}
                alt="LMDA Corporate Training - Executive team in professional meeting"
                className="w-full h-auto object-cover aspect-[4/3]"
                loading="eager"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/10 to-transparent" />
            </div>

            {/* Floating stat card */}
            <div className="absolute -bottom-6 -left-6 bg-card p-6 rounded-xl shadow-card border border-border hidden md:block">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">1000+</div>
                <div className="text-sm text-muted-foreground">Professionals Trained</div>
              </div>
            </div>

            {/* Yellow accent decoration */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-accent/20 rounded-full blur-2xl" />
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-secondary/50 to-transparent -z-10" />
    </section>
  );
};

export default Hero;
