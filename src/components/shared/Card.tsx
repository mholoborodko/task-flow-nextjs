import clsx from 'clsx';
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={clsx('bg-white p-4 rounded-lg shadow-md', className)}>
      {children}
    </div>
  );
};
