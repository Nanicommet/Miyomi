import { SearchBar } from '../components/SearchBar';
import { FilterChip } from '../components/FilterChip';
import { WebsiteGridCard } from '../components/WebsiteGridCard';
import { ViewToggle } from '../components/ViewToggle';
import { Globe, ExternalLink } from 'lucide-react';
import { useMemo, useState } from 'react';
import { websites } from '../data';
import { FeedbackPanel } from '../components/FeedbackPanel';
import { FeedbackTrigger } from '../components/FeedbackTrigger';
import { useFeedbackState } from '../hooks/useFeedbackState';
import { AnimatePresence } from 'motion/react';

export function WebsitesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const { isFeedbackOpen, handleToggle, handleClose } = useFeedbackState();

  const categoryOrder = ['Manga', 'Anime', 'Light Novel', 'Tracker', 'Community'] as const;
  const categories = ['All', ...categoryOrder];

  const filteredWebsites = useMemo(() => {
    return websites.filter((site) => {
      if (selectedCategory !== 'All' && site.category !== selectedCategory) return false;
      if (searchQuery) {
        const term = searchQuery.toLowerCase();
        if (
          !site.name.toLowerCase().includes(term) &&
          !site.description.toLowerCase().includes(term) &&
          !(site.keywords ?? []).some((keyword) => keyword.toLowerCase().includes(term))
        ) {
          return false;
        }
      }
      return true;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <div className="flex items-center gap-3">
          <h1
            className="text-[var(--text-primary)] font-['Poppins',sans-serif]"
            style={{ fontSize: 'clamp(28px, 5vw, 40px)', lineHeight: '1.2', fontWeight: 700 }}
          >
            Websites
          </h1>
          <FeedbackTrigger isOpen={isFeedbackOpen} onToggle={handleToggle} title="Websites" />
        </div>
        <p className="text-[var(--text-secondary)] font-['Inter',sans-serif]" style={{ fontSize: '16px' }}>
          Useful websites for manga, anime, light novels, and community resources.
        </p>
      </div>

      {/* Inline Feedback Panel */}
      <AnimatePresence>
        {isFeedbackOpen && (
          <div className="mb-8">
            <FeedbackPanel page="websites" onClose={handleClose} />
          </div>
        )}
      </AnimatePresence>

      {/* Search, View Toggle, and Filters */}
      <div className="flex flex-col gap-4 mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <SearchBar placeholder="Search websites..." onSearch={setSearchQuery} />
          </div>
          <ViewToggle view={view} onViewChange={setView} />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((category) => (
            <FilterChip
              key={category}
              label={category}
              selected={selectedCategory === category}
              onClick={() => setSelectedCategory(category)}
            />
          ))}
        </div>
      </div>

      {/* Websites Display */}
      {filteredWebsites.length > 0 ? (
        view === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredWebsites.map((site, index) => (
              <WebsiteGridCard
                key={index}
                name={site.name}
                url={site.url}
                description={site.description}
                category={site.category}
                color={site.color}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-3 sm:gap-4">
            {filteredWebsites.map((site, index) => (
              <a
                key={index}
                href={site.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col sm:flex-row items-start gap-4 p-4 sm:p-6 bg-[var(--bg-surface)] border border-[var(--divider)] rounded-2xl hover:shadow-lg transition-all group"
                style={{ boxShadow: '0 6px 20px 0 rgba(0,0,0,0.08)' }}
              >
                <div
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center text-white flex-shrink-0"
                  style={{ backgroundColor: site.color }}
                >
                  <Globe className="w-6 h-6 sm:w-7 sm:h-7" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-['Inter',sans-serif] text-[var(--text-primary)]" style={{ fontWeight: 600, fontSize: '16px' }}>
                      {site.name}
                    </h3>
                    <ExternalLink className="w-4 h-4 text-[var(--brand)] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <p className="text-[var(--text-secondary)] font-['Inter',sans-serif] mb-2" style={{ fontSize: '14px' }}>
                    {site.description}
                  </p>
                  <span className="inline-block px-2 py-0.5 rounded-md text-xs bg-[var(--chip-bg)] text-[var(--text-secondary)] font-['Inter',sans-serif]" style={{ fontWeight: 500 }}>
                    {site.category}
                  </span>
                </div>
              </a>
            ))}
          </div>
        )
      ) : (
        <div className="text-center py-16 sm:py-24">
          <div className="text-6xl sm:text-8xl mb-6 opacity-50">🌐</div>
          <h3 className="text-[var(--text-primary)] font-['Poppins',sans-serif] mb-2" style={{ fontSize: '20px', fontWeight: 600 }}>
            No websites found
          </h3>
          <p className="text-[var(--text-secondary)] font-['Inter',sans-serif]">
            Try adjusting your filters or search query
          </p>
        </div>
      )}

      {/* Results Count */}
      {filteredWebsites.length > 0 && (
        <div className="mt-8 text-center text-[var(--text-secondary)] font-['Inter',sans-serif] text-sm">
          Showing {filteredWebsites.length} {filteredWebsites.length === 1 ? 'website' : 'websites'}
        </div>
      )}
    </div>
  );
}