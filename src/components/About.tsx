import { Target, Users, Lightbulb, Leaf } from "lucide-react";
import content from "@/data/content";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Collaboration: Users,
  "Internal Capacity": Target,
  "Innovation Process": Lightbulb,
  Environment: Leaf,
};

const About = () => {
  return (
    <section id="about" className="section-padding bg-secondary/30">
      <div className="container-wide">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div>
            <p className="text-sm font-medium text-primary tracking-wide uppercase mb-3">
              About LMDA
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              {content.company.fullName}
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              {content.company.description}
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Professionalism, ethics, and hard work are our core values. We work closely with our clients to deliver customized solutions that drive measurable results.
            </p>
          </div>

          {/* Right - Pillars Grid */}
          <div className="grid grid-cols-2 gap-4">
            {content.pillars.map((pillar) => {
              const IconComponent = iconMap[pillar.title] || Target;
              return (
                <div
                  key={pillar.title}
                  className="p-5 bg-background rounded-lg border border-border"
                >
                  <IconComponent className="w-6 h-6 text-primary mb-3" />
                  <h3 className="text-sm font-semibold text-foreground mb-1">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
