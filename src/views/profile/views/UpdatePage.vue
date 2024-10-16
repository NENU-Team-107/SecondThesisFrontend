<template>
  <div class="w-1/2 mx-auto mt-10 bg-white p-10 rounded-lg shadow-lg flex justify-center items-center flex-col">
    <h1 class="text-2xl font-bold text-center py-2">修改密码</h1>
    <el-form :model="form" :rules="rules" label-width="100px" class="w-full mt-10">
      <el-form-item label="原密码" prop="oldPassword">
        <el-input v-model="form.oldPassword" show-password></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="newPassword">
        <el-input v-model="form.newPassword" show-password></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="confirmPassword">
        <el-input v-model="form.confirmPassword" show-password></el-input>
      </el-form-item>
    </el-form>
    <el-button type="primary" @click="submit">提交</el-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ElMessage } from 'element-plus';
import { useAccessTokenStore } from '@/store/accessToken';

const form = ref({
  oldPassword: '',
  newPassword: '',
  confirmPassword: '',
});

const rules = {
  oldPassword: [
    { required: true, message: '请输入原密码', trigger: 'blur' },
  ],
  newPassword: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
  ],
  confirmPassword: [
    { required: true, message: '请再次输入新密码', trigger: 'blur' },
  ],
};

const submit = () => {
  if (form.value.newPassword !== form.value.confirmPassword) {
    ElMessage.error('两次输入的密码不一致');
    return;
  }
  // 发送请求
};


</script>