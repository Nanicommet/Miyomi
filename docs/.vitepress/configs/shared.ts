import type { DefaultTheme, UserConfig } from 'vitepress'
import { generateImages, generateMeta } from '../hooks'
import { headersPlugin } from '../markdown/headers'
import { figure } from '@mdit/plugin-figure'
import { imgLazyload } from '@mdit/plugin-img-lazyload'
import { align } from '@mdit/plugin-align'
import { imgSize } from '@mdit/plugin-img-size'
import { tabsMarkdownPlugin } from 'vitepress-plugin-tabs'
import { emojiRender, defs, movePlugin } from './emoji'
import { x } from 'tinyexec'
import {
  PageProperties,
  PagePropertiesMarkdownSection
} from '@nolebase/vitepress-plugin-page-properties/vite'
import {
  GitChangelog,
  GitChangelogMarkdownSection
} from '@nolebase/vitepress-plugin-git-changelog/vite'
import { fileURLToPath, URL } from 'node:url'
import UnoCSS from 'unocss/vite'

export const hostname: string = 'https://miyomi.vercel.app'
export const excludedFiles = ['t.md']
const GIT_COMMIT =
  /** Github actions commit hash */
  process.env.GITHUB_SHA ??
  /** Commit hash from git */
  (await x('git', ['rev-parse', 'HEAD']).then((result) =>
    result.stdout.trim()
  )) ??
  'dev'

// @unocss-include
const nav: DefaultTheme.NavItem[] = [
  {
    text: 'Pages',
    items: [
      {
        text: 'Quick Start',
        link: '/qs'
      },
      {
        text: 'Software',
        link: '/software'
      },
      {
        text: 'Extension',
        link: '/ext-repos'
      },
      {
        text: 'FAQs',
        link: '/faq'
      },
      {
        text: 'Communities',
        link: '/communities'
      },
      {
        text: 'Credits',
        link: '/credits'
      }
    ]
  },
  {
    text: 'Preferences',
    items: [
      {
        component: 'PreferenceRadio',
        props: {
          text: 'Floating Takodachi',
          group: 'takodachi',
          options: ['Enable', 'Disable'],
          defaultOption: 'Disable'
        }
      }
    ]
  }
]

const sidebar: DefaultTheme.Sidebar = [
  {
    text: '<span class="i-lucide:zap"></span> Quick Start',
    link: '/qs'
  },
  {
    text: '<span class="i-lucide:box"></span> Software',
    link: '/software'
  },
  {
    text: '<span class="i-lucide:puzzle"></span> Extension',
    link: '/ext-repos'
  },
  {
    text: '<span class="i-lucide:message-circle-question"></span> FAQs',
    link: '/faq'
  },
  {
    text: '<span class="i-lucide:messages-square"></span> Communities',
    link: '/communities'
  },
  {
    text: '<span class="i-lucide:heart-handshake"></span> Credits',
    link: '/credits'
  }
]

