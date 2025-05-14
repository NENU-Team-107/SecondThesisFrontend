<template>
  <div class="h-full w-full">
    <div class="w-full h-20 bg-white z-10 fixed">
      <HeaderCard :title="title" />
    </div>
    <div class="h-full w-48 bg-white pt-20 fixed z-9">
      <AsideCard :AsideList="asideList" :DefaultPath="defaultPath" />
    </div>
    <div class="h-fit bg-zinc-100 flex pl-48 pt-20 w-full">
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
import AsideCard from "@/components/AsideCard.vue";
import HeaderCard from "@/components/HeaderCard.vue";
import { ref } from "vue";

const title = ref("第二学士学位报名系统");

const defaultPath = "/";

const asideList = ref([
  {
    index: "/",
    title: "首页",
    icon: "house",
    path: "/",
  },
  {
    index: "/myapply",
    title: "我的申请",
    icon: "hand",
    path: "/myapply",
    children: [
      {
        index: "/apply/newapply",
        title: "新建申请",
        icon: "clipboard",
        path: "/apply/newapply",
      },
      {
        index: "/apply/submit",
        title: "提交报名",
        icon: "clock",
        path: "/apply/submit",
      },
      {
        index: "/apply/history",
        title: "申请记录",
        icon: "check",
        path: "/apply/history",
      },
    ],
  },
  {
    index: "/profile",
    title: "我的信息",
    icon: "id-card",
    path: "/profile",
  },
  {
    index: "/logout",
    title: "退出登录",
    icon: "shuffle",
    path: "/logout",
  },
]);
</script>