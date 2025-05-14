<template>
  <div class="flex flex-col items-center justify-center p-2 w-full">
    <div class="w-4/5 bg-white rounded-lg shadow-md p-2">
      <h1 class="text-2xl font-bold my-3 w-full text-center">提交预览</h1>
      <Pagination v-model:pagination="paginator" @update:pagination="handlePageChange" />
      <div class="mt-3 w-4/5 p-2 justify-center mx-auto">
        <div v-if="commitsList.length !== 0">
          <CommitItem v-for="commit in commitsList" :CommitInfo="commit" />
        </div>
        <div v-else>
          <el-empty />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { commonCommits } from "@/api/apis/common";
import CommitItem from "@/components/CommitItem.vue";
import Pagination from "@/components/Pagination.vue";
import type { CommitQuery, Paginator } from "@/types/apis/common";
import type { CommitDetail } from "@/types/apis/common";
import { ElMessage } from "element-plus";
import { ref } from "vue";

const paginator = ref<Paginator>({
  limit: 10,
  offset: 10,
  total: 10,
  page: 1,
});

const commitsList = ref<CommitDetail[]>([]);

const queryInfo = ref<CommitQuery>({
  name: "",
  id_code: "",
  major: "",
});

const fetchCommits = () => {
  console.log("fetchCommits");
  commonCommits(paginator.value, false, 2, queryInfo.value).then((response) => {
    const res = response.data;
    console.log(res);
    if (res.code === -1) {
      ElMessage.error(res.msg);
      return;
    }
    commitsList.value = res.data;
    for (let i = 0; i < commitsList.value.length; i++) {
      commitsList.value[i].committer_name = res.data[i].name;
    }

    paginator.value.total = res.total;
    paginator.value.page = res.page;
    paginator.value.limit = res.limit;
    paginator.value.offset = res.offset;
  });
};

const handlePageChange = () => {
  fetchCommits();
};

fetchCommits();
</script>