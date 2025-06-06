import { createRouter } from "vue-router";
import { createWebHistory } from "vue-router";

import { commonOnline } from "@/api/apis/common";
import { useAccessTokenStore } from "@/store/accessToken";
import { ElMessage, ElMessageBox } from "element-plus";

import managerRoutes from "./manager";
import userRoutes from "./user";

const routes = [...managerRoutes, ...userRoutes];

routes.push({
  name: "notFound",
  path: "/:pathMatch(.*)*",
  component: () => import("@/views/NotFound/NotFound.vue"),
});

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 路由护卫

router.beforeEach((to, from, next) => {
  console.log("to:", to);
  console.log("from:", from);
  if (to.path === "/logout") {
    localStorage.clear();
    if (from.path.startsWith("/admin")) {
      console.log("admin logout");
      next("/admin/login");
    } else {
      next("/login");
    }
    return;
  }

  if (to.path === "/login" || to.path === "/admin/login") {
    localStorage.clear();
    next();
    return;
  }
  if (!to.meta.requireAuth || from.meta.requireAuth) {
    next();
    return;
  }
  const notLogin = useAccessTokenStore().getAccessToken() === "";
  if (notLogin) {
    ElMessageBox.confirm("请先登录", "提示", {
      confirmButtonText: "确定",
      type: "warning",
    }).then(() => {
      if (to.path.startsWith("/admin")) {
        next("/admin/login");
      } else {
        next("/login");
      }
    });
    return;
  }
  // next();
  commonOnline()
    .then((response) => {
      const res = response.data;
      if (res.code === 0) {
        next();
      } else {
        ElMessage.error(res.message);
        if (to.path.startsWith("/admin")) {
          next("/admin/login");
        } else {
          next("/login");
        }
      }
    })
    .catch((error) => {
      console.log(error);
      ElMessage.error("网络错误");
      if (to.path.startsWith("/admin")) {
        next("/admin/login");
      } else {
        next("/login");
      }
    });
});

export default router;
