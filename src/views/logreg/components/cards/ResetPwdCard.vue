<template>
  <el-form ref="resetPwdRef" :model="resetPwdForm" :rules="Pwdrules" label-width="auto" label-position="top"
    class="px-2 py-5">
    <el-form-item label="邮箱" prop="email">
      <el-input v-model="resetPwdForm.email" placeholder="请输入邮箱" clearable />
    </el-form-item>
    <el-form-item label="验证码" prop="code">
      <div class="flex w-full">
        <el-input v-model="resetPwdForm.code" placeholder="请检查邮箱并填写验证码" clearable />
        <button
          class="border-transparent border rounded-md w-28 bg-blue-800/90 text-sm font-medium text-white hover:bg-blue-900  focus:outline-none focus: focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-blue-800/50 disabled:cursor-not-allowed"
          @click="sendVerifyCode" :disabled="resetPwdForm.email === ''">
          {{ sended ? (counter <= 0 ? '重新发送' : counter + 's' ) : '发送验证码' }} 
        </button>
      </div>
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
        @click="submitForm"
        :disabled="resetPwdForm.email === '' || resetPwdForm.password === '' || resetPwdForm.phone_number === ''">修改密码并登录</button>
    </div>
  </el-form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ElMessage } from 'element-plus';
import type { ProfileDetail, StudentProfileResp, StudentResetPwdReq, StudentResetPwdResp } from '@/types/apis/student';
import { studentProfile, studentResetPwd } from '@/api/apis/student';
import router from '@/router';
import { useStudentStore } from '@/store/student';
import { useSiteInfoStore } from '@/store/siteInfo';
import axios from 'axios';
import { useAccessTokenStore } from '@/store/accessToken';

const studentResetPwdData = ref<StudentResetPwdReq>({
  email: '',
  password: '',
  phone_number: '',
  code: ''
});

interface ResetPwdData {
  email: string;
  phone_number: string;
  password: string;
  code: string;
}

const resetPwdRef = ref();

const resetPwdForm = ref<ResetPwdData>({
  email: '',
  phone_number: '',
  password: '',
  code: ''
});

// 根据表单验证状态判断是否可以提交

const phone = /0?(13|14|15|18|17)[0-9]{9}/;

const Pwdrules = ref({
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur'] }
  ],
  code:[
    { required: true, message: '请输入验证码', trigger: 'blur' }
  ],
  phone_number: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { pattern: phone, message: '请输入正确的手机号', trigger: ['blur'] }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' }
  ]
});

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
          useAccessTokenStore().setToken(res.token);
          useStudentStore().setToken(res.token);
          fetchProfile();
        }
      }
      ).catch((_err: any) => {
        ElMessage.error('登录失败，请检查网络设置');
      });
    } else {
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

const sendVerifyCode = () => {
  console.log('sendVerifyCode');
  if (resetPwdForm.value.email === '') {
    ElMessage.error('请输入邮箱');
    return;
  }
  const data = {
    email: resetPwdForm.value.email,
    phone_number: resetPwdForm.value.phone_number
  };
  console.log(data);
  // 发送验证码
};

const counter = ref(0);

const sended = ref(false);

const sendCode = () => {
  if (resetPwdForm.value.email === '') {
    ElMessage.error('请输入邮箱');
    return;
  }
  const data = {
    email: resetPwdForm.value.email,
    phone_number: resetPwdForm.value.phone_number
  };
  console.log(data);
  // 发送验证码
  sended.value = true;
  counter.value = 60;
  const timer = setInterval(() => {
    counter.value--;
    if (counter.value <= 0) {
      clearInterval(timer);
    }
  }, 1000);
};

</script>