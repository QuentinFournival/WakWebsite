import { createMemoryHistory, createRouter, createWebHistory, type RouteRecordRaw, type Router } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'index',
    component: import('../views/index.vue'),

  },
  {
    path: '/detail/:id',
    name: 'article-detail',
    component: () => import('../views/articleDetail.vue'),

  },
]
const isServer = typeof window === 'undefined';
const history = isServer
  ? createMemoryHistory(import.meta.env.BASE_URL)
  : createWebHistory(import.meta.env.BASE_URL);

const routerOptions = {
  history: history,
  routes,
}

const router = createRouter(routerOptions);
export default router
