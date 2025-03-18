import clsx from 'clsx';
import React from 'react';

export const BoardSkeleton = () => {
  return (
    <div className="mt-7 flex gap-4 min-h-screen">
      {Array(3)
        .fill(null)
        .map((_, index) => (
          <div
            key={index}
            className={clsx('flex-1 bg-gray-200 rounded-2xl p-4 animate-pulse')}
          >
            <div className="h-6 w-2/3 bg-gray-300 rounded-md mb-4" />
            {Array(8)
              .fill(null)
              .map((_, i) => (
                <div key={i} className="h-24 bg-gray-300 rounded-lg mb-3" />
              ))}
          </div>
        ))}
    </div>
  );
};

export default BoardSkeleton;
