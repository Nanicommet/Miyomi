interface Contributor {
  name: string
  avatar: string
  // Optional.
  site?: string
}

export interface Contributors {
  core: Contributor[]
  contributors: Contributor[]
  special: Contributor[]
}

export const contribs = {
  core: [
    {
      name: 'Tas33n',
      avatar: 'https://github.com/tas33n.png',
      site: 'https://github.com/tas33n'
    },
    {
      name: 'Mikkiio',
      avatar: 'https://github.com/mikkiio.png',
      site: 'https://github.com/mikkiio'
    }
  ],
  contributors: [],
  special: []
} satisfies Contributors
