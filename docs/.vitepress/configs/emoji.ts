/**
  Copyright (c) taskylizard. All rights reserved.

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

  http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/
import type { MarkdownRenderer } from 'vitepress'
import type { IconifyJSON } from '@iconify-json/octicon'

// Icons that need to be used should be imported here
import { icons as twemoji } from '@iconify-json/twemoji'
import { icons as octicon } from '@iconify-json/octicon'
import { icons as logos } from '@iconify-json/logos'
import { icons as ic } from '@iconify-json/ic'
import { icons as mingcute } from '@iconify-json/mingcute'
import { icons as mdi } from '@iconify-json/mdi'
import { icons as materials } from '@iconify-json/material-symbols'
import { icons as simple } from '@iconify-json/simple-icons'
import { icons as gg } from '@iconify-json/gg'
import { icons as iconParkOutline } from '@iconify-json/icon-park-outline'
import { icons as carbon } from '@iconify-json/carbon'

// 1. Install emoji pack with `pnpm add -g @iconify-json/<icon>`
// 2. Import them like I did above
// 3. Add it to this emojis array, like I did for octicon, and add a prefix
const emojis: { pack: IconifyJSON; prefix?: string }[] = [
  // Default emojis (twemoji)
  { pack: twemoji },
  // octicon emojis, prefixed with "octicon-"
  { pack: octicon, prefix: 'octicon-' },
  { pack: logos, prefix: 'logos-' },
  { pack: ic, prefix: 'ic-' },
  { pack: mingcute, prefix: 'mingcute-' },
  { pack: mdi, prefix: 'mdi-' },
  { pack: materials, prefix: 'material-symbols-' },
  { pack: simple, prefix: 'simple-icons-' },
  { pack: gg, prefix: 'gg-' },
  { pack: iconParkOutline, prefix: 'icon-park-outline-' },
  { pack: carbon, prefix: 'carbon-' }
]

const defs: Record<string, string> = {}

for (const elem of emojis) {
  for (const key in elem.pack.icons) {
    if (elem.prefix) defs[elem.prefix + key] = ''
    else defs[key] = ''
  }
}

export { defs }

export function emojiRender(md: MarkdownRenderer) {
  md.renderer.rules.emoji = (tokens, idx) => {
    for (const emoji of emojis) {
      if (tokens[idx].markup.startsWith(emoji.prefix!)) {
        return `<span class="i-${tokens[idx].markup}"></span>`
      }
    }

    return `<span class="i-twemoji-${tokens[idx].markup}"></span>`
  }
}

export function movePlugin(
  plugins: { name: string }[],
  pluginAName: string,
  order: 'before' | 'after',
  pluginBName: string
) {
  const pluginBIndex = plugins.findIndex((p) => p.name === pluginBName)
  if (pluginBIndex === -1) return

  const pluginAIndex = plugins.findIndex((p) => p.name === pluginAName)
  if (pluginAIndex === -1) return

  if (order === 'before' && pluginAIndex > pluginBIndex) {
    const pluginA = plugins.splice(pluginAIndex, 1)[0]
    plugins.splice(pluginBIndex, 0, pluginA)
  }

  if (order === 'after' && pluginAIndex < pluginBIndex) {
    const pluginA = plugins.splice(pluginAIndex, 1)[0]
    plugins.splice(pluginBIndex, 0, pluginA)
  }
}