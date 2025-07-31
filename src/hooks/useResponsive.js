'use client';
import { useState, useEffect } from 'react';

const useResponsive = (breakpoint = 640) => {
  const [isMobile, setIsMobile] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      setWindowSize({ width, height });
      setIsMobile(width < breakpoint);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, [breakpoint]);

  return {
    isMobile,
    isDesktop: !isMobile,
    windowSize,
    isTablet: windowSize.width >= 640 && windowSize.width < 1024,
    isLarge: windowSize.width >= 1024
  };
};

export default useResponsive;