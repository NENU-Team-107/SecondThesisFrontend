<template>
  <div class="py-1 flex flex-row justify-between items-center">
    <div class="flex flex-row">
      <img :src="titleImage" class="w-fit h-14">
      <div class="leading-loose h-14 px-4 my-auto text-2xl font-bold text-cyan-700">第二学位系统</div>
    </div>
    <div class="flex flex-row">
      <img :src="avatarImage" class="p-2 w-16 h-16 rounded-full mx-auto hover:cursor-pointer" :onerror="fetchProfile">
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
import { useStudentStore } from '@/store/student';
import axios from 'axios';
import { useAccessTokenStore } from '@/store/accessToken';
import { useSiteInfoStore } from '@/store/siteInfo';
import { studentProfile } from '@/api/apis/student';
import { StudentProfileResp, ProfileDetail } from '@/types/apis/student';
import { ElMessage } from 'element-plus';

const avatarImage = ref<string>(useStudentStore().getPhoto());

const fetchProfile = () => {
  studentProfile().then((response) => {
    const res = response.data as StudentProfileResp;
    if (res.code === -1) {
      ElMessage.error(res.message);
      return;
    }
    let profile = res.profile as ProfileDetail;
    axios.get(`${useSiteInfoStore().getBaseUrl()}/student/getPhoto?photo=${profile.photo}`, {
      responseType: 'arraybuffer',
      headers: {
        'Authorization': useAccessTokenStore().getAccessToken(),
      },
    }
    ).then(response => {
      let blob = new Blob([response.data], { type: 'image/png' });
      let url = window.URL.createObjectURL(blob);
      profile.photo = url;
      useStudentStore().setProfile(profile);
      router.push('/');
    })
  });
};

const dialogVisible = ref(false);

const router = useRouter();

const toPath = (path: string) => {
  if (path === 'logout') {
    return;
  }
  router.push(path);
};

const logout = () => {
  dialogVisible.value = false;
  localStorage.clear();
  router.push('/login');
};

</script>