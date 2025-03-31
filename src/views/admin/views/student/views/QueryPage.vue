<template>
  <div class="w-full p-5">
    <div class="flex-1">
      <h1 class="text-2xl font-semibold text-slate-900">学生信息管理</h1>
    </div>
    <div class="flex-1 mt-2 mb-5">
      <el-input v-model="searchQuery" placeholder="请输入学号或姓名" class="w-1/3" @keyup.enter="handleSearch" clearable>
        <template #prepend>搜索</template>
      </el-input>
    </div>
    <div class="px-3 flex items-center justify-between w-full">
      <Pagination v-model:pagination="pagination" @update:pagination="handlePageChange" />
      <el-button @click="fetchData" type="primary" round>重新获取</el-button>
    </div>
    <StudentList v-model:StudentList="studentList" @update:StudentList="handleUpdateStuList" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Pagination from '@/components/Pagination.vue';
import StudentList from '../components/StudentList.vue';
import { ProfileDetail } from '@/types/apis/student';
import { Paginator, PaginatorResp } from '@/types/apis/common';
import { adminAccounts } from '@/api/apis/admin';
import { ElMessage } from 'element-plus';

const studentList = ref<ProfileDetail[]>([]);

const searchQuery = ref<string>('');

const handleSearch = () => {
  if (!searchQuery.value) {
    ElMessage.error('请输入学号或姓名进行搜索');
    return;
  }
  pagination.value.limit = 10;
  pagination.value.offset = 0;
  pagination.value.page = 1;
  // TODO:分页搜索

};

const pagination = ref<Paginator>({
  limit: 10,
  offset: 0,
  total: 0,
  page: 1,
});

const fetchData = () => {
  adminAccounts(pagination.value).then((response) => {
    const res = response.data as PaginatorResp<ProfileDetail>;
    console.log(res);
    if (res.code !== 0) {
      ElMessage.error(res.message);
    }
    else {
      pagination.value.total = res.total;
      pagination.value.page = res.page;
      pagination.value.limit = res.limit;
      pagination.value.offset = res.offset;

      studentList.value = res.data;

    }
  }).catch((err) => {
    console.log(err);
    ElMessage.error('获取失败');
  });
};

const handlePageChange = () => {
  fetchData();
};

const handleUpdateStuList = () => {
  fetchData();
};

fetchData();
</script>