export const shared: UserConfig<DefaultTheme.Config> = {
  title: 'Miyomi',
  description:
    'Your one-stop hub for links, apps, ext repos and more! 🌟',
  lang: 'en-US',
  lastUpdated: true,
  cleanUrls: true,
  ignoreDeadLinks: true,
  appearance: true,
  titleTemplate: ':title • Miyomi by tas33n',
  head: [
    ['meta', { name: 'theme-color', content: '#56b4fc' }],
    ['meta', { name: 'og:type', content: 'website' }],
    ['meta', { name: 'og:locale', content: 'en' }],
    ['link', { rel: 'icon', href: '/asset/inaread.png' }],
    // PWA
    [
      'link',
      { rel: 'icon', href: '/asset/inaread.png', type: 'image/svg+xml' }
    ],
    ['link', { rel: 'alternate icon', href: '/asset/inaread.png' }],
    [
      'link',
      { rel: 'mask-icon', href: '/asset/inaread.png', color: '#56b4fc' }
    ],
    // prettier-ignore
    [
      'meta',
      {
        name: 'keywords',
        content:
          'Anime, Anime Piracy, Manga, Manga Piracy, VTuber, Hentai, JPOP, Music, Japan, Learning Japanese, Weeb, Otaku'
      }
    ],
    [
      'link',
      {
        rel: 'apple-touch-icon',
        href: '/asset/inaread.png',
        sizes: '192x192'
      }
    ],
    [
      'script',
      { id: 'restore-banner-preference' },
      `
(() => {
  const restore = (key, cls, def = false) => {
    const saved = localStorage.getItem(key);
    if (saved) {
      document.documentElement.classList.add(cls);
    }
  };
  restore('ackDomainChange', 'banner-dismissed');
})();`
    ]
  ],
  srcExclude: ['README.md', 'sandbox/**/*.md'],
  sitemap: {
    hostname: hostname
  },
  transformHead: async (context) => generateMeta(context, hostname),
  // biome-ignore lint/suspicious/useAwait: <explanation>
  buildEnd: async (context) => {
    generateImages(context)
  },
  markdown: {
    emoji: { defs },
    config(md) {
      md.use(emojiRender)
      md.use(imgLazyload)
      md.use(align)
      md.use(figure)
      md.use(tabsMarkdownPlugin)
      md.use(imgSize)
      md.use(headersPlugin)
    }
  },
  themeConfig: {
    search: {
      options: {
        miniSearch: {
          searchOptions: {
            combineWith: 'AND',
            fuzzy: false,
            // @ts-ignore
            boostDocument: (
              _,
              term,
              storedFields: Record<string, string | string[]>
            ) => {
              const titles = (storedFields?.titles as string[])
                .filter((t) => Boolean(t))
                .map((t) => t.toLowerCase())
              // Uprate if term appears in titles. Add bonus for higher levels (i.e. lower index)
              const titleIndex =
                titles
                  .map((t, i) => (t?.includes(term) ? i : -1))
                  .find((i) => i >= 0) ?? -1
              if (titleIndex >= 0) return 10000 - titleIndex

              return 1
            }
          }
        },
        detailedView: true
      },
      provider: 'local'
    },
    logo: { src: '/asset/inaread.png' },
    sidebar,
    nav,
    socialLinks: [
      { icon: 'github', link: 'https://github.com/tas33n/miyomi' },
      { icon: 'discord', link: '#' },
    ],
    footer: {
      message: `<a href="https://github.com/tas33n/miyomi">The Miyomi Team</a> <span class="divider">|</span> <a href="https://github.com/tas33n/miyomi/commit/${GIT_COMMIT}">${GIT_COMMIT.slice(0, 7)}</a>`,
      copyright: `made with love and eepy energy`
    }
  },
  vite: {
    optimizeDeps: {
      exclude: [
        '@nolebase/vitepress-plugin-enhanced-readabilities/client',
        '@nolebase/vitepress-plugin-git-changelog/client',
        '@nolebase/vitepress-plugin-page-properties/client'
      ]
    },
    ssr: {
      noExternal: [
        '@nolebase/vitepress-plugin-enhanced-readabilities',
        '@nolebase/vitepress-plugin-page-properties',
        '@nolebase/vitepress-plugin-git-changelog',
        '@nolebase/ui',
        '@fmhy/components'
      ]
    },
    plugins: [
      PageProperties(),
      PagePropertiesMarkdownSection(),
      GitChangelog({
        maxGitLogCount: 20,
        repoURL: 'https://github.com/tas33n/miyomi'
      }),
      GitChangelogMarkdownSection({ sections: { disableContributors: true } }),
      UnoCSS({
        configFile: '../unocss.config.ts'
      }),
      {
        name: 'custom:adjust-order',
        configResolved(c) {
          movePlugin(
            c.plugins as any,
            'vitepress',
            'before',
            'unocss:transformers:pre'
          )
        }
      }
    ],
    resolve: {
      alias: [
        {
          find: /^.*\/VPBadge\.vue$/,
          replacement: fileURLToPath(
            new URL('../theme/components/Badge.vue', import.meta.url)
          )
        },
        {
          find: /^.*VPSwitchAppearance\.vue$/,
          replacement: fileURLToPath(
            new URL(
              '../theme/components/VPSwitchAppearance.vue',
              import.meta.url
            )
          )
        }
      ]
    }
  }
}
