import { Grid, List } from 'lucide-react';

interface ViewToggleProps {
  view: 'grid' | 'list';
  onViewChange: (view: 'grid' | 'list') => void;
}

export function ViewToggle({ view, onViewChange }: ViewToggleProps) {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => onViewChange('grid')}
        className={`p-2 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] ${
          view === 'grid'
            ? 'text-[var(--brand)]'
            : 'text-[var(--text-secondary)] hover:text-[var(--brand)]'
        }`}
        aria-label="Grid view"
        aria-pressed={view === 'grid'}
      >
        <Grid className="w-4 h-4" />
      </button>
      <button
        onClick={() => onViewChange('list')}
        className={`p-2 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] ${
          view === 'list'
            ? 'text-[var(--brand)]'
            : 'text-[var(--text-secondary)] hover:text-[var(--brand)]'
        }`}
        aria-label="List view"
        aria-pressed={view === 'list'}
      >
        <List className="w-4 h-4" />
      </button>
    </div>
  );
}
