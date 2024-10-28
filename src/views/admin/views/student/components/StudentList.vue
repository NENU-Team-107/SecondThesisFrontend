<template>
  <div class="w-full h-full mt-5">
    <div class="w-full flex justify-end items-end pr-5 my-4">
      <el-button v-show="editStatus" type="danger" @click="removeAccount" size="small" class="mr-8">删除{{ delList.length }}个账号</el-button>
      <el-button :type="editStatus ? 'danger' : 'success'" :icon="Edit" link @click="edit" size="large">
        {{ editStatus ? "退出编辑" : "编辑" }}
      </el-button>
    </div>
    <table v-if="studentCount !== 0" class="border-separate border border-slate-400 w-full">
      <thead>
        <tr class="text-lg">
          <td class="border border-slate-300 p-1 text-center">序号</td>
          <td class="border border-slate-300 p-1 text-center">姓名</td>
          <td class="border border-slate-300 p-1 text-center">专业</td>
          <td class="border border-slate-300 p-1 text-center">身份证号码</td>
          <td class="border border-slate-300 p-1 text-center">毕业证编号</td>
          <td class="border border-slate-300 p-1 text-center">学位证编号</td>
          <td class="border border-slate-300 p-1 text-center">操作</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(student, index) in StudentList">
          <td v-if="!editStatus" class="border border-slate-300 text-center">{{ index + 1 }}</td>
          <td v-else class="border border-slate-300 text-center">
            <el-checkbox @change="handleChange(index)" />
          </td>
          <td class="border border-slate-300 text-center">{{ student.name }}</td>
          <td class="border border-slate-300 text-center">{{ student.major }}</td>
          <td class="border border-slate-300 text-center">{{ student.id_code }}</td>
          <td class="border border-slate-300 text-center">{{ student.graduation_no }}</td>
          <td class="border border-slate-300 text-center">{{ student.thesis_no }}</td>
          <td class="border border-slate-300 text-center">
            <el-button link type="primary" @click="showmore(index)">更多信息</el-button>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-else class="w-full">
      <el-empty description="暂无数据" />
    </div>
    <el-dialog v-model="isvisible" width="60%">
      <template #header>
        <h1 class="text-center text-2xl font-semibold text-slate-900">学生详细信息</h1>
      </template>
      <StuProfileCard :StudentData="StudentList[stuIndex]" :PhotoStatus="photoStatus" />
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { ProfileDetail } from '@/types/apis/student';
import { defineModel } from 'vue';
import StuProfileCard from '@/components/StuProfileCard.vue';
import axios from 'axios';
import { useAccessTokenStore } from '@/store/accessToken';
import { useSiteInfoStore } from '@/store/siteInfo';
import { useStudentStore } from '@/store/student';
import { adminDeleteAccounts } from '@/api/apis/admin';
import { ElMessage } from 'element-plus';
import { Edit } from '@element-plus/icons-vue';
import { AdminAccountsReq } from '@/types/apis/admin';

const editStatus = ref(false);
const edit = () => {
  editStatus.value = !editStatus.value;
};

const StudentList = defineModel({
  required: true,
  type: Array as () => ProfileDetail[],
  default: () => [],
});

const delList = ref<string[]>([]);

const studentCount = computed(() => StudentList?.value?.length ? StudentList.value.length : 0);

const isvisible = ref(false);
const stuIndex = ref(0);
const photoStatus = ref(false);
const validateImage = (url: string) => {
  let img = new Image();
  img.onload = () => {
    photoStatus.value = true;
  }
  img.onerror = () => {
    photoStatus.value = false;
  }
  img.src = url;
}
const showmore = (index: number) => {
  stuIndex.value = index;
  let profileData = StudentList.value[index];
  axios.get(`${useSiteInfoStore().getBaseUrl()}/student/getPhoto?photo=${profileData.photo}`, {
    responseType: 'arraybuffer',
    headers: {
      'Authorization': useAccessTokenStore().getAccessToken(),
    },
  }
  ).then(response => {
    let blob = new Blob([response.data], { type: response.headers['content-type'] });
    let url = window.URL.createObjectURL(blob);
    profileData.photo = url;
    console.log(profileData);
    validateImage(url);
    useStudentStore().setProfile(profileData);
  })
  isvisible.value = true;
};

const handleChange = (index: number) => {
  if (delList.value.includes(StudentList.value[index].id_code)) {
    delList.value = delList.value.filter((item) => item !== StudentList.value[index].id_code);
  } else {
    delList.value.push(StudentList.value[index].id_code);
  }
}

const removeAccount = () => {
  if (delList.value.length === 0) {
    ElMessage.error('请选择要删除的账户');
    return;
  }
  const data = {
    id_codes: delList.value,
  } as AdminAccountsReq;
  adminDeleteAccounts(data).then((response) => {
    console.log(response);
    const res = response.data;
    if (res.code !== 0) {
      ElMessage.error(res.message);
      return;
    }
  });
}

</script>