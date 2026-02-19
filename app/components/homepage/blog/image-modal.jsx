'use client';
import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';

function ImageModal({ item, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % item.images.length);
  }, [item.images.length]);

  const goPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + item.images.length) % item.images.length);
  }, [item.images.length]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose, goNext, goPrev]);

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-6xl mx-4 flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white/70 hover:text-white text-3xl z-10 transition-colors cursor-pointer"
          aria-label="Close"
        >
          &#10005;
        </button>

        {/* Image counter */}
        <div className="absolute -top-12 left-0 text-white/70 text-sm">
          {currentIndex + 1} / {item.images.length}
        </div>

        {/* Main image area */}
        <div className="relative w-full aspect-video bg-[#0d1224] rounded-lg overflow-hidden">
          <Image
            src={item.images[currentIndex]}
            alt={`${item.title} - Screenshot ${currentIndex + 1}`}
            fill
            className="object-contain"
            sizes="(max-width: 1200px) 100vw, 1200px"
            priority
          />

          {/* Left arrow */}
          {item.images.length > 1 && (
            <button
              onClick={goPrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/80 text-white rounded-full flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Previous image"
            >
              &#10094;
            </button>
          )}

          {/* Right arrow */}
          {item.images.length > 1 && (
            <button
              onClick={goNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/80 text-white rounded-full flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Next image"
            >
              &#10095;
            </button>
          )}
        </div>

        {/* Thumbnail strip */}
        {item.images.length > 1 && (
          <div className="flex gap-2 mt-4 overflow-x-auto pb-2 max-w-full">
            {item.images.map((img, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`relative w-16 h-10 md:w-20 md:h-12 rounded overflow-hidden flex-shrink-0 border-2 transition-all cursor-pointer ${
                  index === currentIndex
                    ? 'border-[#16f2b3] opacity-100'
                    : 'border-transparent opacity-50 hover:opacity-80'
                }`}
              >
                <Image
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </button>
            ))}
          </div>
        )}

        {/* Project info */}
        <div className="mt-4 w-full text-center">
          <h3 className="text-white text-xl font-semibold">{item.title}</h3>
          <p className="text-[#d3d8e8] text-sm mt-1 max-w-2xl mx-auto line-clamp-2">
            {item.description}
          </p>
          <div className="flex flex-wrap gap-1 justify-center mt-3">
            {item.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-[#1b203e] text-[#16f2b3] px-2 py-1 rounded text-xs"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImageModal;
