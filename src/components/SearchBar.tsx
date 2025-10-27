import { Search } from 'lucide-react';
import { useState } from 'react';

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (value: string) => void;
}

export function SearchBar({ placeholder = 'Search apps or extensions', onSearch }: SearchBarProps) {
  const [value, setValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    onSearch?.(e.target.value);
  };

  return (
    <div
      className={`flex items-center gap-3 h-12 px-4 bg-[var(--bg-surface)] border rounded-xl transition-all ${
        isFocused
          ? 'border-[var(--brand)] ring-2 ring-[var(--focus-ring)] ring-opacity-50'
          : 'border-[var(--divider)] hover:border-[var(--brand-strong)]'
      }`}
      style={{ boxShadow: '0 6px 20px 0 rgba(0,0,0,0.08)' }}
    >
      <Search className="w-5 h-5 text-[var(--text-secondary)]" />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="flex-1 bg-transparent outline-none text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]"
      />
    </div>
  );
}
