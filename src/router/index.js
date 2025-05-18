import { createRouter, createWebHistory } from 'vue-router'
import App from '../App.vue'
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
  history: createWebHistory(),
  routes
})

export default router