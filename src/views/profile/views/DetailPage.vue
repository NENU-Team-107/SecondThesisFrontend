<template>
  <div class="flex justify-center items-center h-full w-full">
    <div class="bg-white w-11/12 p-8 rounded-lg shadow-lg mt-24">
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
        <StuFormUpdate :StudentData="studentData" SubmitText="立即更新" :Message="msg" v-model:Confirm="confirm" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
// import defaultAvatar from '@/assets/image/default_avatar.png';
import { ProfileDetail, StudentProfileResp } from '@/types/apis/student';
import { Edit } from '@element-plus/icons-vue';
import { studentProfile } from '@/api/apis/student';
import { ElMessage } from 'element-plus';
import StuProfileCard from '@/components/StuProfileCard.vue';
import StuFormUpdate from '@/components/StuFormUpdate.vue';
import axios from 'axios';
import { useSiteInfoStore } from '@/store/siteInfo';
import { useAccessTokenStore } from '@/store/accessToken';
import { useStudentStore } from '@/store/student';

const msg = ref<string>('确认更新个人信息吗？');
const confirm = ref<boolean>(false);

watch(() => confirm.value, (value) => {
  if (value) {
    ElMessage.success('更新成功');
    fetchStudentData();
  }
});

const studentData = ref<ProfileDetail>({
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

const completed = ref(true);

const checkCompleted = () => {
  for (const key in studentData.value) {
    if (key === 'phone_number_verify' || key === 'email_verify' || key === 'photo') {
      continue;
    }
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
    let profileData = res.profile;

    axios.get(`${useSiteInfoStore().getBaseUrl()}/student/getPhoto?photo=${profileData.photo}`, { responseType: 'arraybuffer', 
    headers: {
      'Authorization': useAccessTokenStore().getAccessToken(),
    },
    }
    ).then(response => {
      let blob = new Blob([response.data], { type: response.headers['content-type'] });
      let url = window.URL.createObjectURL(blob);
      profileData.photo = url;
      console.log(profileData);
      studentData.value = profileData;
      useStudentStore().setProfile(profileData);
      checkCompleted();
    })

    checkCompleted();
  });
}

fetchStudentData();

const editStatus = ref(false);

const edit = () => {
  editStatus.value = !editStatus.value;
}

</script>