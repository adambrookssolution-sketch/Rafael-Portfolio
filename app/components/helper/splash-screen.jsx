'use client';

import { useEffect, useState } from 'react';

function SplashScreen({ onComplete }) {
  const [isVisible, setIsVisible] = useState(true);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    // Start exit animation after 2.5 seconds
    const animationTimer = setTimeout(() => {
      setIsAnimating(false);
    }, 2500);

    // Complete and remove splash screen after 3 seconds
    const completeTimer = setTimeout(() => {
      setIsVisible(false);
      onComplete?.();
    }, 3000);

    return () => {
      clearTimeout(animationTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-[10000] flex items-center justify-center bg-[#0d1224] transition-opacity duration-500 ${
        !isAnimating ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="text-center">
        {/* Animated Logo/Name */}
        <div className="relative">
          {/* Glowing background effect */}
          <div className="absolute inset-0 blur-3xl opacity-30">
            <div className="w-full h-full bg-gradient-to-r from-pink-500 via-violet-600 to-cyan-400 rounded-full animate-pulse"></div>
          </div>

          {/* Main text with animation */}
          <h1 className="relative text-5xl md:text-7xl lg:text-8xl font-bold tracking-wider">
            <span className="inline-block animate-slide-up opacity-0" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-600">R</span>
            </span>
            <span className="inline-block animate-slide-up opacity-0" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-cyan-400">A</span>
            </span>
            <span className="inline-block animate-slide-up opacity-0" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-500">F</span>
            </span>
            <span className="inline-block animate-slide-up opacity-0" style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-600">A</span>
            </span>
            <span className="inline-block animate-slide-up opacity-0" style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-cyan-400">E</span>
            </span>
            <span className="inline-block animate-slide-up opacity-0" style={{ animationDelay: '0.7s', animationFillMode: 'forwards' }}>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-500">L</span>
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-lg md:text-xl text-[#16f2b3] tracking-[0.3em] uppercase animate-fade-in opacity-0" style={{ animationDelay: '1s', animationFillMode: 'forwards' }}>
            Full Stack Developer
          </p>

          {/* Loading bar */}
          <div className="mt-8 w-48 h-1 mx-auto bg-[#1a1443] rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-pink-500 via-violet-600 to-cyan-400 rounded-full animate-loading-bar"></div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-up {
          0% {
            opacity: 0;
            transform: translateY(40px) scale(0.8);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes fade-in {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }

        @keyframes loading-bar {
          0% {
            width: 0%;
          }
          100% {
            width: 100%;
          }
        }

        .animate-slide-up {
          animation: slide-up 0.6s ease-out;
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }

        .animate-loading-bar {
          animation: loading-bar 2.5s ease-out;
        }
      `}</style>
    </div>
  );
}

export default SplashScreen;
