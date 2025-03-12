'use client';

import clsx from 'clsx';
import React from 'react';

export type IconProps = {
  name: string;
  size?: number;
  className?: string;
};

export const Icon: React.FC<IconProps> = ({ name, size = 24, className }) => {
  return (
    <span
      className={clsx('inline-block', className)}
      style={{ width: size, height: size }}
    >
      <img
        alt={name}
        height={size}
        src={`/assets/icons/${name}.svg`}
        width={size}
      />
    </span>
  );
};
