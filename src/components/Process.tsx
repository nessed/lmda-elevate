import { Search, Settings, BarChart } from "lucide-react";

const phases = [
  {
    icon: Search,
    number: "01",
    title: "Discovery",
    subtitle: "Understanding Your Needs",
    description: "We conduct a comprehensive assessment of your organization's current state, identifying gaps in leadership, quality management, and strategic alignment.",
    steps: ["Initial Consultation", "Needs Assessment", "Stakeholder Interviews"]
  },
  {
    icon: Settings,
    number: "02",
    title: "Implementation",
    subtitle: "Customized Training Delivery",
    description: "Our expert consultants deliver tailored training programs at your location, ensuring practical application and immediate impact on your operations.",
    steps: ["Course Design", "In-House Training", "Coaching & Mentoring"]
  },
  {
    icon: BarChart,
    number: "03",
    title: "Evaluation",
    subtitle: "Measuring Impact & Growth",
    description: "We provide comprehensive feedback and performance metrics to measure the effectiveness of our training and guide ongoing development.",
    steps: ["Performance Review", "Feedback Reports", "Continued Support"]
  }
];

const Process = () => {
  return (
    <section id="process" className="section-padding bg-secondary">
      <div className="container-wide">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-px bg-accent" />
            <span className="text-sm font-medium text-accent uppercase tracking-widest">
              Our Framework
            </span>
            <div className="w-12 h-px bg-accent" />
          </div>
          <h2 className="heading-serif text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
            A Proven Methodology
          </h2>
          <p className="text-muted-foreground">
            Our three-phase approach ensures sustainable organizational transformation.
          </p>
        </div>

        {/* 3-Phase Framework */}
        <div className="grid md:grid-cols-3 gap-8">
          {phases.map((phase) => {
            const IconComponent = phase.icon;
            return (
              <div
                key={phase.number}
                className="card-authority p-8 hover:border-accent transition-colors"
              >
                {/* Phase Number & Icon */}
                <div className="flex items-center justify-between mb-6">
                  <span className="heading-serif text-5xl font-bold text-accent/30">
                    {phase.number}
                  </span>
                  <IconComponent className="w-8 h-8 text-accent" />
                </div>

                {/* Title */}
                <h3 className="heading-serif text-2xl text-foreground mb-1">
                  {phase.title}
                </h3>
                <p className="text-sm text-accent font-medium uppercase tracking-wide mb-4">
                  {phase.subtitle}
                </p>

                {/* Description */}
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  {phase.description}
                </p>

                {/* Steps */}
                <ul className="space-y-2">
                  {phase.steps.map((step) => (
                    <li key={step} className="flex items-center gap-2 text-sm text-foreground">
                      <div className="w-1.5 h-1.5 bg-accent" style={{ borderRadius: 0 }} />
                      {step}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Process;
