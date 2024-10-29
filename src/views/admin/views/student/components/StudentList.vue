<template>
  <div class="w-full h-full mt-5">
    <div class="w-full flex justify-between items-end pr-5 my-4">
      <div>
        <p class="text-gray-500">本页共{{ studentCount }}个账号</p>
      </div>
      <div>
        <el-button type="danger" @click="removeAccount" size="small" class="mr-8">删除{{
          delList.length }}个账号</el-button>
      </div>
    </div>
    <el-table v-if="studentCount !== 0" ref="multipleTableRef" :data="tableData" style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" />
      <el-table-column prop="name" label="姓名" width="150"></el-table-column>
      <el-table-column prop="sex" label="性别" width="100"></el-table-column>
      <el-table-column prop="id_code" label="身份证号" width="200"></el-table-column>
      <el-table-column prop="majar" label="原本科专业" width="200"></el-table-column>
      <el-table-column prop="bachelor_school" label="本科学校" width="200"></el-table-column>
      <el-table-column prop="majar_phone_number" label="联系电话" width="200"></el-table-column>
      <el-table-column label="Operations">
        <template #default="scope">
          <el-button size="small" @click="showmore(scope.$index,)">
            查看信息
          </el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div v-else class="w-full">
      <el-empty description="暂无数据" />
    </div>
    <el-dialog v-if="isvisible" v-model="isvisible" width="80%">
      <template #header>
        <h1 class="text-center text-2xl font-semibold text-slate-900">学生详细信息</h1>
      </template>
      <StuProfileCard :StudentData="StudentList[stuIndex]" :PhotoStatus="photoStatus" />
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, } from 'vue';
import { ProfileDetail } from '@/types/apis/student';
import StuProfileCard from '@/components/StuProfileCard.vue';
import axios from 'axios';
import { useAccessTokenStore } from '@/store/accessToken';
import { useSiteInfoStore } from '@/store/siteInfo';
import { useStudentStore } from '@/store/student';
import { adminDeleteAccounts } from '@/api/apis/admin';
import { ElMessage, TableInstance } from 'element-plus';
import { AdminAccountsReq } from '@/types/apis/admin';

const props = defineProps({
  StudentList: {
    required: true,
    type: Array as () => ProfileDetail[],
    default: () => [],
  },
});

const emit = defineEmits(['update:StudentList']);

const multipleTableRef = ref<TableInstance>();
const multipleSelection = ref<ProfileDetail[]>([])

const handleSelectionChange = (val: ProfileDetail[]) => {
  multipleSelection.value = val
  delList.value = val.map((item) => item.id_code)
}
const tableData = computed(() => props.StudentList.map((item) => {
  return {
    name: item.name,
    sex: item.sex,
    id_code: item.id_code,
    majar: item.major,
    majar_phone_number: item.major_phone_number,
    bachelor_school: item.bachelor_school,
  };
}));

console.log(tableData.value);

const delList = ref<string[]>([]);

const studentCount = computed(() => props.StudentList.length);

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
  let profileData = props.StudentList[index];
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
    ElMessage.success('删除成功');
    delList.value = [];
    stuIndex.value = 0;
    emit('update:StudentList');
  });
}

const handleDelete = (_index: number, row: ProfileDetail) => {
  let data = {
    id_codes: [row.id_code],
  } as AdminAccountsReq;
  adminDeleteAccounts(data).then((response) => {
    console.log(response);
    const res = response.data;
    if (res.code !== 0) {
      ElMessage.error(res.message);
      return;
    }
    ElMessage.success('删除成功');
    delList.value = [];
    stuIndex.value = 0;
    emit('update:StudentList');
  });
}

</script>