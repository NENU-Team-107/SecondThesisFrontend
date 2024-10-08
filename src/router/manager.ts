import { RouteRecordRaw } from 'vue-router';

export default [
  {
    path: '/admin',
    name: 'admin',
    meta: {
      requireAuth: true,
    },
    component: () => import('@/views/admin/index.vue'),
    children: [
      {
        path: 'manager',
        name: 'adminManager',
        component: () => import('@/views/admin/main/index.vue'),
        children: [
          {
            path: 'student',
            name: 'adminManagerStudent',
            component: () => import('@/views/admin/views/student/index.vue'),
            children: [
              {
                path: 'query',
                name: 'adminManagerStudentQuery',
                component: () => import('@/views/admin/views/student/views/QueryPage.vue'),
              },
              {
                path: 'create',
                name: 'adminManagerStudentCreate',
                component: () => import('@/views/admin/views/student/views/CreatePage.vue'),
              }
            ],
          },
          {
            path: 'apply',
            name: 'adminManagerApply',
            component: () => import('@/views/admin/views/apply/index.vue'),
            children: [
              {
                path: 'todo',
                name: 'adminManagerApplyTodo',
                component: () => import('@/views/admin/views/apply/views/ApplyPage.vue'),
              },
              {
                path: 'history',
                name: 'adminManagerApplyHistory',
                component: () => import('@/views/admin/views/apply/views/HistoryPage.vue'),
              },
            ],
          },
          {
            path: 'profile',
            name: 'adminProfile',
            component: () => import('@/views/admin/views/profile/index.vue'),
            children: [
              {
                path: 'info',
                name: 'adminProfileInfo',
                component: () => import('@/views/admin/views/profile/views/InfoPage.vue'),
              },
              {
                path: 'update',
                name: 'adminProfileUpdate',
                component: () => import('@/views/admin/views/profile/views/UpdatePage.vue'),
              }
            ],
          },
        ],
      },
    ],
  },

  {
    path: '/admin/login',
    name: 'adminLogin',
    component: () => import('@/views/admin/logreg/index.vue'),
  },
] as RouteRecordRaw[];
