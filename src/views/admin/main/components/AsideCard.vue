<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
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
        index: "/admin/manager/apply/history",
        title: "历史申请",
        icon: 'check',
        path: "/admin/manager/apply/history",
      },
    ],
  },
  {
    index: '/admin/manager/profile',
    title: '我的信息',
    icon: 'user',
    path: '/admin/manager/profile',
    children: [
      {
        index: "/admin/manager/profile/info",
        title: "个人信息",
        icon: 'id-card',
        path: '/admin/manager/profile/info',
      },
      {
        index: "/admin/manager/profile/update",
        title: "账号信息",
        icon: 'rotate',
        path: '/admin/manager/profile/update',
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

const handleClick = (index: string) => {
  if (index === '/logout') {
    dialogVisible.value = true;
  }
};

const dialogVisible = ref(false);

const router = useRouter();

const logout = () => {
  dialogVisible.value = false;
  localStorage.clear();
  router.push('/admin/login');
};

</script>
<template>
  <el-menu default-active="/admin/manager" class="w-full h-full text-xl" router>
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
      <el-menu-item v-else :index="item.index" class="flex items-center w-full p-2 text-xl font-body"
        @click="handleClick(item.path)">
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