<template>
  <div class="py-1 flex flex-row justify-between items-center">
    <div class="flex flex-row">
      <img :src="titleImage" class="w-fit h-14">
      <div class="leading-loose h-14 px-4 my-auto text-2xl font-bold text-cyan-700">第二学位系统</div>
    </div>
    <div class="flex flex-row">
      <font-awesome-icon icon="fa-solid fa-right-from-bracket" class="px-4 my-auto h-7 w-7 hover:cursor-pointer" @click="
        dialogVisible = true;" />
    </div>
  </div>
  <el-dialog title="退出登录" v-model="dialogVisible" width="20%">
    <span>确定要退出登录吗？</span>
    <div class="mt-4 flex items-center justify-end">
      <el-button type="primary" @click="logout">确定</el-button>
      <el-button @click="dialogVisible = false">取消</el-button>
    </div>
  </el-dialog>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import titleImage from '@/assets/image/nenu-title.png';
import { useRouter } from 'vue-router';

const dialogVisible = ref(false);

const router = useRouter();

const logout = () => {
  dialogVisible.value = false;
  localStorage.clear();
  router.push('/login');
};

</script>