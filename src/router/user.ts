import { RouteRecordRaw } from 'vue-router';

export default [
  {
    path: '/',
    name: 'root',
    meta: {
      // 添加该字段，表示进入这个路由是需要登录的
      requireAuth: true,
    },
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
          },
        ],
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
            path: 'update',
            name: 'StudentInfoUpdate',
            component: () => import('@/views/profile/views/UpdatePage.vue'),
          },
        ],
      },
    ],
  },
  {
    path: '/login',
    name: 'studentLogin',
    component: () => import('@/views/logreg/index.vue'),
  },
] as RouteRecordRaw[];
