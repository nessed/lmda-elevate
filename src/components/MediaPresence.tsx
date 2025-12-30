import { Youtube, Instagram, Facebook, ArrowUpRight, PlayCircle, ExternalLink } from "lucide-react";
import content from "@/data/content";
import { motion } from "framer-motion";

const MediaPresence = () => {
  return (
    <section className="py-20 sm:py-24 bg-white relative overflow-hidden">
      <div className="container-wide px-4 sm:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-accent font-bold text-sm tracking-widest uppercase mb-3 block">
            Digital Presence
          </span>
          <h2 className="heading-serif text-3xl sm:text-4xl md:text-5xl text-primary font-bold mb-6">
            Connect with <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-slate-500">LMDA</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Watch our past workshop recordings and stay updated with our latest events.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* YouTube Card - Featured */}
          <motion.a
            href={content.company.socials.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="md:col-span-2 lg:col-span-2 group relative overflow-hidden rounded-3xl bg-red-600 text-white shadow-2xl hover:shadow-red-600/30 transition-all duration-500 min-h-[300px] flex flex-col justify-between p-8 sm:p-10"
            whileHover={{ scale: 1.01 }}
          >
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1492619189219-4413e9cd5357?q=80&w=2074&auto=format&fit=crop')] bg-cover bg-center opacity-20 group-hover:opacity-30 transition-opacity duration-500 mix-blend-multiply" />
            <div className="absolute inset-0 bg-gradient-to-br from-red-600/90 to-red-900/90 group-hover:from-red-600/80 group-hover:to-red-900/80 transition-colors duration-500" />
            
            <div className="relative z-10">
              <div className="bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full inline-flex items-center gap-2 mb-4 w-fit">
                <PlayCircle className="w-4 h-4 text-white" />
                <span className="text-xs font-bold uppercase tracking-wide">Workshop Archive</span>
              </div>
              <h3 className="text-3xl sm:text-4xl font-bold mb-2">YouTube Channel</h3>
              <p className="text-white/90 max-w-md text-lg font-medium">
                Access our library of past workshop recordings, trainer interviews, and success stories.
              </p>
            </div>

            <div className="relative z-10 mt-8 flex items-center gap-3">
              <span className="bg-white text-red-600 px-6 py-3 rounded-xl font-bold text-sm group-hover:bg-red-50 transition-colors">
                Watch Now
              </span>
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:translate-x-2 transition-transform duration-300 backdrop-blur-sm">
                <ArrowUpRight className="w-6 h-6 text-white" />
              </div>
            </div>

            <Youtube className="absolute top-1/2 right-10 -translate-y-1/2 w-48 h-48 text-white/10 group-hover:text-white/20 transition-colors duration-500 rotate-12" />
          </motion.a>

          {/* Social Stack */}
          <div className="flex flex-col gap-6">
            {/* Instagram */}
            <motion.a
              href={content.company.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 group relative overflow-hidden rounded-3xl bg-gradient-to-tr from-purple-600 to-pink-500 text-white shadow-xl hover:shadow-pink-500/30 transition-all duration-300 p-8 flex flex-col justify-center"
              whileHover={{ scale: 1.02 }}
            >
              <div className="relative z-10 flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold mb-1">Instagram</h3>
                  <p className="text-white/80 text-sm font-medium">@lmda.pk</p>
                </div>
                <Instagram className="w-10 h-10 text-white/90 group-hover:rotate-12 transition-transform duration-300" />
              </div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-colors duration-300" />
            </motion.a>

            {/* Facebook */}
            <motion.a
              href={content.company.socials.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 group relative overflow-hidden rounded-3xl bg-[#1877F2] text-white shadow-xl hover:shadow-blue-500/30 transition-all duration-300 p-8 flex flex-col justify-center"
              whileHover={{ scale: 1.02 }}
            >
              <div className="relative z-10 flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold mb-1">Facebook</h3>
                  <p className="text-white/80 text-sm font-medium">LMDA Pakistan</p>
                </div>
                <Facebook className="w-10 h-10 text-white/90 group-hover:rotate-12 transition-transform duration-300" />
              </div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-colors duration-300" />
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MediaPresence;
