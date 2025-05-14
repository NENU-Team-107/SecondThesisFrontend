<template>
  <div class="w-full flex">
    <el-pagination v-model:current-page="pagination.page" v-model:page-size="pagination.limit" :page-sizes="pageSizes"
      size="default" :disabled="false" :background="true" layout="total, sizes, prev, pager, next, jumper"
      prev-text="上一页" next-text="下一页" :total="pagination.total" @size-change="handleSizeChange"
      @current-change="handleCurrentChange" />
  </div>
</template>

<script setup lang="ts">
import type { Paginator } from "@/types/apis/common";

const props = defineProps({
  pagination: {
    required: true,
    type: Object as () => Paginator,
    default: () =>
      ({
        limit: 10,
        offset: 0,
        total: 0,
        page: 1,
      }) as Paginator,
  },
});

const emit = defineEmits(["update:pagenation"]);

const handleSizeChange = (val: number) => {
  console.log(`每页 ${val} 条`);
  emit("update:pagenation", {
    ...props.pagination,
    limit: val,
  });
};

const handleCurrentChange = (val: number) => {
  console.log(`当前页: ${val}`);
  emit("update:pagenation", {
    ...props.pagination,
    page: val,
  });
};

const pageSizes = [10, 20, 30, 40];
</script>