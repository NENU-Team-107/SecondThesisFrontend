<template>
  <el-form ref="resetPwdRef" :model="resetPwdForm" :rules="Pwdrules" label-width="auto" label-position="top" class="px-2 py-5">
    <el-form-item label="邮箱" prop="email">
      <el-input v-model="resetPwdForm.email" placeholder="请输入邮箱" clearable />
    </el-form-item>
    <el-form-item label="手机号" prop="phone_number">
      <el-input v-model="resetPwdForm.phone_number" placeholder="请输入手机号" clearable />
    </el-form-item>
    <el-form-item label="新密码" prop="password">
      <el-input v-model="resetPwdForm.password" placeholder="请输入密码" show-password clearable />
    </el-form-item>
    <div class="flex w-full mb-6">
      <button class="flex-1 text-right rounded-md text-blue-800 text-sm underline" type="button" link
        @click="backLogin">
        返回登陆?
      </button>
    </div>
    <div class="mt-6 flex items-center justify-end gap-x-6">
      <button
        class="flex w-full items-center justify-center rounded-md border border-transparent bg-blue-800/90 px-8 py-2 text-base font-medium text-white hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-blue-800/50 disabled:cursor-not-allowed"
        @click="submitForm" :disabled="resetPwdForm.email === '' || resetPwdForm.password === ''||resetPwdForm.phone_number===''">修改密码并登录</button>
    </div>
  </el-form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ElMessage } from 'element-plus';
// import { Session } from '@/utils/cache/index';
import type { StudentResetPwdReq,StudentResetPwdResp } from '@/types/apis/student';
import { studentResetPwd } from '@/api/apis/student';
import router from '@/router';
import { useStudentStore } from '@/store/student';

const studentResetPwdData = ref<StudentResetPwdReq>({
  email: '',
  password: '',
  phone_number: ''
});

interface ResetPwdData {
  email: string;
  phone_number: string;
  password: string;
}

const resetPwdRef = ref();

const resetPwdForm = ref<ResetPwdData>({
  email: '',
  phone_number: '',
  password: ''
});

// 根据表单验证状态判断是否可以提交

const phone = /0?(13|14|15|18|17)[0-9]{9}/;

const Pwdrules = ref({
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur'] }
  ],
  phone_number: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { pattern: phone, message: '请输入正确的手机号', trigger: ['blur'] }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' }
  ]
});

const submitForm = (event: Event) => {
  event.preventDefault();
  resetPwdRef.value.validate((valid: any) => {
    if (valid) {
      console.log('submit!');
      console.log(resetPwdForm.value);
      studentResetPwdData.value = resetPwdForm.value;

      studentResetPwd(studentResetPwdData.value).then((response) => {
        const res = response.data as StudentResetPwdResp;
        console.log(res);
        if (res.code !== 0) {
          ElMessage.error(res.message);
          return;
        }
        else {
          ElMessage.success('修改密码成功');
          useStudentStore().setToken(res.token);
          localStorage.setItem('token', res.token);
          // Session.set('token', res.token);
        }
        router.push('/');
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


const fipped = defineModel({
    required: true,
    type: Boolean,
    default: false
})

const backLogin = () => {
  fipped.value = false;
};

</script>