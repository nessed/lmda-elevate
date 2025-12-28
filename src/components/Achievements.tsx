import leadershipCamp1 from "@/assets/lmda/1766913795323_leadership camp.png";
import leadershipCamp2 from "@/assets/lmda/1766913791083_dynamic professional.png";
import workshop1 from "@/assets/lmda/1766913733562_one.png";
import workshop2 from "@/assets/lmda/1766913752284_four.png";
import workshop3 from "@/assets/lmda/1766913760550_five.png";
import workshop4 from "@/assets/lmda/1766913771732_six.png";

const Achievements = () => {
  const gallery = [
    {
      image: leadershipCamp1,
      caption: "Leading with Empathy — Punjab Police College, Sihala",
      location: "Punjab Police College, Sihala",
    },
    {
      image: workshop1,
      caption: "AI for Excellence — PPMI Complex, Islamabad",
      location: "PPMI Complex, Islamabad",
    },
    {
      image: workshop2,
      caption: "Conflict Resolution Mastery — TEVTA Bahawalpur",
      location: "TEVTA Bahawalpur",
    },
    {
      image: leadershipCamp2,
      caption: "Sales KPI Analysis Workshop — Corporate Training Center, Lahore",
      location: "Lahore",
    },
    {
      image: workshop3,
      caption: "NLP Communication Excellence — Government Engineering Academy",
      location: "Islamabad",
    },
    {
      image: workshop4,
      caption: "Strategic Leadership Development — Allied Bank Head Office",
      location: "Karachi",
    },
  ];

  return (
    <section id="gallery" className="py-24 bg-white">
      <div className="container-wide">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-px bg-accent" />
            <span className="text-sm font-medium text-accent uppercase tracking-widest">
              Field Evidence
            </span>
            <div className="w-12 h-px bg-accent" />
          </div>
          <h2 className="heading-serif text-4xl md:text-5xl text-primary mb-4">
            Training in Action Across Pakistan
          </h2>
          <p className="text-lg text-muted-foreground">
            Real workshops. Real locations. Real transformation.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gallery.map((item, index) => (
            <div
              key={index}
              className="group relative overflow-hidden border-2 border-border hover:border-accent transition-all"
            >
              {/* Image */}
              <div className="aspect-[4/3] overflow-hidden bg-secondary">
                <img
                  src={item.image}
                  alt={item.caption}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Caption Overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary via-primary/95 to-transparent p-6 pt-12">
                <p className="text-sm text-white font-medium leading-relaxed mb-1">
                  {item.caption}
                </p>
                <p className="text-xs text-accent font-semibold uppercase tracking-wide">
                  {item.location}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Bar */}
        <div className="mt-16 pt-12 border-t border-border">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-accent mb-2">28+</div>
              <div className="text-sm text-muted-foreground uppercase tracking-wide">
                Years of Excellence
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-accent mb-2">10,000+</div>
              <div className="text-sm text-muted-foreground uppercase tracking-wide">
                Professionals Trained
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-accent mb-2">92%</div>
              <div className="text-sm text-muted-foreground uppercase tracking-wide">
                Satisfaction Rate
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-accent mb-2">50+</div>
              <div className="text-sm text-muted-foreground uppercase tracking-wide">
                Partner Organizations
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Achievements;
