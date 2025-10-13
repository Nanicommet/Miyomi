import { colors } from '@fmhy/colors'
import { FileSystemIconLoader } from '@iconify/utils/lib/loader/node-loaders'
import { resolve } from 'node:path'
import {
  defineConfig,
  presetUno,
  presetAttributify,
  presetIcons,
  transformerDirectives
} from 'unocss'

const safelist = Object.entries(colors).flatMap(([group, shades]) =>
  Object.keys(shades).flatMap((shade) => [
    `text-${group}-${shade}`,
    `bg-${group}-${shade}`
  ])
)

export default defineConfig({
  content: {
    filesystem: ['.vitepress/configs/shared.ts']
  },
  safelist,
  theme: {
    colors: {
      ...colors,
      primary: 'var(--vp-c-brand-1)',
      bg: 'var(--vp-c-bg)',
      'bg-alt': 'var(--vp-c-bg-alt)',
      'bg-elv': 'var(--vp-c-bg-elv)',
      text: 'var(--vp-c-text-1)',
      'text-2': 'var(--vp-c-text-2)',
      div: 'var(--vp-c-divider)'
    }
  },
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      extraProperties: {
        display: 'inline-block',
        'vertical-align': 'middle'
      },
      warn: true,
      collections: {
        custom: FileSystemIconLoader(resolve(__dirname, '.docs/public/custom')),
        twemoji: () => import('@iconify-json/twemoji/icons.json').then(i => i.default),
        octicon: () => import('@iconify-json/octicon/icons.json').then(i => i.default),
        logos: () => import('@iconify-json/logos/icons.json').then(i => i.default),
        ic: () => import('@iconify-json/ic/icons.json').then(i => i.default),
        mingcute: () => import('@iconify-json/mingcute/icons.json').then(i => i.default),
        mdi: () => import('@iconify-json/mdi/icons.json').then(i => i.default),
        'material-symbols': () => import('@iconify-json/material-symbols/icons.json').then(i => i.default),
        'simple-icons': () => import('@iconify-json/simple-icons/icons.json').then(i => i.default),
        gg: () => import('@iconify-json/gg/icons.json').then(i => i.default),
        'icon-park-outline': () => import('@iconify-json/icon-park-outline/icons.json').then(i => i.default),
        carbon: () => import('@iconify-json/carbon/icons.json').then(i => i.default),
      }
    })
  ],
  transformers: [transformerDirectives()]
})