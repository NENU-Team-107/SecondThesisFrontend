<template>
  <el-steps :active="activeStep" align-center finish-status="success">
    <el-step title="Step 1" description="基础信息">
    </el-step>
    <el-step title="Step 2" description="验证邮箱">
    </el-step>
    <el-step title="Step 3" description="完成注册" />
  </el-steps>
  <el-form ref="registerRef" :model="ruleForm" :rules="rules" label-width="auto" label-position="top" class="px-2 py-5">
    <div v-if="activeStep == 0">
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="ruleForm.phone" placeholder="请输入手机号码" clearable />
      </el-form-item>
      <el-form-item label="身份证号" prop="idCode">
        <el-input v-model="ruleForm.idCode" placeholder="请输入身份证号" clearable />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="ruleForm.password" type="password" placeholder="密码长度在 6 到 20 个字符，必须包含数字和字母" show-password
          clearable />
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input v-model="ruleForm.checkPass" placeholder="请再次输入密码" show-password clearable />
      </el-form-item>
    </div>
    <div v-else-if="activeStep == 1">
      <el-form-item label="邮箱" prop="email" label-position="right">
        <el-input v-model="ruleForm.email" placeholder="请输入邮箱地址" clearable />
      </el-form-item>
      <el-form-item label="验证码" label-position="right">
        <div class="flex w-full">
          <el-input v-model="verifyCode" placeholder="请检查邮件并填写验证码" />
          <button
            class="border-transparent border rounded-md w-28 bg-blue-800/90 text-sm font-medium text-white hover:bg-blue-900  focus:outline-none focus: focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-blue-800/50 disabled:cursor-not-allowed"
            @click="sendVerifyCode" :disabled="ruleForm.email === ''">{{ sended ? (counter <= 0 ? '重新发送' : counter + 's'
            ) : '发送验证码' }}</button>
        </div>
      </el-form-item>
    </div>
    <div v-else>
      <el-result icon="success" title="注册成功" :sub-title="successMsg">
        <template #extra>
          <el-button type="primary" @click="router.push({ path: '/' })">立即进入系统</el-button>
        </template>
      </el-result>
    </div>
  </el-form>
  <div class="mt-4 flex items-center justify-end gap-x-6">
    <button v-if="activeStep == 0" type="submit"
      class="flex w-full items-center justify-center rounded-md border border-transparent bg-blue-800/90 px-8 py-2 text-base font-medium text-white hover:bg-blue-900 focus:outline-none focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-blue-800/50 disabled:cursor-not-allowed"
      @click="nextStep"
      :disabled="ruleForm.idCode === '' || ruleForm.password === '' || ruleForm.checkPass == '' || ruleForm.phone === ''">下一步</button>
    <button v-if="activeStep == 1" type="submit"
      class="flex w-full items-center justify-center rounded-md border border-transparent bg-blue-800/90 px-8 py-2 text-base font-medium text-white hover:bg-blue-900 focus:outline-none focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-blue-800/50 disabled:cursor-not-allowed"
      @click="nextStep" :disabled="ruleForm.email === '' || !sended">注册</button>
  </div>
</template>

<script setup lang="ts">
import { studentRegister, studentVerifyRegMail } from "@/api/apis/student";
import { useAccessTokenStore } from "@/store/accessToken";
import { useStudentStore } from "@/store/student";
import type { CommonResp } from "@/types/apis/common";
import type {
  StudentLoginResp,
  StudentRegisterReq,
  StudentVerifyMailCodeReq,
} from "@/types/apis/student";
import { fetchProfile } from "@/utils/profiles/profiles";
import { ElMessage } from "element-plus";
import { ref } from "vue";
import { useRouter } from "vue-router";
// import { Session } from '@/utils/cache/index';
const router = useRouter();

const regCounter = ref(6);
const msg = ref("秒后将自动登入系统，若跳转失败请刷新页面");
const successMsg = ref(regCounter.value + msg.value);

const sended = ref(false);
const activeStep = ref(0);
const nextStep = (event: Event) => {
  event.preventDefault();
  if (activeStep.value === 1) {
    submit();
  } else if (activeStep.value === 2) {
    return;
  } else {
    // 单项检查不通过
    registerRef.value.validate((valid: any) => {
      if (valid) {
        activeStep.value++;
      } else {
        ElMessage.error("请检查输入");
        return false;
      }
    });
  }
};

