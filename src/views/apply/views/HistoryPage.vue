<template>
  <div class="flex flex-col items-center justify-center p-2 w-full">
    <div class="w-4/5 bg-white rounded-lg shadow-md p-2">
      <h1 class="text-2xl font-bold my-3 w-full text-center">历史提交</h1>
      <Pagination v-model:pagination="paginator" @update:pagination="handlePageChange" />
      <div class="mt-3 w-4/5 p-2 justify-center mx-auto">
        <div v-if="commitsList.length !== 0">
          <CommitItem v-for="commit in commitsList" :CommitInfo="commit" :IsHistory="true" />
        </div>
        <div v-else>
          <el-empty />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Pagination from '@/components/Pagination.vue';
import CommitItem from '@/components/CommitItem.vue';
import { commonCommits } from '@/api/apis/common';
import { Paginator } from '@/types/apis/common';
import { CommitDetail } from '@/types/apis/common';
import { ElMessage } from 'element-plus';

const paginator = ref<Paginator>({
  limit: 10,
  offset: 10,
  total: 0,
  page: 1,
});

const commitsList = ref<CommitDetail[]>([]);

const fetchCommits = () => {
  console.log('fetchCommits');
  commonCommits(paginator.value, true , 2).then((response) => {
    const res = response.data;
    console.log(res);
    if (res.code !== 0) {
      ElMessage.error(res.message);
      return;
    } else {
      if (res.data) {
        commitsList.value = res.data;
      }
      else {
        commitsList.value = [];
      }
      paginator.value.total = res.total;
      paginator.value.page = res.page;
      paginator.value.limit = res.limit;
      paginator.value.offset = res.offset;

    }
  });
};

const handlePageChange = () => {
  fetchCommits();
};

fetchCommits();


</script>