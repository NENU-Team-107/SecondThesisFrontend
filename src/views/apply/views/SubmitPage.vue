<template>
  <div class="flex flex-col items-center justify-center p-2">
    <div class="w-4/5 bg-white rounded-lg shadow-md p-2">
      <h1 class="text-2xl font-bold my-3 w-full text-center">提交材料预览</h1>
      <Pagination v-model="paginator" />
      <div class="text-2xl font-bold my-3 w-full text-center">
      </div>
    </div>
    <div class="mt-3 w-4/5 bg-white rounded-lg shadow-md p-2">
    <CommitItem v-for="commit in commitsList" :CommitInfo="commit" />
  </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Pagination from './components/Pagination.vue';
import CommitItem from '@/components/CommitItem.vue';
import { commonCommits } from '@/api/apis/common';
import { Paginator } from '@/types/apis/common';
import { CommitDetail } from '@/types/apis/common';

const paginator = ref<Paginator>({
  limit: 10,
  offset: 10,
  total: 0,
  page: 1,
});

// const commitsList = ref<CommitDetails[]>([]);
const commitsList = ref<CommitDetail[]>([
  {
    commit: false,
    commiter_name: 'Dodola',
    enroll_major: '计算机科学与技术',
    file_id: '1',
    id: 1,
    passed: true,
    reason: '该生符合报读要求，予以通过。',
  },
]);


const fetchCommits = () => {
  console.log('fetchCommits');
  commonCommits(paginator.value).then((res) => {
    console.log(res);
  });
};

fetchCommits();


</script>