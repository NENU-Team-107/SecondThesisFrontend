import { createRouter } from 'vue-router';
import { createWebHistory } from 'vue-router';
import managerRoutes from './manager';
import userRoutes from './user';


const routes = [...managerRoutes, ...userRoutes];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
