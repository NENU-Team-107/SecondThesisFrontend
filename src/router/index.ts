import { createRouter } from 'vue-router';
import { createWebHistory } from 'vue-router';
import managerRoutes from './manager';
import userRoutes from './user';

import { useAccessTokenStore } from '@/store/accessToken';
import { ElMessageBox } from 'element-plus';


const routes = [...managerRoutes, ...userRoutes];

routes.push(
  {
    name: 'notFound',
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/NotFound/NotFound.vue'),
  }
);

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 路由护卫
router.beforeEach((to, from, next) => {
  // console.log('to:', to);
  // console.log('from:', from);
  if (to.meta.requireAuth) {
    // 判断该路由是否需要登录权限
    if (useAccessTokenStore().getAccessToken()) {
      next();
    } else {
      ElMessageBox.alert(
        '请先登录',
        '提示',
        {
          confirmButtonText: '确定',
          type: 'warning',
          center: true
        }).then(() => {
          if (to.path !== '/login' && to.path !== '/admin/login') {
            if (to.path.startsWith('/admin')) {
              next({ path: '/admin/login', });
            }
            else {
              next({ path: '/login', })
            }
          } else {
            next();
          }
        });
    }
    return;
  }
  next();
});

export default router;
