import { User } from "lucide-react";
import content from "@/data/content.json";

const Trainers = () => {
  return (
    <section id="trainers" className="section-padding bg-secondary/30">
      <div className="container-wide">
        {/* Section Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary font-medium text-sm rounded-full mb-4">
            Expert Team
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Meet Our{" "}
            <span className="accent-underline">Trainers</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Highly qualified and experienced professionals dedicated to your organizational growth
          </p>
        </div>

        {/* Trainers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {content.trainers.map((trainer, index) => (
            <div
              key={trainer.id}
              className="card-lift p-6 text-center group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Avatar */}
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                {trainer.image ? (
                  <img
                    src={trainer.image}
                    alt={trainer.name}
                    className="w-full h-full rounded-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <User className="w-10 h-10 text-primary" />
                )}
              </div>

              {/* Info */}
              <h3 className="text-lg font-semibold text-foreground mb-1 line-clamp-2">
                {trainer.name}
              </h3>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {trainer.role}
              </p>

              {/* Hover accent line */}
              <div className="mt-4 h-1 w-0 bg-accent mx-auto rounded-full transition-all duration-300 group-hover:w-12" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Trainers;
