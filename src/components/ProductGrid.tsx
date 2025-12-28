import { useState } from "react";
import { ArrowRight, Calendar, Clock, BadgeCheck, Phone, Sparkles, X, Maximize2 } from "lucide-react";
import zoomImage from "@/assets/zoomimagess.png";

const ProductGrid = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const sessions = [
    {
      stream: "Free Power Talk",
      title: "Business Growth Fundamentals",
      date: "Saturday, Jan 15",
      time: "06:15 PM",
      price: "FREE",
      // Using solid colors/gradients as placeholders for flyers
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
    <section id="programs" className="py-24 bg-gradient-to-b from-white via-slate-50 to-white relative overflow-hidden">
      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors p-2"
            onClick={() => setSelectedImage(null)}
          >
            <X className="w-8 h-8" />
          </button>
          
          <div 
            className="relative max-w-2xl w-full max-h-[90vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* If it's a class string (placeholder), render div. If real image, render img */}
            {selectedImage.startsWith('bg-') ? (
              <div className={`w-full aspect-[4/5] ${selectedImage} rounded-lg shadow-2xl flex items-center justify-center`}>
                 <span className="text-white/20 font-bold text-6xl uppercase tracking-widest">POSTER</span>
              </div>
            ) : (
              <img 
                src={selectedImage} 
                alt="Workshop Flyer" 
                className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
              />
            )}
          </div>
        </div>
      )}

      {/* Animated Background Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 animate-pulse" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 animate-pulse" style={{ animationDelay: '1s' }} />
      
      <div className="container-wide relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-16 px-6 py-14 bg-gradient-to-r from-primary via-primary to-primary/95 relative overflow-hidden shadow-2xl group">
          {/* Animated Accent Lines */}
          <div className="absolute top-0 left-0 w-2 h-full bg-accent" />
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-accent via-accent/50 to-transparent" />
          <div className="absolute right-0 top-0 w-64 h-full bg-gradient-to-l from-accent/10 to-transparent transform skew-x-12 group-hover:translate-x-4 transition-transform duration-700" />
          
          {/* Floating Badge */}
          <div className="inline-flex items-center gap-2 py-1.5 px-4 border border-accent/40 rounded-full text-accent text-xs font-mono mb-6 tracking-wider uppercase bg-primary/50 backdrop-blur-sm animate-bounce" style={{ animationDuration: '3s' }}>
            <Sparkles className="w-3 h-3" />
            Start Your Journey
          </div>
          
          <h2 className="heading-serif text-4xl md:text-5xl text-white mb-4 font-bold relative z-10">
            Upcoming Training Sessions
          </h2>
          <p className="text-lg text-white/80 font-medium max-w-2xl mx-auto relative z-10">
            Select your track. Secure your seat. Scale your skills.
          </p>
        </div>

        {/* Active Sessions Grid - Optimized Layout */}
        <div className="grid md:grid-cols-3 gap-8 items-start">
          {sessions.map((session, index) => (
            <div
              key={index}
              className={`flex flex-col bg-white border-2 ${session.highlight ? 'border-accent shadow-xl shadow-accent/20' : 'border-border/50'} hover:border-accent hover:shadow-2xl hover:shadow-accent/10 transition-all duration-500 group relative overflow-hidden transform hover:-translate-y-2`}
            >
              {/* Highlight Glow */}
              {session.highlight && (
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-accent/30 rounded-full blur-3xl animate-pulse" />
              )}
              
              {/* The Visual - Portrait Aspect Ratio (4:5) for Instagram Posters */}
              <div 
                className={`relative w-full aspect-[4/5] overflow-hidden cursor-pointer group/image`}
                onClick={() => setSelectedImage(session.image)}
              >
                 {/* Image Rendering Logic */}
                 <div className={`w-full h-full ${session.image} transition-transform duration-700 group-hover/image:scale-110`}>
                    {/* Placeholder content if using bg class */}
                    {session.image.startsWith('bg-') && (
                        <>
                            {/* Animated Grid Pattern */}
                            <div className="absolute inset-0 opacity-20" style={{
                              backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                              backgroundSize: '20px 20px'
                            }} />
                            
                            {/* Floating Particles */}
                            <div className="absolute top-4 right-4 w-2 h-2 bg-white/30 rounded-full animate-ping" style={{ animationDuration: '2s' }} />
                            <div className="absolute top-12 right-12 w-1.5 h-1.5 bg-accent/50 rounded-full animate-ping" style={{ animationDuration: '3s', animationDelay: '0.5s' }} />

                            <div className="absolute inset-0 flex items-center justify-center text-white/10 font-bold text-5xl uppercase tracking-[0.3em] select-none">
                              POSTER
                            </div>
                        </>
                    )}
                 </div>

                {/* Expand Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/image:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="bg-white/10 backdrop-blur-md border border-white/30 p-3 rounded-full transform scale-75 group-hover/image:scale-100 transition-transform duration-300">
                        <Maximize2 className="w-6 h-6 text-white" />
                    </div>
                </div>
                
                {/* Authority Badge (Floating) */}
                {session.cpd && (
                  <div className="absolute top-4 left-4 bg-accent text-primary px-3 py-1.5 text-xs font-bold uppercase shadow-lg flex items-center gap-1.5 rounded-full pointer-events-none">
                    <BadgeCheck className="w-3.5 h-3.5" />
                    {session.cpd}
                  </div>
                )}
                
                {/* Stream Label */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-4 pt-16 pointer-events-none">
                  <span className="text-white text-xs font-bold uppercase tracking-widest bg-accent/90 px-3 py-1 inline-block shadow-sm">
                    {session.stream}
                  </span>
                </div>
              </div>

              {/* Card Content - Flex logic to grow with content */}
              <div className="p-6 flex flex-col flex-grow relative">
                {/* Title */}
                <h3 className="heading-serif text-2xl font-bold text-primary mb-4 leading-tight group-hover:text-accent transition-colors duration-300">
                  {session.title}
                </h3>

                {/* Date/Time - Monospace */}
                <div className="flex items-center gap-4 text-sm font-mono text-muted-foreground mb-6 py-3 border-y border-border/30 bg-slate-50/50">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-accent" />
                    <span>{session.date}</span>
                  </div>
                  <div className="w-px h-4 bg-border/50" />
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-accent" />
                    <span>{session.time}</span>
                  </div>
                </div>

                {/* Spacer */}
                <div className="mt-auto">
                  {/* Investment */}
                  <div className="flex items-baseline justify-between mb-6">
                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Investment</span>
                    <span className="text-3xl font-serif font-bold text-accent drop-shadow-sm">{session.price}</span>
                  </div>

                  {/* Action */}
                  <a
                    href="https://wa.me/923103336485"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-4 bg-gradient-to-r from-primary to-primary/90 text-white font-bold hover:from-accent hover:to-accent/90 hover:text-primary transition-all duration-300 uppercase tracking-wide text-sm group/btn overflow-hidden relative shadow-lg hover:shadow-accent/20"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      <Phone className="w-4 h-4 group-hover/btn:animate-bounce" />
                      Register via WhatsApp
                      <ArrowRight className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" />
                    </span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Zoom Infrastructure */}
        <div className="mt-20 pt-10 border-t border-border/40">
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 opacity-80 hover:opacity-100 transition-opacity duration-300">
            <img src={zoomImage} alt="Zoom" className="h-10 w-auto grayscale hover:grayscale-0 transition-all duration-300" />
            <p className="text-sm text-muted-foreground font-medium text-center md:text-left">
              <span className="text-primary font-bold">Seamless Digital Delivery.</span> All sessions hosted on Zoom Pro HD with 24/7 cloud recording access.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
