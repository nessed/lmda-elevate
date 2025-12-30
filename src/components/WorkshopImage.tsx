import { useState } from "react";

interface WorkshopImageProps {
  src: string | null;
  alt: string;
  title: string;
  date?: string;
  price?: number | null;
  className?: string;
  aspectRatio?: "4/5" | "4/3" | "16/9" | "square";
}

/**
 * Robust image component that shows a branded fallback card
 * if the image fails to load from Supabase storage.
 */
const WorkshopImage = ({
  src,
  alt,
  title,
  date,
  price,
  className = "",
  aspectRatio = "4/5",
}: WorkshopImageProps) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const aspectClass = {
    "4/5": "aspect-[4/5]",
    "4/3": "aspect-[4/3]",
    "16/9": "aspect-video",
    "square": "aspect-square",
  }[aspectRatio];

  // Optimize image URL if it's from Supabase storage
  const optimizedSrc = src && src.includes("supabase.co/storage/v1/object/public/") 
    ? `${src}?format=webp&width=600&quality=70`
    : src;

  // If no src or error, show branded placeholder
  if (!optimizedSrc || hasError) {
    return (
      <div
        className={`${aspectClass} bg-gradient-to-br from-primary via-primary to-slate-800 flex flex-col items-center justify-center p-6 text-center ${className} border border-white/10`}
      >
        {/* LMDA Branding */}
        <div className="mb-4">
          <span className="text-4xl sm:text-5xl font-bold text-white/10 tracking-[0.3em]">
            LMDA
          </span>
        </div>

        {/* Workshop Info */}
        <div className="space-y-2 relative z-10">
          <h3 className="text-lg sm:text-xl font-serif font-bold text-white leading-tight line-clamp-2">
            {title}
          </h3>
          
          {date && (
            <p className="text-sm text-accent font-medium">
              {date}
            </p>
          )}
          
          {price !== undefined && price !== null && (
            <div className="mt-3 inline-block bg-accent px-4 py-1.5 shadow-lg">
              <span className="text-sm font-bold text-primary">
                PKR {price.toLocaleString()}
              </span>
            </div>
          )}
          
          {price === null && (
            <div className="mt-3 inline-block bg-green-500/20 border border-green-500/30 px-4 py-1.5">
              <span className="text-sm font-bold text-green-400">
                FREE
              </span>
            </div>
          )}
        </div>

        {/* Decorative elements */}
        <div className="absolute top-4 right-4 w-8 h-8 bg-accent/20 flex items-center justify-center">
          <div className="w-4 h-4 bg-accent/40" />
        </div>
      </div>
    );
  }

  return (
    <div className={`${aspectClass} relative overflow-hidden ${className}`}>
      {/* Loading shimmer */}
      {isLoading && (
        <div className="absolute inset-0 bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 animate-pulse" />
      )}
      
      <img
        src={optimizedSrc}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setHasError(true);
          setIsLoading(false);
        }}
        loading="lazy"
      />
    </div>
  );
};

export default WorkshopImage;
