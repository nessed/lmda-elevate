import content from "@/data/content";

// Import event photos
import leadershipCamp from "@/assets/lmda/1766913795323_leadership camp.png";
import dynamicPro from "@/assets/lmda/1766913791083_dynamic professional.png";
import eventOne from "@/assets/lmda/1766913733562_one.png";
import eventFour from "@/assets/lmda/1766913752284_four.png";

const eventPhotos = [leadershipCamp, dynamicPro, eventOne, eventFour];

const Achievements = () => {
  return (
    <section id="achievements" className="section-padding bg-background">
      <div className="container-wide">
        {/* Track Record Section */}
        <div className="mb-20">
          <div className="max-w-2xl mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-px bg-accent" />
              <span className="text-sm font-medium text-accent uppercase tracking-widest">
                Track Record
              </span>
            </div>
            <h2 className="heading-serif text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
              Proven Results
            </h2>
            <p className="text-muted-foreground">
              Our training programs deliver measurable improvements across key organizational metrics.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {content.metrics.map((metric) => (
              <div
                key={metric.label}
                className="card-authority p-6 text-center"
              >
                <div className="heading-serif text-4xl md:text-5xl font-bold text-foreground mb-2">
                  {metric.value}<span className="text-accent">%</span>
                </div>
                <div className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Events Gallery */}
        <div>
          <div className="max-w-2xl mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-px bg-accent" />
              <span className="text-sm font-medium text-accent uppercase tracking-widest">
                In Action
              </span>
            </div>
            <h2 className="heading-serif text-3xl md:text-4xl text-foreground mb-4">
              Training Events & Workshops
            </h2>
          </div>

          {/* Photo Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {eventPhotos.map((photo, index) => (
              <div
                key={index}
                className="aspect-[4/3] overflow-hidden"
                style={{ borderRadius: 0 }}
              >
                <img
                  src={photo}
                  alt={`LMDA Training Event ${index + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>

          {/* Achievement Cards */}
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            {content.achievements.slice(0, 3).map((achievement) => (
              <div
                key={achievement.id}
                className="card-authority p-6"
              >
                <h3 className="text-base font-semibold text-foreground mb-2">
                  {achievement.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {achievement.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Achievements;
