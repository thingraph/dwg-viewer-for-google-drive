import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Privacy from '../views/Privacy.vue'
import Terms from '../views/Terms.vue'
import LocalFile from '../views/LocalFile.vue'
import Support from '../views/Support.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'Home', component: Home },
    { path: '/privacy', name: 'Privacy', component: Privacy },
    { path: '/terms', name: 'Terms', component: Terms },
    { path: '/local-file', name: 'LocalFile', component: LocalFile },
    { path: '/support', name: 'Support', component: Support },
  ],
})

export default router
