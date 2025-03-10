'use client';

import React from 'react';

export enum ButtonVariant {
  PRIMARY = 'PRIMARY',
  SECONDARY = 'SECONDARY',
  OUTLINE = 'OUTLINE',
}

type ButtonProps = {
  children: React.ReactNode;
  variant?: ButtonVariant;
  onClick?: () => void;
  className?: string;
};

const buttonStyles: Record<ButtonVariant, string> = {
  [ButtonVariant.PRIMARY]: 'bg-blue-600 hover:bg-blue-700 text-white',
  [ButtonVariant.SECONDARY]: 'bg-gray-600 hover:bg-gray-700 text-white',
  [ButtonVariant.OUTLINE]:
    'border border-gray-600 text-gray-600 hover:bg-gray-100',
};

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = ButtonVariant.PRIMARY,
  onClick,
  className = '',
}) => {
  return (
    <button
      className={`px-4 py-2 rounded-md transition ${buttonStyles[variant]} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
