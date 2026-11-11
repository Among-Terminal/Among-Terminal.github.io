import { defineConfig } from 'vitepress'
import llmstxt from 'vitepress-plugin-llms'

export default defineConfig({
  title: 'Among Terminal',
  description: 'A native GNOME terminal multiplexer: split panes, named workspaces and optional live status plugins.',
  lang: 'en',
  srcDir: 'docs',
  cleanUrls: true,
  sitemap: { hostname: 'https://among-terminal.github.io' },
  transformHead({ pageData }) {
    if (pageData.relativePath === '404.md') return [['meta', { name: 'robots', content: 'noindex' }]]
    const route = pageData.relativePath.replace(/index\.md$/, '')
    const url = `https://among-terminal.github.io/${route}`
    return [
      ['link', { rel: 'canonical', href: url }],
      ['meta', { property: 'og:type', content: 'website' }],
      ['meta', { property: 'og:title', content: pageData.title }],
      ['meta', { property: 'og:url', content: url }],
      ['meta', { name: 'twitter:card', content: 'summary' }],
    ]
  },
  head: [
    ['link', { rel: 'icon', type: 'image/png', href: '/media/logo-small.png' }],
    ['link', { rel: 'alternate', type: 'text/plain', title: 'LLM documentation', href: '/llms.txt' }],
  ],
  vite: {
    plugins: [llmstxt({
      domain: 'https://among-terminal.github.io',
      title: 'Among Terminal',
      excludeIndexPage: false,
      sidebar: [],
    })],
  },
  themeConfig: {
    logo: { src: '/media/logo-small.svg', alt: 'Among Terminal' },
    nav: [
      { text: 'Features', link: '/features/' },
      { text: 'Plugins', link: '/plugins/' },
      { text: 'Install', link: '/install/' },
    ],
    sidebar: [
      {
        text: 'Using Among Terminal',
        items: [
          { text: 'Start here', link: '/' },
          { text: 'Features', link: '/features/' },
          { text: 'Panes and workspaces', link: '/panes/' },
          { text: 'Sessions', link: '/sessions/' },
          { text: 'Keyboard shortcuts', link: '/shortcuts/' },
          { text: 'Preferences', link: '/preferences/' },
          { text: 'Using plugins', link: '/plugins/' },
        ],
      },
      {
        text: 'Resources',
        items: [
          { text: 'Video overview', link: '/overview/' },
          { text: 'Installation', link: '/install/' },
          { text: 'Licensing', link: '/licensing/' },
        ],
      },
      {
        text: 'Development resources',
        items: [
          { text: 'Plugin author guide and API', link: 'https://github.com/Among-Terminal/among-plugin-template' },
          { text: 'Contributing to Among', link: 'https://github.com/Among-Terminal/among/blob/main/CONTRIBUTING.md' },
        ],
      },
    ],
    search: { provider: 'local' },
    outline: [2, 3],
    socialLinks: [{ icon: 'github', link: 'https://github.com/Among-Terminal/among' }],
    footer: {
      message: 'Apache-2.0 · <a href="/llms.txt">llms.txt</a> · <a href="/llms-full.txt">Full documentation for LLMs</a>',
    },
  },
})
