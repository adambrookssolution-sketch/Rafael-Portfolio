'use client';

import { useState } from 'react';

function ExternalLink({ href, children, className, allowedDomains = ['github.com'] }) {
  const [showModal, setShowModal] = useState(false);

  const isAllowed = allowedDomains.some(domain => href?.includes(domain));

  const handleClick = (e) => {
    if (isAllowed) {
      return; // Allow GitHub links
    }

    e.preventDefault();
    setShowModal(true);

    // Auto close after 3 seconds
    setTimeout(() => {
      setShowModal(false);
    }, 3000);
  };

  return (
    <>
      <a
        href={isAllowed ? href : '#'}
        target={isAllowed ? '_blank' : '_self'}
        rel={isAllowed ? 'noopener noreferrer' : ''}
        className={className}
        onClick={handleClick}
      >
        {children}
      </a>

      {showModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-[#1b203e] border border-[#464c6a] rounded-xl p-8 max-w-md mx-4 text-center animate-fade-in">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-pink-500 to-violet-600 flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Under Maintenance</h3>
            <p className="text-gray-400 mb-4">This link is currently being updated. Please check back later or contact me directly.</p>
            <button
              onClick={() => setShowModal(false)}
              className="px-6 py-2 bg-gradient-to-r from-pink-500 to-violet-600 text-white rounded-full font-medium hover:opacity-90 transition-opacity"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default ExternalLink;
