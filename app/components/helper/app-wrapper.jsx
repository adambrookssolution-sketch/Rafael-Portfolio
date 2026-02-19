'use client';

import { useEffect, useState } from 'react';
import SplashScreen from './splash-screen';

function AppWrapper({ children }) {
  const [showSplash, setShowSplash] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Check if splash has been shown in this session
    const hasSeenSplash = sessionStorage.getItem('hasSeenSplash');
    if (hasSeenSplash) {
      setShowSplash(false);
      setIsLoaded(true);
    }
  }, []);

  const handleSplashComplete = () => {
    sessionStorage.setItem('hasSeenSplash', 'true');
    setShowSplash(false);
    setIsLoaded(true);
  };

  return (
    <>
      {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
      <div className={`transition-opacity duration-500 ${isLoaded || !showSplash ? 'opacity-100' : 'opacity-0'}`}>
        {children}
      </div>
    </>
  );
}

export default AppWrapper;
