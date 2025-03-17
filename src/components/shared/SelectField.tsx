import clsx from 'clsx';
import React from 'react';
import { Controller, Control, FieldValues, Path } from 'react-hook-form';
import Select, { StylesConfig } from 'react-select';

export type SelectOption = { label: string; value: string };

interface SelectFieldProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  options: SelectOption[];
  placeholder?: string;
  className?: string;
  isDisabled?: boolean;
}

const getCustomStyles = (
  hasError: boolean
): StylesConfig<SelectOption, false> => ({
  control: (base, { isFocused }) => ({
    ...base,
    borderColor: hasError ? 'rgb(239 68 68)' : 'rgb(209 213 219)',
    '&:hover': {
      borderColor: hasError ? 'rgb(220 38 38)' : 'rgb(156 163 175)',
    },
    boxShadow: isFocused
      ? hasError
        ? '0 0 0 2px rgba(239, 68, 68, 0.5)'
        : '0 0 0 2px rgba(59, 130, 246, 0.5)'
      : 'none',
  }),
  placeholder: base => ({
    ...base,
    color: 'rgb(156 163 175)',
  }),
});

export const SelectField = <T extends FieldValues>({
  name,
  control,
  label,
  options,
  placeholder = 'Select...',
  className = '',
  isDisabled = false,
}: SelectFieldProps<T>) => {
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
          <Select
            {...field}
            isClearable
            isSearchable
            className="w-full"
            classNamePrefix="react-select"
            isDisabled={isDisabled}
            options={options}
            placeholder={placeholder}
            styles={getCustomStyles(!!error)}
            value={options.find(opt => opt.value === field.value) || null}
            onChange={val => field.onChange(val ? val.value : null)}
          />
          {error && (
            <p className="mt-1 text-sm text-red-500">{error.message}</p>
          )}
        </div>
      )}
    />
  );
};
