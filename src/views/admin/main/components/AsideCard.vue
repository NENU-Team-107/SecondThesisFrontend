<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const asideList = ref([
  {
    index: '1',
    title: '管理员',
    icon: 'user-tie',
    path: '/admin/manager',
  },
  {
    index: '2',
    title: '学生管理',
    icon: 'user-graduate',
    path: '/admin/manager/student',
  },
  {
    index: '3',
    title: '全部申请',
    icon: 'hand',
    path: '/admin/manager/apply',
    children: [
      {
        index: "3-1",
        title: "待处理",
        icon: 'clock',
        path: "/admin/manager/apply/todo",
      },
      {
        index: "3-2",
        title: "历史申请",
        icon: 'check',
        path: "/admin/manager/apply/history",
      },
    ],
  },
  {
    index: '4',
    title: '我的信息',
    icon: 'user',
    path: '/admin/manager/profile',
    children: [
      {
        index: "4-1",
        title: "个人信息",
        icon: 'id-card',
        path: '/admin/manager/profile/info',
      },
      {
        index: "4-2",
        title: "账号信息",
        icon: 'rotate',
        path: '/admin/manager/profile/update',
      },
    ],
  },
  {
    index: '4',
    title: '退出登录',
    icon: 'shuffle',
    path: '/admin/login',
  }
]);


const router = useRouter();
const toPath = (path: string) => {
  router.push(path);
};

</script>
<template>
  <el-menu default-active="1" class="w-full h-full text-xl">
    <div v-for="item in asideList">
      <el-sub-menu v-if="item.children" :index="item.index">
        <template #title>
          <div class="flex items-center w-full p-2 text-xl font-body">
            <font-awesome-icon :icon="'fa-solid fa-'+item.icon" />
            <div class="ml-3 text-sm font-bold">{{ item.title }}</div>
          </div>
        </template>
        <el-menu-item :index="subitem.index" v-for="subitem in item.children">
          <div class="flex items-center m-3 w-16 h-full text-lg" @click="toPath(subitem.path)">
            <font-awesome-icon :icon="'fa-solid fa-'+subitem.icon" />
            <div class="ml-3 text-sm font-bold">{{ subitem.title }}</div>
          </div>
        </el-menu-item>
      </el-sub-menu>
      <el-menu-item v-else :index="item.index" class="flex items-center w-full p-2 text-xl font-body">
        <div class="flex items-center m-3 w-16 h-full text-lg" @click="toPath(item.path)">
          <font-awesome-icon :icon="'fa-solid fa-'+item.icon" />
          <div class="ml-3 text-sm font-bold">{{ item.title }}</div>
        </div>
      </el-menu-item>
    </div>
  </el-menu>
</template>