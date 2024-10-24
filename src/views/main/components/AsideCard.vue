<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const asideList = ref([
  {
    index: '/',
    title: '首页',
    icon: 'house',
    path: '/',
  },
  {
    index: '/myapply',
    title: '我的申请',
    icon: 'hand',
    path: '/myapply',
    children: [
      {
        index: "/apply/newapply",
        title: "新建申请",
        icon: 'clipboard',
        path: "/apply/newapply",
      },
      {
        index: "/apply/submit",
        title: "提交报名",
        icon: 'clock',
        path: "/apply/submit",
      },
      {
        index: "/apply/history",
        title: "申请记录",
        icon: 'check',
        path: "/apply/history",
      },
    ],
  },
  {
    index: '/profile',
    title: '我的信息',
    icon: 'user',
    path: '/profile',
    children: [
      {
        index: "/profile/info",
        title: "个人信息",
        icon: 'id-card',
        path: '/profile/info',
      },
      {
        index: "/profile/update",
        title: "修改密码",
        icon: 'rotate',
        path: '/profile/update',
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

const handleClick= (index: string) => {
  if (index === '/logout') {
    dialogVisible.value = true;
  }
};

const dialogVisible = ref(false);

const router = useRouter();

const logout = () => {
  dialogVisible.value = false;
  localStorage.clear();
  router.push('/login');
};


</script>
<template>
  <el-menu default-active="/" :unique-opened="true" :router="true" class="w-full h-full text-xl">
    <div v-for="item in asideList">
      <el-sub-menu v-if="item.children" :index="item.index">
        <template #title>
          <div class="flex items-center w-full p-2 text-xl font-body">
            <font-awesome-icon :icon="'fa-solid fa-' + item.icon" />
            <div class="ml-3 text-sm font-bold">{{ item.title }}</div>
          </div>
        </template>
        <el-menu-item :index="subitem.index" v-for="subitem in item.children">
          <div class="flex items-center m-3 w-16 h-full text-lg">
            <font-awesome-icon :icon="'fa-solid fa-' + subitem.icon" />
            <div class="ml-3 text-sm font-bold">{{ subitem.title }}</div>
          </div>
        </el-menu-item>
      </el-sub-menu>
      <el-menu-item v-else :index="item.index" class="flex items-center w-full p-2 text-xl font-body" @click="handleClick(item.path)">
        <div class="flex items-center m-3 w-16 h-full text-lg">
          <font-awesome-icon :icon="'fa-solid fa-' + item.icon" />
          <div class="ml-3 text-sm font-bold">{{ item.title }}</div>
        </div>
      </el-menu-item>
    </div>
  </el-menu>
  <el-dialog title="退出登录" v-model="dialogVisible" width="20%">
    <span>确定要退出登录吗？</span>
    <div class="mt-4 flex items-center justify-end">
      <el-button type="primary" @click="logout">确定</el-button>
      <el-button @click="dialogVisible = false">取消</el-button>
    </div>
  </el-dialog>
</template>