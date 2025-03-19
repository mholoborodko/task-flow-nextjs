import React from 'react';

export const BoardListSkeleton = () => {
  return (
    <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
      {Array(20)
        .fill(null)
        .map((_, index) => (
          <div
            key={index}
            className="w-full h-[188px] bg-gray-300 rounded-lg animate-pulse"
          />
        ))}
    </div>
  );
};

export default BoardListSkeleton;
