<template>
  <div class="flex flex-col items-center justify-center h-full w-full">
    <div class="w-4/5 bg-white rounded-lg shadow-md p-2">
      <div>
        <h1 class="text-2xl font-bold my-3 w-full text-center">申请表</h1>
        <StuFormUpdate :StudentData="applyForm" :Message="msg" v-model:Confirm="confirm" />
      </div>
      <div>
        <el-result icon="success" title="Success Tip" sub-title="Please follow the instructions">
          <template #extra>
            <el-button type="primary">Back</el-button>
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
</script>