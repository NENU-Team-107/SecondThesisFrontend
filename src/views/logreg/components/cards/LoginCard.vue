<template>
  <el-form ref="loginRef" :model="ruleForm" :rules="rules" label-width="auto" label-position="top" class="px-2 py-5">
    <el-form-item label="账号" prop="username">
      <el-input v-model="ruleForm.username" type="mail" placeholder="请输入身份证号/邮箱" clearable />
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="ruleForm.password" type="password" placeholder="请输入密码" show-password clearable />
    </el-form-item>
    <div class="flex w-full mb-6">
      <button class="flex-1 text-right rounded-md text-blue-800 text-sm underline" type="button" link
        @click="forgetPwd">
        忘记密码?
      </button>
    </div>
    <div class="mt-6 flex items-center justify-end gap-x-6">
      <button
        class="flex w-full items-center justify-center rounded-md border border-transparent bg-blue-800/90 px-8 py-2 text-base font-medium text-white hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-blue-800/50 disabled:cursor-not-allowed"
        @click="submitForm" :disabled="ruleForm.username === '' || ruleForm.password === ''">立即登录</button>
      <button
        class="flex w-full items-center justify-center rounded-md border border-transparent bg-gray-600 px-8 py-2 text-base font-medium text-white hover:bg-gray-700 focus:outline-none focus:focus:bg-gray-700 disabled:bg-gray-800/50 disabled:cursor-not-allowed"
        @click="resetForm">清空表格</button>
    </div>
  </el-form>
</template>

<script setup lang="ts">
import { studentLogin } from "@/api/apis/student";
import router from "@/router";
import { useAccessTokenStore } from "@/store/accessToken";
import { useStudentStore } from "@/store/student";
import type { StudentLoginReq, StudentLoginResp } from "@/types/apis/student";
import { fetchProfile } from "@/utils/profiles/profiles";
import { ElMessage } from "element-plus";
import { ref } from "vue";
import { useFirstLoginStore } from "@/store/firstLogin";

const studentLoginData = ref<StudentLoginReq>({
  email: "",
  id_code: "",
  password: "",
});

interface LoginData {
  username: string;
  password: string;
}

const loginRef = ref();

const ruleForm = ref<LoginData>({
  username: "",
  password: "",
});

// 根据表单验证状态判断是否可以提交

const email = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
const idCard = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;

const rules = ref({
  username: [
    { required: true, message: "请输入账号", trigger: "blur" },
    {
      validator: (
        _: any,
        value: string,
        callback: (arg0: Error | undefined) => void,
      ) => {
        if (!email.test(value) && !idCard.test(value)) {
          callback(new Error("请输入正确的身份证号码/邮箱"));
        } else {
          callback(undefined);
        }
      },
      trigger: "blur",
    },
  ],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
});

const submitForm = (event: Event) => {
  event.preventDefault();
  loginRef.value.validate((valid: any) => {
    if (valid) {
      console.log("submit!");
      console.log(ruleForm.value);
      if (email.test(ruleForm.value.username)) {
        studentLoginData.value.email = ruleForm.value.username;
      } else if (idCard.test(ruleForm.value.username)) {
        studentLoginData.value.id_code = ruleForm.value.username;
      }
      studentLoginData.value.password = ruleForm.value.password;

      console.log(studentLoginData.value);

      studentLogin(studentLoginData.value)
        .then((response) => {
          const res = response.data as StudentLoginResp;
          if (res.code !== 0) {
            ElMessage.error(res.message);
            return;
          }
          ElMessage.success("登录成功");
          useStudentStore().setToken(res.token);
          useAccessTokenStore().setToken(res.token);
          const firstLoginStore = useFirstLoginStore();
          firstLoginStore.setFirstLogin(res.first_create);
          fetchProfile().finally(() => {
            router.push("apply/newapply");
          });
        })
        .catch((err: any) => {
          ElMessage.error("登录失败，请检查网络设置");
          console.log(err);
        });
    } else {
      console.log("error submit!!");
      ElMessage.error("请检查输入");
    }
  });
};

const resetForm = (event: Event) => {
  event.preventDefault();
  loginRef.value.resetFields();
  ElMessage.success("清空成功");
};

const fipped = defineModel({
  required: true,
  type: Boolean,
  default: false,
});

const forgetPwd = () => {
  fipped.value = true;
};
</script>