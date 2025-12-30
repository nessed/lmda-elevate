import Header from "@/components/Header";
import Footer from "@/components/Footer";
import content from "@/data/content";
import { Youtube, Instagram, Facebook, Phone, Mail, ArrowRight, ExternalLink } from "lucide-react";

const Connect = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header variant="solid" />
      
      <main className="pt-24 sm:pt-32 pb-20">
        {/* Page Title Section */}
        <div className="container-wide px-4 sm:px-6 mb-16 sm:mb-24">
          <div className="max-w-4xl">
            <h1 className="heading-serif text-4xl sm:text-5xl md:text-6xl text-primary font-bold mb-6">
              Connect & <span className="text-accent">Digital Archives</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl leading-relaxed">
              Explore our repository of workshop recordings, press features, and social highlights. Stay connected with the latest from LMDA.
            </p>
          </div>
        </div>

        <div className="container-wide px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
            
            {/* Main Content - Left Column */}
            <div className="lg:col-span-2 space-y-12">
              
              {/* YouTube Section - Corporate Style */}
              <section className="border-b border-gray-100 pb-12">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-red-50 rounded-lg">
                    <Youtube className="w-6 h-6 text-red-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-primary">Video Library</h2>
                </div>
                
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 sm:p-10 hover:border-red-200 transition-colors duration-300 group">
                  <h3 className="text-2xl font-bold text-primary mb-3 group-hover:text-red-700 transition-colors">
                    Official Workshop Archives
                  </h3>
                  <p className="text-muted-foreground mb-8 leading-relaxed max-w-xl">
                    Our YouTube channel serves as a comprehensive knowledge base, featuring full-length recordings of past workshops, expert interviews, and leadership seminars.
                  </p>
                  
                  <a 
                    href={content.company.socials.youtube}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-red-700 font-semibold hover:gap-3 transition-all"
                  >
                    Visit Channel <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </section>

              {/* Social Platforms - Corporate Style */}
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <ExternalLink className="w-6 h-6 text-blue-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-primary">Social Connect</h2>
                </div>
                
                <div className="grid sm:grid-cols-2 gap-6">
                  {/* Instagram */}
                  <a 
                    href={content.company.socials.instagram}
                    target="_blank"
                    rel="noopener noreferrer" 
                    className="flex flex-col justify-between p-6 rounded-xl border border-slate-200 hover:border-pink-200 bg-white hover:bg-pink-50/30 transition-all duration-300 group"
                  >
                    <div className="mb-6">
                      <Instagram className="w-8 h-8 text-pink-600 mb-4" />
                      <h4 className="text-lg font-bold text-primary mb-1">Instagram</h4>
                      <p className="text-sm text-muted-foreground">@lmda.pk</p>
                    </div>
                    <span className="text-sm font-semibold text-pink-600 group-hover:underline">Follow us &rarr;</span>
                  </a>

                  {/* Facebook */}
                  <a 
                    href={content.company.socials.facebook}
                    target="_blank"
                    rel="noopener noreferrer" 
                    className="flex flex-col justify-between p-6 rounded-xl border border-slate-200 hover:border-blue-200 bg-white hover:bg-blue-50/30 transition-all duration-300 group"
                  >
                    <div className="mb-6">
                      <Facebook className="w-8 h-8 text-blue-600 mb-4" />
                      <h4 className="text-lg font-bold text-primary mb-1">Facebook</h4>
                      <p className="text-sm text-muted-foreground">LMDA Pakistan</p>
                    </div>
                    <span className="text-sm font-semibold text-blue-600 group-hover:underline">Connect Page &rarr;</span>
                  </a>
                </div>
              </section>

            </div>

            {/* Sidebar - Contact Info */}
            <div className="lg:col-span-1">
              <div className="bg-primary text-white rounded-2xl p-8 sm:p-10 sticky top-32">
                <h3 className="heading-serif text-2xl font-bold mb-6">Contact Us</h3>
                
                <div className="space-y-6">
                  <div>
                    <p className="text-accent text-xs font-bold uppercase tracking-widest mb-2">Phone</p>
                    <a href={`tel:${content.company.phone}`} className="flex items-center gap-3 text-lg hover:text-accent transition-colors">
                      <Phone className="w-5 h-5" />
                      {content.company.phone}
                    </a>
                  </div>
                  
                  <div>
                    <p className="text-accent text-xs font-bold uppercase tracking-widest mb-2">Landline</p>
                    <a href={`tel:${content.company.landline}`} className="flex items-center gap-3 text-lg hover:text-accent transition-colors">
                      <Phone className="w-5 h-5" />
                      {content.company.landline}
                    </a>
                  </div>

                  <div>
                    <p className="text-accent text-xs font-bold uppercase tracking-widest mb-2">Email</p>
                    <a href={`mailto:${content.company.email}`} className="flex items-center gap-3 text-lg hover:text-accent transition-colors break-words">
                      <Mail className="w-5 h-5 flex-shrink-0" />
                      {content.company.email}
                    </a>
                  </div>

                  <div className="pt-6 border-t border-white/10 mt-8">
                    <p className="text-white/60 text-sm leading-relaxed">
                      For inquiries, press releases, or collaboration requests, please contact our administrative office.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Connect;
