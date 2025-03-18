'use client';

import clsx from 'clsx';
import React from 'react';
import Drawer from 'react-modern-drawer';
import 'react-modern-drawer/dist/index.css';

import { Icon } from './Icon';

interface SideDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  className?: string;
  width?: string;
}

export const SideDrawer: React.FC<SideDrawerProps> = ({
  isOpen,
  onClose,
  children,
  title,
  className,
  width = '24rem',
}) => {
  return (
    <Drawer
      enableOverlay
      lockBackgroundScroll
      className={clsx('p-5 h-screen bg-white shadow-xl', className)}
      direction="right"
      open={isOpen}
      style={{ width }}
      onClose={onClose}
    >
      <div className="flex items-center justify-between mb-4">
        {title && <h2 className="text-lg font-semibold">{title}</h2>}
        <button
          className="text-gray-500 hover:text-gray-700"
          onClick={e => {
            e.stopPropagation();
            onClose();
          }}
        >
          <Icon name="close" size={24} />
        </button>
      </div>
      <hr className="border-t border-gray-200 my-4" />
      <div className="flex-1 overflow-y-auto">{children}</div>
    </Drawer>
  );
};

export default SideDrawer;