const counter = ref(0);

const studentRegisterData = ref<StudentRegisterReq>({
  email: "",
  id_code: "",
  password: "",
  phone_number: "",
});
interface regData {
  idCode: string;
  password: string;
  checkPass: string;
  email: string;
  phone: string;
}
const registerRef = ref();
const ruleForm = ref<regData>({
  idCode: "",
  password: "",
  checkPass: "",
  email: "",
  phone: "",
});
const verifyCode = ref("");
const checkPass = (
  _rule: any,
  value: string,
  callback: (arg0: Error | undefined) => void,
) => {
  if (value === "") {
    callback(new Error("请再次输入密码"));
  } else if (value !== ruleForm.value.password) {
    callback(new Error("两次输入密码不一致!"));
  } else {
    callback(undefined);
  }
};

const rules = ref({
  idCode: [
    { required: true, message: "请输入用户名", trigger: "blur" },
    { min: 3, max: 20, message: "长度在 3 到 20 个字符", trigger: "blur" },
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    {
      pattern: /^(?:(?=.*[a-z])(?=.*[A-Z])(?=.*\d)|(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])|(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])|(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])).{8,}$/,
      message: "密码必须包含大小写字母、数字、特殊符号中的至少三种字符，且长度不小于8位，特殊符号包括!@#$%^&*",
      trigger: "blur",
    }
  ],
  checkPass: [
    { required: true, message: "请再次输入密码", trigger: "blur" },
    { validator: checkPass, trigger: "blur" },
  ],
  email: [
    { required: true, message: "请输入邮箱地址", trigger: "blur" },
    { type: "email", message: "请输入正确的邮箱地址", trigger: ["blur"] },
  ],
  phone: [
    { required: true, message: "请输入手机号码", trigger: "blur" },
    {
      pattern: /^1[3456789]\d{9}$/,
      message: "手机号码格式不正确",
      trigger: "blur",
    },
  ],
});

const sendVerifyCode = (event: Event) => {
  event.preventDefault();
  if (counter.value > 0) {
    return;
  }
  registerRef.value.validate((valid: boolean) => {
    if (valid) {
      console.log("submit!");
      console.log(ruleForm.value);
      studentRegisterData.value.email = ruleForm.value.email;
      studentRegisterData.value.password = ruleForm.value.password;
      studentRegisterData.value.phone_number = ruleForm.value.phone;
      studentRegisterData.value.id_code = ruleForm.value.idCode;
      console.log(studentRegisterData.value);
      studentRegister(studentRegisterData.value)
        .then((response) => {
          const res = response.data as CommonResp;
          console.log(res);
          if (res.code !== 0) {
            ElMessage.error(res.message);
            return;
          }
          ElMessage.success(res.message);
          counter.value = 60;
          sended.value = true;
          const timer = setInterval(() => {
            counter.value--;
            if (counter.value <= 0) {
              clearInterval(timer);
            }
          }, 1000);

        })
        .catch(() => {
          ElMessage.error("请检查网络");
        });
    } else {
      ElMessage.error("请检查输入");
      console.log("error submit!!");
      return false;
    }
  });
};

const submit = () => {
  verifyCode.value = verifyCode.value.trim();
  if (verifyCode.value === "") {
    ElMessage.error("请输入验证码");
    return;
  }
  const data = ref<StudentVerifyMailCodeReq>({
    code: verifyCode.value,
    mail: ruleForm.value.email,
  });
  studentVerifyRegMail(data.value)
    .then((response) => {
      const res = response.data as StudentLoginResp;
      console.log(res);
      if (res.code !== 0) {
        ElMessage.error(res.message);
        return;
      }
      ElMessage.success(res.message);
      activeStep.value++;
      // 存储token
      useStudentStore().setToken(res.token);
      useAccessTokenStore().setToken(res.token);
      fetchProfile().then(() => {
        console.log("fetch profile success");
        const timer = setInterval(() => {
          regCounter.value--;
          successMsg.value = regCounter.value + msg.value;
          if (regCounter.value <= 0) {
            clearInterval(timer);
            router.push("/");
          }
        }, 1000);
      });

    })
    .catch(() => {
      ElMessage.error("注册失败");
    });
};
</script>