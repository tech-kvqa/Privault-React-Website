import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import AOS from 'aos'
import 'aos/dist/aos.css'
import './assets/style.css'

import '@/styles/product-theme.css'

loadFonts()

AOS.init({
  duration: 1000, // animation duration
  once: true,     // animate only once
})

createApp(App)
  .use(router)
  .use(store)
  .use(vuetify)
  .mount('#app')
