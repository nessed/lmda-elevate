import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import ProductGrid from "@/components/ProductGrid";
import Trainers from "@/components/Trainers";
import CorporateBanner from "@/components/CorporateBanner";
import Achievements from "@/components/Achievements";
import Footer from "@/components/Footer";
import WhatsAppCTA from "@/components/WhatsAppCTA";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>LMDA | Premier Sales & Leadership Training Pakistan</title>
        <meta
          name="description"
          content="Elevate your career with elite workshops by Prof. Dr. Ali Sajid (PhD USA). Official PEC Partner for Leadership & Sales Training in Pakistan."
        />
        <meta
          name="keywords"
          content="LMDA, sales training, leadership training, professional certification, workshops, Pakistan, Prof Ali Sajid, PEC partner"
        />
        <meta property="og:title" content="LMDA | Premier Sales & Leadership Training" />
        <meta
          property="og:description"
          content="Elevate your career with elite workshops by Prof. Dr. Ali Sajid (PhD USA). Official PEC Partner."
        />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://lmda.pk" />
        
        {/* Structured Data: Organization */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "LMDA",
            "alternateName": "Leadership and Management Development Associates",
            "url": "https://lmda.pk",
            "logo": "https://lmda.pk/assets/lmda-logo.webp",
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+92-310-3336485",
              "contactType": "customer service",
              "areaServed": "PK",
              "availableLanguage": ["English", "Urdu"]
            },
            "sameAs": [
              "https://www.facebook.com/lmdapk/",
              "https://www.instagram.com/lmda.pk/",
              "https://www.youtube.com/channel/UCL2--Q8WKieUyBDdp4C_w-Q"
            ]
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <Hero />
          <TrustBar />
          <ProductGrid />
          <CorporateBanner />
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
