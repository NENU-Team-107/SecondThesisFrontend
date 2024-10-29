<template>
  <div class="flex flex-col items-center justify-center w-full">
    <div class="w-4/5 bg-white rounded-lg shadow-md p-2">
      <h1 class="text-2xl font-bold my-3 w-full text-center">待处理申请</h1>
      <Pagination v-model:pagination="pagination" @update:pagination="handlePageChange" />
      <div v-if="commitsList.length !== 0" class="font-bold my-3 w-full text-center">
        <div v-for="commit in commitsList" class="flex">
          <div v-show="editStatus" class="flex justify-center items-center mx-3">
            <el-checkbox @change="handleCheck(commit.id)"
              class="bg-slate-100 h-8 w-8 flex justify-center items-center rounded-lg" />
          </div>
          <div class="flex-1">
            <CommitItem :CommitInfo="commit" :IsAdmin="isadmin" />
          </div>
        </div>
      </div>
      <div v-else>
        <el-empty />
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

const pagination = ref<Paginator>({
  limit: 10,
  offset: 0,
  total: 0,
  page: 1,
});

const isadmin = ref<boolean>(true);

const commitsList = ref<CommitDetail[]>([]);

const fetchCommits = () => {
  commonCommits(pagination.value, true, 2).then((response) => {
    const res = response.data;
    console.log(res);
    if (res.code !== 0) {
      ElMessage.error(res.msg);
      return;
    }
    if(res.data) {
      for (let i = 0; i < res.data.length; i++) {
        if (res.data[i].commit) {
          commitsList.value.push(res.data[i]);
        }
      }
    } else {
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

const delList = ref<number[]>([]);
const handleCheck = (commit_id: number) => {
  if (delList.value.includes(commit_id)) {
    delList.value.splice(delList.value.indexOf(commit_id), 1);
  } else {
    delList.value.push(commit_id);
  }
}

const editStatus = ref(false);
</script>