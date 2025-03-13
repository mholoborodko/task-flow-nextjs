'use client';

import clsx from 'clsx';
import { FC } from 'react';

interface LoaderProps {
  size?: number;
  className?: string;
}

export const Loader: FC<LoaderProps> = ({ size = 24, className }) => {
  return (
    <div
      className={clsx(
        'inline-block animate-spin rounded-full border-4 border-solid border-gray-300 border-t-blue-500',
        className
      )}
      style={{ width: size, height: size }}
    />
  );
};

export default Loader;
