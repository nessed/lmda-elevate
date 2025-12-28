import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import About from "@/components/About";
import Process from "@/components/Process";
import Footer from "@/components/Footer";

const Consultancy = () => {
  return (
    <>
      <Helmet>
        <title>Consultancy Services - LMDA</title>
        <meta
          name="description"
          content="Strategic management consultancy services. 20+ years of expertise in Total Quality Management, Business Strategy, and Organizational Development."
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-20">
          {/* Hero Section for Consultancy */}
          <section className="py-24 bg-primary text-primary-foreground">
            <div className="container-wide">
              <div className="max-w-3xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-px bg-accent" />
                  <span className="text-sm font-medium text-accent uppercase tracking-widest">
                    Strategic Consultancy
                  </span>
                </div>
                <h1 className="heading-serif text-4xl md:text-5xl lg:text-6xl mb-6">
                  Transforming Organizations Through Strategic Excellence
                </h1>
                <p className="text-xl text-primary-foreground/80 leading-relaxed">
                  For organizations seeking deep, sustainable transformation, LMDA offers comprehensive consultancy services backed by 20+ years of proven methodologies.
                </p>
              </div>
            </div>
          </section>

          <About />
          <Process />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Consultancy;
