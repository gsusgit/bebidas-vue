import { createRouter, createWebHistory } from 'vue-router'
import Inicio from '../views/InicioView.vue'

const routes = [
  {
    path: '/',
    name: 'inicio',
    component: Inicio
  },
  {
    path: '/favoritos',
    name: 'favoritos',
    component: () => import('../views/FavoritosView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
