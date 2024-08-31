import { createRouter } from 'vue-router';
import { createWebHistory } from 'vue-router';
import MainPage from '@/views/main/MainPage.vue';

const routes = [
  {
    path: '/',
    name: 'root',
    component: MainPage,
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
