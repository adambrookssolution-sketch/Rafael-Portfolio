// @flow strict
import Image from 'next/image';

function PortfolioCard({ item, onOpen }) {
  return (
    <div
      className="border border-[#1d293a] hover:border-[#464c6a] transition-all duration-500 bg-[#1b203e] rounded-lg relative group cursor-pointer"
      onClick={() => onOpen(item)}
    >
      <div className="h-44 lg:h-52 w-auto overflow-hidden rounded-t-lg relative">
        <Image
          src={item.images[0]}
          height={1080}
          width={1920}
          alt={item.title}
          className='h-full w-full object-cover group-hover:scale-110 transition-all duration-300'
        />
        {/* Image count badge */}
        {item.images.length > 1 && (
          <div className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {item.images.length}
          </div>
        )}
      </div>
      <div className="p-2 sm:p-3 flex flex-col">
        <div className="flex justify-between items-center text-[#16f2b3] text-sm">
          <span className="bg-[#0d1224] px-2 py-1 rounded-full text-xs">{item.category}</span>
        </div>
        <p className='my-2 lg:my-3 text-lg text-white sm:text-xl font-medium hover:text-violet-500'>
          {item.title}
        </p>
        <p className='text-sm lg:text-base text-[#d3d8e8] pb-3 line-clamp-2'>
          {item.description}
        </p>
        <div className="flex flex-wrap gap-1 mt-auto">
          {item.tags.map((tag, index) => (
            <span key={index} className="bg-[#0d1224] text-[#16f2b3] px-2 py-1 rounded text-xs">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PortfolioCard;
