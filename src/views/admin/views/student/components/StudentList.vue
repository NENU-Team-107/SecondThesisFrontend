<template>
  <div class="divide-y divide-slate-100">
    <List>
      <ListItem v-for="student in StudentList" :listItem="student" />
    </List>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { defineModel } from 'vue';
import { PaginatorResp } from '@/types/apis/common';
import List from './List.vue'
import ListItem from './ListItem.vue'


const StudentList = defineModel({
  required: true,
  type: Array as () => PaginatorResp['data'],
  default: () => [],
})

</script>