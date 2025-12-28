import { Award, Trophy, Star, Medal } from "lucide-react";
import content from "@/data/content.json";

const iconVariants = [Award, Trophy, Star, Medal];

const Achievements = () => {
  return (
    <section id="achievements" className="section-padding bg-background">
      <div className="container-wide">
        {/* Section Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="inline-block px-4 py-1.5 bg-accent/20 text-accent-foreground font-medium text-sm rounded-full mb-4">
            Recognition
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Wall of{" "}
            <span className="accent-underline">Achievements</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            We have received many awards and certificates from several public relations and associations
          </p>
        </div>

        {/* Achievements Grid - Masonry-style uniform cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {content.achievements.map((achievement, index) => {
            const IconComponent = iconVariants[index % iconVariants.length];
            
            return (
              <div
                key={achievement.id}
                className="group relative bg-card rounded-lg border border-border p-6 transition-all duration-300 hover:shadow-lift hover:-translate-y-1"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Icon */}
                <div className="w-14 h-14 rounded-lg bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                  <IconComponent className="w-7 h-7 text-accent" />
                </div>

                {/* Content */}
                <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {achievement.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {achievement.description}
                </p>

                {/* Hover border accent */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-accent rounded-b-lg opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            );
          })}
        </div>

        {/* Metrics Section */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-5 gap-4">
          {content.metrics.map((metric) => (
            <div
              key={metric.label}
              className="text-center p-6 bg-secondary/50 rounded-xl"
            >
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                {metric.value}%
              </div>
              <div className="text-sm text-muted-foreground font-medium">
                {metric.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;
