// docs/.vitepress/config.mts
import { defineConfig } from "file:///C:/xPROGRAM-LABS/Miyomi/node_modules/vitepress/dist/node/index.js";

// docs/.vitepress/configs/emoji.ts
import { icons as twemoji } from "file:///C:/xPROGRAM-LABS/Miyomi/node_modules/@iconify-json/twemoji/index.mjs";
import { icons as octicon } from "file:///C:/xPROGRAM-LABS/Miyomi/node_modules/@iconify-json/octicon/index.mjs";
import { icons as logos } from "file:///C:/xPROGRAM-LABS/Miyomi/node_modules/@iconify-json/logos/index.mjs";
import { icons as ic } from "file:///C:/xPROGRAM-LABS/Miyomi/node_modules/@iconify-json/ic/index.mjs";
import { icons as mingcute } from "file:///C:/xPROGRAM-LABS/Miyomi/node_modules/@iconify-json/mingcute/index.mjs";
import { icons as mdi } from "file:///C:/xPROGRAM-LABS/Miyomi/node_modules/@iconify-json/mdi/index.mjs";
import { icons as materials } from "file:///C:/xPROGRAM-LABS/Miyomi/node_modules/@iconify-json/material-symbols/index.mjs";
import { icons as simple } from "file:///C:/xPROGRAM-LABS/Miyomi/node_modules/@iconify-json/simple-icons/index.mjs";
import { icons as gg } from "file:///C:/xPROGRAM-LABS/Miyomi/node_modules/@iconify-json/gg/index.mjs";
var emojis = [
  // Default emojis (twemoji)
  { pack: twemoji },
  // octicon emojis, prefixed with "octicon-"
  { pack: octicon, prefix: "octicon-" },
  { pack: logos, prefix: "logos-" },
  { pack: ic, prefix: "ic-" },
  { pack: mingcute, prefix: "mingcute-" },
  { pack: mdi, prefix: "mdi-" },
  { pack: materials, prefix: "material-symbols-" },
  { pack: simple, prefix: "simple-icons-" },
  { pack: gg, prefix: "gg-" }
];
var defs = {};
for (const elem of emojis) {
  for (const key in elem.pack.icons) {
    if (elem.prefix) defs[elem.prefix + key] = "";
    else defs[key] = "";
  }
}
function emojiRender(md) {
  md.renderer.rules.emoji = (tokens, idx) => {
    for (const emoji of emojis) {
      if (tokens[idx].markup.startsWith(emoji.prefix)) {
        return `<span class="i-${tokens[idx].markup}"></span>`;
      }
    }
    return `<span class="i-twemoji-${tokens[idx].markup}"></span>`;
  };
}
function movePlugin(plugins, pluginAName, order, pluginBName) {
  const pluginBIndex = plugins.findIndex((p) => p.name === pluginBName);
  if (pluginBIndex === -1) return;
  const pluginAIndex = plugins.findIndex((p) => p.name === pluginAName);
  if (pluginAIndex === -1) return;
  if (order === "before" && pluginAIndex > pluginBIndex) {
    const pluginA = plugins.splice(pluginAIndex, 1)[0];
    plugins.splice(pluginBIndex, 0, pluginA);
  }
  if (order === "after" && pluginAIndex < pluginBIndex) {
    const pluginA = plugins.splice(pluginAIndex, 1)[0];
    plugins.splice(pluginBIndex, 0, pluginA);
  }
}

// docs/.vitepress/hooks/meta.ts
function generateMeta(context, hostname2) {
  const head = [];
  const { pageData } = context;
  if (pageData.isNotFound || excludedFiles.includes(pageData.filePath) || pageData.frontmatter.exclude)
    return head;
  const { relativePath, frontmatter, filePath, lastUpdated } = pageData;
  const url = `${hostname2}/${relativePath.replace(/((^|\/)index)?\.md$/, "$2")}`;
  head.push(
    ["link", { rel: "canonical", href: url }],
    ["meta", { property: "og:url", content: url }],
    ["meta", { name: "twitter:url", content: url }],
    ["meta", { name: "twitter:card", content: "summary_large_image" }]
  );
  if (frontmatter.theme) {
    head.push(["meta", { name: "theme-color", content: frontmatter.theme }]);
  }
  if (frontmatter.type) {
    head.push(["meta", { property: "og:type", content: frontmatter.type }]);
  }
  head.push(
    [
      "meta",
      {
        property: "og:description",
        content: frontmatter.customDescription ?? frontmatter.description
      }
    ],
    [
      "meta",
      {
        name: "twitter:description",
        content: frontmatter.customDescription ?? frontmatter.description
      }
    ],
    ["meta", { property: "og:title", content: frontmatter.title }],
    ["meta", { name: "twitter:title", content: frontmatter.title }]
  );
  if (frontmatter.image) {
    head.push([
      "meta",
      {
        property: "og:image",
        content: `${hostname2}/${frontmatter.image.replace(/^\//, "")}`
      }
    ]);
    head.push([
      "meta",
      {
        name: "twitter:image",
        content: `${hostname2}/${frontmatter.image.replace(/^\//, "")}`
      }
    ]);
  } else {
    const url2 = filePath.replace("index.md", "").replace(".md", "");
    const imageUrl = `${url2}/__og_image__/og.png`.replace(/\/\//g, "/").replace(/^\//, "");
    head.push([
      "meta",
      { property: "og:image", content: `${hostname2}/${imageUrl}` }
    ]);
    head.push(["meta", { property: "og:image:width", content: "1098" }]);
    head.push(["meta", { property: "og:image:height", content: "530" }]);
    head.push(["meta", { property: "og:image:type", content: "image/png" }]);
    head.push([
      "meta",
      { property: "og:image:alt", content: frontmatter.title }
    ]);
    head.push([
      "meta",
      { name: "twitter:image", content: `${hostname2}/${imageUrl}` }
    ]);
    head.push(["meta", { name: "twitter:image:width", content: "1098" }]);
    head.push(["meta", { name: "twitter:image:height", content: "530" }]);
    head.push([
      "meta",
      { name: "twitter:image:alt", content: frontmatter.title }
    ]);
  }
  if (frontmatter.tag) {
    head.push(["meta", { property: "article:tag", content: frontmatter.tag }]);
  }
  if (frontmatter.date) {
    head.push([
      "meta",
      {
        property: "article:published_time",
        content: frontmatter.date
      }
    ]);
  }
  if (lastUpdated && pageData.frontmatter.lastUpdated !== false) {
    head.push([
      "meta",
      {
        property: "article:modified_time",
        content: new Date(lastUpdated).toISOString()
      }
    ]);
  }
  return head;
}

// docs/.vitepress/hooks/opengraph.ts
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createContentLoader } from "file:///C:/xPROGRAM-LABS/Miyomi/node_modules/vitepress/dist/node/index.js";
import { satoriVue } from "file:///C:/xPROGRAM-LABS/Miyomi/node_modules/x-satori/dist/vue.mjs";
import { renderAsync } from "file:///C:/xPROGRAM-LABS/Miyomi/node_modules/@resvg/resvg-js/index.js";
var __vite_injected_original_import_meta_url = "file:///C:/xPROGRAM-LABS/Miyomi/docs/.vitepress/hooks/opengraph.ts";
var __dirname = dirname(fileURLToPath(__vite_injected_original_import_meta_url));
var __fonts = resolve(__dirname, "../fonts");
async function generateImages(config) {
  const pages = await createContentLoader("**/*.md", {
    excerpt: true,
    globOptions: {
      ignore: [...excludedFiles, "node_modules", "dist"]
    }
  }).load();
  const template = await readFile(
    resolve(__dirname, "../theme/components/OgImageTemplate.vue"),
    "utf-8"
  );
  const fonts = [
    {
      name: "Inter",
      data: await readFile(resolve(__fonts, "Inter-Regular.otf")),
      weight: 400,
      style: "normal"
    },
    {
      name: "Inter",
      data: await readFile(resolve(__fonts, "Inter-Medium.otf")),
      weight: 500,
      style: "normal"
    },
    {
      name: "Inter",
      data: await readFile(resolve(__fonts, "Inter-SemiBold.otf")),
      weight: 600,
      style: "normal"
    },
    {
      name: "Inter",
      data: await readFile(resolve(__fonts, "Inter-Bold.otf")),
      weight: 700,
      style: "normal"
    }
  ];
  const filteredPages = pages.filter((p) => p.frontmatter.image === void 0);
  for (const page of filteredPages) {
    await generateImage({
      page,
      template,
      outDir: config.outDir,
      fonts
    });
  }
}
function getDir(url) {
  if (url.startsWith("/glossary/")) {
    return "Glossary";
  } else if (url.startsWith("/guides/")) {
    return "Guide";
  }
  return void 0;
}
async function generateImage({
  page,
  template,
  outDir,
  fonts
}) {
  const { frontmatter, url } = page;
  const options = {
    width: 1280,
    height: 686,
    fonts,
    props: {
      title: frontmatter.layout === "home" ? frontmatter.hero.name ?? frontmatter.title : frontmatter.customMetaTitle ?? frontmatter.title,
      description: frontmatter.layout === "home" ? frontmatter.hero.tagline ?? frontmatter.description : frontmatter.description,
      dir: getDir(url)
    }
  };
  const svg = await satoriVue(options, template);
  const render = await renderAsync(svg);
  const outputFolder = resolve(outDir, url.substring(1), "__og_image__");
  const outputFile = resolve(outputFolder, "og.png");
  await mkdir(outputFolder, { recursive: true });
  return await writeFile(outputFile, render.asPng());
}

// docs/.vitepress/markdown/headers.ts
var excluded = ["Credits"];
var headersPlugin = (md) => {
  md.renderer.rules.heading_open = (tokens, idx, options, env, self) => {
    const result = self.renderToken(tokens, idx, options);
    const idxClose = idx + tokens.slice(idx).findIndex((token) => token.type === "heading_close");
    if (idxClose <= idx) return result;
    const level = tokens[idx].tag.slice(1);
    if (excluded.includes(env.frontmatter.title) || level !== "2") return result;
    const children = tokens[idx + 1].children || [];
    const linkOpenToken = children.find((c) => c.type === "link_open");
    if (!linkOpenToken) return result;
    const heading = tokens[idxClose - 1];
    linkOpenToken.meta = linkOpenToken.meta || {};
    linkOpenToken.meta.feedback = {
      heading: heading.content
    };
    return result;
  };
  md.renderer.rules.link_open = (tokens, idx, options, env, self) => {
    const result = self.renderToken(tokens, idx, options);
    const meta = tokens[idx].meta;
    if (!meta || !meta.feedback) return result;
    const heading = meta.feedback.heading || "";
    if (!heading) return result;
    return `<Feedback heading="${heading}" />${result}`;
  };
};

