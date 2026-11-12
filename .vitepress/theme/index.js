import DefaultTheme from 'vitepress/theme'
import Layout from './Layout.vue'
import PluginComparison from './PluginComparison.vue'
import InstallCard from './InstallCard.vue'
import LandingVideo from './LandingVideo.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.component('PluginComparison', PluginComparison)
    app.component('InstallCard', InstallCard)
    app.component('LandingVideo', LandingVideo)
  },
}
