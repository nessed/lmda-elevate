import heroImage from "@/assets/hero.jpg";

const About = () => {
  return (
    <section id="about" className="py-24 bg-background">
      <div className="container-wide">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image Side - Premium Magazine Style */}
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
                {/* Gold Accent Border */}
                <div className="absolute inset-0 border-4 border-accent pointer-events-none" style={{ transform: "translate(12px, 12px)" }} />
              </div>
              
              {/* Floating Stats Card */}
              <div className="absolute -bottom-8 -right-8 bg-foreground text-background p-6 shadow-lift max-w-xs">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-4xl font-bold text-accent">20+</span>
                  <span className="text-sm uppercase tracking-wide">Years</span>
                </div>
                <p className="text-xs text-background/60 leading-relaxed">
                  Delivering transformative leadership and quality management solutions
                </p>
              </div>
            </div>
          </div>

          {/* Content Side */}
          <div className="order-1 lg:order-2">
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-px bg-accent" />
              <span className="text-sm font-medium text-accent uppercase tracking-widest">
                About LMDA
              </span>
            </div>

            {/* Heading */}
            <h2 className="heading-serif text-3xl md:text-4xl lg:text-5xl text-foreground mb-6 leading-tight">
              Building Excellence Through Strategic Leadership
            </h2>

            {/* Body */}
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                For over two decades, <strong className="text-foreground">Leadership and Management Development Associates (LMDA)</strong> has been at the forefront of organizational transformation in Pakistan and beyond.
              </p>
              <p>
                Led by <strong className="text-foreground">Prof. Ali Sajid (PhD USA, T.I.)</strong>, our team of world-class consultants brings together deep academic expertise and practical industry experience to deliver measurable results.
              </p>
              <p>
                We specialize in <strong className="text-foreground">Total Quality Management (TQM)</strong>, <strong className="text-foreground">Business Strategy</strong>, and <strong className="text-foreground">Leadership Development</strong>—helping organizations build sustainable competitive advantages through their people.
              </p>
            </div>

            {/* Key Pillars */}
            <div className="mt-10 grid grid-cols-3 gap-6">
              <div className="border-l-2 border-accent pl-4">
                <div className="text-2xl font-bold text-foreground mb-1">1000+</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wide">Executives Trained</div>
              </div>
              <div className="border-l-2 border-accent pl-4">
                <div className="text-2xl font-bold text-foreground mb-1">92%</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wide">Satisfaction Rate</div>
              </div>
              <div className="border-l-2 border-accent pl-4">
                <div className="text-2xl font-bold text-foreground mb-1">50+</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wide">Partner Orgs</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
