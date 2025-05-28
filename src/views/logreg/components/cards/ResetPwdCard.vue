<template>
  <el-form ref="resetPwdRef" :model="resetPwdForm" :rules="Pwdrules" label-width="auto" label-position="top"
    class="px-2 py-5">
    <template v-if="!isDialog">
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="resetPwdForm.email" placeholder="请输入邮箱" clearable />
      </el-form-item>
      <el-form-item label="验证码" prop="code">
        <div class="flex w-full">
          <el-input v-model="resetPwdForm.code" placeholder="请检查邮箱并填写验证码" clearable />
          <button
            class="border-transparent border rounded-md w-28 bg-blue-800/90 text-sm font-medium text-white hover:bg-blue-900  focus:outline-none focus: focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-blue-800/50 disabled:cursor-not-allowed"
            @click="sendVerifyCode" :disabled="resetPwdForm.email === ''">
            {{ sended ? (counter <= 0 ? '重新发送' : counter + 's') : '发送验证码' }} </button>
        </div>
      </el-form-item>
      <el-form-item label="手机号" prop="phone_number">
        <el-input v-model="resetPwdForm.phone_number" placeholder="请输入手机号" clearable />
      </el-form-item>
    </template>
    <el-form-item label="新密码" prop="password">
      <el-input v-model="resetPwdForm.password" placeholder="请输入密码" show-password clearable />
    </el-form-item>
    <el-form-item label="确认密码" prop="check_password">
      <el-input v-model="resetPwdForm.check_password" placeholder="请再次输入密码" show-password clearable />
    </el-form-item>
    <div class="flex w-full mb-6" v-if="!isDialog">
      <button class="flex-1 text-right rounded-md text-blue-800 text-sm underline" type="button" link
        @click="backLogin">
        返回登陆?
      </button>
    </div>
    <div class="mt-6 flex items-center justify-end gap-x-6">
      <button
        class="flex w-full items-center justify-center rounded-md border border-transparent bg-blue-800/90 px-8 py-2 text-base font-medium text-white hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-blue-800/50 disabled:cursor-not-allowed"
        @click="submitForm"
        :disabled="isDialog ? (resetPwdForm.password === '') : (resetPwdForm.email === '' || resetPwdForm.password === '' || resetPwdForm.phone_number === '')">
        {{ isDialog ? '确认修改密码' : '修改密码并登录' }}</button>
    </div>
  </el-form>
</template>

<script setup lang="ts">
import {
  studentResetPwd,
  studentSendResetPwdMailCode,
  studentChangePwd,
} from "@/api/apis/student";
import router from "@/router";
import { useAccessTokenStore } from "@/store/accessToken";
import { useStudentStore } from "@/store/student";
import type {
  StudentResetPwdReq,
  StudentResetPwdResp,
} from "@/types/apis/student";
import { fetchProfile } from "@/utils/profiles/profiles";
import { ElMessage } from "element-plus";
import { ref } from "vue";

const props = defineProps<{
  isDialog?: boolean;
}>();

const studentResetPwdData = ref<StudentResetPwdReq>({
  email: "",
  password: "",
  phone_number: "",
  code: "",
});

interface ResetPwdData {
  email: string;
  phone_number: string;
  password: string;
  code: string;
  check_password: string;
}

const resetPwdRef = ref();

const resetPwdForm = ref<ResetPwdData>({
  email: "",
  phone_number: "",
  password: "",
  code: "",
  check_password: "",
});

// 根据表单验证状态判断是否可以提交

const phone = /^1[3456789]\d{9}$/;

const Pwdrules = ref({
  email: [
    { required: true, message: "请输入邮箱", trigger: "blur" },
    { type: "email", message: "请输入正确的邮箱地址", trigger: ["blur"] },
  ],
  code: [{ required: true, message: "请输入验证码", trigger: "blur" }],
  phone_number: [
    { required: true, message: "请输入手机号", trigger: "blur" },
    { pattern: phone, message: "请输入正确的手机号", trigger: ["blur"] },
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    {
      pattern: /^(?:(?=.*[a-z])(?=.*[A-Z])(?=.*\d)|(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])|(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])|(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])).{8,}$/,
      message: "密码必须包含大小写字母、数字、特殊符号中的至少三种字符，且长度不小于8位，特殊符号包括!@#$%^&*",
      trigger: "blur",
    }
  ],
  check_password: [
    { required: true, message: "请再次输入密码", trigger: "blur" },
    {
      validator: (_rule: any, value: string, callback: any) => {
        if (value === "") {
          callback(new Error("请再次输入密码"));
        } else if (value !== resetPwdForm.value.password) {
          callback(new Error("两次输入密码不一致!"));
        } else {
          callback();
        }
      },
      trigger: "blur",
    },
  ],
});

const submitForm = (event: Event) => {
  event.preventDefault();
  resetPwdRef.value.validate((valid: any) => {
    if (valid) {
      console.log("submit!");
      console.log(resetPwdForm.value);

      if (props.isDialog) {
        // 已登录状态下的修改密码
        const changePwdData = {
          password: resetPwdForm.value.password,
          check_password: resetPwdForm.value.check_password,
        };
        studentChangePwd(changePwdData)
          .then((response) => {
            const res = response.data as { code: number; message: string };
            if (res.code !== 0) {
              ElMessage.error(res.message);
              return;
            }
            ElMessage.success("修改密码成功，请重新登录");
            // 清除token
            useAccessTokenStore().setToken("");
            useStudentStore().setToken("");
            // 关闭对话框
            fipped.value = false;
            // 返回登录页面
            router.push("/login");
          })
          .catch(() => {
            ElMessage.error("修改密码失败，请检查网络设置");
          });
      } else {
        studentResetPwdData.value = resetPwdForm.value;
        studentResetPwd(studentResetPwdData.value)
          .then((response) => {
            const res = response.data as StudentResetPwdResp;
            console.log(res);
            if (res.code !== 0) {
              ElMessage.error(res.message);
              return;
            }
            ElMessage.success("修改密码成功");
            useAccessTokenStore().setToken(res.token);
            useStudentStore().setToken(res.token);
            fetchProfile().then(() => {
              router.push("/");
            });
          })
          .catch(() => {
            ElMessage.error("登录失败，请检查网络设置");
          });
      }
    } else {
      ElMessage.error("请检查输入");
    }
  });
};

const fipped = defineModel({
  required: true,
  type: Boolean,
  default: false,
});

const backLogin = () => {
  fipped.value = false;
};

const sendVerifyCode = (event: Event) => {
  event.preventDefault();
  console.log("sendVerifyCode");
  if (resetPwdForm.value.email === "") {
    ElMessage.error("请输入邮箱");
    return;
  }
  const data = {
    email: resetPwdForm.value.email,
    phone_number: resetPwdForm.value.phone_number,
  };
  console.log(data);
  // 发送验证码
  studentSendResetPwdMailCode(data.email)
    .then((response) => {
      const res = response.data as { code: number; message: string; };
      console.log(res);
      if (res.code !== 0) {
        ElMessage.error(res.message);
        return;
      }
      ElMessage.success("验证码发送成功");
      sended.value = true;
      counter.value = 60;
      const interval = setInterval(() => {
        counter.value--;
        if (counter.value <= 0) {
          clearInterval(interval);
        }
      }, 1000);

    })
    .catch(() => {
      ElMessage.error("发送验证码失败，请检查网络设置");
    });
};

const counter = ref(0);

const sended = ref(false);
</script>