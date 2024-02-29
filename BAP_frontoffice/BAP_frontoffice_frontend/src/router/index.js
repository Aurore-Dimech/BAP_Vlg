import { createRouter, createWebHistory } from 'vue-router'
import Index from "../views/Index.vue"
import SingleAsso from "../views/SingleAsso.vue"
import SearchAsso from "../views/Search.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: 'Index',
      path: '/',
      component: Index,
    },
    {
      name: 'SingleAsso',
      path: '/association/:id',
      component: SingleAsso,
    },
    {
      name: 'SearchAsso',
      path: '/search',
      component: SearchAsso,
    },
  ]
})

export default router