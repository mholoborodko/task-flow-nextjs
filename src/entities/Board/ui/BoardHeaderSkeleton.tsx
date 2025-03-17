import React from 'react';

export const BoardHeaderSkeleton = () => {
  return (
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 bg-gray-300 rounded-md animate-pulse" />
      <div className="w-40 h-8 bg-gray-300 rounded-md animate-pulse" />
    </div>
  );
};

export default BoardHeaderSkeleton;