// docs/.vitepress/configs/shared.ts
import { figure } from "file:///C:/xPROGRAM-LABS/Miyomi/node_modules/@mdit/plugin-figure/lib/index.js";
import { imgLazyload } from "file:///C:/xPROGRAM-LABS/Miyomi/node_modules/@mdit/plugin-img-lazyload/lib/index.js";
import { align } from "file:///C:/xPROGRAM-LABS/Miyomi/node_modules/@mdit/plugin-align/lib/index.js";
import { imgSize } from "file:///C:/xPROGRAM-LABS/Miyomi/node_modules/@mdit/plugin-img-size/lib/index.js";
import { tabsMarkdownPlugin } from "file:///C:/xPROGRAM-LABS/Miyomi/node_modules/vitepress-plugin-tabs/dist/index.js";
import { x } from "file:///C:/xPROGRAM-LABS/Miyomi/node_modules/tinyexec/dist/main.js";
import {
  PageProperties,
  PagePropertiesMarkdownSection
} from "file:///C:/xPROGRAM-LABS/Miyomi/node_modules/@nolebase/vitepress-plugin-page-properties/dist/vite/index.mjs";
import {
  GitChangelog,
  GitChangelogMarkdownSection
} from "file:///C:/xPROGRAM-LABS/Miyomi/node_modules/@nolebase/vitepress-plugin-git-changelog/dist/vite/index.mjs";
import { fileURLToPath as fileURLToPath2, URL } from "node:url";
import UnoCSS from "file:///C:/xPROGRAM-LABS/Miyomi/node_modules/unocss/dist/vite.mjs";
var __vite_injected_original_import_meta_url2 = "file:///C:/xPROGRAM-LABS/Miyomi/docs/.vitepress/configs/shared.ts";
var hostname = "https://miyomi.vercel.app";
var excludedFiles = ["t.md"];
var GIT_COMMIT = (
  /** Github actions commit hash */
  process.env.GITHUB_SHA ?? /** Commit hash from git */
  await x("git", ["rev-parse", "HEAD"]).then(
    (result) => result.stdout.trim()
  ) ?? "dev"
);
var nav = [
  {
    text: "Pages",
    items: [
      {
        text: "Quick Start",
        link: "/qs"
      },
      { text: "Websites", link: "/websites" },
      {
        text: "Software",
        link: "/software"
      },
      {
        text: "Extension",
        link: "/ext-repos"
      },
      { text: "Tools", link: "/tools" },
      { text: "Art", link: "/art" },
      {
        text: "FAQs",
        link: "/faq"
      },
      { text: "NSFW", link: "/nsfw" },
      { text: "Scanlation", link: "/scanlation" },
      {
        text: "Communities",
        link: "/communities"
      },
      {
        text: "Credits",
        link: "/credits"
      }
    ]
  },
  {
    text: "Glossary",
    items: [
      { text: "General", link: "/glossary/general" },
      { text: "Anime", link: "/glossary/anime" },
      { text: "Manga", link: "/glossary/manga" },
      { text: "Audio", link: "/glossary/audio" },
      { text: "NSFW", link: "/glossary/nsfw" }
    ]
  },
  {
    text: "Guides",
    // @ts-expect-error
    collapsed: true,
    items: [
      {
        text: "Anime",
        items: [
          { text: "Disc Ripping", link: "/guides/anime/discrip" },
          { text: "Network Streaming", link: "/guides/anime/ns" }
        ]
      },
      {
        text: "Manga",
        items: [
          { text: "Digital Manga Info", link: "/guides/manga/digim" },
          { text: "JXL Manga Readers", link: "/guides/manga/jxl" },
          { text: "Madokami", link: "/guides/manga/madokami" },
          { text: "Manga Image Editing", link: "/guides/manga/imagedit" }
        ]
      },
      {
        text: "Technical",
        items: [
          { text: "Blocking Ads", link: "/guides/tech/adblock" },
          { text: "IRC & XDCC", link: "/guides/tech/irc" },
          { text: "JDL2 Ad-removal", link: "/guides/tech/jdl" }
        ]
      }
    ]
  }
];
var sidebar = [
  {
    text: '<span class="i-lucide:zap"></span> Quick Start',
    link: "/qs"
  },
  {
    text: '<span class="i-lucide:box"></span> Software',
    link: "/software"
  },
  {
    text: '<span class="i-lucide:earth"></span> Websites',
    link: "/websites"
  },
  {
    text: '<span class="i-lucide:puzzle"></span> Extension',
    link: "/ext-repos"
  },
  {
    text: '<span class="i-lucide:wrench"></span> Tools',
    link: "/tools"
  },
  {
    text: '<span class="i-lucide:brush"></span> Art',
    link: "/art"
  },
  {
    text: '<span class="i-lucide:ban"></span> NSFW',
    link: "/nsfw"
  },
  {
    text: '<span class="i-lucide:scroll-text"></span> Scanlation',
    link: "/scanlation"
  },
  {
    text: '<span class="i-lucide:book-open"></span> Glossary',
    collapsed: true,
    items: [
      { text: "General", link: "/glossary/general" },
      { text: "Anime", link: "/glossary/anime" },
      { text: "Manga", link: "/glossary/manga" },
      { text: "Audio", link: "/glossary/audio" },
      { text: "NSFW", link: "/glossary/nsfw" }
    ]
  },
  {
    text: '<span class="i-lucide:book-key"></span> Guides',
    collapsed: true,
    items: [
      {
        text: "Anime",
        collapsed: true,
        items: [
          { text: "Disc Ripping", link: "/guides/anime/discrip" },
          { text: "Network Streaming", link: "/guides/anime/ns" }
        ]
      },
      {
        text: "Manga",
        collapsed: true,
        items: [
          { text: "Digital Manga Info", link: "/guides/manga/digim" },
          { text: "JXL Manga Readers", link: "/guides/manga/jxl" },
          { text: "Madokami", link: "/guides/manga/madokami" },
          { text: "Manga Image Editing", link: "/guides/manga/imagedit" }
        ]
      },
      {
        text: "Technical",
        collapsed: true,
        items: [
          { text: "Blocking Ads", link: "/guides/tech/adblock" },
          { text: "IRC & XDCC", link: "/guides/tech/irc" },
          { text: "JDL2 Ad-removal", link: "/guides/tech/jdl" }
        ]
      }
    ]
  },
  {
    text: '<span class="i-lucide:message-circle-question"></span> FAQs',
    link: "/faq"
  },
  {
    text: '<span class="i-lucide:messages-square"></span> Communities',
    link: "/communities"
  },
  {
    text: '<span class="i-lucide:heart-handshake"></span> Credits',
    link: "/credits"
  }
];
var shared = {
  title: "Miyomi",
  description: "Your one-stop hub for links, apps, ext repos and more! \u{1F31F}",
  lang: "en-US",
  lastUpdated: true,
  cleanUrls: true,
  ignoreDeadLinks: true,
  appearance: true,
  titleTemplate: ":title \u2022 Miyomi by tas33n",
  head: [
    ["meta", { name: "theme-color", content: "#56b4fc" }],
    ["meta", { name: "og:type", content: "website" }],
    ["meta", { name: "og:locale", content: "en" }],
    ["link", { rel: "icon", href: "/asset/inaread.png" }],
    // PWA
    [
      "link",
      { rel: "icon", href: "/asset/inaread.png", type: "image/svg+xml" }
    ],
    ["link", { rel: "alternate icon", href: "/asset/inaread.png" }],
    [
      "link",
      { rel: "mask-icon", href: "/asset/inaread.png", color: "#56b4fc" }
    ],
    // prettier-ignore
    [
      "meta",
      {
        name: "keywords",
        content: "Anime, Anime Piracy, Manga, Manga Piracy, VTuber, Hentai, JPOP, Music, Japan, Learning Japanese, Weeb, Otaku"
      }
    ],
    [
      "link",
      {
        rel: "apple-touch-icon",
        href: "/asset/inaread.png",
        sizes: "192x192"
      }
    ],
    [
      "script",
      { id: "restore-banner-preference" },
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
  srcExclude: ["README.md", "sandbox/**/*.md"],
  sitemap: {
    hostname
  },
  transformHead: async (context) => generateMeta(context, hostname),
  // biome-ignore lint/suspicious/useAwait: <explanation>
  buildEnd: async (context) => {
    generateImages(context);
  },
  markdown: {
    emoji: { defs },
    config(md) {
      md.use(emojiRender);
      md.use(imgLazyload);
      md.use(align);
      md.use(figure);
      md.use(tabsMarkdownPlugin);
      md.use(imgSize);
      md.use(headersPlugin);
    }
  },
  themeConfig: {
    search: {
      options: {
        miniSearch: {
          searchOptions: {
            combineWith: "AND",
            fuzzy: false,
            // @ts-ignore
            boostDocument: (_, term, storedFields) => {
              const titles = (storedFields?.titles).filter((t) => Boolean(t)).map((t) => t.toLowerCase());
              const titleIndex = titles.map((t, i) => t?.includes(term) ? i : -1).find((i) => i >= 0) ?? -1;
              if (titleIndex >= 0) return 1e4 - titleIndex;
              return 1;
            }
          }
        },
        detailedView: true
      },
      provider: "local"
    },
    logo: { src: "/asset/inaread.png" },
    sidebar,
    nav,
    socialLinks: [
      { icon: "github", link: "https://github.com/tas33n/miyomi" },
      { icon: "discord", link: "#" }
    ],
    footer: {
      message: `<a href="https://github.com/tas33n/miyomi">The Miyomi Team</a> <span class="divider">|</span> <a href="https://github.com/tas33n/miyomi/commit/${GIT_COMMIT}">${GIT_COMMIT.slice(0, 7)}</a>`,
      copyright: `made with love and eepy energy`
    }
  },
  vite: {
    optimizeDeps: {
      exclude: [
        "@nolebase/vitepress-plugin-enhanced-readabilities/client",
        "@nolebase/vitepress-plugin-git-changelog/client",
        "@nolebase/vitepress-plugin-page-properties/client"
      ]
    },
    ssr: {
      noExternal: [
        "@nolebase/vitepress-plugin-enhanced-readabilities",
        "@nolebase/vitepress-plugin-page-properties",
        "@nolebase/vitepress-plugin-git-changelog",
        "@nolebase/ui",
        "@fmhy/components"
      ]
    },
    plugins: [
      PageProperties(),
      PagePropertiesMarkdownSection(),
      GitChangelog({
        maxGitLogCount: 20,
        repoURL: "https://github.com/tas33n/miyomi"
      }),
      GitChangelogMarkdownSection({ sections: { disableContributors: true } }),
      UnoCSS({
        configFile: "../unocss.config.ts"
      }),
      {
        name: "custom:adjust-order",
        configResolved(c) {
          movePlugin(
            c.plugins,
            "vitepress",
            "before",
            "unocss:transformers:pre"
          );
        }
      }
    ],
    resolve: {
      alias: [
        {
          find: /^.*\/VPBadge\.vue$/,
          replacement: fileURLToPath2(
            new URL("../theme/components/Badge.vue", __vite_injected_original_import_meta_url2)
          )
        },
        {
          find: /^.*VPSwitchAppearance\.vue$/,
          replacement: fileURLToPath2(
            new URL(
              "../theme/components/VPSwitchAppearance.vue",
              __vite_injected_original_import_meta_url2
            )
          )
        }
      ]
    }
  }
};

// docs/.vitepress/config.mts
var config_default = defineConfig(shared);
export {
  config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZG9jcy8udml0ZXByZXNzL2NvbmZpZy5tdHMiLCAiZG9jcy8udml0ZXByZXNzL2NvbmZpZ3MvZW1vamkudHMiLCAiZG9jcy8udml0ZXByZXNzL2hvb2tzL21ldGEudHMiLCAiZG9jcy8udml0ZXByZXNzL2hvb2tzL29wZW5ncmFwaC50cyIsICJkb2NzLy52aXRlcHJlc3MvbWFya2Rvd24vaGVhZGVycy50cyIsICJkb2NzLy52aXRlcHJlc3MvY29uZmlncy9zaGFyZWQudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFx4UFJPR1JBTS1MQUJTXFxcXE1peW9taVxcXFxkb2NzXFxcXC52aXRlcHJlc3NcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXHhQUk9HUkFNLUxBQlNcXFxcTWl5b21pXFxcXGRvY3NcXFxcLnZpdGVwcmVzc1xcXFxjb25maWcubXRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi94UFJPR1JBTS1MQUJTL01peW9taS9kb2NzLy52aXRlcHJlc3MvY29uZmlnLm10c1wiO2ltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGVwcmVzcydcclxuaW1wb3J0IHsgc2hhcmVkIH0gZnJvbSAnLi9jb25maWdzJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHNoYXJlZClcclxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFx4UFJPR1JBTS1MQUJTXFxcXE1peW9taVxcXFxkb2NzXFxcXC52aXRlcHJlc3NcXFxcY29uZmlnc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxceFBST0dSQU0tTEFCU1xcXFxNaXlvbWlcXFxcZG9jc1xcXFwudml0ZXByZXNzXFxcXGNvbmZpZ3NcXFxcZW1vamkudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L3hQUk9HUkFNLUxBQlMvTWl5b21pL2RvY3MvLnZpdGVwcmVzcy9jb25maWdzL2Vtb2ppLnRzXCI7aW1wb3J0IHR5cGUgeyBNYXJrZG93blJlbmRlcmVyIH0gZnJvbSAndml0ZXByZXNzJ1xyXG5pbXBvcnQgdHlwZSB7IEljb25pZnlKU09OIH0gZnJvbSAnQGljb25pZnktanNvbi9vY3RpY29uJ1xyXG5cclxuLy8gSWNvbnMgdGhhdCBuZWVkIHRvIGJlIHVzZWQgc2hvdWxkIGJlIGltcG9ydGVkIGhlcmVcclxuaW1wb3J0IHsgaWNvbnMgYXMgdHdlbW9qaSB9IGZyb20gJ0BpY29uaWZ5LWpzb24vdHdlbW9qaSdcclxuaW1wb3J0IHsgaWNvbnMgYXMgb2N0aWNvbiB9IGZyb20gJ0BpY29uaWZ5LWpzb24vb2N0aWNvbidcclxuaW1wb3J0IHsgaWNvbnMgYXMgbG9nb3MgfSBmcm9tICdAaWNvbmlmeS1qc29uL2xvZ29zJ1xyXG5pbXBvcnQgeyBpY29ucyBhcyBpYyB9IGZyb20gJ0BpY29uaWZ5LWpzb24vaWMnXHJcbmltcG9ydCB7IGljb25zIGFzIG1pbmdjdXRlIH0gZnJvbSAnQGljb25pZnktanNvbi9taW5nY3V0ZSdcclxuaW1wb3J0IHsgaWNvbnMgYXMgbWRpIH0gZnJvbSAnQGljb25pZnktanNvbi9tZGknXHJcbmltcG9ydCB7IGljb25zIGFzIG1hdGVyaWFscyB9IGZyb20gJ0BpY29uaWZ5LWpzb24vbWF0ZXJpYWwtc3ltYm9scydcclxuaW1wb3J0IHsgaWNvbnMgYXMgc2ltcGxlIH0gZnJvbSAnQGljb25pZnktanNvbi9zaW1wbGUtaWNvbnMnXHJcbmltcG9ydCB7IGljb25zIGFzIGdnIH0gZnJvbSAnQGljb25pZnktanNvbi9nZydcclxuXHJcbi8vIDEuIEluc3RhbGwgZW1vamkgcGFjayB3aXRoIGBwbnBtIGFkZCAtZyBAaWNvbmlmeS1qc29uLzxpY29uPmBcclxuLy8gMi4gSW1wb3J0IHRoZW0gbGlrZSBJIGRpZCBhYm92ZVxyXG4vLyAzLiBBZGQgaXQgdG8gdGhpcyBlbW9qaXMgYXJyYXksIGxpa2UgSSBkaWQgZm9yIG9jdGljb24sIGFuZCBhZGQgYSBwcmVmaXhcclxuY29uc3QgZW1vamlzOiB7IHBhY2s6IEljb25pZnlKU09OOyBwcmVmaXg/OiBzdHJpbmcgfVtdID0gW1xyXG4gIC8vIERlZmF1bHQgZW1vamlzICh0d2Vtb2ppKVxyXG4gIHsgcGFjazogdHdlbW9qaSB9LFxyXG4gIC8vIG9jdGljb24gZW1vamlzLCBwcmVmaXhlZCB3aXRoIFwib2N0aWNvbi1cIlxyXG4gIHsgcGFjazogb2N0aWNvbiwgcHJlZml4OiAnb2N0aWNvbi0nIH0sXHJcbiAgeyBwYWNrOiBsb2dvcywgcHJlZml4OiAnbG9nb3MtJyB9LFxyXG4gIHsgcGFjazogaWMsIHByZWZpeDogJ2ljLScgfSxcclxuICB7IHBhY2s6IG1pbmdjdXRlLCBwcmVmaXg6ICdtaW5nY3V0ZS0nIH0sXHJcbiAgeyBwYWNrOiBtZGksIHByZWZpeDogJ21kaS0nIH0sXHJcbiAgeyBwYWNrOiBtYXRlcmlhbHMsIHByZWZpeDogJ21hdGVyaWFsLXN5bWJvbHMtJyB9LFxyXG4gIHsgcGFjazogc2ltcGxlLCBwcmVmaXg6ICdzaW1wbGUtaWNvbnMtJyB9LFxyXG4gIHsgcGFjazogZ2csIHByZWZpeDogJ2dnLScgfVxyXG5dXHJcblxyXG5jb25zdCBkZWZzOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0ge31cclxuXHJcbmZvciAoY29uc3QgZWxlbSBvZiBlbW9qaXMpIHtcclxuICBmb3IgKGNvbnN0IGtleSBpbiBlbGVtLnBhY2suaWNvbnMpIHtcclxuICAgIGlmIChlbGVtLnByZWZpeCkgZGVmc1tlbGVtLnByZWZpeCArIGtleV0gPSAnJ1xyXG4gICAgZWxzZSBkZWZzW2tleV0gPSAnJ1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IHsgZGVmcyB9XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZW1vamlSZW5kZXIobWQ6IE1hcmtkb3duUmVuZGVyZXIpIHtcclxuICBtZC5yZW5kZXJlci5ydWxlcy5lbW9qaSA9ICh0b2tlbnMsIGlkeCkgPT4ge1xyXG4gICAgZm9yIChjb25zdCBlbW9qaSBvZiBlbW9qaXMpIHtcclxuICAgICAgaWYgKHRva2Vuc1tpZHhdLm1hcmt1cC5zdGFydHNXaXRoKGVtb2ppLnByZWZpeCEpKSB7XHJcbiAgICAgICAgcmV0dXJuIGA8c3BhbiBjbGFzcz1cImktJHt0b2tlbnNbaWR4XS5tYXJrdXB9XCI+PC9zcGFuPmBcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBgPHNwYW4gY2xhc3M9XCJpLXR3ZW1vamktJHt0b2tlbnNbaWR4XS5tYXJrdXB9XCI+PC9zcGFuPmBcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBtb3ZlUGx1Z2luKFxyXG4gIHBsdWdpbnM6IHsgbmFtZTogc3RyaW5nIH1bXSxcclxuICBwbHVnaW5BTmFtZTogc3RyaW5nLFxyXG4gIG9yZGVyOiAnYmVmb3JlJyB8ICdhZnRlcicsXHJcbiAgcGx1Z2luQk5hbWU6IHN0cmluZ1xyXG4pIHtcclxuICBjb25zdCBwbHVnaW5CSW5kZXggPSBwbHVnaW5zLmZpbmRJbmRleCgocCkgPT4gcC5uYW1lID09PSBwbHVnaW5CTmFtZSlcclxuICBpZiAocGx1Z2luQkluZGV4ID09PSAtMSkgcmV0dXJuXHJcblxyXG4gIGNvbnN0IHBsdWdpbkFJbmRleCA9IHBsdWdpbnMuZmluZEluZGV4KChwKSA9PiBwLm5hbWUgPT09IHBsdWdpbkFOYW1lKVxyXG4gIGlmIChwbHVnaW5BSW5kZXggPT09IC0xKSByZXR1cm5cclxuXHJcbiAgaWYgKG9yZGVyID09PSAnYmVmb3JlJyAmJiBwbHVnaW5BSW5kZXggPiBwbHVnaW5CSW5kZXgpIHtcclxuICAgIGNvbnN0IHBsdWdpbkEgPSBwbHVnaW5zLnNwbGljZShwbHVnaW5BSW5kZXgsIDEpWzBdXHJcbiAgICBwbHVnaW5zLnNwbGljZShwbHVnaW5CSW5kZXgsIDAsIHBsdWdpbkEpXHJcbiAgfVxyXG5cclxuICBpZiAob3JkZXIgPT09ICdhZnRlcicgJiYgcGx1Z2luQUluZGV4IDwgcGx1Z2luQkluZGV4KSB7XHJcbiAgICBjb25zdCBwbHVnaW5BID0gcGx1Z2lucy5zcGxpY2UocGx1Z2luQUluZGV4LCAxKVswXVxyXG4gICAgcGx1Z2lucy5zcGxpY2UocGx1Z2luQkluZGV4LCAwLCBwbHVnaW5BKVxyXG4gIH1cclxufVxyXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkM6XFxcXHhQUk9HUkFNLUxBQlNcXFxcTWl5b21pXFxcXGRvY3NcXFxcLnZpdGVwcmVzc1xcXFxob29rc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxceFBST0dSQU0tTEFCU1xcXFxNaXlvbWlcXFxcZG9jc1xcXFwudml0ZXByZXNzXFxcXGhvb2tzXFxcXG1ldGEudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L3hQUk9HUkFNLUxBQlMvTWl5b21pL2RvY3MvLnZpdGVwcmVzcy9ob29rcy9tZXRhLnRzXCI7aW1wb3J0IHR5cGUgeyBIZWFkQ29uZmlnLCBUcmFuc2Zvcm1Db250ZXh0IH0gZnJvbSAndml0ZXByZXNzJ1xyXG5pbXBvcnQgeyBleGNsdWRlZEZpbGVzIH0gZnJvbSAnLi4vY29uZmlncydcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZW5lcmF0ZU1ldGEoY29udGV4dDogVHJhbnNmb3JtQ29udGV4dCwgaG9zdG5hbWU6IHN0cmluZykge1xyXG4gIGNvbnN0IGhlYWQ6IEhlYWRDb25maWdbXSA9IFtdXHJcbiAgY29uc3QgeyBwYWdlRGF0YSB9ID0gY29udGV4dFxyXG4gIGlmIChcclxuICAgIHBhZ2VEYXRhLmlzTm90Rm91bmQgfHxcclxuICAgIGV4Y2x1ZGVkRmlsZXMuaW5jbHVkZXMocGFnZURhdGEuZmlsZVBhdGgpIHx8XHJcbiAgICBwYWdlRGF0YS5mcm9udG1hdHRlci5leGNsdWRlXHJcbiAgKVxyXG4gICAgcmV0dXJuIGhlYWRcclxuXHJcbiAgY29uc3QgeyByZWxhdGl2ZVBhdGgsIGZyb250bWF0dGVyLCBmaWxlUGF0aCwgbGFzdFVwZGF0ZWQgfSA9IHBhZ2VEYXRhXHJcblxyXG4gIC8vIFVuY29tbWVudCB0byBkZWJ1ZywgYnV0IGRvbid0IGNvbW1pdFxyXG4gIC8vIFRoZSBsYXN0IGZpbGVQYXRoIHByaW50ZWQgYmVmb3JlIHRoZSBlcnJvciBpcyB0aGUgb25lIHRoYXQncyBjYXVzaW5nIHRoZSBlcnJvclxyXG4gIC8vIGNvbnNvbGUuaW5mbyh7IGZpbGVQYXRoIH0pO1xyXG4gIGNvbnN0IHVybCA9IGAke2hvc3RuYW1lfS8ke3JlbGF0aXZlUGF0aC5yZXBsYWNlKC8oKF58XFwvKWluZGV4KT9cXC5tZCQvLCAnJDInKX1gXHJcblxyXG4gIGhlYWQucHVzaChcclxuICAgIFsnbGluaycsIHsgcmVsOiAnY2Fub25pY2FsJywgaHJlZjogdXJsIH1dLFxyXG4gICAgWydtZXRhJywgeyBwcm9wZXJ0eTogJ29nOnVybCcsIGNvbnRlbnQ6IHVybCB9XSxcclxuICAgIFsnbWV0YScsIHsgbmFtZTogJ3R3aXR0ZXI6dXJsJywgY29udGVudDogdXJsIH1dLFxyXG4gICAgWydtZXRhJywgeyBuYW1lOiAndHdpdHRlcjpjYXJkJywgY29udGVudDogJ3N1bW1hcnlfbGFyZ2VfaW1hZ2UnIH1dXHJcbiAgKVxyXG5cclxuICBpZiAoZnJvbnRtYXR0ZXIudGhlbWUpIHtcclxuICAgIGhlYWQucHVzaChbJ21ldGEnLCB7IG5hbWU6ICd0aGVtZS1jb2xvcicsIGNvbnRlbnQ6IGZyb250bWF0dGVyLnRoZW1lIH1dKVxyXG4gIH1cclxuXHJcbiAgaWYgKGZyb250bWF0dGVyLnR5cGUpIHtcclxuICAgIGhlYWQucHVzaChbJ21ldGEnLCB7IHByb3BlcnR5OiAnb2c6dHlwZScsIGNvbnRlbnQ6IGZyb250bWF0dGVyLnR5cGUgfV0pXHJcbiAgfVxyXG5cclxuICBoZWFkLnB1c2goXHJcbiAgICBbXHJcbiAgICAgICdtZXRhJyxcclxuICAgICAge1xyXG4gICAgICAgIHByb3BlcnR5OiAnb2c6ZGVzY3JpcHRpb24nLFxyXG4gICAgICAgIGNvbnRlbnQ6IGZyb250bWF0dGVyLmN1c3RvbURlc2NyaXB0aW9uID8/IGZyb250bWF0dGVyLmRlc2NyaXB0aW9uXHJcbiAgICAgIH1cclxuICAgIF0sXHJcbiAgICBbXHJcbiAgICAgICdtZXRhJyxcclxuICAgICAge1xyXG4gICAgICAgIG5hbWU6ICd0d2l0dGVyOmRlc2NyaXB0aW9uJyxcclxuICAgICAgICBjb250ZW50OiBmcm9udG1hdHRlci5jdXN0b21EZXNjcmlwdGlvbiA/PyBmcm9udG1hdHRlci5kZXNjcmlwdGlvblxyXG4gICAgICB9XHJcbiAgICBdLFxyXG4gICAgWydtZXRhJywgeyBwcm9wZXJ0eTogJ29nOnRpdGxlJywgY29udGVudDogZnJvbnRtYXR0ZXIudGl0bGUgfV0sXHJcbiAgICBbJ21ldGEnLCB7IG5hbWU6ICd0d2l0dGVyOnRpdGxlJywgY29udGVudDogZnJvbnRtYXR0ZXIudGl0bGUgfV1cclxuICApXHJcblxyXG4gIGlmIChmcm9udG1hdHRlci5pbWFnZSkge1xyXG4gICAgaGVhZC5wdXNoKFtcclxuICAgICAgJ21ldGEnLFxyXG4gICAgICB7XHJcbiAgICAgICAgcHJvcGVydHk6ICdvZzppbWFnZScsXHJcbiAgICAgICAgY29udGVudDogYCR7aG9zdG5hbWV9LyR7ZnJvbnRtYXR0ZXIuaW1hZ2UucmVwbGFjZSgvXlxcLy8sICcnKX1gXHJcbiAgICAgIH1cclxuICAgIF0pXHJcbiAgICBoZWFkLnB1c2goW1xyXG4gICAgICAnbWV0YScsXHJcbiAgICAgIHtcclxuICAgICAgICBuYW1lOiAndHdpdHRlcjppbWFnZScsXHJcbiAgICAgICAgY29udGVudDogYCR7aG9zdG5hbWV9LyR7ZnJvbnRtYXR0ZXIuaW1hZ2UucmVwbGFjZSgvXlxcLy8sICcnKX1gXHJcbiAgICAgIH1cclxuICAgIF0pXHJcbiAgfSBlbHNlIHtcclxuICAgIC8vIEhvbWUgcGFnZS5cclxuICAgIGNvbnN0IHVybCA9IGZpbGVQYXRoLnJlcGxhY2UoJ2luZGV4Lm1kJywgJycpLnJlcGxhY2UoJy5tZCcsICcnKVxyXG4gICAgY29uc3QgaW1hZ2VVcmwgPSBgJHt1cmx9L19fb2dfaW1hZ2VfXy9vZy5wbmdgXHJcbiAgICAgIC5yZXBsYWNlKC9cXC9cXC8vZywgJy8nKVxyXG4gICAgICAucmVwbGFjZSgvXlxcLy8sICcnKVxyXG5cclxuICAgIGhlYWQucHVzaChbXHJcbiAgICAgICdtZXRhJyxcclxuICAgICAgeyBwcm9wZXJ0eTogJ29nOmltYWdlJywgY29udGVudDogYCR7aG9zdG5hbWV9LyR7aW1hZ2VVcmx9YCB9XHJcbiAgICBdKVxyXG4gICAgaGVhZC5wdXNoKFsnbWV0YScsIHsgcHJvcGVydHk6ICdvZzppbWFnZTp3aWR0aCcsIGNvbnRlbnQ6ICcxMDk4JyB9XSlcclxuICAgIGhlYWQucHVzaChbJ21ldGEnLCB7IHByb3BlcnR5OiAnb2c6aW1hZ2U6aGVpZ2h0JywgY29udGVudDogJzUzMCcgfV0pXHJcbiAgICBoZWFkLnB1c2goWydtZXRhJywgeyBwcm9wZXJ0eTogJ29nOmltYWdlOnR5cGUnLCBjb250ZW50OiAnaW1hZ2UvcG5nJyB9XSlcclxuICAgIGhlYWQucHVzaChbXHJcbiAgICAgICdtZXRhJyxcclxuICAgICAgeyBwcm9wZXJ0eTogJ29nOmltYWdlOmFsdCcsIGNvbnRlbnQ6IGZyb250bWF0dGVyLnRpdGxlIH1cclxuICAgIF0pXHJcbiAgICBoZWFkLnB1c2goW1xyXG4gICAgICAnbWV0YScsXHJcbiAgICAgIHsgbmFtZTogJ3R3aXR0ZXI6aW1hZ2UnLCBjb250ZW50OiBgJHtob3N0bmFtZX0vJHtpbWFnZVVybH1gIH1cclxuICAgIF0pXHJcbiAgICBoZWFkLnB1c2goWydtZXRhJywgeyBuYW1lOiAndHdpdHRlcjppbWFnZTp3aWR0aCcsIGNvbnRlbnQ6ICcxMDk4JyB9XSlcclxuICAgIGhlYWQucHVzaChbJ21ldGEnLCB7IG5hbWU6ICd0d2l0dGVyOmltYWdlOmhlaWdodCcsIGNvbnRlbnQ6ICc1MzAnIH1dKVxyXG4gICAgaGVhZC5wdXNoKFtcclxuICAgICAgJ21ldGEnLFxyXG4gICAgICB7IG5hbWU6ICd0d2l0dGVyOmltYWdlOmFsdCcsIGNvbnRlbnQ6IGZyb250bWF0dGVyLnRpdGxlIH1cclxuICAgIF0pXHJcbiAgfVxyXG5cclxuICBpZiAoZnJvbnRtYXR0ZXIudGFnKSB7XHJcbiAgICBoZWFkLnB1c2goWydtZXRhJywgeyBwcm9wZXJ0eTogJ2FydGljbGU6dGFnJywgY29udGVudDogZnJvbnRtYXR0ZXIudGFnIH1dKVxyXG4gIH1cclxuXHJcbiAgaWYgKGZyb250bWF0dGVyLmRhdGUpIHtcclxuICAgIGhlYWQucHVzaChbXHJcbiAgICAgICdtZXRhJyxcclxuICAgICAge1xyXG4gICAgICAgIHByb3BlcnR5OiAnYXJ0aWNsZTpwdWJsaXNoZWRfdGltZScsXHJcbiAgICAgICAgY29udGVudDogZnJvbnRtYXR0ZXIuZGF0ZVxyXG4gICAgICB9XHJcbiAgICBdKVxyXG4gIH1cclxuXHJcbiAgaWYgKGxhc3RVcGRhdGVkICYmIHBhZ2VEYXRhLmZyb250bWF0dGVyLmxhc3RVcGRhdGVkICE9PSBmYWxzZSkge1xyXG4gICAgaGVhZC5wdXNoKFtcclxuICAgICAgJ21ldGEnLFxyXG4gICAgICB7XHJcbiAgICAgICAgcHJvcGVydHk6ICdhcnRpY2xlOm1vZGlmaWVkX3RpbWUnLFxyXG4gICAgICAgIGNvbnRlbnQ6IG5ldyBEYXRlKGxhc3RVcGRhdGVkKS50b0lTT1N0cmluZygpXHJcbiAgICAgIH1cclxuICAgIF0pXHJcbiAgfVxyXG5cclxuICByZXR1cm4gaGVhZFxyXG59XHJcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxceFBST0dSQU0tTEFCU1xcXFxNaXlvbWlcXFxcZG9jc1xcXFwudml0ZXByZXNzXFxcXGhvb2tzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFx4UFJPR1JBTS1MQUJTXFxcXE1peW9taVxcXFxkb2NzXFxcXC52aXRlcHJlc3NcXFxcaG9va3NcXFxcb3BlbmdyYXBoLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi94UFJPR1JBTS1MQUJTL01peW9taS9kb2NzLy52aXRlcHJlc3MvaG9va3Mvb3BlbmdyYXBoLnRzXCI7aW1wb3J0IHsgbWtkaXIsIHJlYWRGaWxlLCB3cml0ZUZpbGUgfSBmcm9tICdub2RlOmZzL3Byb21pc2VzJ1xyXG5pbXBvcnQgeyBkaXJuYW1lLCByZXNvbHZlIH0gZnJvbSAnbm9kZTpwYXRoJ1xyXG5pbXBvcnQgeyBmaWxlVVJMVG9QYXRoIH0gZnJvbSAnbm9kZTp1cmwnXHJcbmltcG9ydCB7IGNyZWF0ZUNvbnRlbnRMb2FkZXIgfSBmcm9tICd2aXRlcHJlc3MnXHJcbmltcG9ydCB0eXBlIHsgQ29udGVudERhdGEsIFNpdGVDb25maWcgfSBmcm9tICd2aXRlcHJlc3MnXHJcbmltcG9ydCB7IHR5cGUgU2F0b3JpT3B0aW9ucywgc2F0b3JpVnVlIH0gZnJvbSAneC1zYXRvcmkvdnVlJ1xyXG5pbXBvcnQgeyByZW5kZXJBc3luYyB9IGZyb20gJ0ByZXN2Zy9yZXN2Zy1qcydcclxuaW1wb3J0IHsgZXhjbHVkZWRGaWxlcyB9IGZyb20gJy4uL2NvbmZpZ3MnXHJcblxyXG5jb25zdCBfX2Rpcm5hbWUgPSBkaXJuYW1lKGZpbGVVUkxUb1BhdGgoaW1wb3J0Lm1ldGEudXJsKSlcclxuY29uc3QgX19mb250cyA9IHJlc29sdmUoX19kaXJuYW1lLCAnLi4vZm9udHMnKVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdlbmVyYXRlSW1hZ2VzKGNvbmZpZzogU2l0ZUNvbmZpZykge1xyXG4gIGNvbnN0IHBhZ2VzID0gYXdhaXQgY3JlYXRlQ29udGVudExvYWRlcignKiovKi5tZCcsIHtcclxuICAgIGV4Y2VycHQ6IHRydWUsXHJcbiAgICBnbG9iT3B0aW9uczoge1xyXG4gICAgICBpZ25vcmU6IFsuLi5leGNsdWRlZEZpbGVzLCAnbm9kZV9tb2R1bGVzJywgJ2Rpc3QnXVxyXG4gICAgfVxyXG4gIH0pLmxvYWQoKVxyXG4gIGNvbnN0IHRlbXBsYXRlID0gYXdhaXQgcmVhZEZpbGUoXHJcbiAgICByZXNvbHZlKF9fZGlybmFtZSwgJy4uL3RoZW1lL2NvbXBvbmVudHMvT2dJbWFnZVRlbXBsYXRlLnZ1ZScpLFxyXG4gICAgJ3V0Zi04J1xyXG4gIClcclxuXHJcbiAgY29uc3QgZm9udHM6IFNhdG9yaU9wdGlvbnNbJ2ZvbnRzJ10gPSBbXHJcbiAgICB7XHJcbiAgICAgIG5hbWU6ICdJbnRlcicsXHJcbiAgICAgIGRhdGE6IGF3YWl0IHJlYWRGaWxlKHJlc29sdmUoX19mb250cywgJ0ludGVyLVJlZ3VsYXIub3RmJykpLFxyXG4gICAgICB3ZWlnaHQ6IDQwMCxcclxuICAgICAgc3R5bGU6ICdub3JtYWwnXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBuYW1lOiAnSW50ZXInLFxyXG4gICAgICBkYXRhOiBhd2FpdCByZWFkRmlsZShyZXNvbHZlKF9fZm9udHMsICdJbnRlci1NZWRpdW0ub3RmJykpLFxyXG4gICAgICB3ZWlnaHQ6IDUwMCxcclxuICAgICAgc3R5bGU6ICdub3JtYWwnXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBuYW1lOiAnSW50ZXInLFxyXG4gICAgICBkYXRhOiBhd2FpdCByZWFkRmlsZShyZXNvbHZlKF9fZm9udHMsICdJbnRlci1TZW1pQm9sZC5vdGYnKSksXHJcbiAgICAgIHdlaWdodDogNjAwLFxyXG4gICAgICBzdHlsZTogJ25vcm1hbCdcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIG5hbWU6ICdJbnRlcicsXHJcbiAgICAgIGRhdGE6IGF3YWl0IHJlYWRGaWxlKHJlc29sdmUoX19mb250cywgJ0ludGVyLUJvbGQub3RmJykpLFxyXG4gICAgICB3ZWlnaHQ6IDcwMCxcclxuICAgICAgc3R5bGU6ICdub3JtYWwnXHJcbiAgICB9XHJcbiAgXVxyXG5cclxuICBjb25zdCBmaWx0ZXJlZFBhZ2VzID0gcGFnZXMuZmlsdGVyKChwKSA9PiBwLmZyb250bWF0dGVyLmltYWdlID09PSB1bmRlZmluZWQpXHJcblxyXG4gIGZvciAoY29uc3QgcGFnZSBvZiBmaWx0ZXJlZFBhZ2VzKSB7XHJcbiAgICBhd2FpdCBnZW5lcmF0ZUltYWdlKHtcclxuICAgICAgcGFnZSxcclxuICAgICAgdGVtcGxhdGUsXHJcbiAgICAgIG91dERpcjogY29uZmlnLm91dERpcixcclxuICAgICAgZm9udHNcclxuICAgIH0pXHJcbiAgfVxyXG59XHJcblxyXG5pbnRlcmZhY2UgR2VuZXJhdGVJbWFnZXNPcHRpb25zIHtcclxuICBwYWdlOiBDb250ZW50RGF0YVxyXG4gIHRlbXBsYXRlOiBzdHJpbmdcclxuICBvdXREaXI6IHN0cmluZ1xyXG4gIGZvbnRzOiBTYXRvcmlPcHRpb25zWydmb250cyddXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldERpcih1cmw6IHN0cmluZykge1xyXG4gIGlmICh1cmwuc3RhcnRzV2l0aCgnL2dsb3NzYXJ5LycpKSB7XHJcbiAgICByZXR1cm4gJ0dsb3NzYXJ5J1xyXG4gIH0gZWxzZSBpZiAodXJsLnN0YXJ0c1dpdGgoJy9ndWlkZXMvJykpIHtcclxuICAgIHJldHVybiAnR3VpZGUnXHJcbiAgfVxyXG5cclxuICAvLyBNZWFucyB3ZSBhcmUgYXQgcm9vdC5cclxuICByZXR1cm4gdW5kZWZpbmVkXHJcbn1cclxuXHJcbmFzeW5jIGZ1bmN0aW9uIGdlbmVyYXRlSW1hZ2Uoe1xyXG4gIHBhZ2UsXHJcbiAgdGVtcGxhdGUsXHJcbiAgb3V0RGlyLFxyXG4gIGZvbnRzXHJcbn06IEdlbmVyYXRlSW1hZ2VzT3B0aW9ucykge1xyXG4gIGNvbnN0IHsgZnJvbnRtYXR0ZXIsIHVybCB9ID0gcGFnZVxyXG5cclxuICBjb25zdCBvcHRpb25zOiBTYXRvcmlPcHRpb25zID0ge1xyXG4gICAgd2lkdGg6IDEyODAsXHJcbiAgICBoZWlnaHQ6IDY4NixcclxuICAgIGZvbnRzLFxyXG4gICAgcHJvcHM6IHtcclxuICAgICAgdGl0bGU6XHJcbiAgICAgICAgZnJvbnRtYXR0ZXIubGF5b3V0ID09PSAnaG9tZSdcclxuICAgICAgICAgID8gKGZyb250bWF0dGVyLmhlcm8ubmFtZSA/PyBmcm9udG1hdHRlci50aXRsZSlcclxuICAgICAgICAgIDogKGZyb250bWF0dGVyLmN1c3RvbU1ldGFUaXRsZSA/PyBmcm9udG1hdHRlci50aXRsZSksXHJcbiAgICAgIGRlc2NyaXB0aW9uOlxyXG4gICAgICAgIGZyb250bWF0dGVyLmxheW91dCA9PT0gJ2hvbWUnXHJcbiAgICAgICAgICA/IChmcm9udG1hdHRlci5oZXJvLnRhZ2xpbmUgPz8gZnJvbnRtYXR0ZXIuZGVzY3JpcHRpb24pXHJcbiAgICAgICAgICA6IGZyb250bWF0dGVyLmRlc2NyaXB0aW9uLFxyXG4gICAgICBkaXI6IGdldERpcih1cmwpXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjb25zdCBzdmcgPSBhd2FpdCBzYXRvcmlWdWUob3B0aW9ucywgdGVtcGxhdGUpXHJcblxyXG4gIGNvbnN0IHJlbmRlciA9IGF3YWl0IHJlbmRlckFzeW5jKHN2ZylcclxuXHJcbiAgY29uc3Qgb3V0cHV0Rm9sZGVyID0gcmVzb2x2ZShvdXREaXIsIHVybC5zdWJzdHJpbmcoMSksICdfX29nX2ltYWdlX18nKVxyXG4gIGNvbnN0IG91dHB1dEZpbGUgPSByZXNvbHZlKG91dHB1dEZvbGRlciwgJ29nLnBuZycpXHJcblxyXG4gIGF3YWl0IG1rZGlyKG91dHB1dEZvbGRlciwgeyByZWN1cnNpdmU6IHRydWUgfSlcclxuXHJcbiAgcmV0dXJuIGF3YWl0IHdyaXRlRmlsZShvdXRwdXRGaWxlLCByZW5kZXIuYXNQbmcoKSlcclxufVxyXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkM6XFxcXHhQUk9HUkFNLUxBQlNcXFxcTWl5b21pXFxcXGRvY3NcXFxcLnZpdGVwcmVzc1xcXFxtYXJrZG93blwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxceFBST0dSQU0tTEFCU1xcXFxNaXlvbWlcXFxcZG9jc1xcXFwudml0ZXByZXNzXFxcXG1hcmtkb3duXFxcXGhlYWRlcnMudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L3hQUk9HUkFNLUxBQlMvTWl5b21pL2RvY3MvLnZpdGVwcmVzcy9tYXJrZG93bi9oZWFkZXJzLnRzXCI7LyoqXHJcbiAgQ29weXJpZ2h0IChjKSB0YXNreWxpemFyZC4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuXHJcbiAgTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcblxyXG4gIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG5cclxuICBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxyXG4gIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuKi9cclxuaW1wb3J0IHR5cGUgeyBNYXJrZG93blJlbmRlcmVyIH0gZnJvbSAndml0ZXByZXNzJ1xyXG5cclxuY29uc3QgZXhjbHVkZWQgPSBbJ0NyZWRpdHMnXVxyXG5cclxuZXhwb3J0IGNvbnN0IGhlYWRlcnNQbHVnaW4gPSAobWQ6IE1hcmtkb3duUmVuZGVyZXIpID0+IHtcclxuICAvLyBBZGQgdGhlIEZlZWRiYWNrIGNvbXBvbmVudCBpbiB0aGUgaGVhZGluZywgYmVmb3JlIHRoZSBsaW5rLlxyXG4gIC8vXHJcbiAgLy8gQWRkaW5nIGl0IGFmdGVyIHRoZSBsaW5rIGlzIGNsb3NlZCBwcmV2ZW50cyB2aXRlcHJlc3MgZnJvbSBwcm9wZXJseVxyXG4gIC8vIGluZGV4aW5nIHRoZSBmaWxlJ3MgY29udGVudC5cclxuXHJcbiAgbWQucmVuZGVyZXIucnVsZXMuaGVhZGluZ19vcGVuID0gKHRva2VucywgaWR4LCBvcHRpb25zLCBlbnYsIHNlbGYpID0+IHtcclxuICAgIGNvbnN0IHJlc3VsdCA9IHNlbGYucmVuZGVyVG9rZW4odG9rZW5zLCBpZHgsIG9wdGlvbnMpXHJcblxyXG4gICAgY29uc3QgaWR4Q2xvc2UgPVxyXG4gICAgICBpZHggK1xyXG4gICAgICB0b2tlbnMuc2xpY2UoaWR4KS5maW5kSW5kZXgoKHRva2VuKSA9PiB0b2tlbi50eXBlID09PSAnaGVhZGluZ19jbG9zZScpXHJcbiAgICBpZiAoaWR4Q2xvc2UgPD0gaWR4KSByZXR1cm4gcmVzdWx0XHJcblxyXG4gICAgY29uc3QgbGV2ZWwgPSB0b2tlbnNbaWR4XS50YWcuc2xpY2UoMSlcclxuICAgIGlmIChleGNsdWRlZC5pbmNsdWRlcyhlbnYuZnJvbnRtYXR0ZXIudGl0bGUpIHx8IGxldmVsICE9PSAnMicpIHJldHVybiByZXN1bHRcclxuXHJcbiAgICAvLyBGaW5kIHRoZSB0b2tlbiBmb3IgdGhlIGxpbmsuXHJcbiAgICAvL1xyXG4gICAgLy8gVGhlIHRva2VuIGFmdGVyIGBoZWFkaW5nX29wZW5gIGNvbnRhaW5zIHRoZSBsaW5rIGFzIGEgY2hpbGQgdG9rZW4uXHJcbiAgICBjb25zdCBjaGlsZHJlbiA9IHRva2Vuc1tpZHggKyAxXS5jaGlsZHJlbiB8fCBbXVxyXG4gICAgY29uc3QgbGlua09wZW5Ub2tlbiA9IGNoaWxkcmVuLmZpbmQoKGMpID0+IGMudHlwZSA9PT0gJ2xpbmtfb3BlbicpXHJcbiAgICBpZiAoIWxpbmtPcGVuVG9rZW4pIHJldHVybiByZXN1bHRcclxuXHJcbiAgICBjb25zdCBoZWFkaW5nID0gdG9rZW5zW2lkeENsb3NlIC0gMV1cclxuXHJcbiAgICBsaW5rT3BlblRva2VuLm1ldGEgPSBsaW5rT3BlblRva2VuLm1ldGEgfHwge31cclxuICAgIGxpbmtPcGVuVG9rZW4ubWV0YS5mZWVkYmFjayA9IHtcclxuICAgICAgaGVhZGluZzogaGVhZGluZy5jb250ZW50XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHJlc3VsdFxyXG4gIH1cclxuXHJcbiAgbWQucmVuZGVyZXIucnVsZXMubGlua19vcGVuID0gKHRva2VucywgaWR4LCBvcHRpb25zLCBlbnYsIHNlbGYpID0+IHtcclxuICAgIGNvbnN0IHJlc3VsdCA9IHNlbGYucmVuZGVyVG9rZW4odG9rZW5zLCBpZHgsIG9wdGlvbnMpXHJcblxyXG4gICAgY29uc3QgbWV0YSA9IHRva2Vuc1tpZHhdLm1ldGFcclxuICAgIGlmICghbWV0YSB8fCAhbWV0YS5mZWVkYmFjaykgcmV0dXJuIHJlc3VsdFxyXG5cclxuICAgIGNvbnN0IGhlYWRpbmcgPSBtZXRhLmZlZWRiYWNrLmhlYWRpbmcgfHwgJydcclxuICAgIGlmICghaGVhZGluZykgcmV0dXJuIHJlc3VsdFxyXG5cclxuICAgIHJldHVybiBgPEZlZWRiYWNrIGhlYWRpbmc9XCIke2hlYWRpbmd9XCIgLz4ke3Jlc3VsdH1gXHJcbiAgfVxyXG59XHJcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxceFBST0dSQU0tTEFCU1xcXFxNaXlvbWlcXFxcZG9jc1xcXFwudml0ZXByZXNzXFxcXGNvbmZpZ3NcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXHhQUk9HUkFNLUxBQlNcXFxcTWl5b21pXFxcXGRvY3NcXFxcLnZpdGVwcmVzc1xcXFxjb25maWdzXFxcXHNoYXJlZC50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzoveFBST0dSQU0tTEFCUy9NaXlvbWkvZG9jcy8udml0ZXByZXNzL2NvbmZpZ3Mvc2hhcmVkLnRzXCI7aW1wb3J0IHR5cGUgeyBEZWZhdWx0VGhlbWUsIFVzZXJDb25maWcgfSBmcm9tICd2aXRlcHJlc3MnXHJcbmltcG9ydCB7IGdlbmVyYXRlSW1hZ2VzLCBnZW5lcmF0ZU1ldGEgfSBmcm9tICcuLi9ob29rcydcclxuaW1wb3J0IHsgaGVhZGVyc1BsdWdpbiB9IGZyb20gJy4uL21hcmtkb3duL2hlYWRlcnMnXHJcbmltcG9ydCB7IGZpZ3VyZSB9IGZyb20gJ0BtZGl0L3BsdWdpbi1maWd1cmUnXHJcbmltcG9ydCB7IGltZ0xhenlsb2FkIH0gZnJvbSAnQG1kaXQvcGx1Z2luLWltZy1sYXp5bG9hZCdcclxuaW1wb3J0IHsgYWxpZ24gfSBmcm9tICdAbWRpdC9wbHVnaW4tYWxpZ24nXHJcbmltcG9ydCB7IGltZ1NpemUgfSBmcm9tICdAbWRpdC9wbHVnaW4taW1nLXNpemUnXHJcbmltcG9ydCB7IHRhYnNNYXJrZG93blBsdWdpbiB9IGZyb20gJ3ZpdGVwcmVzcy1wbHVnaW4tdGFicydcclxuaW1wb3J0IHsgZW1vamlSZW5kZXIsIGRlZnMsIG1vdmVQbHVnaW4gfSBmcm9tICcuL2Vtb2ppJ1xyXG5pbXBvcnQgeyB4IH0gZnJvbSAndGlueWV4ZWMnXHJcbmltcG9ydCB7XHJcbiAgUGFnZVByb3BlcnRpZXMsXHJcbiAgUGFnZVByb3BlcnRpZXNNYXJrZG93blNlY3Rpb25cclxufSBmcm9tICdAbm9sZWJhc2Uvdml0ZXByZXNzLXBsdWdpbi1wYWdlLXByb3BlcnRpZXMvdml0ZSdcclxuaW1wb3J0IHtcclxuICBHaXRDaGFuZ2Vsb2csXHJcbiAgR2l0Q2hhbmdlbG9nTWFya2Rvd25TZWN0aW9uXHJcbn0gZnJvbSAnQG5vbGViYXNlL3ZpdGVwcmVzcy1wbHVnaW4tZ2l0LWNoYW5nZWxvZy92aXRlJ1xyXG5pbXBvcnQgeyBmaWxlVVJMVG9QYXRoLCBVUkwgfSBmcm9tICdub2RlOnVybCdcclxuaW1wb3J0IFVub0NTUyBmcm9tICd1bm9jc3Mvdml0ZSdcclxuXHJcbmV4cG9ydCBjb25zdCBob3N0bmFtZTogc3RyaW5nID0gJ2h0dHBzOi8vbWl5b21pLnZlcmNlbC5hcHAnXHJcbmV4cG9ydCBjb25zdCBleGNsdWRlZEZpbGVzID0gWyd0Lm1kJ11cclxuY29uc3QgR0lUX0NPTU1JVCA9XHJcbiAgLyoqIEdpdGh1YiBhY3Rpb25zIGNvbW1pdCBoYXNoICovXHJcbiAgcHJvY2Vzcy5lbnYuR0lUSFVCX1NIQSA/P1xyXG4gIC8qKiBDb21taXQgaGFzaCBmcm9tIGdpdCAqL1xyXG4gIChhd2FpdCB4KCdnaXQnLCBbJ3Jldi1wYXJzZScsICdIRUFEJ10pLnRoZW4oKHJlc3VsdCkgPT5cclxuICAgIHJlc3VsdC5zdGRvdXQudHJpbSgpXHJcbiAgKSkgPz9cclxuICAnZGV2J1xyXG5cclxuLy8gQHVub2Nzcy1pbmNsdWRlXHJcbmNvbnN0IG5hdjogRGVmYXVsdFRoZW1lLk5hdkl0ZW1bXSA9IFtcclxuICB7XHJcbiAgICB0ZXh0OiAnUGFnZXMnLFxyXG4gICAgaXRlbXM6IFtcclxuICAgICAge1xyXG4gICAgICAgIHRleHQ6ICdRdWljayBTdGFydCcsXHJcbiAgICAgICAgbGluazogJy9xcydcclxuICAgICAgfSxcclxuICAgICAgeyB0ZXh0OiAnV2Vic2l0ZXMnLCBsaW5rOiAnL3dlYnNpdGVzJyB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgdGV4dDogJ1NvZnR3YXJlJyxcclxuICAgICAgICBsaW5rOiAnL3NvZnR3YXJlJ1xyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgdGV4dDogJ0V4dGVuc2lvbicsXHJcbiAgICAgICAgbGluazogJy9leHQtcmVwb3MnXHJcbiAgICAgIH0sXHJcbiAgICAgIHsgdGV4dDogJ1Rvb2xzJywgbGluazogJy90b29scycgfSxcclxuICAgICAgeyB0ZXh0OiAnQXJ0JywgbGluazogJy9hcnQnIH0sXHJcbiAgICAgIHtcclxuICAgICAgICB0ZXh0OiAnRkFRcycsXHJcbiAgICAgICAgbGluazogJy9mYXEnXHJcbiAgICAgIH0sXHJcbiAgICAgIHsgdGV4dDogJ05TRlcnLCBsaW5rOiAnL25zZncnIH0sXHJcbiAgICAgIHsgdGV4dDogJ1NjYW5sYXRpb24nLCBsaW5rOiAnL3NjYW5sYXRpb24nIH0sXHJcbiAgICAgIHtcclxuICAgICAgICB0ZXh0OiAnQ29tbXVuaXRpZXMnLFxyXG4gICAgICAgIGxpbms6ICcvY29tbXVuaXRpZXMnXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICB0ZXh0OiAnQ3JlZGl0cycsXHJcbiAgICAgICAgbGluazogJy9jcmVkaXRzJ1xyXG4gICAgICB9XHJcbiAgICBdXHJcbiAgfSxcclxuICB7XHJcbiAgICB0ZXh0OiAnR2xvc3NhcnknLFxyXG4gICAgaXRlbXM6IFtcclxuICAgICAgeyB0ZXh0OiAnR2VuZXJhbCcsIGxpbms6ICcvZ2xvc3NhcnkvZ2VuZXJhbCcgfSxcclxuICAgICAgeyB0ZXh0OiAnQW5pbWUnLCBsaW5rOiAnL2dsb3NzYXJ5L2FuaW1lJyB9LFxyXG4gICAgICB7IHRleHQ6ICdNYW5nYScsIGxpbms6ICcvZ2xvc3NhcnkvbWFuZ2EnIH0sXHJcbiAgICAgIHsgdGV4dDogJ0F1ZGlvJywgbGluazogJy9nbG9zc2FyeS9hdWRpbycgfSxcclxuICAgICAgeyB0ZXh0OiAnTlNGVycsIGxpbms6ICcvZ2xvc3NhcnkvbnNmdycgfVxyXG4gICAgXVxyXG4gIH0sXHJcbiAge1xyXG4gICAgdGV4dDogJ0d1aWRlcycsXHJcbiAgICAvLyBAdHMtZXhwZWN0LWVycm9yXHJcbiAgICBjb2xsYXBzZWQ6IHRydWUsXHJcbiAgICBpdGVtczogW1xyXG4gICAgICB7XHJcbiAgICAgICAgdGV4dDogJ0FuaW1lJyxcclxuICAgICAgICBpdGVtczogW1xyXG4gICAgICAgICAgeyB0ZXh0OiAnRGlzYyBSaXBwaW5nJywgbGluazogJy9ndWlkZXMvYW5pbWUvZGlzY3JpcCcgfSxcclxuICAgICAgICAgIHsgdGV4dDogJ05ldHdvcmsgU3RyZWFtaW5nJywgbGluazogJy9ndWlkZXMvYW5pbWUvbnMnIH1cclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICB0ZXh0OiAnTWFuZ2EnLFxyXG4gICAgICAgIGl0ZW1zOiBbXHJcbiAgICAgICAgICB7IHRleHQ6ICdEaWdpdGFsIE1hbmdhIEluZm8nLCBsaW5rOiAnL2d1aWRlcy9tYW5nYS9kaWdpbScgfSxcclxuICAgICAgICAgIHsgdGV4dDogJ0pYTCBNYW5nYSBSZWFkZXJzJywgbGluazogJy9ndWlkZXMvbWFuZ2EvanhsJyB9LFxyXG4gICAgICAgICAgeyB0ZXh0OiAnTWFkb2thbWknLCBsaW5rOiAnL2d1aWRlcy9tYW5nYS9tYWRva2FtaScgfSxcclxuICAgICAgICAgIHsgdGV4dDogJ01hbmdhIEltYWdlIEVkaXRpbmcnLCBsaW5rOiAnL2d1aWRlcy9tYW5nYS9pbWFnZWRpdCcgfVxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIHRleHQ6ICdUZWNobmljYWwnLFxyXG4gICAgICAgIGl0ZW1zOiBbXHJcbiAgICAgICAgICB7IHRleHQ6ICdCbG9ja2luZyBBZHMnLCBsaW5rOiAnL2d1aWRlcy90ZWNoL2FkYmxvY2snIH0sXHJcbiAgICAgICAgICB7IHRleHQ6ICdJUkMgJiBYRENDJywgbGluazogJy9ndWlkZXMvdGVjaC9pcmMnIH0sXHJcbiAgICAgICAgICB7IHRleHQ6ICdKREwyIEFkLXJlbW92YWwnLCBsaW5rOiAnL2d1aWRlcy90ZWNoL2pkbCcgfVxyXG4gICAgICAgIF1cclxuICAgICAgfVxyXG4gICAgXVxyXG4gIH1cclxuXVxyXG5cclxuY29uc3Qgc2lkZWJhcjogRGVmYXVsdFRoZW1lLlNpZGViYXIgPSBbXHJcbiAge1xyXG4gICAgdGV4dDogJzxzcGFuIGNsYXNzPVwiaS1sdWNpZGU6emFwXCI+PC9zcGFuPiBRdWljayBTdGFydCcsXHJcbiAgICBsaW5rOiAnL3FzJ1xyXG4gIH0sXHJcbiAge1xyXG4gICAgdGV4dDogJzxzcGFuIGNsYXNzPVwiaS1sdWNpZGU6Ym94XCI+PC9zcGFuPiBTb2Z0d2FyZScsXHJcbiAgICBsaW5rOiAnL3NvZnR3YXJlJ1xyXG4gIH0sXHJcbiAge1xyXG4gICAgdGV4dDogJzxzcGFuIGNsYXNzPVwiaS1sdWNpZGU6ZWFydGhcIj48L3NwYW4+IFdlYnNpdGVzJyxcclxuICAgIGxpbms6ICcvd2Vic2l0ZXMnXHJcbiAgfSxcclxuICB7XHJcbiAgICB0ZXh0OiAnPHNwYW4gY2xhc3M9XCJpLWx1Y2lkZTpwdXp6bGVcIj48L3NwYW4+IEV4dGVuc2lvbicsXHJcbiAgICBsaW5rOiAnL2V4dC1yZXBvcydcclxuICB9LFxyXG4gIHtcclxuICAgIHRleHQ6ICc8c3BhbiBjbGFzcz1cImktbHVjaWRlOndyZW5jaFwiPjwvc3Bhbj4gVG9vbHMnLFxyXG4gICAgbGluazogJy90b29scydcclxuICB9LFxyXG4gIHtcclxuICAgIHRleHQ6ICc8c3BhbiBjbGFzcz1cImktbHVjaWRlOmJydXNoXCI+PC9zcGFuPiBBcnQnLFxyXG4gICAgbGluazogJy9hcnQnXHJcbiAgfSxcclxuICB7XHJcbiAgICB0ZXh0OiAnPHNwYW4gY2xhc3M9XCJpLWx1Y2lkZTpiYW5cIj48L3NwYW4+IE5TRlcnLFxyXG4gICAgbGluazogJy9uc2Z3J1xyXG4gIH0sXHJcbiAge1xyXG4gICAgdGV4dDogJzxzcGFuIGNsYXNzPVwiaS1sdWNpZGU6c2Nyb2xsLXRleHRcIj48L3NwYW4+IFNjYW5sYXRpb24nLFxyXG4gICAgbGluazogJy9zY2FubGF0aW9uJ1xyXG4gIH0sXHJcbiAge1xyXG4gICAgdGV4dDogJzxzcGFuIGNsYXNzPVwiaS1sdWNpZGU6Ym9vay1vcGVuXCI+PC9zcGFuPiBHbG9zc2FyeScsXHJcbiAgICBjb2xsYXBzZWQ6IHRydWUsXHJcbiAgICBpdGVtczogW1xyXG4gICAgICB7IHRleHQ6ICdHZW5lcmFsJywgbGluazogJy9nbG9zc2FyeS9nZW5lcmFsJyB9LFxyXG4gICAgICB7IHRleHQ6ICdBbmltZScsIGxpbms6ICcvZ2xvc3NhcnkvYW5pbWUnIH0sXHJcbiAgICAgIHsgdGV4dDogJ01hbmdhJywgbGluazogJy9nbG9zc2FyeS9tYW5nYScgfSxcclxuICAgICAgeyB0ZXh0OiAnQXVkaW8nLCBsaW5rOiAnL2dsb3NzYXJ5L2F1ZGlvJyB9LFxyXG4gICAgICB7IHRleHQ6ICdOU0ZXJywgbGluazogJy9nbG9zc2FyeS9uc2Z3JyB9XHJcbiAgICBdXHJcbiAgfSxcclxuICB7XHJcbiAgICB0ZXh0OiAnPHNwYW4gY2xhc3M9XCJpLWx1Y2lkZTpib29rLWtleVwiPjwvc3Bhbj4gR3VpZGVzJyxcclxuICAgIGNvbGxhcHNlZDogdHJ1ZSxcclxuICAgIGl0ZW1zOiBbXHJcbiAgICAgIHtcclxuICAgICAgICB0ZXh0OiAnQW5pbWUnLFxyXG4gICAgICAgIGNvbGxhcHNlZDogdHJ1ZSxcclxuICAgICAgICBpdGVtczogW1xyXG4gICAgICAgICAgeyB0ZXh0OiAnRGlzYyBSaXBwaW5nJywgbGluazogJy9ndWlkZXMvYW5pbWUvZGlzY3JpcCcgfSxcclxuICAgICAgICAgIHsgdGV4dDogJ05ldHdvcmsgU3RyZWFtaW5nJywgbGluazogJy9ndWlkZXMvYW5pbWUvbnMnIH1cclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICB0ZXh0OiAnTWFuZ2EnLFxyXG4gICAgICAgIGNvbGxhcHNlZDogdHJ1ZSxcclxuICAgICAgICBpdGVtczogW1xyXG4gICAgICAgICAgeyB0ZXh0OiAnRGlnaXRhbCBNYW5nYSBJbmZvJywgbGluazogJy9ndWlkZXMvbWFuZ2EvZGlnaW0nIH0sXHJcbiAgICAgICAgICB7IHRleHQ6ICdKWEwgTWFuZ2EgUmVhZGVycycsIGxpbms6ICcvZ3VpZGVzL21hbmdhL2p4bCcgfSxcclxuICAgICAgICAgIHsgdGV4dDogJ01hZG9rYW1pJywgbGluazogJy9ndWlkZXMvbWFuZ2EvbWFkb2thbWknIH0sXHJcbiAgICAgICAgICB7IHRleHQ6ICdNYW5nYSBJbWFnZSBFZGl0aW5nJywgbGluazogJy9ndWlkZXMvbWFuZ2EvaW1hZ2VkaXQnIH1cclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICB0ZXh0OiAnVGVjaG5pY2FsJyxcclxuICAgICAgICBjb2xsYXBzZWQ6IHRydWUsXHJcbiAgICAgICAgaXRlbXM6IFtcclxuICAgICAgICAgIHsgdGV4dDogJ0Jsb2NraW5nIEFkcycsIGxpbms6ICcvZ3VpZGVzL3RlY2gvYWRibG9jaycgfSxcclxuICAgICAgICAgIHsgdGV4dDogJ0lSQyAmIFhEQ0MnLCBsaW5rOiAnL2d1aWRlcy90ZWNoL2lyYycgfSxcclxuICAgICAgICAgIHsgdGV4dDogJ0pETDIgQWQtcmVtb3ZhbCcsIGxpbms6ICcvZ3VpZGVzL3RlY2gvamRsJyB9XHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICBdXHJcbiAgfSxcclxuICB7XHJcbiAgICB0ZXh0OiAnPHNwYW4gY2xhc3M9XCJpLWx1Y2lkZTptZXNzYWdlLWNpcmNsZS1xdWVzdGlvblwiPjwvc3Bhbj4gRkFRcycsXHJcbiAgICBsaW5rOiAnL2ZhcSdcclxuICB9LFxyXG4gIHtcclxuICAgIHRleHQ6ICc8c3BhbiBjbGFzcz1cImktbHVjaWRlOm1lc3NhZ2VzLXNxdWFyZVwiPjwvc3Bhbj4gQ29tbXVuaXRpZXMnLFxyXG4gICAgbGluazogJy9jb21tdW5pdGllcydcclxuICB9LFxyXG4gIHtcclxuICAgIHRleHQ6ICc8c3BhbiBjbGFzcz1cImktbHVjaWRlOmhlYXJ0LWhhbmRzaGFrZVwiPjwvc3Bhbj4gQ3JlZGl0cycsXHJcbiAgICBsaW5rOiAnL2NyZWRpdHMnXHJcbiAgfSxcclxuXVxyXG5cclxuZXhwb3J0IGNvbnN0IHNoYXJlZDogVXNlckNvbmZpZzxEZWZhdWx0VGhlbWUuQ29uZmlnPiA9IHtcclxuICB0aXRsZTogJ01peW9taScsXHJcbiAgZGVzY3JpcHRpb246XHJcbiAgICAnWW91ciBvbmUtc3RvcCBodWIgZm9yIGxpbmtzLCBhcHBzLCBleHQgcmVwb3MgYW5kIG1vcmUhIFx1RDgzQ1x1REYxRicsXHJcbiAgbGFuZzogJ2VuLVVTJyxcclxuICBsYXN0VXBkYXRlZDogdHJ1ZSxcclxuICBjbGVhblVybHM6IHRydWUsXHJcbiAgaWdub3JlRGVhZExpbmtzOiB0cnVlLFxyXG4gIGFwcGVhcmFuY2U6IHRydWUsXHJcbiAgdGl0bGVUZW1wbGF0ZTogJzp0aXRsZSBcdTIwMjIgTWl5b21pIGJ5IHRhczMzbicsXHJcbiAgaGVhZDogW1xyXG4gICAgWydtZXRhJywgeyBuYW1lOiAndGhlbWUtY29sb3InLCBjb250ZW50OiAnIzU2YjRmYycgfV0sXHJcbiAgICBbJ21ldGEnLCB7IG5hbWU6ICdvZzp0eXBlJywgY29udGVudDogJ3dlYnNpdGUnIH1dLFxyXG4gICAgWydtZXRhJywgeyBuYW1lOiAnb2c6bG9jYWxlJywgY29udGVudDogJ2VuJyB9XSxcclxuICAgIFsnbGluaycsIHsgcmVsOiAnaWNvbicsIGhyZWY6ICcvYXNzZXQvaW5hcmVhZC5wbmcnIH1dLFxyXG4gICAgLy8gUFdBXHJcbiAgICBbXHJcbiAgICAgICdsaW5rJyxcclxuICAgICAgeyByZWw6ICdpY29uJywgaHJlZjogJy9hc3NldC9pbmFyZWFkLnBuZycsIHR5cGU6ICdpbWFnZS9zdmcreG1sJyB9XHJcbiAgICBdLFxyXG4gICAgWydsaW5rJywgeyByZWw6ICdhbHRlcm5hdGUgaWNvbicsIGhyZWY6ICcvYXNzZXQvaW5hcmVhZC5wbmcnIH1dLFxyXG4gICAgW1xyXG4gICAgICAnbGluaycsXHJcbiAgICAgIHsgcmVsOiAnbWFzay1pY29uJywgaHJlZjogJy9hc3NldC9pbmFyZWFkLnBuZycsIGNvbG9yOiAnIzU2YjRmYycgfVxyXG4gICAgXSxcclxuICAgIC8vIHByZXR0aWVyLWlnbm9yZVxyXG4gICAgW1xyXG4gICAgICAnbWV0YScsXHJcbiAgICAgIHtcclxuICAgICAgICBuYW1lOiAna2V5d29yZHMnLFxyXG4gICAgICAgIGNvbnRlbnQ6XHJcbiAgICAgICAgICAnQW5pbWUsIEFuaW1lIFBpcmFjeSwgTWFuZ2EsIE1hbmdhIFBpcmFjeSwgVlR1YmVyLCBIZW50YWksIEpQT1AsIE11c2ljLCBKYXBhbiwgTGVhcm5pbmcgSmFwYW5lc2UsIFdlZWIsIE90YWt1J1xyXG4gICAgICB9XHJcbiAgICBdLFxyXG4gICAgW1xyXG4gICAgICAnbGluaycsXHJcbiAgICAgIHtcclxuICAgICAgICByZWw6ICdhcHBsZS10b3VjaC1pY29uJyxcclxuICAgICAgICBocmVmOiAnL2Fzc2V0L2luYXJlYWQucG5nJyxcclxuICAgICAgICBzaXplczogJzE5MngxOTInXHJcbiAgICAgIH1cclxuICAgIF0sXHJcbiAgICBbXHJcbiAgICAgICdzY3JpcHQnLFxyXG4gICAgICB7IGlkOiAncmVzdG9yZS1iYW5uZXItcHJlZmVyZW5jZScgfSxcclxuICAgICAgYFxyXG4oKCkgPT4ge1xyXG4gIGNvbnN0IHJlc3RvcmUgPSAoa2V5LCBjbHMsIGRlZiA9IGZhbHNlKSA9PiB7XHJcbiAgICBjb25zdCBzYXZlZCA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKGtleSk7XHJcbiAgICBpZiAoc2F2ZWQpIHtcclxuICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdC5hZGQoY2xzKTtcclxuICAgIH1cclxuICB9O1xyXG4gIHJlc3RvcmUoJ2Fja0RvbWFpbkNoYW5nZScsICdiYW5uZXItZGlzbWlzc2VkJyk7XHJcbn0pKCk7YFxyXG4gICAgXVxyXG4gIF0sXHJcbiAgc3JjRXhjbHVkZTogWydSRUFETUUubWQnLCAnc2FuZGJveC8qKi8qLm1kJ10sXHJcbiAgc2l0ZW1hcDoge1xyXG4gICAgaG9zdG5hbWU6IGhvc3RuYW1lXHJcbiAgfSxcclxuICB0cmFuc2Zvcm1IZWFkOiBhc3luYyAoY29udGV4dCkgPT4gZ2VuZXJhdGVNZXRhKGNvbnRleHQsIGhvc3RuYW1lKSxcclxuICAvLyBiaW9tZS1pZ25vcmUgbGludC9zdXNwaWNpb3VzL3VzZUF3YWl0OiA8ZXhwbGFuYXRpb24+XHJcbiAgYnVpbGRFbmQ6IGFzeW5jIChjb250ZXh0KSA9PiB7XHJcbiAgICBnZW5lcmF0ZUltYWdlcyhjb250ZXh0KVxyXG4gIH0sXHJcbiAgbWFya2Rvd246IHtcclxuICAgIGVtb2ppOiB7IGRlZnMgfSxcclxuICAgIGNvbmZpZyhtZCkge1xyXG4gICAgICBtZC51c2UoZW1vamlSZW5kZXIpXHJcbiAgICAgIG1kLnVzZShpbWdMYXp5bG9hZClcclxuICAgICAgbWQudXNlKGFsaWduKVxyXG4gICAgICBtZC51c2UoZmlndXJlKVxyXG4gICAgICBtZC51c2UodGFic01hcmtkb3duUGx1Z2luKVxyXG4gICAgICBtZC51c2UoaW1nU2l6ZSlcclxuICAgICAgbWQudXNlKGhlYWRlcnNQbHVnaW4pXHJcbiAgICB9XHJcbiAgfSxcclxuICB0aGVtZUNvbmZpZzoge1xyXG4gICAgc2VhcmNoOiB7XHJcbiAgICAgIG9wdGlvbnM6IHtcclxuICAgICAgICBtaW5pU2VhcmNoOiB7XHJcbiAgICAgICAgICBzZWFyY2hPcHRpb25zOiB7XHJcbiAgICAgICAgICAgIGNvbWJpbmVXaXRoOiAnQU5EJyxcclxuICAgICAgICAgICAgZnV6enk6IGZhbHNlLFxyXG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgICAgIGJvb3N0RG9jdW1lbnQ6IChcclxuICAgICAgICAgICAgICBfLFxyXG4gICAgICAgICAgICAgIHRlcm0sXHJcbiAgICAgICAgICAgICAgc3RvcmVkRmllbGRzOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmcgfCBzdHJpbmdbXT5cclxuICAgICAgICAgICAgKSA9PiB7XHJcbiAgICAgICAgICAgICAgY29uc3QgdGl0bGVzID0gKHN0b3JlZEZpZWxkcz8udGl0bGVzIGFzIHN0cmluZ1tdKVxyXG4gICAgICAgICAgICAgICAgLmZpbHRlcigodCkgPT4gQm9vbGVhbih0KSlcclxuICAgICAgICAgICAgICAgIC5tYXAoKHQpID0+IHQudG9Mb3dlckNhc2UoKSlcclxuICAgICAgICAgICAgICAvLyBVcHJhdGUgaWYgdGVybSBhcHBlYXJzIGluIHRpdGxlcy4gQWRkIGJvbnVzIGZvciBoaWdoZXIgbGV2ZWxzIChpLmUuIGxvd2VyIGluZGV4KVxyXG4gICAgICAgICAgICAgIGNvbnN0IHRpdGxlSW5kZXggPVxyXG4gICAgICAgICAgICAgICAgdGl0bGVzXHJcbiAgICAgICAgICAgICAgICAgIC5tYXAoKHQsIGkpID0+ICh0Py5pbmNsdWRlcyh0ZXJtKSA/IGkgOiAtMSkpXHJcbiAgICAgICAgICAgICAgICAgIC5maW5kKChpKSA9PiBpID49IDApID8/IC0xXHJcbiAgICAgICAgICAgICAgaWYgKHRpdGxlSW5kZXggPj0gMCkgcmV0dXJuIDEwMDAwIC0gdGl0bGVJbmRleFxyXG5cclxuICAgICAgICAgICAgICByZXR1cm4gMVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBkZXRhaWxlZFZpZXc6IHRydWVcclxuICAgICAgfSxcclxuICAgICAgcHJvdmlkZXI6ICdsb2NhbCdcclxuICAgIH0sXHJcbiAgICBsb2dvOiB7IHNyYzogJy9hc3NldC9pbmFyZWFkLnBuZycgfSxcclxuICAgIHNpZGViYXIsXHJcbiAgICBuYXYsXHJcbiAgICBzb2NpYWxMaW5rczogW1xyXG4gICAgICB7IGljb246ICdnaXRodWInLCBsaW5rOiAnaHR0cHM6Ly9naXRodWIuY29tL3RhczMzbi9taXlvbWknIH0sXHJcbiAgICAgIHsgaWNvbjogJ2Rpc2NvcmQnLCBsaW5rOiAnIycgfSxcclxuICAgIF0sXHJcbiAgICBmb290ZXI6IHtcclxuICAgICAgbWVzc2FnZTogYDxhIGhyZWY9XCJodHRwczovL2dpdGh1Yi5jb20vdGFzMzNuL21peW9taVwiPlRoZSBNaXlvbWkgVGVhbTwvYT4gPHNwYW4gY2xhc3M9XCJkaXZpZGVyXCI+fDwvc3Bhbj4gPGEgaHJlZj1cImh0dHBzOi8vZ2l0aHViLmNvbS90YXMzM24vbWl5b21pL2NvbW1pdC8ke0dJVF9DT01NSVR9XCI+JHtHSVRfQ09NTUlULnNsaWNlKDAsIDcpfTwvYT5gLFxyXG4gICAgICBjb3B5cmlnaHQ6IGBtYWRlIHdpdGggbG92ZSBhbmQgZWVweSBlbmVyZ3lgXHJcbiAgICB9XHJcbiAgfSxcclxuICB2aXRlOiB7XHJcbiAgICBvcHRpbWl6ZURlcHM6IHtcclxuICAgICAgZXhjbHVkZTogW1xyXG4gICAgICAgICdAbm9sZWJhc2Uvdml0ZXByZXNzLXBsdWdpbi1lbmhhbmNlZC1yZWFkYWJpbGl0aWVzL2NsaWVudCcsXHJcbiAgICAgICAgJ0Bub2xlYmFzZS92aXRlcHJlc3MtcGx1Z2luLWdpdC1jaGFuZ2Vsb2cvY2xpZW50JyxcclxuICAgICAgICAnQG5vbGViYXNlL3ZpdGVwcmVzcy1wbHVnaW4tcGFnZS1wcm9wZXJ0aWVzL2NsaWVudCdcclxuICAgICAgXVxyXG4gICAgfSxcclxuICAgIHNzcjoge1xyXG4gICAgICBub0V4dGVybmFsOiBbXHJcbiAgICAgICAgJ0Bub2xlYmFzZS92aXRlcHJlc3MtcGx1Z2luLWVuaGFuY2VkLXJlYWRhYmlsaXRpZXMnLFxyXG4gICAgICAgICdAbm9sZWJhc2Uvdml0ZXByZXNzLXBsdWdpbi1wYWdlLXByb3BlcnRpZXMnLFxyXG4gICAgICAgICdAbm9sZWJhc2Uvdml0ZXByZXNzLXBsdWdpbi1naXQtY2hhbmdlbG9nJyxcclxuICAgICAgICAnQG5vbGViYXNlL3VpJyxcclxuICAgICAgICAnQGZtaHkvY29tcG9uZW50cydcclxuICAgICAgXVxyXG4gICAgfSxcclxuICAgIHBsdWdpbnM6IFtcclxuICAgICAgUGFnZVByb3BlcnRpZXMoKSxcclxuICAgICAgUGFnZVByb3BlcnRpZXNNYXJrZG93blNlY3Rpb24oKSxcclxuICAgICAgR2l0Q2hhbmdlbG9nKHtcclxuICAgICAgICBtYXhHaXRMb2dDb3VudDogMjAsXHJcbiAgICAgICAgcmVwb1VSTDogJ2h0dHBzOi8vZ2l0aHViLmNvbS90YXMzM24vbWl5b21pJ1xyXG4gICAgICB9KSxcclxuICAgICAgR2l0Q2hhbmdlbG9nTWFya2Rvd25TZWN0aW9uKHsgc2VjdGlvbnM6IHsgZGlzYWJsZUNvbnRyaWJ1dG9yczogdHJ1ZSB9IH0pLFxyXG4gICAgICBVbm9DU1Moe1xyXG4gICAgICAgIGNvbmZpZ0ZpbGU6ICcuLi91bm9jc3MuY29uZmlnLnRzJ1xyXG4gICAgICB9KSxcclxuICAgICAge1xyXG4gICAgICAgIG5hbWU6ICdjdXN0b206YWRqdXN0LW9yZGVyJyxcclxuICAgICAgICBjb25maWdSZXNvbHZlZChjKSB7XHJcbiAgICAgICAgICBtb3ZlUGx1Z2luKFxyXG4gICAgICAgICAgICBjLnBsdWdpbnMgYXMgYW55LFxyXG4gICAgICAgICAgICAndml0ZXByZXNzJyxcclxuICAgICAgICAgICAgJ2JlZm9yZScsXHJcbiAgICAgICAgICAgICd1bm9jc3M6dHJhbnNmb3JtZXJzOnByZSdcclxuICAgICAgICAgIClcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIF0sXHJcbiAgICByZXNvbHZlOiB7XHJcbiAgICAgIGFsaWFzOiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgZmluZDogL14uKlxcL1ZQQmFkZ2VcXC52dWUkLyxcclxuICAgICAgICAgIHJlcGxhY2VtZW50OiBmaWxlVVJMVG9QYXRoKFxyXG4gICAgICAgICAgICBuZXcgVVJMKCcuLi90aGVtZS9jb21wb25lbnRzL0JhZGdlLnZ1ZScsIGltcG9ydC5tZXRhLnVybClcclxuICAgICAgICAgIClcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIGZpbmQ6IC9eLipWUFN3aXRjaEFwcGVhcmFuY2VcXC52dWUkLyxcclxuICAgICAgICAgIHJlcGxhY2VtZW50OiBmaWxlVVJMVG9QYXRoKFxyXG4gICAgICAgICAgICBuZXcgVVJMKFxyXG4gICAgICAgICAgICAgICcuLi90aGVtZS9jb21wb25lbnRzL1ZQU3dpdGNoQXBwZWFyYW5jZS52dWUnLFxyXG4gICAgICAgICAgICAgIGltcG9ydC5tZXRhLnVybFxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgICApXHJcbiAgICAgICAgfVxyXG4gICAgICBdXHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBeVMsU0FBUyxvQkFBb0I7OztBQ0l0VSxTQUFTLFNBQVMsZUFBZTtBQUNqQyxTQUFTLFNBQVMsZUFBZTtBQUNqQyxTQUFTLFNBQVMsYUFBYTtBQUMvQixTQUFTLFNBQVMsVUFBVTtBQUM1QixTQUFTLFNBQVMsZ0JBQWdCO0FBQ2xDLFNBQVMsU0FBUyxXQUFXO0FBQzdCLFNBQVMsU0FBUyxpQkFBaUI7QUFDbkMsU0FBUyxTQUFTLGNBQWM7QUFDaEMsU0FBUyxTQUFTLFVBQVU7QUFLNUIsSUFBTSxTQUFtRDtBQUFBO0FBQUEsRUFFdkQsRUFBRSxNQUFNLFFBQVE7QUFBQTtBQUFBLEVBRWhCLEVBQUUsTUFBTSxTQUFTLFFBQVEsV0FBVztBQUFBLEVBQ3BDLEVBQUUsTUFBTSxPQUFPLFFBQVEsU0FBUztBQUFBLEVBQ2hDLEVBQUUsTUFBTSxJQUFJLFFBQVEsTUFBTTtBQUFBLEVBQzFCLEVBQUUsTUFBTSxVQUFVLFFBQVEsWUFBWTtBQUFBLEVBQ3RDLEVBQUUsTUFBTSxLQUFLLFFBQVEsT0FBTztBQUFBLEVBQzVCLEVBQUUsTUFBTSxXQUFXLFFBQVEsb0JBQW9CO0FBQUEsRUFDL0MsRUFBRSxNQUFNLFFBQVEsUUFBUSxnQkFBZ0I7QUFBQSxFQUN4QyxFQUFFLE1BQU0sSUFBSSxRQUFRLE1BQU07QUFDNUI7QUFFQSxJQUFNLE9BQStCLENBQUM7QUFFdEMsV0FBVyxRQUFRLFFBQVE7QUFDekIsYUFBVyxPQUFPLEtB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LHFCQUFxQixLQUFLLEVBQUUsQ0FBQztBQUFBLE1BQ3ZFLE9BQU87QUFBQSxRQUNMLFlBQVk7QUFBQSxNQUNkLENBQUM7QUFBQSxNQUNEO0FBQUEsUUFDRSxNQUFNO0FBQUEsUUFDTixlQUFlLEdBQUc7QUFDaEI7QUFBQSxZQUNFLEVBQUU7QUFBQSxZQUNGO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxVQUNGO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsSUFDQSxTQUFTO0FBQUEsTUFDUCxPQUFPO0FBQUEsUUFDTDtBQUFBLFVBQ0UsTUFBTTtBQUFBLFVBQ04sYUFBYUM7QUFBQSxZQUNYLElBQUksSUFBSSxpQ0FBaUNELHlDQUFlO0FBQUEsVUFDMUQ7QUFBQSxRQUNGO0FBQUEsUUFDQTtBQUFBLFVBQ0UsTUFBTTtBQUFBLFVBQ04sYUFBYUM7QUFBQSxZQUNYLElBQUk7QUFBQSxjQUNGO0FBQUEsY0FDQUQ7QUFBQSxZQUNGO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRjs7O0FMNVhBLElBQU8saUJBQVEsYUFBYSxNQUFNOyIsCiAgIm5hbWVzIjogWyJob3N0bmFtZSIsICJ1cmwiLCAiZmlsZVVSTFRvUGF0aCIsICJfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsIiwgImZpbGVVUkxUb1BhdGgiXQp9Cg==
