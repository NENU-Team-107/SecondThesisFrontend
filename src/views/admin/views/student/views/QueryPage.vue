<template>
  <div class="w-full p-5">
    <div class="flex-1">
      <h1 class="text-2xl font-semibold text-slate-900">学生信息管理</h1>
    </div>
    <div class="px-3 flex items-center justify-between w-full">
      <Pagination v-model:pagination="pagination" @update:pagination="handlePageChange" />
      <el-button @click="fetchData" type="primary" round>重新获取</el-button>
    </div>
    <StudentList v-model:StudentList="studentList" @update:StudentList="handleUpdateStuList" />
  </div>
</template>

<script setup lang="ts">
import { adminAccounts } from "@/api/apis/admin";
import Pagination from "@/components/Pagination.vue";
import type { Paginator, PaginatorResp } from "@/types/apis/common";
import type { ProfileDetail } from "@/types/apis/student";
import { ElMessage } from "element-plus";
import { ref } from "vue";
import StudentList from "../components/StudentList.vue";

const studentList = ref<ProfileDetail[]>([]);

const pagination = ref<Paginator>({
  limit: 10,
  offset: 0,
  total: 0,
  page: 1,
});

const fetchData = () => {
  adminAccounts(pagination.value)
    .then((response) => {
      const res = response.data as PaginatorResp<ProfileDetail>;
      console.log(res);
      if (res.code !== 0) {
        ElMessage.error(res.message);
      } else {
        pagination.value.total = res.total;
        pagination.value.page = res.page;
        pagination.value.limit = res.limit;
        pagination.value.offset = res.offset;

        studentList.value = res.data;
      }
    })
    .catch((err) => {
      console.log(err);
      ElMessage.error("获取失败");
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