import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

const PageTransition = () => {
  const location = useLocation();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [direction, setDirection] = useState<'enter' | 'exit'>('enter');

  useEffect(() => {
    setDirection('exit');
    setIsTransitioning(true);

    const timer = setTimeout(() => {
      setDirection('enter');
    }, 200);

    const timer2 = setTimeout(() => {
      setIsTransitioning(false);
    }, 400);

    return () => {
      clearTimeout(timer);
      clearTimeout(timer2);
    };
  }, [location.pathname]);

  return (
    <div className="min-h-screen">
      <div
        className={`transition-all duration-400 ease-in-out ${isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}
        style={{
          animationFillMode: 'both',
        }}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default PageTransition;