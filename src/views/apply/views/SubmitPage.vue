<template>
  <div class="flex flex-col items-center justify-center">
    <div class="w-4/5 bg-white rounded-lg shadow-md p-2">
      <h1 class="text-2xl font-bold my-3 w-full text-center">提交材料预览</h1>
      <Pagination v-model="paginator" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Pagination from './components/Pagination.vue';

const paginator = ref({
  limit: 10,
  offset: 10,
  total: 0,
  page: 1,
});


</script>