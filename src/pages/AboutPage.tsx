import { Heart, Compass, Layers, Users, Github, ArrowUpRight, Globe2, Sparkles, Palette, Accessibility, Code2, Mail, MessageCircle, Send } from 'lucide-react';
import { motion } from 'motion/react';
import type { ReactNode } from 'react';

interface LinkItem {
  label: string;
  href: string;
}

interface TeamMember {
  name: string;
  role: string;
  description: string;
  avatar: string;
  links: LinkItem[];
}

const team: readonly TeamMember[] = [
  {
    name: 'Tas33n',
    role: 'Developer',
    description:
      'Leads development, manages the codebase, and ensures the platform remains a polished, reliable hub for the community.',
    avatar: 'https://github.com/tas33n.png',
    links: [{ label: 'GitHub', href: 'https://github.com/tas33n/miyomi' }],
  },
  {
    name: 'mikkiio',
    role: 'Supervisor & Data Steward',
    description:
      'Curates app updates, extension sources, and guide content to keep information accurate, relevant, and trustworthy.',
    avatar: 'https://github.com/mikkiio.png',
    links: [{ label: 'GitHub', href: 'https://github.com/mikkiio' }],
  },
  {
    name: 'GPT-5 Thinking',
    role: 'AI Assistant - UX & Content Refactor',
    description:
      'Refactored page structure, tightened copy, improved accessibility and responsive layout, and added contributor credits.',
    avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/ChatGPT-Logo.svg/768px-ChatGPT-Logo.svg.png?20240214002031',
    links: [{ label: 'About this assistant', href: 'https://chatgpt.com/' }],
  },
] as const;

const pillars = [
  {
    icon: <Compass className="w-6 h-6" />,
    title: 'All-in-one discovery',
    description:
      'Browse anime and manga apps, extension repos, and guides without juggling tabs.',
  },
  {
    icon: <Layers className="w-6 h-6" />,
    title: 'Curated & kept fresh',
    description:
      'Every entry is double-checked, tagged, and retired when it stops working.',
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: 'Built with the community',
    description:
      'Fans, translators, and devs surface the tools they rely on every day.',
  },
  {
    icon: <Accessibility className="w-6 h-6" />,
    title: 'Accessible by design',
    description:
      'Keyboard navigation, clear contrast, and semantic structure keep the door open for everyone.',
  },
  {
    icon: <Palette className="w-6 h-6" />,
    title: 'Polished visuals',
    description:
      'Soft depth, consistent spacing, and gentle color accents create a calm, modern feel.',
  },
  {
    icon: <Code2 className="w-6 h-6" />,
    title: 'Open source spirit',
    description:
      'Follow progress on GitHub, share ideas, or ship a fix of your own.',
  },
];

const communityLinks: LinkItem[] = [
  {
    label: 'Facebook Community',
    href: 'https://www.facebook.com/iitachiyomi',
  },
  {
    label: 'YouTube Channel',
    href: 'https://www.youtube.com/@iitachiyomi',
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/iitachiyomi/',
  },
  {
    label: 'Project GitHub',
    href: 'https://github.com/tas33n/miyomi',
  },
];

function Chip({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--chip-bg)] text-[var(--text-secondary)] font-['Inter',sans-serif] text-xs uppercase tracking-wide">
      <Sparkles className="w-4 h-4 text-[var(--brand)]" />
      {children}
    </span>
  );
}

function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`p-6 bg-[var(--bg-surface)] border border-[var(--divider)] rounded-2xl ${className}`}
      style={{ boxShadow: '0 6px 20px rgba(0,0,0,0.08)' }}
    >
      {children}
    </div>
  );
}

