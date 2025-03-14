import {
  useFloating,
  offset,
  flip,
  shift,
  autoUpdate,
} from '@floating-ui/react-dom';
import clsx from 'clsx';
import { useState, useEffect, useRef, ReactNode } from 'react';

export interface DropdownOption {
  label: string;
  onSelect?: () => void;
  className?: string;
  subOptions?: DropdownOption[];
}

export interface DropdownProps {
  options: DropdownOption[];
  children: ReactNode | (({ isOpen }: { isOpen: boolean }) => ReactNode);
  width?: string;
}

export const Dropdown: React.FC<DropdownProps> = ({
  options,
  children,
  width = '12rem',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { refs, floatingStyles } = useFloating({
    placement: 'bottom-end',
    middleware: [offset(6), flip(), shift()],
    whileElementsMounted: autoUpdate,
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const closeDropdown = () => setIsOpen(false);

  return (
    <div ref={dropdownRef} className="relative inline-block">
      <div ref={refs.setReference} onClick={() => setIsOpen(prev => !prev)}>
        {typeof children === 'function' ? children({ isOpen }) : children}
      </div>

      {isOpen && (
        <div
          ref={refs.setFloating}
          className="absolute bg-white border shadow-md rounded-md py-1 z-50"
          style={{ ...floatingStyles, width }}
        >
          {options.map(({ label, onSelect, className, subOptions }, index) => (
            <DropdownItem
              key={index}
              className={className}
              closeDropdown={closeDropdown}
              label={label}
              subOptions={subOptions}
              onSelect={() => {
                if (onSelect) onSelect();
                closeDropdown();
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const DropdownItem: React.FC<
  DropdownOption & { onSelect: () => void; closeDropdown: () => void }
> = ({ label, onSelect, className, subOptions, closeDropdown }) => {
  const [isSubOpen, setIsSubOpen] = useState(false);
  const itemRef = useRef<HTMLDivElement>(null);
  const { refs, floatingStyles } = useFloating({
    placement: 'right-start',
    middleware: [offset(6), flip(), shift()],
    whileElementsMounted: autoUpdate,
  });

  return (
    <div
      ref={itemRef}
      className={clsx(
        'relative px-4 py-2 hover:bg-gray-100 cursor-pointer flex justify-between items-center',
        className
      )}
      onClick={e => {
        e.stopPropagation();
        onSelect();
        closeDropdown();
      }}
      onMouseEnter={() => subOptions && setIsSubOpen(true)}
      onMouseLeave={() => subOptions && setIsSubOpen(false)}
    >
      <span className="font-semibold">{label}</span>
      {subOptions && <span className="ml-2 text-xs">{'▶'}</span>}
      {subOptions && isSubOpen && (
        <div
          ref={refs.setFloating}
          className="absolute left-full top-0 bg-white border shadow-md rounded-md py-1 w-40 z-50"
          style={floatingStyles}
        >
          {subOptions.map((subOption, index) => (
            <DropdownItem
              key={index}
              {...subOption}
              closeDropdown={closeDropdown}
              onSelect={subOption.onSelect || (() => {})}
            />
          ))}
        </div>
      )}
    </div>
  );
};
