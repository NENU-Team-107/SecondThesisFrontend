import { RouteRecordRaw } from 'vue-router';

export default [
  {
    path: '/admin',
    name: 'admin',
    redirect: '/admin/manager',
    meta: {
      requireAuth: true,
    },
    component: () => import('@/views/admin/index.vue'),
    children: [
      {
        path: 'manager',
        name: 'adminManager',
        redirect: '/admin/manager/student/query',
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
              },
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
                path: 'history/accepted',
                name: 'adminManagerApplyAC',
                component: () => import('@/views/admin/views/apply/views/AcceptPage.vue'),
              },
              {
                path: 'history/rejected',
                name: 'adminManagerApplyRE',
                component: () => import('@/views/admin/views/apply/views/RejectedPage.vue'),
              },
              {
                path: 'history/finished',
                name: 'adminManagerApplyFI',
                component: () => import('@/views/admin/views/apply/views/FinishedPage.vue'),
              },
              {
                path: 'history/failed',
                name: 'adminManagerApplyFA',
                component: () => import('@/views/admin/views/apply/views/FailedPage.vue'),
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