import type { RouteRecordRaw } from "vue-router";

export default [
  {
    path: "/",
    name: "root",
    redirect: "/apply",
    meta: {
      // 添加该字段，表示进入这个路由是需要登录的
      requireAuth: true,
    },
    component: () => import("@/views/main/index.vue"),
    children: [
      {
        path: "/apply",
        name: "apply",
        redirect: "/apply/newapply",
        component: () => import("@/views/apply/index.vue"),
        children: [
          {
            path: "newapply",
            name: "applyApply",
            component: () => import("@/views/apply/views/Application.vue"),
          },
          {
            path: "submit",
            name: "applySubmit",
            component: () => import("@/views/apply/views/SubmitPage.vue"),
          },
          {
            path: "history",
            name: "applyHistory",
            component: () => import("@/views/apply/views/HistoryPage.vue"),
          },
          {
            path: "files/:file_id",
            name: "applyFiles",
            component: () => import("@/views/apply/views/FilesPage.vue"),
          },
          {
            path: "previewfiles/:file_id",
            name: "applyPreviewFile",
            component: () => import("@/views/apply/views/PreviewFilePage.vue"),
          },
        ],
      },
      {
        path: "/profile",
        name: "profile",
        component: () => import("@/views/profile/views/DetailPage.vue"),
      },
    ],
  },
  {
    path: "/login",
    name: "studentLogin",
    component: () => import("@/views/logreg/index.vue"),
  },
] as RouteRecordRaw[];
