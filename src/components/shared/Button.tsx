import clsx from 'clsx';
import React, { ReactNode } from 'react';

export enum ButtonVariant {
  PRIMARY = 'PRIMARY',
  SECONDARY = 'SECONDARY',
  SUCCESS = 'SUCCESS',
  WARNING = 'WARNING',
  DANGER = 'DANGER',
}

type ButtonProps = {
  label: ReactNode;
  variant?: ButtonVariant;
  onClick?: () => void;
  className?: string;
  isLoading?: boolean;
  disabled?: boolean;
};

const buttonStyles: Record<ButtonVariant, string> = {
  [ButtonVariant.PRIMARY]:
    'bg-blue-500 hover:bg-blue-600 text-white disabled:bg-blue-300',
  [ButtonVariant.SECONDARY]:
    'bg-gray-200 hover:bg-gray-300 text-black disabled:bg-gray-200',
  [ButtonVariant.SUCCESS]:
    'bg-green-500 hover:bg-green-600 text-white disabled:bg-green-300',
  [ButtonVariant.WARNING]:
    'bg-yellow-500 hover:bg-yellow-600 text-black disabled:bg-yellow-300',
  [ButtonVariant.DANGER]:
    'bg-red-500 hover:bg-red-600 text-white disabled:bg-red-300',
};

export const Button: React.FC<ButtonProps> = ({
  label,
  variant = ButtonVariant.PRIMARY,
  onClick,
  className = '',
  isLoading = false,
  disabled = false,
}) => {
  return (
    <button
      className={clsx(
        'px-4 py-2 rounded-md transition flex items-center justify-center font-semibold',
        'disabled:cursor-not-allowed disabled:opacity-50',
        buttonStyles[variant],
        className
      )}
      disabled={isLoading || disabled}
      onClick={!isLoading && !disabled ? onClick : undefined}
    >
      {isLoading && (
        <svg
          className="animate-spin h-5 w-5 mr-2 text-white"
          fill="none"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            d="M4 12a8 8 0 018-8v4l3-3m-3 3l-3-3"
            fill="currentColor"
          />
        </svg>
      )}
      {typeof label === 'string' ? (
        <span>{label}</span>
      ) : (
        <span className="flex items-center">{label}</span>
      )}
    </button>
  );
};
