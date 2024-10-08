<template>
  <div class="flex flex-col items-center justify-center h-full w-full">
    <div class="w-4/5 bg-white rounded-lg shadow-md p-2">
      <div v-if="!confirm">
        <h1 class="text-2xl font-bold my-3 w-full text-center">提交材料预览</h1>
        <StuFormUpdate :StudentData="applyForm" :Message="msg" v-model:Confirm="confirm" />
      </div>
      <div v-else>
        <el-result icon="success" title="新建提交成功">
          <template #sub-title>
            <div class="text-gray-600">请在<span class="text-blue-500 px-1">我的申请</span>中查看本次申请的文件材料，确认无误后提交报名。</div>
          </template>
          <template #extra>
            <el-button type="primary" @click="getApply">点击查看</el-button>
          </template>
        </el-result>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { ElMessage } from 'element-plus';
import { studentNewCommit, studentProfile } from '@/api/apis/student';
import { ProfileDetail, studentNewCommitResp, StudentProfileResp } from '@/types/apis/student';
import StuFormUpdate from '@/components/StuFormUpdate.vue';

const msg = ref<string>('确认提交并更新个人信息吗？');
const applyForm = ref<ProfileDetail>({
  bachelor_class: '',
  bachelor_course: '',
  bachelor_school: '',
  birthday: '',
  domicile: '',
  email: '',
  email_verify: true,
  graduation_no: '',
  graduation_year: '',
  home_address: '',
  id_code: '',
  major: '',
  major_phone_number: '',
  name: '',
  nation: '',
  phone_number_verify: true,
  photo: '',
  politics: '',
  sex: '',
  standby_phone_number: '',
  thesis_no: '',
});

const confirm = ref<boolean>(false);

watch(() => confirm.value, (value) => {
  if (value) {
    fetchStudentData();
    submitApplication();
  }
});

const fetchStudentData = () => {
  studentProfile().then(response => {
    const res = response.data as StudentProfileResp;
    if (res.code === -1) {
      ElMessage.error(res.message);
      return;
    }
    applyForm.value = res.profile;
  });
}

fetchStudentData();

const submitApplication = () => {
  // 提交申请表
  studentNewCommit().then(response => {
    const res = response.data as studentNewCommitResp;
    if (res.code === -1) {
      ElMessage.error(res.message);
      return;
    }
    ElMessage.success(res.message);
  });
}

const getApply = () => {
  // 跳转到我的申请
  // window.location.href = '/apply';
}
</script>