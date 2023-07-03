import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import store from './store'
import VSwipe from './directives/v-swipe'
import VueCookies from 'vue-cookies';
import 'tailwindcss/tailwind.css';

const app = createApp(App)

// Automatically import base components.
const components = import.meta.globEager(
  './components/*.vue',
)

Object.entries(components).forEach(
  ([path, definition]: any) => {
    // Get name of component, based on filename
    const componentName = path
      .split('/')
      .pop()
      .replace(/\.\w+$/, '')

    if (componentName.startsWith('Base')) {
      app.component(componentName, definition.default)
    }
  },
)

app.use(VueCookies);
app.use(store).use(router).use(VSwipe).mount('#app')

