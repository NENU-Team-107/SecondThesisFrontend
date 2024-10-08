<template>
  <div class="flex justify-center items-center h-full w-full">
    <div class="bg-white w-11/12 p-8 rounded-lg shadow-lg">
      <div class="flex justify-between items-center my-2">
        <h1 class="text-2xl font-bold w-fit">个人信息</h1>
        <div>
          <el-button :type="editStatus ? 'danger' : 'primary'" :icon="Edit" link @click="edit">{{ editStatus ? "退出编辑" :
            "编辑" }}</el-button>
        </div>
      </div>
      <el-alert v-show="!completed" title="请完善个人信息并提交更新" type="warning" :closable="false" show-icon />
      <div v-if="!editStatus" class="grid gap-6 grid-flow-row">
        <StuProfileCard :StudentData="studentData" />
      </div>
      <div v-else>
        <StuFormUpdate :StudentData="studentData" :Message="msg" :Confirm="confirm" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
// import defaultAvatar from '@/assets/image/default_avatar.png';
import { ProfileDetail, StudentProfileResp } from '@/types/apis/student';
import { Edit } from '@element-plus/icons-vue';
import { studentProfile } from '@/api/apis/student';
import { ElMessage } from 'element-plus';
import StuProfileCard from '@/components/StuProfileCard.vue';
import StuFormUpdate from '@/components/StuFormUpdate.vue';

const msg = ref<string>('确认更新个人信息吗？');
const confirm = ref<boolean>(false);
const studentData = ref<ProfileDetail>({
  bachelor_class: '原本科专业',
  bachelor_course: '原本科专业所属的国家“双一流”建设学科',
  bachelor_school: '原本科学校',
  birthday: '出生日期',
  domicile: '户籍所在地',
  email: '电子邮箱',
  email_verify: true,
  graduation_no: '毕业证编号',
  graduation_year: '毕业年份',
  home_address: '通讯地址',
  id_code: '身份证号',
  major: '专业',
  major_phone_number: '手机号码1',
  name: '姓名',
  nation: '民族',
  phone_number_verify: true,
  photo: '照片',
  politics: '政治面貌',
  sex: '性别',
  standby_phone_number: '手机号码2',
  thesis_no: '学位证编号',
});

const completed = ref(false);

const checkCompleted = () => {
  for (const key in studentData.value) {
    if (key === 'phone_number_verify' || key === 'email_verify' || key === 'photo') {
      continue;
    }
    console.log(key);
    console.log(studentData.value[key as keyof ProfileDetail]);
    if (studentData.value[key as keyof ProfileDetail] === '') {
      completed.value = false;
      return;
    }
  }
  completed.value = true;
}

const fetchStudentData = () => {
  studentProfile().then(response => {
    const res = response.data as StudentProfileResp;
    if (res.code === -1) {
      ElMessage.error(res.message);
      return;
    }
    studentData.value = res.profile;
    checkCompleted();
  });
}

fetchStudentData();

const editStatus = ref(false);

const edit = () => {
  editStatus.value = !editStatus.value;
}

</script>