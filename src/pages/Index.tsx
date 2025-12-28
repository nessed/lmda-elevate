import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import Trainers from "@/components/Trainers";
import Process from "@/components/Process";
import Achievements from "@/components/Achievements";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>LMDA - Leadership and Management Development Associates | Lahore</title>
        <meta
          name="description"
          content="20+ years of transforming corporate culture through strategic TQM & Leadership. Led by Prof. Ali Sajid (PhD USA, T.I.), LMDA delivers world-class in-house training."
        />
        <meta
          name="keywords"
          content="LMDA, management training, leadership development, corporate training, TQM, Lahore, Pakistan, consulting, Prof Ali Sajid"
        />
        <meta property="og:title" content="LMDA - Transforming Corporate Culture Through Strategic Leadership" />
        <meta
          property="og:description"
          content="20+ years of expertise in Total Quality Management, Business Strategy, and Leadership Development."
        />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://lmda.pk" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <Hero />
          <TrustBar />
          <Trainers />
          <Process />
          <Achievements />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
