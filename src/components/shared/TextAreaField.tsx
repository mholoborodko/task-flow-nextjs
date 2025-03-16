import clsx from 'clsx';
import React from 'react';
import { Controller, Control, FieldValues, Path } from 'react-hook-form';

interface TextAreaFieldProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  placeholder?: string;
  className?: string;
  maxLength?: number;
}

export const TextAreaField = <T extends FieldValues>({
  name,
  control,
  label,
  placeholder = 'Enter text...',
  className = '',
  maxLength = 200,
}: TextAreaFieldProps<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <div className={clsx('w-full relative', className)}>
          {label && (
            <label className="block mb-1 text-sm font-medium text-gray-400">
              {label}
            </label>
          )}
          <textarea
            {...field}
            className={clsx(
              'w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 resize-none',
              'border-gray-300 focus:ring-blue-500'
            )}
            maxLength={maxLength}
            placeholder={label || placeholder}
            rows={4}
          />
          <div className="text-sm text-gray-500 absolute right-0 -bottom-5">
            {field.value?.length || 0}/{maxLength}
          </div>
        </div>
      )}
    />
  );
};
