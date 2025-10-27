interface TagBadgeProps {
  tag: 'Manga' | 'Anime' | 'Light Novel';
}

const tagColors = {
  Manga: { bg: '#FFE8E8', text: '#C44545' },
  Anime: { bg: '#E8F4FF', text: '#4573C4' },
  'Light Novel': { bg: '#F4E8FF', text: '#8845C4' },
};

export function TagBadge({ tag }: TagBadgeProps) {
  const colors = tagColors[tag];

  return (
    <span
      className="px-2 py-0.5 rounded-md text-xs font-['Inter',sans-serif]"
      style={{
        backgroundColor: colors.bg,
        color: colors.text,
        fontWeight: 500,
      }}
    >
      {tag}
    </span>
  );
}
