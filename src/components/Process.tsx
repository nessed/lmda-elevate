import {
  Phone,
  Users,
  ClipboardCheck,
  FileCheck,
  GraduationCap,
  MessageSquare,
  Target,
  Mail,
} from "lucide-react";
import content from "@/data/content.json";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Phone,
  Users,
  ClipboardCheck,
  FileCheck,
  GraduationCap,
  MessageSquare,
  Target,
  Mail,
};

const Process = () => {
  return (
    <section id="process" className="section-padding bg-background">
      <div className="container-wide">
        {/* Section Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary font-medium text-sm rounded-full mb-4">
            Our Methodology
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Our In-House Training{" "}
            <span className="accent-underline">Process</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            A comprehensive 8-step approach to deliver world-class customized training solutions
          </p>
        </div>

        {/* Process Steps - Vertical Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-border md:-translate-x-1/2" />

          <div className="space-y-8 md:space-y-12">
            {content.process.map((step, index) => {
              const IconComponent = iconMap[step.icon] || Phone;
              const isEven = index % 2 === 0;

              return (
                <div
                  key={step.step}
                  className={`relative flex items-start gap-6 md:gap-0 ${
                    isEven ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Step number circle */}
                  <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-primary flex items-center justify-center z-10 shadow-lg">
                    <IconComponent className="w-7 h-7 text-primary-foreground" />
                  </div>

                  {/* Content card */}
                  <div
                    className={`ml-20 md:ml-0 md:w-[calc(50%-3rem)] ${
                      isEven ? "md:pr-8 md:text-right" : "md:pl-8 md:text-left"
                    }`}
                  >
                    <div className="card-lift p-6">
                      <div
                        className={`flex items-center gap-3 mb-3 ${
                          isEven ? "md:justify-end" : "md:justify-start"
                        }`}
                      >
                        <span className="text-xs font-bold text-accent uppercase tracking-wider">
                          Step {step.step}
                        </span>
                      </div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">
                        {step.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {step.description}
                      </p>
                    </div>
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

export default Process;
