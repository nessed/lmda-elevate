import { useState, useEffect } from "react";
import { ArrowRight, Clock, Sparkles, X, Loader2, MessageCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import zoomImage from "@/assets/zoomimagess.png";

interface Workshop {
  id: string;
  title: string;
  type: "series" | "free_workshop" | "paid_workshop";
  price: number | null;
  flyer_url: string | null;
  date_time: string;
  cpd_points: boolean | null;
  trainer_name: string | null;
}

const getStreamLabel = (type: Workshop["type"]) => {
  switch (type) {
    case "series": return "Certification";
    case "free_workshop": return "Free Talk";
    case "paid_workshop": return "Workshop";
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
        .select("id, title, type, price, flyer_url, date_time, cpd_points, trainer_name")
        .eq("is_active", true)
        .gte("date_time", new Date().toISOString())
        .order("date_time", { ascending: true });

      if (!error && data) {
        setWorkshops(data as Workshop[]);
      }
      setLoading(false);
    };

    fetchWorkshops();
  }, []);

  return (
    <section id="programs" className="py-12 sm:py-16 lg:py-24 bg-gradient-to-b from-white via-slate-50 to-white relative overflow-hidden">
      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors p-3 bg-white/10 rounded-full"
            onClick={() => setSelectedImage(null)}
          >
            <X className="w-6 h-6" />
          </button>
          
          <div 
            className="relative max-w-lg w-full max-h-[85vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={selectedImage} 
              alt="Workshop Flyer" 
              className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
            />
          </div>
        </div>
      )}

      {/* Mobile-optimized background */}
      <div className="absolute top-0 left-0 w-48 sm:w-96 h-48 sm:h-96 bg-accent/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      
      <div className="container-wide relative z-10 px-4 sm:px-6">
        {/* Section Header - Mobile Optimized */}
        <div className="text-center max-w-4xl mx-auto mb-8 sm:mb-12 lg:mb-16 px-4 sm:px-6 py-8 sm:py-10 lg:py-14 bg-gradient-to-r from-primary via-primary to-primary/95 relative overflow-hidden shadow-xl sm:shadow-2xl">
          <div className="absolute top-0 left-0 w-1 sm:w-2 h-full bg-accent" />
          <div className="absolute bottom-0 left-0 right-0 h-0.5 sm:h-1 bg-gradient-to-r from-accent via-accent/50 to-transparent" />
          
          {/* Badge - Smaller on Mobile */}
          <div className="inline-flex items-center gap-1.5 sm:gap-2 py-1 sm:py-1.5 px-3 sm:px-4 border border-accent/40 rounded-full text-accent text-[10px] sm:text-xs font-mono mb-4 sm:mb-6 tracking-wider uppercase bg-primary/50 backdrop-blur-sm">
            <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
            Start Your Journey
          </div>
          
          <h2 className="heading-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white mb-2 sm:mb-4 font-bold relative z-10">
            Upcoming Training Sessions
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-white/80 font-medium max-w-2xl mx-auto relative z-10">
            Select your track. Secure your seat.
          </p>
        </div>

        {/* Workshop Grid - Mobile First */}
        {loading ? (
          <div className="flex justify-center py-12 sm:py-16">
            <Loader2 className="w-6 h-6 sm:w-8 sm:h-8 animate-spin text-accent" />
          </div>
        ) : workshops.length === 0 ? (
          <div className="text-center py-12 sm:py-16 text-muted-foreground px-4">
            <p className="text-base sm:text-lg">No upcoming workshops scheduled.</p>
            <p className="text-sm mt-2">Check back soon for new sessions!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {workshops.map((workshop) => {
              const priceLabel = getPrice(workshop.type, workshop.price);
              const dateObj = new Date(workshop.date_time);
              const month = format(dateObj, "MMM");
              const day = format(dateObj, "dd");
              const time = format(dateObj, "hh:mm a");
              const hasFlyer = workshop.flyer_url && !workshop.flyer_url.startsWith('bg-');
              const whatsappMessage = encodeURIComponent(`Hi, I want to register for ${workshop.title} on ${format(dateObj, 'MMM dd')}.`);

              return (
                <div
                  key={workshop.id}
                  className="group bg-white rounded-xl overflow-hidden border border-border/50 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col"
                >
                  {/* Image Section - 4:5 Ratio */}
                  <div 
                    className="relative w-full aspect-[4/5] overflow-hidden cursor-pointer bg-gradient-to-br from-slate-100 to-slate-200"
                    onClick={() => hasFlyer && setSelectedImage(workshop.flyer_url)}
                  >
                    {hasFlyer ? (
                      <>
                        {/* Blur background for aspect ratio fill */}
                        <div 
                          className="absolute inset-0 bg-cover bg-center blur-xl scale-110 opacity-50"
                          style={{ backgroundImage: `url(${workshop.flyer_url})` }}
                        />
                        <img
                          src={workshop.flyer_url!}
                          alt={workshop.title}
                          className="relative w-full h-full object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                        />
                      </>
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground/30 p-4">
                        <span className="font-bold text-3xl sm:text-4xl uppercase tracking-widest">LMDA</span>
                        <span className="text-sm mt-2">Poster Coming Soon</span>
                      </div>
                    )}
                    
                    {/* Stream Label Badge */}
                    <div className="absolute top-3 left-3">
                      <span className="bg-white/95 backdrop-blur-sm text-primary text-[9px] sm:text-[10px] font-bold uppercase tracking-widest px-2 sm:px-3 py-1 rounded shadow-sm">
                        {getStreamLabel(workshop.type)}
                      </span>
                    </div>

                    {/* CPD Badge */}
                    {workshop.cpd_points && (
                      <div className="absolute top-3 right-3">
                        <span className="bg-accent text-primary text-[9px] sm:text-[10px] font-bold px-2 py-1 rounded shadow-sm">
                          0.5 CPD
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content Section - Mobile Optimized */}
                  <div className="p-4 sm:p-5 flex flex-col flex-grow">
                    <div className="flex gap-3 sm:gap-4 mb-3 sm:mb-4">
                      {/* Date Box */}
                      <div className="flex-shrink-0 flex flex-col items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-primary/5 rounded-lg border border-primary/10">
                        <span className="text-[10px] sm:text-xs font-bold text-accent uppercase">{month}</span>
                        <span className="text-lg sm:text-xl font-serif font-bold text-primary">{day}</span>
                      </div>
                      
                      {/* Title & Time */}
                      <div className="min-w-0 flex-1">
                        <h3 className="heading-serif text-base sm:text-lg lg:text-xl font-bold text-primary leading-tight line-clamp-2">
                          {workshop.title}
                        </h3>
                        <div className="flex items-center gap-1.5 sm:gap-2 mt-1.5 sm:mt-2 text-xs sm:text-sm text-muted-foreground">
                          <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-accent flex-shrink-0" />
                          <span className="truncate">{time}</span>
                        </div>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="w-full h-px bg-border/40 my-3 sm:my-4" />

                    {/* Footer Actions - Mobile Optimized */}
                    <div className="mt-auto flex items-center justify-between gap-3">
                      <div className="flex flex-col min-w-0">
                        <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Investment</span>
                        <span className="text-base sm:text-lg font-serif font-bold text-primary truncate">{priceLabel}</span>
                      </div>

                      <a
                        href={`https://wa.me/923103336485?text=${whatsappMessage}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 sm:gap-2 bg-[#25D366] text-white px-4 sm:px-5 py-2.5 sm:py-3 rounded-lg hover:bg-[#20BD5A] active:scale-95 transition-all duration-200 text-xs sm:text-sm font-bold shadow-md hover:shadow-lg flex-shrink-0"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span className="hidden xs:inline">Register</span>
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Zoom Infrastructure - Mobile Optimized */}
        <div className="mt-12 sm:mt-16 lg:mt-20 pt-8 sm:pt-10 border-t border-border/40">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 opacity-80">
            <img src={zoomImage} alt="Zoom" className="h-8 sm:h-10 w-auto grayscale" />
            <p className="text-xs sm:text-sm text-muted-foreground font-medium text-center">
              <span className="text-primary font-bold">Seamless Digital Delivery.</span> All sessions on Zoom Pro HD with cloud recording.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;