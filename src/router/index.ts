import { createRouter } from 'vue-router';
import { createWebHistory } from 'vue-router';


const routes = [
  {
    path: '/',
    name: 'root',
    component: () => import('@/views/main/index.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/logreg/index.vue'),
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
