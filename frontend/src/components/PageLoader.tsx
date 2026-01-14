import { useState, useEffect } from 'react';
import LoadingSpinner from './LoadingSpinner';

interface PageLoaderProps {
  isLoading: boolean;
  children: React.ReactNode;
}

const PageLoader = ({ isLoading, children }: PageLoaderProps) => {
  const [showLoader, setShowLoader] = useState(isLoading);

  useEffect(() => {
    if (isLoading) {
      setShowLoader(true);
    } else {
      // Add a small delay to ensure smooth transition
      const timer = setTimeout(() => setShowLoader(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  return (
    <div className="relative">
      {children}
      {showLoader && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center animate-fade-in">
          <div className="text-center space-y-4">
            <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <LoadingSpinner size="large" />
            </div>
            <h2 className="text-xl font-semibold text-foreground">Loading...</h2>
            <p className="text-sm text-muted-foreground">Preparing your content</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PageLoader;