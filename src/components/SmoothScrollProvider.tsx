import { useEffect } from 'react';
import { useLenis } from '@/lib/useLenis';

interface SmoothScrollProviderProps {
  children: React.ReactNode;
}

const SmoothScrollProvider = ({ children }: SmoothScrollProviderProps) => {
  useLenis();
  
  return <>{children}</>;
};

export default SmoothScrollProvider;
