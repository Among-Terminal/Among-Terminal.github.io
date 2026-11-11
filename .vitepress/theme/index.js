import DefaultTheme from 'vitepress/theme'
import Layout from './Layout.vue'
import ComparisonSlider from './ComparisonSlider.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.component('ComparisonSlider', ComparisonSlider)
  },
}
