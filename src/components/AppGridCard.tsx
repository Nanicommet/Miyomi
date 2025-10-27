import { TagBadge } from './TagBadge';
import { PlatformBadge } from './PlatformBadge';
import { Download } from 'lucide-react';
import { AppLogo } from './AppLogo';
import { motion } from 'motion/react';

interface AppGridCardProps {
  appId: string;
  name: string;
  description: string;
  tags: Array<'Manga' | 'Anime' | 'Light Novel' | 'Multi'>;
  platforms: Array<'Windows' | 'Mac' | 'Android' | 'iOS' | 'Linux' | 'Web'>;
  iconColor: string;
  logoUrl?: string;
  onClick?: () => void;
}

export function AppGridCard({
  appId,
  name,
  description,
  tags,
  platforms,
  iconColor,
  logoUrl,
  onClick,
}: AppGridCardProps) {
  const displayedTags = tags;
  const displayedPlatforms = platforms.slice(0, 3);
  const extraPlatforms = platforms.length - displayedPlatforms.length;
  const showPlatformDivider = displayedTags.length > 0 && platforms.length > 0;
  
  // Only use layoutId on desktop for morphing effect
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <motion.button
      layoutId={!isMobile ? `app-card-${appId}` : undefined}
      onClick={onClick}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
      className="p-4 sm:p-6 bg-[var(--bg-surface)] border border-[var(--divider)] rounded-2xl hover:shadow-lg hover:border-[var(--brand)] transition-all text-left w-full group"
      style={{ boxShadow: '0 6px 20px 0 rgba(0,0,0,0.08)' }}
    >
      {/* App Icon */}
      <div className="flex items-start gap-4 mb-4">
        <div className="flex-shrink-0 group-hover:scale-105 transition-transform">
          <AppLogo
            name={name}
            logoUrl={logoUrl}
            iconColor={iconColor}
            className="w-16 h-16"
            roundedClass="rounded-2xl"
            textClassName="text-2xl"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-['Inter',sans-serif] text-[var(--text-primary)] mb-1" style={{ fontWeight: 600, fontSize: '18px' }}>
            {name}
          </h3>
          <div className="flex items-center gap-1.5 flex-wrap">
            {displayedTags.map((tag, index) => (
              <TagBadge key={index} tag={tag} />
            ))}
            {showPlatformDivider && <span className="h-4 w-px bg-[var(--divider)]" aria-hidden="true"></span>}
            {displayedPlatforms.map((platform, index) => (
              <PlatformBadge key={`${platform}-${index}`} platform={platform} small />
            ))}
            {extraPlatforms > 0 && (
              <span className="text-[11px] text-[var(--text-secondary)] font-['Inter',sans-serif]" style={{ fontWeight: 500 }}>
                +{extraPlatforms}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="text-[var(--text-secondary)] font-['Inter',sans-serif] mb-4 line-clamp-2" style={{ fontSize: '14px' }}>
        {description}
      </p>

      {/* Download Button */}
      <div className="flex items-center justify-center gap-2 w-full px-4 py-2 rounded-xl bg-[var(--chip-bg)] group-hover:bg-[var(--brand)] text-[var(--brand)] group-hover:text-white transition-all">
        <Download className="w-4 h-4" />
        <span className="font-['Inter',sans-serif]" style={{ fontWeight: 600, fontSize: '14px' }}>
          View Details
        </span>
      </div>
    </motion.button>
  );
}
