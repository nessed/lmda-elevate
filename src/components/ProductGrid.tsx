import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Clock, X, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import zoomImage from "@/assets/zoom-logo.svg";
import fallbackData from "@/data/fallbackWorkshops.json";
import { siteConfig, getWorkshopRegistrationLink } from "@/data/siteConfig";
import WorkshopImage from "./WorkshopImage";

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

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

const ProductGrid = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [loading, setLoading] = useState(true);
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());

  useEffect(() => {
    const fetchWorkshops = async () => {
      try {
        const { data, error } = await supabase
          .from("workshops")
          .select("id, title, type, price, flyer_url, date_time, cpd_points, trainer_name")
          .eq("is_active", true)
          .gte("date_time", new Date().toISOString())
          .order("date_time", { ascending: true });

        if (error) {
          console.warn("Supabase error, using fallback data:", error.message);
          setWorkshops(fallbackData.workshops as Workshop[]);
        } else if (data && data.length > 0) {
          setWorkshops(data as Workshop[]);
        } else {
          // No upcoming workshops, show fallback evergreen content
          setWorkshops(fallbackData.workshops as Workshop[]);
        }
      } catch (err) {
        console.warn("Network error, using fallback data:", err);
        setWorkshops(fallbackData.workshops as Workshop[]);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkshops();
  }, []);

  const handleImageError = (workshopId: string) => {
    setImageErrors(prev => new Set(prev).add(workshopId));
  };

  return (
    <section id="programs" className="py-10 sm:py-16 lg:py-24 bg-slate-50 relative overflow-hidden">
      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors p-2.5 bg-white/10 hover:bg-white/20 border border-white/10"
            onClick={() => setSelectedImage(null)}
          >
            <X className="w-5 h-5" />
          </button>
          
          <div 
            className="relative max-w-lg w-full max-h-[85vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={selectedImage} 
              alt="Workshop Flyer" 
              className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      )}
      
      <div className="container-wide relative z-10">
        {/* Section Header */}
        <motion.div 
          className="px-5 sm:px-6 mb-6 sm:mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-12 sm:mb-16">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-px bg-accent" />
              <span className="text-sm font-bold text-accent uppercase tracking-widest">
                Live Trainings
              </span>
            </div>
            <h2 className="heading-serif text-3xl sm:text-4xl md:text-5xl font-bold text-primary">
              Explore Our <span className="text-accent italic">Upcoming Workshops</span>
            </h2>
          </div>
        </motion.div>

        {/* Workshop Grid */}
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
          <motion.div 
            className="flex sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 overflow-x-auto snap-x snap-mandatory pb-4 sm:pb-0 px-4 sm:px-6 -mx-4 sm:mx-0 scroll-smooth hide-scrollbar"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {workshops.map((workshop) => {
              const priceLabel = getPrice(workshop.type, workshop.price);
              const dateObj = new Date(workshop.date_time);
              const month = format(dateObj, "MMM");
              const day = format(dateObj, "dd");
              const time = format(dateObj, "hh:mm a");
              const hasFlyer = workshop.flyer_url && !workshop.flyer_url.startsWith('bg-') && !imageErrors.has(workshop.id);
              const registrationLink = getWorkshopRegistrationLink(workshop.title, format(dateObj, 'MMM dd'));

              return (
                <motion.div
                  key={workshop.id}
                  className="flex-shrink-0 w-[85vw] sm:w-auto snap-center sm:snap-start group bg-white overflow-hidden shadow-xl shadow-slate-200/50 hover:shadow-2xl transition-shadow duration-300 flex flex-col border border-border"
                  variants={cardVariants}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Image Section */}
                  <div 
                    className="relative w-full cursor-pointer"
                    onClick={() => hasFlyer && setSelectedImage(workshop.flyer_url)}
                  >
                    <WorkshopImage
                      src={workshop.flyer_url}
                      alt={workshop.title}
                      title={workshop.title}
                      date={`${month} ${day}, ${time}`}
                      price={workshop.price}
                      aspectRatio="4/5"
                    />
                  </div>

                  {/* Content Section */}
                  <div className="p-4 sm:p-5 flex flex-col flex-grow">
                    {/* Badges Row */}
                    <div className="flex items-center gap-2 mb-3">
                      <span className="bg-primary/10 text-primary text-[9px] sm:text-[10px] font-bold uppercase tracking-widest px-2 sm:px-3 py-1 rounded">
                        {getStreamLabel(workshop.type)}
                      </span>
                      {workshop.cpd_points && (
                        <span className="bg-accent text-primary text-[9px] sm:text-[10px] font-bold px-2 py-1 rounded">
                          0.5 CPD
                        </span>
                      )}
                    </div>

                    <div className="flex gap-3 sm:gap-4 mb-3 sm:mb-4">
                      {/* Date Box */}
                      <div className="flex-shrink-0 flex flex-col items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-primary text-white shadow-lg shadow-primary/10">
                        <span className="text-[10px] sm:text-xs font-bold text-accent uppercase tracking-widest">{month}</span>
                        <span className="text-xl sm:text-2xl font-serif font-bold leading-none mt-0.5">{day}</span>
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

                    {/* Footer Actions */}
                    <div className="mt-auto flex items-center justify-between gap-3">
                      <div className="flex flex-col min-w-0">
                        <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Investment</span>
                        <span className="text-base sm:text-lg font-serif font-bold text-primary truncate">{priceLabel}</span>
                      </div>

                      <a
                        href={registrationLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="shimmer-gold flex items-center gap-2 bg-primary text-white px-6 py-3 hover:bg-primary/95 active:scale-95 transition-all duration-200 text-sm font-bold shadow-lg shadow-primary/10 flex-shrink-0"
                      >
                        <span className="hidden xs:inline">Register</span>
                        <ArrowRight className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}

        {/* Zoom Infrastructure */}
        <motion.div 
          className="mt-12 sm:mt-16 lg:mt-20 pt-8 sm:pt-10 border-t border-border/40"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 opacity-80">
            <img src={zoomImage} alt="Zoom" className="h-8 sm:h-10 w-auto grayscale" />
            <p className="text-xs sm:text-sm text-muted-foreground font-medium text-center">
              <span className="text-primary font-bold">Seamless Digital Delivery.</span> All sessions on Zoom Pro HD with cloud recording.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductGrid;