import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { format, isFuture, parseISO, addHours } from "date-fns";
import { Calendar as CalendarIcon, MapPin, Clock, ArrowRight, Download, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import fallbackData from "@/data/fallbackWorkshops.json";
import { getWorkshopRegistrationLink } from "@/data/siteConfig";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

// Types based on the supabase schema
type Workshop = {
  id: string;
  title: string;
  date_time: string;
  trainer_name: string | null;
  price: number | null;
  type: "series" | "free_workshop" | "paid_workshop";
  flyer_url: string | null;
  description: string | null;
};

const Calendar = () => {
  const { data: workshops, isLoading, isError } = useQuery({
    queryKey: ["workshops"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("workshops")
        .select("*")
        .order("date_time", { ascending: true }); // Get all, sort by date ascending initially
      
      if (error) throw error;
      return data as Workshop[];
    },
    retry: 2,
  });

  // Use fallback data if error or no data
  const workshopData = isError || (!isLoading && (!workshops || workshops.length === 0))
    ? fallbackData.workshops as Workshop[]
    : workshops || [];

  // Split workshops into upcoming and past
  const upcomingWorkshops = workshopData.filter(w => w.date_time && isFuture(parseISO(w.date_time)));
  const pastWorkshops = workshopData
    .filter(w => w.date_time && !isFuture(parseISO(w.date_time)))
    .sort((a, b) => new Date(b.date_time).getTime() - new Date(a.date_time).getTime()); // Sort past descending (newest first)

  const downloadIcs = (workshop: Workshop) => {
    const startDate = parseISO(workshop.date_time);
    const endDate = addHours(startDate, 3); // Assume 3 hours if not specified
    
    const formatDate = (date: Date) => date.toISOString().replace(/-|:|\.\d+/g, "");
    
    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "BEGIN:VEVENT",
      `DTSTART:${formatDate(startDate)}`,
      `DTEND:${formatDate(endDate)}`,
      `SUMMARY:${workshop.title}`,
      `DESCRIPTION:${workshop.description || `Trainer: ${workshop.trainer_name}`}`,
      "LOCATION:LMDA, Lahore",
      "END:VEVENT",
      "END:VCALENDAR"
    ].join("\r\n");

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute("download", `lmda-workshop-${workshop.id}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const googleCalendarUrl = (workshop: Workshop) => {
    const startDate = parseISO(workshop.date_time);
    const endDate = addHours(startDate, 3);
    const text = encodeURIComponent(workshop.title);
    const dates = `${startDate.toISOString().replace(/-|:|\.\d+/g, "")}/${endDate.toISOString().replace(/-|:|\.\d+/g, "")}`;
    const details = encodeURIComponent(workshop.description || `Trainer: ${workshop.trainer_name}`);
    const location = encodeURIComponent("LMDA, Lahore");
    
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&dates=${dates}&details=${details}&location=${location}`;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <>
      <Helmet>
        <title>Training Calendar - LMDA</title>
        <meta name="description" content="Upcoming sales and leadership workshops at LMDA." />
      </Helmet>

      <div className="min-h-screen bg-background flex flex-col">
        <Header variant="solid" />
        
        <main className="flex-grow pt-24 sm:pt-32 pb-20 px-4 sm:px-6">
          <div className="container-wide max-w-5xl mx-auto">
            
            <div className="mb-12 sm:mb-16 text-center sm:text-left">
              <h1 className="heading-serif text-4xl sm:text-5xl lg:text-6xl text-primary font-bold mb-4">
                Training <span className="text-accent italic">Calendar</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl">
                Join our upcoming executive workshops and certification programs.
              </p>
            </div>

            {/* UPCOMING WORKSHOPS */}
            <div className="mb-20">
              <h2 className="text-2xl font-bold text-primary mb-8 border-b border-border pb-4 flex items-center gap-2">
                <CalendarIcon className="w-6 h-6 text-accent" />
                Upcoming Events
              </h2>

              {isLoading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-32 bg-secondary/50 animate-pulse rounded-lg" />
                  ))}
                </div>
              ) : upcomingWorkshops.length > 0 ? (
                <motion.div 
                  className="space-y-6"
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                >
                  {upcomingWorkshops.map((workshop) => (
                    <motion.div 
                      key={workshop.id}
                      variants={itemVariants}
                      className="group relative bg-card border border-border hover:border-accent/50 transition-all duration-300 shadow-sm hover:shadow-lg rounded-none overflow-hidden"
                    >
                      <div className="flex flex-col md:grid md:grid-cols-12 gap-0 md:gap-6">
                        
                        {/* Date Column */}
                        <div className="md:col-span-3 bg-primary/5 p-6 flex flex-row md:flex-col items-center md:items-start md:justify-center gap-4 border-b md:border-b-0 md:border-r border-border">
                          <div className="text-center md:text-left">
                            <span className="block text-4xl sm:text-5xl font-serif font-bold text-primary leading-none mb-1">
                              {format(parseISO(workshop.date_time), "dd")}
                            </span>
                            <span className="block text-lg font-medium text-accent uppercase tracking-wider">
                              {format(parseISO(workshop.date_time), "MMM")}
                            </span>
                          </div>
                          <div className="h-10 w-[1px] bg-border md:hidden" />
                          <div className="text-muted-foreground font-medium flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            {format(parseISO(workshop.date_time), "EEEE, h:mm a")}
                          </div>
                        </div>

                        {/* Info Column */}
                        <div className="md:col-span-6 p-6 flex flex-col justify-center">
                          <div className="flex items-center gap-2 mb-2">
                            <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-sm ${
                              workshop.type === 'series' ? 'bg-purple-100 text-purple-700' :
                              workshop.type === 'free_workshop' ? 'bg-green-100 text-green-700' :
                              'bg-accent/10 text-accent-foreground'
                            }`}>
                              {workshop.type.replace('_', ' ')}
                            </span>
                          </div>
                          
                          <HoverCard>
                            <HoverCardTrigger asChild>
                              <h3 className="text-xl sm:text-2xl font-bold text-primary group-hover:text-accent transition-colors cursor-pointer mb-2">
                                {workshop.title}
                              </h3>
                            </HoverCardTrigger>
                            {workshop.flyer_url && (
                              <HoverCardContent className="w-80 p-0 border-none shadow-xl" align="start">
                                <img 
                                  src={workshop.flyer_url} 
                                  alt={`Flyer for ${workshop.title}`} 
                                  loading="lazy"
                                  className="w-full h-auto rounded-lg" 
                                />
                              </HoverCardContent>
                            )}
                          </HoverCard>

                          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-muted-foreground mt-1">
                            {workshop.trainer_name && (
                              <span className="font-medium text-primary/80">
                                with {workshop.trainer_name}
                              </span>
                            )}
                            <span className="hidden sm:inline text-border">•</span>
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" /> LMDA Head Office
                            </span>
                          </div>
                        </div>

                        {/* Action Column */}
                        <div className="md:col-span-3 p-6 flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-4 bg-secondary/20">
                          <div className="text-right">
                            {workshop.price ? (
                              <div className="text-lg font-bold text-primary">
                                PKR {workshop.price.toLocaleString()}
                              </div>
                            ) : (
                              <div className="text-lg font-bold text-green-600">Free</div>
                            )}
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <button 
                              onClick={() => downloadIcs(workshop)}
                              className="p-2 text-muted-foreground hover:text-primary hover:bg-secondary rounded-full transition-colors"
                              title="Download .ics"
                            >
                              <Download className="w-5 h-5" />
                            </button>
                            <a 
                              href={googleCalendarUrl(workshop)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 text-muted-foreground hover:text-primary hover:bg-secondary rounded-full transition-colors"
                              title="Add to Google Calendar"
                            >
                              <ExternalLink className="w-5 h-5" />
                            </a>
                            <a 
                              href={getWorkshopRegistrationLink(workshop.title, format(parseISO(workshop.date_time), 'MMM dd'))}
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="btn-gold text-xs px-4 py-2"
                            >
                              Register
                            </a>
                          </div>
                        </div>

                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <div className="text-center py-12 bg-secondary/30 rounded-lg border border-dashed border-border">
                  <p className="text-muted-foreground">No upcoming events scheduled at the moment.</p>
                </div>
              )}
            </div>

            {/* PAST WORKSHOPS */}
            {pastWorkshops.length > 0 && (
              <div className="opacity-80">
                <h2 className="text-xl font-bold text-muted-foreground mb-6 border-b border-border pb-4">
                  Past Events
                </h2>
                <div className="space-y-4">
                  {pastWorkshops.map((workshop) => (
                    <div 
                      key={workshop.id}
                      className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 bg-secondary/10 border border-border/50 rounded-sm"
                    >
                      <div className="flex items-center gap-4 min-w-[140px]">
                        <span className="text-lg font-serif font-bold text-muted-foreground">
                          {format(parseISO(workshop.date_time), "dd MMM")}
                        </span>
                        <span className="text-xs text-muted-foreground/60">
                          {format(parseISO(workshop.date_time), "yyyy")}
                        </span>
                      </div>
                      
                      <div className="flex-grow">
                        <h3 className="font-semibold text-primary/80 text-base mb-1">
                          {workshop.title}
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          {workshop.trainer_name}
                        </p>
                      </div>

                      <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground/60 px-2 py-1 bg-secondary/50 rounded-sm">
                        Finished
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </main>

        <Footer />
        <WhatsAppCTA />
      </div>
    </>
  );
};

export default Calendar;
