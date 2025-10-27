import { MessageSquare, Github, Users, ExternalLink } from 'lucide-react';
import { communities } from '../data';
import { FeedbackPanel } from '../components/FeedbackPanel';
import { FeedbackTrigger } from '../components/FeedbackTrigger';
import { useFeedbackState } from '../hooks/useFeedbackState';
import { AnimatePresence } from 'motion/react';

export function CommunitiesPage() {
  const { isFeedbackOpen, handleToggle, handleClose } = useFeedbackState();
  const platformIcon = {
    Discord: MessageSquare,
    Telegram: MessageSquare,
    GitHub: Github,
    Reddit: Users,
    Matrix: Users,
  } as const;

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center gap-3 mb-2">
        <h1
          className="text-[var(--text-primary)] font-['Poppins',sans-serif]"
          style={{ fontSize: 'clamp(32px, 5vw, 40px)', lineHeight: '1.2', fontWeight: 600 }}
        >
          Communities
        </h1>
        <FeedbackTrigger isOpen={isFeedbackOpen} onToggle={handleToggle} title="Communities" />
      </div>
      <p className="text-[var(--text-secondary)] font-['Inter',sans-serif] mb-8" style={{ fontSize: '16px' }}>
        Join our communities for support, discussions, and to stay updated with the latest news.
      </p>

      {/* Inline Feedback Panel */}
      <AnimatePresence>
        {isFeedbackOpen && (
          <div className="mb-8">
            <FeedbackPanel page="communities" onClose={handleClose} />
          </div>
        )}
      </AnimatePresence>

      {/* Communities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {communities.map((community, index) => {
          const Icon = platformIcon[community.platform];
          return (
          <a
            key={index}
            href={community.link}
            target="_blank"
            rel="noopener noreferrer"
            className="p-6 bg-[var(--bg-surface)] border border-[var(--divider)] rounded-2xl hover:shadow-lg transition-all group"
            style={{ boxShadow: '0 6px 20px 0 rgba(0,0,0,0.08)' }}
          >
            <div className="flex items-start gap-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-white flex-shrink-0"
                style={{ backgroundColor: community.color }}
              >
                <Icon className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-['Inter',sans-serif] text-[var(--text-primary)]" style={{ fontWeight: 600 }}>
                    {community.name}
                  </h3>
                  <ExternalLink className="w-4 h-4 text-[var(--brand)] opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="text-[var(--text-secondary)] font-['Inter',sans-serif] text-sm mb-2">
                  {community.description}
                </p>
                <div className="text-xs text-[var(--brand)] font-['Inter',sans-serif]" style={{ fontWeight: 600 }}>
                  {community.members} members
                </div>
              </div>
            </div>
          </a>
        );
        })}
      </div>

      {/* Community Guidelines */}
      <div
        className="mt-8 p-6 bg-[var(--bg-surface)] border border-[var(--divider)] rounded-2xl"
        style={{ boxShadow: '0 6px 20px 0 rgba(0,0,0,0.08)' }}
      >
        <h3 className="font-['Poppins',sans-serif] text-[var(--text-primary)] mb-3" style={{ fontWeight: 600 }}>
          Community Guidelines
        </h3>
        <ul className="space-y-2 text-[var(--text-secondary)] font-['Inter',sans-serif] text-sm">
          <li>• Be respectful and kind to all community members</li>
          <li>• No piracy links or illegal content sharing</li>
          <li>• Search before asking - your question may already be answered</li>
          <li>• Stay on topic and use appropriate channels</li>
          <li>• Help others when you can - we're all here to learn</li>
        </ul>
      </div>
    </div>
  );
}