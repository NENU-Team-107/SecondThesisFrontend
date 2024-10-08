<template>
  <div class="w-full p-5">
    <div class="flex-1">
      <h1 class="text-2xl font-semibold text-slate-900">学生信息管理</h1>
    </div>
    <Pagination v-model="List" />
    <StudentList v-model="List" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Pagination from '../components/Pagination.vue';
import StudentList from '../components/StudentList.vue';
import { ProfileDetail } from '@/types/apis/student';

const List = ref<ProfileDetail[]>([]);

</script>