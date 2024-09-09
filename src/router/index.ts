import { createRouter } from 'vue-router';
import { createWebHistory } from 'vue-router';


const routes = [
  {
    path: '/',
    name: 'root',
    component: () => import('@/views/main/index.vue'),
    children: [
      {
        path: '/apply',
        name: 'apply',
        component: () => import('@/views/apply/index.vue'),
        children: [
          {
            path: 'apply',
            name: 'apply',
            component: () => import('@/views/apply/views/Application.vue'),
          },
          {
            path: 'applied',
            name: 'applied',
            component: () => import('@/views/apply/views/AppliedPage.vue'),
          },
          {
            path: 'finished',
            name: 'finished',
            component: () => import('@/views/apply/views/FinishedPage.vue'),
          }
        ]
      },
      {
        path: '/profile',
        name: 'profile',
        component: () => import('@/views/profile/index.vue'),
        children: [
          {
            path: 'info',
            name: 'info',
            component: () => import('@/views/profile/views/DetailPage.vue'),
          },
          {
            path: 'password',
            name: 'password',
            component: () => import('@/views/profile/views/PwdPage.vue'),
          }
        ]
      }
    ]
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