export function AboutPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6">
      {/* HERO */}
      <section className="mb-12 md:mb-14">
        <Chip>About Miyomi</Chip>
        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-[var(--text-primary)] font-['Poppins',sans-serif] mt-4 mb-3"
          style={{ fontSize: 'clamp(32px, 5vw, 48px)', lineHeight: '1.1', fontWeight: 700 }}
        >
          A calm, curated home for anime & manga tools
        </motion.h1>
        <p
          className="text-[var(--text-secondary)] font-['Inter',sans-serif] max-w-3xl"
          style={{ fontSize: '16px', lineHeight: '1.75' }}
        >
          Miyomi is our shared notebook for the tools we lean on. Skip the scavenger hunt, discover what still works, and jump back into your stories faster.
        </p>
        <p
          className="text-[var(--text-secondary)] font-['Inter',sans-serif] max-w-2xl mt-4"
          style={{ fontSize: '15px', lineHeight: '1.7' }}
        >
          Built by fans who tinker and curated by readers who care, Miyomi keeps the best anime, manga, and light novel resources within easy reach.
        </p>
      </section>

      {/* PILLARS */}
      <section className="mb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-20% 0px -20% 0px' }}
              transition={{ duration: 0.35, delay: i * 0.04 }}
            >
              <Card>
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--chip-bg)] text-[var(--brand)]">
                    {pillar.icon}
                  </div>
                  <h3 className="font-['Poppins',sans-serif] text-[var(--text-primary)] leading-snug" style={{ fontWeight: 600 }}>
                    {pillar.title}
                  </h3>
                </div>
                <p className="text-[var(--text-secondary)] font-['Inter',sans-serif]" style={{ fontSize: '14px', lineHeight: '1.6' }}>
                  {pillar.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* TEAM & CREDITS */}
      <section className="mb-12">
        <div className="mb-6 flex items-center gap-2">
          <Users className="w-5 h-5 text-[var(--brand)]" />
          <h2 className="text-[var(--text-primary)] font-['Poppins',sans-serif]" style={{ fontSize: '28px', fontWeight: 600 }}>
            Contributors & Credits
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {team.map((member) => (
            <Card key={member.name} className="flex flex-col sm:flex-row gap-5 items-center sm:items-start">
              <div className="flex-shrink-0 w-24 h-24 rounded-2xl overflow-hidden border border-[var(--divider)] bg-[var(--chip-bg)]">
                {/* eslint-disable-next-line jsx-a11y/alt-text */}
                <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" />
              </div>
              <div className="text-center sm:text-left">
                <h3 className="font-['Poppins',sans-serif] text-[var(--text-primary)]" style={{ fontSize: '20px', fontWeight: 600 }}>
                  {member.name}
                </h3>
                <p className="text-[var(--brand)] font-['Inter',sans-serif] mb-2" style={{ fontSize: '14px', fontWeight: 500 }}>
                  {member.role}
                </p>
                <p className="text-[var(--text-secondary)] font-['Inter',sans-serif] mb-3" style={{ fontSize: '14px', lineHeight: '1.6' }}>
                  {member.description}
                </p>
                <div className="flex items-center justify-center sm:justify-start gap-3">
                  {member.links.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--chip-bg)] text-[var(--text-primary)] hover:text-[var(--brand)] transition-colors text-sm font-['Inter',sans-serif]"
                      aria-label={`${member.name} on ${link.label}`}
                    >
                      <Github className="w-4 h-4" />
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
        <Card className="mt-6">
          <div className="flex flex-col sm:flex-row gap-4 sm:items-start">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--chip-bg)] text-[var(--brand)] flex-shrink-0">
              <Globe2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-['Poppins',sans-serif] text-[var(--text-primary)] mb-2" style={{ fontSize: '18px', fontWeight: 600 }}>
                To every open-source creator, thank you
              </h3>
              <p className="text-[var(--text-secondary)] font-['Inter',sans-serif] mb-2" style={{ fontSize: '14px', lineHeight: '1.6' }}>
                Miyomi simply shines a light on the anime, manga, and light-novel projects that you design, maintain, translate, and document.
                Your repos, readers, scrapers, themes, and assets keep this hobby thriving.
              </p>
              <p className="text-[var(--text-secondary)] font-['Inter',sans-serif]" style={{ fontSize: '13px', lineHeight: '1.6' }}>
                We hope this space feels like a heartfelt thank-you note to the global community of open-source developers and contributors who share their work so generously.
              </p>
            </div>
          </div>
        </Card>
      </section>

      {/* COMMUNITY */}
      <section className="mb-12">
        <div className="mb-4 flex items-center gap-2">
          <Globe2 className="w-5 h-5 text-[var(--brand)]" />
          <h2 className="text-[var(--text-primary)] font-['Poppins',sans-serif]" style={{ fontSize: '26px', fontWeight: 600 }}>
            Join the Miyomi community
          </h2>
        </div>
        <p className="text-[var(--text-secondary)] font-['Inter',sans-serif] mb-6" style={{ fontSize: '15px', lineHeight: '1.6' }}>
          Share releases, walkthroughs, and little discoveries, or help another fan find their next favorite reader.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {communityLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 bg-[var(--bg-surface)] border border-[var(--divider)] rounded-2xl hover:border-[var(--brand)] hover:shadow-lg transition-all flex items-center justify-between gap-4"
              aria-label={link.label}
            >
              <div>
                <h3 className="font-['Poppins',sans-serif] text-[var(--text-primary)] mb-1" style={{ fontWeight: 600 }}>
                  {link.label}
                </h3>
                <p className="text-[var(--text-secondary)] font-['Inter',sans-serif]" style={{ fontSize: '13px', lineHeight: '1.5' }}>
                  {link.href.replace(/^https?:\/\//, '')}
                </p>
              </div>
              <ArrowUpRight className="w-5 h-5 text-[var(--brand)] flex-shrink-0" />
            </a>
          ))}
        </div>
      </section>

      {/* CONTACT & SUPPORT */}
      <section className="mb-12">
        <div className="mb-6 flex items-center gap-2">
          <Mail className="w-5 h-5 text-[var(--brand)]" />
          <h2 className="text-[var(--text-primary)] font-['Poppins',sans-serif]" style={{ fontSize: '26px', fontWeight: 600 }}>
            Contact & Support
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
          >
            <Card className="h-full text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--chip-bg)] text-[var(--brand)]">
                <MessageCircle className="h-6 w-6" />
              </div>
              <h3 className="font-['Poppins',sans-serif] text-[var(--text-primary)] mb-2" style={{ fontSize: '16px', fontWeight: 600 }}>
                Send Feedback
              </h3>
              <p className="text-[var(--text-secondary)] font-['Inter',sans-serif] mb-4" style={{ fontSize: '14px', lineHeight: '1.6' }}>
                Share suggestions, report issues, or submit new app links via our feedback widget.
              </p>
              <p className="text-[var(--brand)] font-['Inter',sans-serif]" style={{ fontSize: '12px', fontWeight: 500 }}>
                Click the bubble in the corner to start a chat.
              </p>
            </Card>
          </motion.div>

          <motion.div
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
          >
            <Card className="h-full text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--chip-bg)] text-[var(--brand)]">
                <Github className="h-6 w-6" />
              </div>
              <h3 className="font-['Poppins',sans-serif] text-[var(--text-primary)] mb-2" style={{ fontSize: '16px', fontWeight: 600 }}>
                GitHub Issues
              </h3>
              <p className="text-[var(--text-secondary)] font-['Inter',sans-serif] mb-4" style={{ fontSize: '14px', lineHeight: '1.6' }}>
                Report bugs, request features, or contribute code to the project repository.
              </p>
              <a
                href="https://github.com/tas33n/miyomi/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[var(--brand)] font-['Inter',sans-serif] hover:underline"
                style={{ fontSize: '13px', fontWeight: 500 }}
              >
                Open an issue
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </Card>
          </motion.div>

          <motion.div
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
          >
            <Card className="h-full text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--chip-bg)] text-[var(--brand)]">
                <Send className="h-6 w-6" />
              </div>
              <h3 className="font-['Poppins',sans-serif] text-[var(--text-primary)] mb-2" style={{ fontSize: '16px', fontWeight: 600 }}>
                Community Discord
              </h3>
              <p className="text-[var(--text-secondary)] font-['Inter',sans-serif] mb-4" style={{ fontSize: '14px', lineHeight: '1.6' }}>
                Join discussions, get help, and connect with other Miyomi users.
              </p>
              <p className="text-[var(--text-secondary)] font-['Inter',sans-serif]" style={{ fontSize: '12px', fontStyle: 'italic' }}>
                Coming soon
              </p>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* CTA CARD */}
      <section className="mb-14">
        <Card className="text-center">
          <Heart className="w-8 h-8 text-[var(--brand)] mx-auto mb-3" />
          <h3 className="font-['Poppins',sans-serif] text-[var(--text-primary)] mb-2" style={{ fontSize: '20px', fontWeight: 600 }}>
            Built by fans, for fans
          </h3>
          <p className="text-[var(--text-secondary)] font-['Inter',sans-serif] text-sm max-w-2xl mx-auto" style={{ lineHeight: '1.7' }}>
            Miyomi is driven by passionate readers and developers who believe the fandom deserves a welcoming, well-organized home.
            Share the project with a friend or contribute on GitHub to help shape its future.
          </p>
        </Card>
      </section>
    </div>
  );
}
