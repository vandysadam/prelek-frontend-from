import React, { useState, useEffect, ChangeEvent } from 'react';
import { Input } from '@/components/ui/input'; // Assuming you're using shadcn Input component

interface DebounceInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  value: string | number;
  debounce?: number;
  onChange: (value: string | number) => void; // Custom onChange handler
}

const DebounceInput: React.FC<DebounceInputProps> = ({
  value,
  debounce = 500,
  onChange,
  ...props
}) => {
  const [localValue, setLocalValue] = useState<string | number>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      onChange(localValue); // Call the custom onChange handler after debounce
    }, debounce);

    return () => {
      clearTimeout(handler); // Clear the timeout on cleanup
    };
  }, [localValue, debounce, onChange]);

  useEffect(() => {
    setLocalValue(value); // Update local state when parent value changes
  }, [value]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLocalValue(e.target.value); // Handle the input's native onChange event
  };

  return (
    <Input
      value={localValue}
      onChange={handleChange} // Standard event handler for native input
      {...props}
    />
  );
};

export default DebounceInput;
