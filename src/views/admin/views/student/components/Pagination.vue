<template>
  <div class="w-full flex">
    <div class="px-3">
      <el-button @click="fetchData" type="primary" round>重新获取</el-button>
    </div>
    <el-pagination v-model:current-page="paginatorData.page" v-model:page-size="paginatorData.limit"
      :page-sizes="pageSizes" size="default" :disabled="false" :background="true"
      layout="total, sizes, prev, pager, next, jumper" prev-text="上一页" next-text="下一页" :total="paginatorData.total"
      @size-change="handleSizeChange" @current-change="handleCurrentChange" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import { Paginator, PaginatorResp } from '@/types/apis/common';

import { adminAccounts } from '@/api/apis/admin';
import { ElMessage } from 'element-plus';
import { ProfileDetail } from '@/types/apis/student';

const paginatorData = ref<Paginator>({
  limit: 10,
  offset: 10,
  total: 0,
  page: 1,
});

const pageSizes = [10, 20, 30, 40];

const AccountsList = defineModel({
  required: true,
  type: Array as () => ProfileDetail[],
  default: () => [],
})

const handleSizeChange = (val: number) => {
  console.log(`每页 ${val} 条`);
};

const handleCurrentChange = (val: number) => {
  console.log(`当前页: ${val}`);
};

const defaultData = [{
  bachelor_class: '',
  bachelor_course: '',
  bachelor_school: '',
  birthday: '',
  domicile: '',
  email: '',
  email_verify: true,
  graduation_no: '',
  graduation_year: '',
  home_address: '',
  id_code: '',
  major: '',
  major_phone_number: '',
  name: '',
  nation: '',
  phone_number_verify: true,
  photo: '',
  politics: '',
  sex: '',
  standby_phone_number: '',
  thesis_no: '',
}]

const fetchData = () => {
  // console.log(paginatorData.value);
  adminAccounts(paginatorData.value).then((response) => {
    const res = response.data as PaginatorResp<ProfileDetail>;
    console.log(res);
    if (res.code !== 0) {
      ElMessage.error(res.message);
    }
    else {
      paginatorData.value.limit = res.limit;
      paginatorData.value.offset = res.offset;
      paginatorData.value.total = res.total;
      paginatorData.value.page = res.page;

      if (res.data)
        AccountsList.value = res.data;
      else {
        AccountsList.value = defaultData;
      }
    }
    ElMessage.success('获取成功');
  }).catch((err) => {
    console.log(err);
    ElMessage.error('获取失败');
  });
};

fetchData();

</script>