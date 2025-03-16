import clsx from 'clsx';
import React from 'react';
import { Controller, Control, FieldValues, Path } from 'react-hook-form';

interface TextInputProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  placeholder?: string;
  className?: string;
}

export const TextInput = <T extends FieldValues>({
  name,
  control,
  label,
  placeholder = 'Enter text...',
  className = '',
}: TextInputProps<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <div className={clsx('w-full', className)}>
          {label && (
            <label className="block mb-1 text-sm font-medium text-gray-400">
              {label}
            </label>
          )}

          <input
            {...field}
            className={clsx(
              'w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2',
              error
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:ring-blue-500'
            )}
            placeholder={label || placeholder}
            type="text"
          />

          {error && (
            <p className="mt-1 text-sm text-red-500">{error.message}</p>
          )}
        </div>
      )}
    />
  );
};
