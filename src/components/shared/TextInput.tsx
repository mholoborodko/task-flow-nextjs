'use client';

import clsx from 'clsx';
import React from 'react';

interface TextInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
}

export const TextInput: React.FC<TextInputProps> = ({
  value,
  onChange,
  placeholder = 'Enter text...',
  className = '',
}) => {
  return (
    <input
      className={clsx(
        'px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500',
        className
      )}
      placeholder={placeholder}
      type="text"
      value={value}
      onChange={onChange}
    />
  );
};
