<template>
  <div class="shadow-sm bg-white">
    <div>
      <h2 class="w-full text-center font-bold text-xl">管理员登录</h2>
    </div>
    <el-form ref="loginRef" :model="ruleForm" :rules="rules" label-width="auto" label-position="top"
      class="px-2 py-5 bg-white w-80">
      <el-form-item label="账号" prop="name">
        <el-input v-model="ruleForm.name" placeholder="请输入管理员账号" clearable />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="ruleForm.password" placeholder="请输入密码" show-password clearable />
      </el-form-item>
      <div class="mt-6 flex items-center justify-end gap-x-6">
        <button
          class="flex w-full items-center justify-center rounded-md border border-transparent bg-blue-800/90 px-8 py-2 text-base font-medium text-white hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-blue-800/50 disabled:cursor-not-allowed"
          @click="submitForm" :disabled="ruleForm.name === '' || ruleForm.password === ''">登录</button>
        <button
          class="flex w-full items-center justify-center rounded-md border border-transparent bg-gray-600 px-8 py-2 text-base font-medium text-white hover:bg-gray-700 focus:outline-none focus:focus:bg-gray-700 disabled:bg-gray-800/50 disabled:cursor-not-allowed"
          @click="resetForm">重置</button>
      </div>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ElMessage } from 'element-plus';

import { adminLogin } from '@/api/apis/admin';
import { AdminLoginReq,AdminLoginResq } from '@/types/apis/admin';
import { useAdminStore } from '@/store/admin';
import { useAccessTokenStore } from '@/store/accessToken';

import { useRouter } from 'vue-router';

const router = useRouter();

const loginRef = ref();

const ruleForm = ref<AdminLoginReq>({
  name: '',
  password: ''
});

// 根据表单验证状态判断是否可以提交

const rules = ref({
  name: [
    { required: true, message: '请输入账号', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' }
  ]
});

const submitForm = (event: Event) => {
  event.preventDefault();
  loginRef.value.validate((valid: any) => {
    if (valid) {
      console.log('submit!');
      console.log(ruleForm.value);

      adminLogin(ruleForm.value).then((response) => {
        const res = response.data as AdminLoginResq;
        console.log(res);
        if (res.code !== 0) {
          ElMessage.error(res.message);
          return;
        }
        ElMessage.success('登录成功');
        useAdminStore().setToken(res.token);
        useAccessTokenStore().setToken(res.token);
        router.push('/admin/manager');
      }
      ).catch((err: any) => {
        ElMessage.error('登录失败，请检查网络设置');
        console.log(err);
      });
    } else {
      console.log('error submit!!');
      ElMessage.error('请检查输入');
    }
  });
};

const resetForm = (event: Event) => {
  event.preventDefault();
  loginRef.value.resetFields();
  ElMessage.success('重置成功');
};

</script>