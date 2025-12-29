import heroImage from "@/assets/hero.jpg";

const About = () => {
  return (
    <section id="about" className="py-12 sm:py-16 lg:py-24 bg-background">
      <div className="container-wide px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          {/* Image Side */}
          <div className="relative order-2 lg:order-1">
            <div className="relative">
              {/* Main Image */}
              <div className="relative overflow-hidden">
                <img
                  src={heroImage}
                  alt="LMDA Leadership Excellence"
                  className="w-full h-auto object-cover"
                  style={{ aspectRatio: "4/3" }}
                />
                {/* Gold Accent Border - Smaller offset on mobile */}
                <div 
                  className="absolute inset-0 border-2 sm:border-4 border-accent pointer-events-none" 
                  style={{ transform: "translate(6px, 6px)" }} 
                />
              </div>
              
              {/* Floating Stats Card - Repositioned for mobile */}
              <div className="absolute -bottom-4 right-2 sm:-bottom-8 sm:-right-8 bg-foreground text-background p-4 sm:p-6 shadow-lift max-w-[200px] sm:max-w-xs">
                <div className="flex items-baseline gap-1 sm:gap-2 mb-1">
                  <span className="text-2xl sm:text-4xl font-bold text-accent">20+</span>
                  <span className="text-xs sm:text-sm uppercase tracking-wide">Years</span>
                </div>
                <p className="text-[10px] sm:text-xs text-background/60 leading-relaxed">
                  Delivering transformative leadership solutions
                </p>
              </div>
            </div>
          </div>

          {/* Content Side */}
          <div className="order-1 lg:order-2">
            {/* Eyebrow */}
            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
              <div className="w-8 sm:w-12 h-px bg-accent" />
              <span className="text-xs sm:text-sm font-medium text-accent uppercase tracking-widest">
                About LMDA
              </span>
            </div>

            {/* Heading */}
            <h2 className="heading-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-foreground mb-4 sm:mb-6 leading-tight">
              Building Excellence Through Strategic Leadership
            </h2>

            {/* Body */}
            <div className="space-y-3 sm:space-y-4 text-muted-foreground leading-relaxed text-sm sm:text-base">
              <p>
                For over two decades, <strong className="text-foreground">Leadership and Management Development Associates (LMDA)</strong> has been at the forefront of organizational transformation in Pakistan.
              </p>
              <p>
                Led by <strong className="text-foreground">Prof. Ali Sajid (PhD USA, T.I.)</strong>, our team brings deep academic expertise and practical industry experience.
              </p>
              <p className="hidden sm:block">
                We specialize in <strong className="text-foreground">Total Quality Management (TQM)</strong>, <strong className="text-foreground">Business Strategy</strong>, and <strong className="text-foreground">Leadership Development</strong>.
              </p>
            </div>

            {/* Key Pillars - Stacked better on mobile */}
            <div className="mt-6 sm:mt-10 grid grid-cols-3 gap-3 sm:gap-6">
              <div className="border-l-2 border-accent pl-3 sm:pl-4">
                <div className="text-lg sm:text-2xl font-bold text-foreground mb-0.5 sm:mb-1">1000+</div>
                <div className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wide leading-tight">Executives<br className="sm:hidden" /> Trained</div>
              </div>
              <div className="border-l-2 border-accent pl-3 sm:pl-4">
                <div className="text-lg sm:text-2xl font-bold text-foreground mb-0.5 sm:mb-1">92%</div>
                <div className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wide leading-tight">Satisfaction<br className="sm:hidden" /> Rate</div>
              </div>
              <div className="border-l-2 border-accent pl-3 sm:pl-4">
                <div className="text-lg sm:text-2xl font-bold text-foreground mb-0.5 sm:mb-1">50+</div>
                <div className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wide leading-tight">Partner<br className="sm:hidden" /> Orgs</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;