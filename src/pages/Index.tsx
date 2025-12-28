import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import Process from "@/components/Process";
import Trainers from "@/components/Trainers";
import Achievements from "@/components/Achievements";
import Footer from "@/components/Footer";
import content from "@/data/content.json";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>LMDA - Leadership and Management Development Associates | Lahore</title>
        <meta
          name="description"
          content="LMDA is an elite management training and consulting firm specializing in Total Quality Management, Leadership Development, and Business Strategy. World-class customized in-house training at your doorstep."
        />
        <meta
          name="keywords"
          content="LMDA, management training, leadership development, corporate training, TQM, Lahore, Pakistan, consulting"
        />
        <meta property="og:title" content="LMDA - Making Business More Effective" />
        <meta
          property="og:description"
          content="Elite management training and consulting firm with fully integrated capabilities in Total Quality Management, Business Strategy, and Strategic Planning."
        />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://lmda.pk" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <Hero />
          <TrustBar />
          <Process />
          <Trainers />
          <Achievements />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
