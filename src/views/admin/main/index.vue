<template>
  <div class="h-full w-full">
    <div class="w-full h-20 bg-white z-10 fixed">
      <HeaderCard :title="title" />
    </div>
    <div class="h-full w-48 bg-white pt-20 fixed z-9">
      <AsideCard :DefaultPath="defaultPath" :AsideList="asideList" />
    </div>
    <div class="h-fit bg-zinc-100 flex pl-48 pt-20 w-full justify-center">
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import HeaderCard from '@/components/HeaderCard.vue';
import AsideCard from '@/components/AsideCard.vue';
const title = ref('第二学位系统-管理员端');
const defaultPath = '/admin/manager';
const asideList = ref([
  {
    index: '/admin/manager',
    title: '管理员',
    icon: 'user-tie',
    path: '/admin/manager',
  },
  {
    index: '/admin/manager/student',
    title: '账号管理',
    icon: 'user-graduate',
    path: '/admin/manager/student',
    children: [
      {
        index: "/admin/manager/student/create",
        title: "创建账号",
        icon: 'user-graduate',
        path: "/admin/manager/student/create",
      },
      {
        index: "/admin/manager/student/query",
        title: "查询信息",
        icon: 'user-tie',
        path: "/admin/manager/student/query",
      }
    ]
  },
  {
    index: '/admin/manager/apply',
    title: '全部申请',
    icon: 'hand',
    path: '/admin/manager/apply',
    children: [
      {
        index: "/admin/manager/apply/todo",
        title: "待处理",
        icon: 'clock',
        path: "/admin/manager/apply/todo",
      },
      {
        index: "/admin/manager/apply/history/accepted",
        title: "已同意申请",
        icon: 'check',
        path: "/admin/manager/apply/history/accepted",
      },
      {
        index: "/admin/manager/apply/history/rejected",
        title: "已驳回申请",
        icon: 'xmark',
        path: "/admin/manager/apply/history/rejected",
      },
    ],
  },
  {
    index: '/logout',
    title: '退出登录',
    icon: 'shuffle',
    path: '/logout',
  }
]);
</script>