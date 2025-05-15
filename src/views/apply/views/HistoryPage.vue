<template>
  <div class="flex flex-col items-center justify-center p-2 w-full">
    <div class="w-4/5 bg-white rounded-lg shadow-md p-2">
      <h1 class="text-2xl font-bold my-3 w-full text-center">历史提交</h1>

      <el-alert title="须知" type="warning" :closable="false">
        <div>
          <p>报名开始: {{ startTime }}</p>
          <p>报名截止: {{ stuDeadline }}</p>
          <p>审核状态开放时间: {{ deadline }}</p>
        </div>
      </el-alert>

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
import { commonCommits, commonGetTimeConfig } from "@/api/apis/common";
import CommitItem from "@/components/CommitItem.vue";
import Pagination from "@/components/Pagination.vue";
import type { Paginator } from "@/types/apis/common";
import type { CommitDetail } from "@/types/apis/common";
import { ElMessage } from "element-plus";
import { ref } from "vue";

const paginator = ref<Paginator>({
  limit: 10,
  offset: 10,
  total: 0,
  page: 1,
});

const commitsList = ref<CommitDetail[]>([]);

const fetchCommits = () => {
  console.log("fetchCommits");
  commonCommits(paginator.value, true, 2).then((response) => {
    const res = response.data;
    console.log(res);
    if (res.code !== 0) {
      ElMessage.error(res.message);
      return;
    }
    if (res.data) {
      commitsList.value = res.data;
    } else {
      commitsList.value = [];
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

const startTime = ref<string>("");
const deadline = ref<string>("");
const stuDeadline = ref<string>("");

const fetchTime = () => {
  commonGetTimeConfig().then((response) => {
    const res = response.data;
    const formatDateTime = (dateTime: string) => {
      const date = new Date(dateTime);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      const seconds = String(date.getSeconds()).padStart(2, "0");
      return `${year}-${month}-${day}-${hours}-${minutes}-${seconds}`;
    };

    res.startTime = formatDateTime(res.startTime);
    res.ddl = formatDateTime(res.ddl);
    res.student_ddl = formatDateTime(res.student_ddl);
    startTime.value = res.startTime;
    deadline.value = res.ddl;
    stuDeadline.value = res.student_ddl;
  });
};
fetchTime();
</script>