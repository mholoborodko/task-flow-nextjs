import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
} from '@floating-ui/react';
import clsx from 'clsx';
import { format, parse } from 'date-fns';
import React, { useState, useRef, useEffect } from 'react';
import { DayPicker } from 'react-day-picker';
import { Controller, Control, FieldValues, Path } from 'react-hook-form';

import 'react-day-picker/dist/style.css';
import { DateFormat } from '@/constants';

import { Icon } from './Icon';

interface DateFieldProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  className?: string;
  isDisabled?: boolean;
}

export const DateField = <T extends FieldValues>({
  name,
  control,
  label,
  className = '',
  isDisabled = false,
}: DateFieldProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { x, y, refs, strategy } = useFloating({
    placement: 'bottom-start',
    middleware: [offset(8), flip(), shift()],
    whileElementsMounted: autoUpdate,
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => {
        const selectedDate = field.value
          ? parse(field.value, DateFormat.YMD, new Date())
          : undefined;

        return (
          <div ref={wrapperRef} className={clsx('relative w-full', className)}>
            {label && (
              <label className="block mb-1 text-sm font-medium text-gray-400">
                {label}
              </label>
            )}
            <div
              ref={refs.setReference}
              className={clsx(
                'w-full flex items-center justify-between border rounded-md p-2 bg-white cursor-pointer shadow-sm',
                isDisabled
                  ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                  : 'hover:border-gray-400',
                error ? 'border-red-500' : 'border-gray-300'
              )}
              onClick={() => !isDisabled && setIsOpen(!isOpen)}
            >
              <span
                className={clsx(
                  selectedDate ? 'text-gray-900' : 'text-gray-400'
                )}
              >
                {selectedDate
                  ? format(selectedDate, DateFormat.MDY)
                  : 'Select date'}
              </span>
              <div className="flex items-center gap-2">
                {selectedDate && (
                  <button
                    className="flex-center text-gray-400 hover:text-gray-600"
                    type="button"
                    onClick={e => {
                      e.stopPropagation();
                      field.onChange(null);
                    }}
                  >
                    <Icon name="close" size={12} />
                  </button>
                )}
                <Icon className="text-gray-300" name="chevron-down" size={20} />
              </div>
            </div>
            {isOpen && (
              <div
                ref={refs.setFloating}
                className="bg-white border border-gray-300 rounded-md shadow-lg p-2"
                style={{ position: strategy, top: y ?? 0, left: x ?? 0 }}
              >
                <DayPicker
                  mode="single"
                  selected={selectedDate}
                  onSelect={date => {
                    field.onChange(date ? format(date, DateFormat.YMD) : null);
                    setIsOpen(false);
                  }}
                />
              </div>
            )}
            {error && (
              <p className="mt-1 text-sm text-red-500">{error.message}</p>
            )}
          </div>
        );
      }}
    />
  );
};
