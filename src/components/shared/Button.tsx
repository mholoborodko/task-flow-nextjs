import clsx from 'clsx';
import React from 'react';

export enum ButtonVariant {
  PRIMARY = 'PRIMARY',
  SECONDARY = 'SECONDARY',
  SUCCESS = 'SUCCESS',
  WARNING = 'WARNING',
  DANGER = 'DANGER',
}

type ButtonProps = {
  children: React.ReactNode;
  variant?: ButtonVariant;
  onClick?: () => void;
  className?: string;
};

const buttonStyles: Record<ButtonVariant, string> = {
  [ButtonVariant.PRIMARY]: 'bg-blue-500 hover:bg-blue-600 text-white',
  [ButtonVariant.SECONDARY]: 'bg-gray-500 hover:bg-gray-600 text-white',
  [ButtonVariant.SUCCESS]: 'bg-green-500 hover:bg-green-600 text-white',
  [ButtonVariant.WARNING]: 'bg-yellow-500 hover:bg-yellow-600 text-black',
  [ButtonVariant.DANGER]: 'bg-red-500 hover:bg-red-600 text-white',
};

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = ButtonVariant.PRIMARY,
  onClick,
  className = '',
}) => {
  return (
    <button
      className={clsx(
        `px-4 py-2 rounded-md transition ${buttonStyles[variant]}`,
        className
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
