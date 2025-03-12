import React from 'react';

import { Icon } from './Icon';

interface EmptyStateProps {
  message: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-10">
      <div className="flex-center w-[100px] h-[100px] bg-gray-200 rounded-[50%]">
        <Icon className="text-red-300" name="list" size={35} />
      </div>
      <p className="mt-2 text-gray-500 text-md">{message}</p>
    </div>
  );
};
