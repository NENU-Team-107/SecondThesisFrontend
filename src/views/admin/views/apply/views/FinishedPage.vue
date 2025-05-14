<template>
  <div class="flex flex-col items-center justify-center w-full">
    <div class="w-4/5 bg-white rounded-lg shadow-md p-2">
      <h1 class="text-2xl font-bold my-3 w-full text-center">拟录取通过申请</h1>

      <div class="w-full flex my-3">
        <div class="ml-6 text-gray-700">查询条件：</div>
        <div class="flex-1 mx-3 flex">
          <el-input v-model="queryInfo.name" placeholder="姓名" class="mx-2" />
          <el-input v-model="queryInfo.id_code" placeholder="身份证号" class="mx-2" />
          <el-input v-model="queryInfo.major" placeholder="专业" class="mx-2" />
          <el-button class="mx-2" type="primary" @click="fetchCommits" round>
            <font-awesome-icon icon="fa-solid fa-magnifying-glass" class="px-1" />
            <span>立即查询</span>
          </el-button>
        </div>
      </div>

      <div v-if="commitsList.length !== 0" class="font-bold my-3 w-full text-center">
        <CommitItem v-for="commit in commitsList" :CommitInfo="commit" :IsAdmin="isadmin" :Status="status" />
      </div>
      <div v-else>
        <el-empty />
      </div>

      <div class="flex justify-self-center">
        <Pagination v-model:pagination="pagination" @update:pagination="handlePageChange" />
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { commonCommits } from "@/api/apis/common";
import CommitItem from "@/components/CommitItem.vue";
import Pagination from "@/components/Pagination.vue";
import type { CommitDetail, CommitQuery, Paginator } from "@/types/apis/common";
import { ElMessage } from "element-plus";
import { ref } from "vue";

const status = ref<number>(3); // 拟录取通过

const title = defineModel("title", {
  required: true,
  type: String,
});

const pagination = ref<Paginator>({
  limit: 10,
  offset: 0,
  total: 0,
  page: 1,
});

const isadmin = ref<boolean>(true);

const commitsList = ref<CommitDetail[]>([]);

const queryInfo = ref<CommitQuery>({
  name: "",
  id_code: "",
  major: "",
});

const fetchCommits = () => {
  commonCommits(pagination.value, true, status.value, queryInfo.value).then(
    (response) => {
      const res = response.data;
      console.log(res);
      if (res.code !== 0) {
        ElMessage.error(res.msg);
        return;
      }
      if (res.data) {
        commitsList.value = res.data;
      } else {
        commitsList.value = [];
      }

      pagination.value.total = res.total;
      pagination.value.page = res.page;
      pagination.value.limit = res.limit;
      pagination.value.offset = res.offset;
    },
  );
};

const handlePageChange = () => {
  fetchCommits();
};

fetchCommits();
</script>