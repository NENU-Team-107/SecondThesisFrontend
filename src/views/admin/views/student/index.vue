<template>
  <Pagination v-model="List" />
  <StudentList v-model="List" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Pagination from './components/Pagination.vue';
import StudentList from './components/StudentList.vue';

const List = ref([]);

</script>