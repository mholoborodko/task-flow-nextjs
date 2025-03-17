import clsx from 'clsx';
import React from 'react';

export const BoardSkeleton = () => {
  return (
    <div className="mt-7 grid grid-cols-3 gap-4 min-h-screen">
      {Array(3)
        .fill(null)
        .map((_, index) => (
          <div
            key={index}
            className={clsx(
              'w-full h-full bg-gray-300 rounded-md animate-pulse'
            )}
          />
        ))}
    </div>
  );
};

export default BoardSkeleton;
