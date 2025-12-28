import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import ProductGrid from "@/components/ProductGrid";
import Trainers from "@/components/Trainers";
import Achievements from "@/components/Achievements";
import Footer from "@/components/Footer";
import WhatsAppCTA from "@/components/WhatsAppCTA";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>LMDA - Pakistan's Premier Sales & Leadership Training Ecosystem</title>
        <meta
          name="description"
          content="Transform your career with world-class training programs. Free Power Talks, Specialized Workshops, and Professional Certifications led by Prof. Ali Sajid (PhD USA, T.I.)."
        />
        <meta
          name="keywords"
          content="LMDA, sales training, leadership training, professional certification, workshops, Pakistan, Prof Ali Sajid, PEC partner"
        />
        <meta property="og:title" content="LMDA - Pakistan's Premier Training Ecosystem" />
        <meta
          property="og:description"
          content="Free Power Talks, Specialized Workshops, and Professional Certifications for career transformation."
        />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://lmda.pk" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <Hero />
          <TrustBar />
          <ProductGrid />
          <Trainers />
          <Achievements />
        </main>
        <Footer />
        <WhatsAppCTA />
      </div>
    </>
  );
};

export default Index;
