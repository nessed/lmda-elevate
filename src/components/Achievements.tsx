import leadershipCamp1 from "@/assets/lmda/1766913795323_leadership camp.png";
import leadershipCamp2 from "@/assets/lmda/1766913791083_dynamic professional.png";
import workshop1 from "@/assets/lmda/1766913733562_one.png";
import workshop2 from "@/assets/lmda/1766913752284_four.png";
import workshop3 from "@/assets/lmda/1766913760550_five.png";
import workshop4 from "@/assets/lmda/1766913771732_six.png";
import { Eye, Users, Award, Building } from "lucide-react";

const Achievements = () => {
  const cases = [
    {
      image: leadershipCamp1,
      tag: "150+ Officials",
      caption: "Punjab Police College, Sihala",
      title: "Leading with Empathy",
      icon: Users,
    },
    {
      image: workshop1,
      tag: "50+ Executives",
      caption: "PPMI Complex, Islamabad",
      title: "AI for Excellence",
      icon: Award,
    },
    {
      image: workshop2,
      tag: "100% Satisfaction",
      caption: "TEVTA Bahawalpur",
      title: "Conflict Resolution",
      icon: Award,
    },
    {
      image: leadershipCamp2,
      tag: "Corporate Summit",
      caption: "Lahore Training Center",
      title: "Sales KPI Analysis",
      icon: Building,
    },
    {
      image: workshop3,
      tag: "Govt. Sector",
      caption: "Engineering Academy",
      title: "NLP Communication",
      icon: Building,
    },
    {
      image: workshop4,
      tag: "Allied Bank",
      caption: "Karachi Head Office",
      title: "Strategic Leadership",
      icon: Building,
    },
  ];

  return (
    <section id="gallery" className="py-24 bg-gradient-to-b from-slate-100 via-white to-slate-50 relative overflow-hidden">
      {/* Ambient Background */}
      <div className="absolute top-1/2 left-1/4 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl -translate-y-1/2 animate-pulse" style={{ animationDuration: '4s' }} />
      <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '5s', animationDelay: '1s' }} />
      
      <div className="container-wide relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-8 bg-gradient-to-r from-primary via-primary to-primary/95 p-10 shadow-2xl relative overflow-hidden group">
          {/* Animated Accent */}
          <div className="absolute right-0 top-0 w-96 h-full bg-gradient-to-l from-accent/10 to-transparent transform skew-x-12 group-hover:translate-x-8 transition-transform duration-1000" />
          <div className="absolute left-0 bottom-0 w-full h-1 bg-gradient-to-r from-accent via-accent/50 to-transparent" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <Eye className="w-4 h-4 text-accent animate-pulse" />
              <span className="text-accent font-mono text-sm tracking-widest uppercase">
                Case Study Archive
              </span>
            </div>
            <h2 className="heading-serif text-3xl md:text-5xl text-white font-bold leading-tight">
              Field Intelligence:
              <br />
              <span className="text-accent">Training in Action</span>
            </h2>
          </div>
          
          <div className="relative z-10 flex gap-8">
            <div className="text-center lg:text-right">
              <span className="block text-4xl font-bold text-accent">10,000+</span>
              <span className="text-xs text-white/70 uppercase tracking-wider">Professionals</span>
            </div>
            <div className="text-center lg:text-right">
              <span className="block text-4xl font-bold text-accent">28+</span>
              <span className="text-xs text-white/70 uppercase tracking-wider">Years</span>
            </div>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
          {cases.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="group relative aspect-[3/2] overflow-hidden bg-primary cursor-pointer transform hover:scale-[1.02] transition-all duration-500"
              >
                {/* Image with Zoom Effect */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 ease-out"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent opacity-70 group-hover:opacity-50 transition-opacity duration-500" />
                
                {/* Hover Shine Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  {/* Outcome Tag */}
                  <div className="inline-flex items-center gap-1.5 bg-accent text-primary text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 mb-3 shadow-lg">
                    <Icon className="w-3 h-3" />
                    {item.tag}
                  </div>
                  
                  <h3 className="text-white font-bold text-lg leading-tight mb-1 drop-shadow-lg">
                    {item.title}
                  </h3>
                  <p className="text-white/80 text-xs font-mono uppercase tracking-wide">
                    📍 {item.caption}
                  </p>
                </div>

                {/* Corner Accent */}
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-accent/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Achievements;
