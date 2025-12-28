import { Clock, Calendar, Award, ArrowRight, BadgeCheck, CalendarDays } from "lucide-react";
import zoomImage from "@/assets/zoomimagess.png";

const ProductGrid = () => {
  const products = [
    {
      icon: Clock,
      title: "Free Power Talks",
      duration: "60-Minute Sessions",
      description: "High-impact online sessions covering business growth fundamentals. Perfect for busy professionals seeking quick, actionable insights.",
      features: [
        "Live Q&A with experts",
        "Practical frameworks",
        "Networking opportunities",
      ],
      cta: "Register for Next Session",
      ctaLink: "#contact",
      accent: "bg-accent/10 border-accent",
      price: null,
      cpd: null,
      nextDate: "Next Session: Jan 15, 2025",
    },
    {
      icon: Calendar,
      title: "Specialized Workshops",
      duration: "1-Day Intensives",
      description: "Deep-dive training programs designed to transform your skills in a single day. Led by master facilitators with real-world experience.",
      features: [
        "Dec 06: Sales Performance Mastery",
        "Dec 14: Customer Service Excellence",
        "Jan 20: NLP Communication",
      ],
      cta: "View Workshop Calendar",
      ctaLink: "#gallery",
      accent: "bg-primary/5 border-primary",
      price: "PKR 1,200",
      cpd: "0.5 CPD Points for Engineers",
      nextDate: "Next: Dec 06, 2024",
    },
    {
      icon: Award,
      title: "Professional Certifications",
      duration: "3-Month Programs",
      description: "Career-defining mastery programs for sales managers and executives. Earn recognized certifications that set you apart.",
      features: [
        "Employability & Soft Skills",
        "4-weekend intensive format",
        "Lifetime alumni network",
      ],
      cta: "Explore Certifications",
      ctaLink: "#contact",
      accent: "bg-accent/10 border-accent",
      price: "PKR 12,800",
      cpd: "Industry-recognized credentials",
      nextDate: "Next Cohort: May 03, 2025",
    },
  ];

  return (
    <section id="programs" className="py-24 bg-white">
      <div className="container-wide">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-px bg-accent" />
            <span className="text-sm font-medium text-accent uppercase tracking-widest">
              Three-Tier Learning Path
            </span>
            <div className="w-12 h-px bg-accent" />
          </div>
          <h2 className="heading-serif text-4xl md:text-5xl text-primary mb-4 font-bold">
            Choose Your Growth Trajectory
          </h2>
          <p className="text-lg text-muted-foreground font-medium">
            From free insights to career transformation—find the right fit for your goals
          </p>
        </div>

        {/* Product Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {products.map((product, index) => {
            const Icon = product.icon;
            return (
              <div
                key={index}
                className={`border-2 ${product.accent} p-8 hover:shadow-lift transition-all group relative`}
              >
                {/* CPD Badge */}
                {product.cpd && (
                  <div className="absolute top-4 right-4 bg-accent text-accent-foreground px-3 py-1 text-xs font-bold uppercase">
                    {product.cpd}
                  </div>
                )}

                {/* Icon */}
                <div className="mb-6">
                  <Icon className="w-12 h-12 text-accent" />
                </div>

                {/* Title & Duration */}
                <div className="mb-4">
                  <h3 className="text-2xl font-bold text-primary mb-2">
                    {product.title}
                  </h3>
                  <p className="text-sm font-semibold text-accent uppercase tracking-wide">
                    {product.duration}
                  </p>
                </div>

                {/* Next Date Badge */}
                {product.nextDate && (
                  <div className="flex items-center gap-2 mb-4 bg-primary/5 px-3 py-2 border-l-4 border-accent">
                    <CalendarDays className="w-4 h-4 text-accent" />
                    <span className="text-sm font-bold text-primary">{product.nextDate}</span>
                  </div>
                )}

                {/* Description */}
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {product.description}
                </p>

                {/* Features */}
                <ul className="space-y-2 mb-6">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <div className="w-1.5 h-1.5 bg-accent rounded-full mt-1.5 flex-shrink-0" />
                      <span className="text-foreground font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Price */}
                {product.price && (
                  <div className="mb-6 pt-4 border-t border-border">
                    <div className="flex items-baseline gap-2">
                      <span className="text-sm text-muted-foreground">Investment:</span>
                      <span className="text-2xl font-bold text-primary">{product.price}</span>
                    </div>
                  </div>
                )}

                {/* CTA */}
                <a
                  href={product.ctaLink}
                  className="inline-flex items-center gap-2 text-primary font-semibold hover:text-accent transition-colors group-hover:gap-3"
                >
                  {product.cta}
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            );
          })}
        </div>

        {/* Infrastructure Section */}
        <div className="mt-16 pt-12 border-t border-border">
          <div className="bg-secondary p-8 border-l-4 border-accent">
            <div className="flex flex-col md:flex-row items-center gap-10">
              <div className="flex-1">
                <div className="flex items-start gap-4 mb-4">
                  <BadgeCheck className="w-8 h-8 text-accent flex-shrink-0 mt-1" />
                  <h3 className="text-2xl font-bold text-primary">
                    Seamless Digital Delivery
                  </h3>
                </div>
                <p className="text-muted-foreground leading-relaxed font-medium text-lg">
                  All workshops are delivered via <strong className="text-foreground text-primary">Zoom Pro HD</strong> with cloud-recorded sessions for 24/7 student access. Join from anywhere in Pakistan or abroad—no travel required.
                </p>
              </div>
              <div className="flex-1 w-full md:max-w-md">
                <div className="relative group overflow-hidden border-2 border-accent/20 rounded-lg shadow-xl">
                  <img 
                    src={zoomImage} 
                    alt="Zoom Pro Training Session" 
                    className="w-full h-auto object-cover group-hover:scale-105 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
