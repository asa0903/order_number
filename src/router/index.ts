import { createRouter, createWebHashHistory } from 'vue-router'
import Start from '../views/Start.vue'
import Game from '../views/Game.vue'

const routes = [
  {
    path: '/',
    name: 'Start',
    component: Start
  },
  {
    path: '/game',
    name: 'Game',
    component: Game
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'Start',
    component: Start
  },
]

const router = createRouter({
  history: createWebHashHistory('/order_number/'),
  routes
})

export default router