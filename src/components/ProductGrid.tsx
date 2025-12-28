import { ArrowRight, Calendar, Clock, BadgeCheck, Phone, Sparkles } from "lucide-react";
import zoomImage from "@/assets/zoomimagess.png";

const ProductGrid = () => {
  const sessions = [
    {
      stream: "Free Power Talk",
      title: "Business Growth Fundamentals",
      date: "Saturday, Jan 15",
      time: "06:15 PM",
      price: "FREE",
      image: "bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900",
      cpd: null,
      highlight: true,
    },
    {
      stream: "1-Day Workshop",
      title: "Sales Performance & KPIs",
      date: "Saturday, Dec 06",
      time: "10:00 AM",
      price: "PKR 1,200",
      image: "bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900",
      cpd: "0.5 CPD Points",
      highlight: false,
    },
    {
      stream: "Professional Certification",
      title: "Employability & Soft Skills",
      date: "Starts May 03",
      time: "Weekend Track",
      price: "PKR 12,800",
      image: "bg-gradient-to-br from-amber-900 via-yellow-800 to-orange-900",
      cpd: "Certification",
      highlight: false,
    },
  ];

  return (
    <section id="programs" className="py-24 bg-gradient-to-b from-slate-900 via-primary to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 animate-pulse" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 animate-pulse" style={{ animationDelay: '1s' }} />
      
      <div className="container-wide relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-16 px-6 py-14 bg-gradient-to-r from-accent via-accent to-yellow-500 relative overflow-hidden shadow-2xl shadow-accent/30">
          {/* Decorative Lines */}
          <div className="absolute top-0 left-0 w-full h-1 bg-white/20" />
          <div className="absolute bottom-0 left-0 w-full h-1 bg-primary/30" />
          
          {/* Floating Badge */}
          <div className="inline-flex items-center gap-2 py-1.5 px-4 bg-primary/90 rounded-full text-white text-xs font-mono mb-6 tracking-wider uppercase shadow-xl">
            <Sparkles className="w-3 h-3 text-accent" />
            Limited Seats Available
          </div>
          
          <h2 className="heading-serif text-4xl md:text-5xl text-primary mb-4 font-black relative z-10">
            Upcoming Training Sessions
          </h2>
          <p className="text-lg text-primary/80 font-bold max-w-2xl mx-auto relative z-10">
            Select your track. Secure your seat. Scale your skills.
          </p>
        </div>

        {/* Active Sessions Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {sessions.map((session, index) => (
            <div
              key={index}
              className="flex flex-col bg-white border-4 border-accent shadow-2xl shadow-accent/20 hover:shadow-accent/40 transition-all duration-500 group relative overflow-hidden transform hover:-translate-y-3"
            >
              {/* Gold Top Bar */}
              <div className="h-2 bg-gradient-to-r from-accent via-yellow-400 to-accent" />
              
              {/* The Visual */}
              <div className={`h-56 ${session.image} relative overflow-hidden`}>
                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
                
                {/* Animated Grid Pattern */}
                <div className="absolute inset-0 opacity-10" style={{
                  backgroundImage: 'linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)',
                  backgroundSize: '20px 20px'
                }} />
                
                {/* Placeholder Text */}
                <div className="absolute inset-0 flex items-center justify-center text-white/20 font-black text-6xl uppercase tracking-[0.3em] select-none">
                  LIVE
                </div>
                
                {/* Authority Badge (Floating) */}
                {session.cpd && (
                  <div className="absolute top-4 left-4 bg-accent text-primary px-4 py-2 text-xs font-black uppercase shadow-xl flex items-center gap-2 border-2 border-primary/20">
                    <BadgeCheck className="w-4 h-4" />
                    {session.cpd}
                  </div>
                )}
                
                {/* Stream Label */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <span className="text-white text-xs font-black uppercase tracking-[0.2em] bg-primary px-4 py-2 inline-block border-l-4 border-accent">
                    {session.stream}
                  </span>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-8 flex flex-col flex-grow bg-gradient-to-b from-white to-slate-50 relative">
                {/* Decorative Corner */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-accent/10" style={{ clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }} />
                
                {/* Title */}
                <h3 className="heading-serif text-2xl font-black text-primary mb-4 leading-tight">
                  {session.title}
                </h3>

                {/* Date/Time - Monospace */}
                <div className="flex items-center gap-4 text-sm font-mono text-muted-foreground mb-6 py-4 px-4 border-2 border-border bg-slate-100/80">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-accent" />
                    <span className="font-bold">{session.date}</span>
                  </div>
                  <div className="w-px h-5 bg-border" />
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-accent" />
                    <span className="font-bold">{session.time}</span>
                  </div>
                </div>

                {/* Spacer */}
                <div className="mt-auto">
                  {/* Investment - HEAVY VISUAL WEIGHT */}
                  <div className="mb-6 p-4 bg-primary border-l-4 border-accent">
                    <span className="text-xs font-bold text-white/70 uppercase tracking-[0.2em] block mb-1">Investment</span>
                    <span className="text-4xl md:text-5xl font-black text-accent drop-shadow-lg tracking-tight">{session.price}</span>
                  </div>

                  {/* Action */}
                  <a
                    href="https://wa.me/923103336485"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 w-full py-5 bg-accent text-primary font-black hover:bg-primary hover:text-accent transition-all duration-300 uppercase tracking-wider text-base group/btn border-2 border-transparent hover:border-accent"
                  >
                    <Phone className="w-5 h-5 group-hover/btn:animate-bounce" />
                    Register via WhatsApp
                    <ArrowRight className="w-5 h-5 transform group-hover/btn:translate-x-2 transition-transform" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Zoom Infrastructure */}
        <div className="mt-20 pt-10 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <img src={zoomImage} alt="Zoom" className="h-12 w-auto brightness-0 invert opacity-60 hover:opacity-100 transition-opacity duration-300" />
            <p className="text-sm text-white/70 font-medium text-center md:text-left">
              <span className="text-accent font-bold">Seamless Digital Delivery.</span> All sessions hosted on Zoom Pro HD with 24/7 cloud recording access.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
