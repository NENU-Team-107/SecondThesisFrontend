<template>
  <div class="flex flex-col items-center justify-center w-full">
    <div class="w-4/5 bg-white rounded-lg shadow-md p-2">
      <h1 class="text-2xl font-bold my-3 w-full text-center">拟录取通过申请</h1>
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
import { ref } from 'vue';
import { commonCommits } from '@/api/apis/common';
import { CommitDetail, Paginator } from '@/types/apis/common';
import CommitItem from '@/components/CommitItem.vue';
import { ElMessage } from 'element-plus';
import Pagination from '@/components/Pagination.vue';

const status = ref<number>(3); // 拟录取通过

const title = defineModel('title', {
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

const fetchCommits = () => {
  commonCommits(pagination.value, true, status.value).then((response) => {
    const res = response.data;
    console.log(res);
    if (res.code !== 0) {
      ElMessage.error(res.msg);
      return;
    }
    if (res.data) {
      commitsList.value = res.data;
    }
    else {
      commitsList.value = [];
    }

    pagination.value.total = res.total;
    pagination.value.page = res.page;
    pagination.value.limit = res.limit;
    pagination.value.offset = res.offset;
  });
};

const handlePageChange = () => {
  fetchCommits();
};

fetchCommits();
</script>