<template>
  <div class="w-full flex">
    <el-pagination v-model:current-page="paginatorData.page" v-model:page-size="paginatorData.limit"
      :page-sizes="pageSizes" size="default" :disabled="false" :background="true"
      layout="total, sizes, prev, pager, next, jumper" prev-text="上一页" next-text="下一页" :total="paginatorData.total"
      @size-change="handleSizeChange" @current-change="handleCurrentChange" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Paginator, PaginatorResp } from '@/types/apis/common';

const paginatorData = defineModel({
  required: true,
  type: Object as () => Paginator,
});

const handleSizeChange = (val: number) => {
  console.log(`每页 ${val} 条`);
};

const handleCurrentChange = (val: number) => {
  console.log(`当前页: ${val}`);
};

const defaultData = [];
const pageSizes = [10, 20, 30, 40];

</script>