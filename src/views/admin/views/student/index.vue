<template>
  <div class="w-full p-5">
    <Pagination v-model="List" />
    <StudentList v-model="List" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Pagination from './components/Pagination.vue';
import StudentList from './components/StudentList.vue';
import { ProfileDetail } from '@/types/apis/student';

const List = ref<ProfileDetail[]>([]);

</script>