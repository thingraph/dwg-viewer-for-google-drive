import 'uno.css'
import 'element-plus/dist/index.css'
import 'element-plus/dist/index.css'

import ElementPlus from 'element-plus'
import { createApp } from 'vue'

import App from './App.vue'
import router from './router'

const initApp = () => {
  const app = createApp(App)
  app.use(router)
  app.use(ElementPlus)
  app.mount('#app')
}

initApp()
