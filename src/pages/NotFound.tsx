import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>Page Not Found - LMDA</title>
      </Helmet>
      <div className="min-h-screen bg-primary flex flex-col items-center justify-center p-4 text-center">
        <div className="bg-secondary/5 rounded-2xl p-10 border border-border/10 max-w-lg w-full">
          <h1 className="text-8xl font-serif text-accent font-bold mb-4 opacity-50">404</h1>
          <h2 className="text-3xl font-bold text-white mb-4">Page Not Found</h2>
          <p className="text-white/60 mb-8 text-lg">
            The page you are looking for does not exist or has been moved.
          </p>
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 btn-gold px-8 py-3 rounded-md"
          >
            <ArrowLeft className="w-4 h-4" />
            Return Home
          </Link>
        </div>
      </div>
    </>
  );
};

export default NotFound;
