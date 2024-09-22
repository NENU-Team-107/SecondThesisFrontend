<template>
  <div class="demo-pagination-block">
    <el-pagination v-model:current-page="paginatorData.page" v-model:page-size="paginatorData.limit"
      :page-sizes="pageSizes" size="default" :disabled="false" :background="true"
      layout="total, sizes, prev, pager, next, jumper" :total="paginatorData.total" @size-change="handleSizeChange"
      @current-change="handleCurrentChange" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Paginator, PaginatorResp } from '@/types/apis/common';
import { adminAccounts } from '@/api/apis/admin';
import { ElMessage } from 'element-plus';

const paginatorData = ref<Paginator>({
  limit: 10,
  offset: 10,
  total: 0,
  page: 1,
});

const pageSizes = [10, 20, 30, 40];

const AccountsList = defineModel({
  required: true,
  type: Array as () => PaginatorResp['data'],
  default: () => [],
})

const handleSizeChange = (val: number) => {
  console.log(`每页 ${val} 条`);
};

const handleCurrentChange = (val: number) => {
  console.log(`当前页: ${val}`);
};

const fetchData = () => {
  adminAccounts(paginatorData.value).then((res: PaginatorResp) => {
    if (res.code !== 0) {
      ElMessage.error(res.message);
    }
    else {
      paginatorData.value.limit = res.limit;
      paginatorData.value.offset = res.offset;
      paginatorData.value.total = res.total;
      paginatorData.value.page = res.page;

      AccountsList.value = res.data;
      
    }
  }).catch((err) => {
    ElMessage.error(err);
  });
};

fetchData();


</script>