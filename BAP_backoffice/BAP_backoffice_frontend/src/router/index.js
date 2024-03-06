import { createRouter, createWebHistory } from 'vue-router'
import Index from "../views/Index.vue"
import CreateAsso from "../views/CreateAsso.vue"
import EditAsso from "../views/EditAsso.vue"
import SingleAsso from "../views/SingleAsso.vue"
import SearchAsso from "../views/SearchAsso.vue"
import CreateEvent from "../views/CreateEvent.vue"
import EditEvent from "../views/EditEvent.vue"
import SingleEvent from "../views/SingleEvent.vue"
import SearchEvent from "../views/SearchEvent.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: 'Index',
      path: '/',
      component: Index,
    },
    {
      name: 'CreateAsso',
      path: '/createAsso',
      component: CreateAsso,
    },
    {
      name: 'EditAsso',
      path: '/editAsso/:id',
      component: EditAsso,
    },
    {
      name: 'SingleAsso',
      path: '/association/:id',
      component: SingleAsso,
    },
    {
      name: 'SearchAsso',
      path: '/searchAsso',
      component: SearchAsso,
    },
    {
      name: 'CreateEvent',
      path: '/createEvent',
      component: CreateEvent,
    },
    {
      name: 'EditEvent',
      path: '/editEvent/:id',
      component: EditEvent,
    },
    {
      name: 'SingleEvent',
      path: '/event/:id',
      component: SingleEvent,
    },
    {
      name: 'SearchEvent',
      path: '/searchEvent',
      component: SearchEvent,
    },
  ]
})

export default router