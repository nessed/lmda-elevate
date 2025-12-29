import { useState, useEffect } from "react";
import { ArrowRight, Calendar, Clock, BadgeCheck, Phone, Sparkles, X, Maximize2, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import zoomImage from "@/assets/zoomimagess.png";

interface Workshop {
  id: string;
  title: string;
  type: "series" | "free_workshop" | "paid_workshop";
  status: "upcoming" | "open" | "selling_fast" | "fully_booked" | "completed";
  price: number | null;
  flyer_url: string | null;
  date_time: string;
  cpd_points: boolean | null;
  trainer_name: string | null;
}

const getStreamLabel = (type: Workshop["type"]) => {
  switch (type) {
    case "series": return "Professional Certification";
    case "free_workshop": return "Free Power Talk";
    case "paid_workshop": return "1-Day Workshop";
  }
};

const getPrice = (type: Workshop["type"], price: number | null) => {
  if (type === "free_workshop") return "FREE";
  return price ? `PKR ${price.toLocaleString()}` : "FREE";
};

const ProductGrid = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorkshops = async () => {
      const { data, error } = await supabase
        .from("workshops")
        .select("id, title, type, status, price, flyer_url, date_time, cpd_points, trainer_name")
        .eq("is_active", true)
        .gte("date_time", new Date().toISOString())
        .order("date_time", { ascending: true });

      if (!error && data) {
        // Sort: Upcoming/Open/SellingFast first, then Completed/FullyBooked last? 
        // For now, let's keep date order, but maybe filter out 'completed' if too old? 
        // User wants to see 'completed' if set manually.
        setWorkshops(data as Workshop[]);
      }
      setLoading(false);
    };

    fetchWorkshops();
  }, []);

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

        {/* Premium Corporate Event Grid */}
        {loading ? (
          <div className="flex justify-center py-16">
            <Loader2 className="w-8 h-8 animate-spin text-accent" />
          </div>
        ) : workshops.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">
            <p className="text-lg">No upcoming workshops scheduled at the moment.</p>
            <p className="text-sm mt-2">Check back soon for new training sessions!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {workshops.map((workshop) => {
              const priceLabel = getPrice(workshop.type, workshop.price);
              const dateObj = new Date(workshop.date_time);
              const month = format(dateObj, "MMM");
              const day = format(dateObj, "dd");
              const time = format(dateObj, "hh:mm a");
              const hasFlyer = workshop.flyer_url && !workshop.flyer_url.startsWith('bg-');
              const whatsappMessage = encodeURIComponent(`Hi, I want to register for ${workshop.title} on ${format(dateObj, 'MMM dd')}.`);
              const isCompleted = workshop.status === 'completed';

              return (
                <div
                  key={workshop.id}
                  className={`group bg-white rounded-xl overflow-hidden border border-border/50 shadow-lg hover:shadow-2xl hover:border-accent/30 transition-all duration-500 flex flex-col ${isCompleted ? 'grayscale opacity-75' : ''}`}
                >
                  {/* Image Section - Clean & Unobstructed */}
                  <div 
                    className="relative w-full aspect-[4/5] overflow-hidden cursor-pointer bg-slate-100"
                    onClick={() => setSelectedImage(workshop.flyer_url || null)}
                  >
                    {hasFlyer ? (
                      <img
                        src={workshop.flyer_url!}
                        alt={workshop.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground/20 font-bold text-4xl uppercase">
                        No Poster
                      </div>
                    )}
                    
                    {/* View Button Overlay */}
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                      <span className="bg-white/90 text-primary px-4 py-2 rounded-full text-sm font-bold shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        View Poster
                      </span>
                    </div>

                    {/* Stream Label Badge - Professional & Subtle */}
                    <div className="absolute top-4 left-4">
                      <span className="bg-white/95 backdrop-blur-sm text-primary text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded shadow-sm">
                        {getStreamLabel(workshop.type)}
                      </span>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex gap-4 mb-4">
                      {/* Date Box */}
                      <div className="flex-shrink-0 flex flex-col items-center justify-center w-14 h-14 bg-primary/5 rounded-lg border border-primary/10">
                        <span className="text-xs font-bold text-accent uppercase">{month}</span>
                        <span className="text-xl font-serif font-bold text-primary">{day}</span>
                      </div>
                      
                      {/* Title & Info */}
                      <div>
                        <h3 className="heading-serif text-xl font-bold text-primary leading-tight group-hover:text-accent transition-colors duration-300 line-clamp-2">
                          {workshop.title}
                        </h3>
                        <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                          <Clock className="w-3.5 h-3.5 text-accent" />
                          <span>{time}</span>
                        </div>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="w-full h-px bg-border/40 my-4" />

                    {/* Footer Actions */}
                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Investment</span>
                        <span className="text-lg font-serif font-bold text-primary">{priceLabel}</span>
                      </div>

                      {isCompleted ? (
                         <span className="px-4 py-2 bg-slate-100 text-slate-500 text-xs font-bold uppercase rounded cursor-not-allowed">
                           Registration Closed
                         </span>
                      ) : (
                        <a
                          href={`https://wa.me/923103336485?text=${whatsappMessage}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded hover:bg-accent hover:text-primary transition-all duration-300 text-xs font-bold uppercase tracking-wide shadow-md hover:shadow-lg"
                        >
                          Register
                          <ArrowRight className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}


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
