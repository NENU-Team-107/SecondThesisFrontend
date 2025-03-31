<template>
  <div class="flex flex-col items-center justify-center w-full">
    <div class="w-4/5 bg-white rounded-lg shadow-md p-2">
      <h1 class="text-2xl font-bold my-3 w-full text-center">查询申请</h1>
      <div class="w-full flex justify-between items-center">
        <div class="flex flex-row px-5 flex-1">
          <el-input v-model="searchFields.idCard" placeholder="身份证号" class="px-2" clearable />
          <el-input v-model="searchFields.studentName" placeholder="学生姓名" class="px-2" clearable />
          <el-input v-model="searchFields.major" placeholder="报名专业" class="px-2" clearable />
          <el-select v-model="searchFields.status" placeholder="通过状态" class="px-2" clearable>
            <el-option label="全部" :value="null" />
            <el-option label="通过" :value="1" />
            <el-option label="不通过" :value="0" />
          </el-select>
          <el-select v-model="searchFields.commit" placeholder="提交状态" clearable>
            <el-option label="全部" :value="null" />
            <el-option label="已提交" :value="1" />
            <el-option label="未提交" :value="0" />
          </el-select>
        </div>
        <div>
          <el-button type="primary" @click="handleSearch">查询</el-button>
          <el-button @click="resetSearch">重置</el-button>
        </div>
      </div>
      <div v-if="commitsList.length !== 0 && searchFields.status != null" class="font-bold my-3 w-full text-center">
        <CommitItem v-for="commit in commitsList" :CommitInfo="commit" :IsAdmin="isadmin"
          :Status="searchFields.status" />
      </div>
      <div v-else>
        <el-empty />
      </div>

      <div class="flex justify-self-center">
        <Pagination v-model:pagination="pagination" @update:pagination="handlePageChange" />
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { adminQueryCommits } from '@/api/apis/admin';
import { CommitDetail, Paginator } from '@/types/apis/common';
import { QueryCommitReq } from '@/types/apis/admin';
import CommitItem from '@/components/CommitItem.vue';
import { ElMessage } from 'element-plus';
import Pagination from '@/components/Pagination.vue';

const title = defineModel('title', {
  required: true,
  type: String,
});


const pagination = ref<Paginator>({
  limit: 10,
  offset: 0,
  total: 0,
  page: 1,
});

const isadmin = ref<boolean>(true);

const commitsList = ref<CommitDetail[]>([]);

const searchFields = ref({
  idCard: '',
  studentName: '',
  major: '',
  status: null,
  commit: null,
});

const handleSearch = () => {
  fetchCommits();
};
const resetSearch = () => {
  searchFields.value.idCard = '';
  searchFields.value.studentName = '';
  searchFields.value.major = '';
  searchFields.value.status = null;
  searchFields.value.commit = null;
};


const fetchCommits = () => {
  if (searchFields.value.idCard === '' && searchFields.value.studentName === '' && searchFields.value.major === '' && searchFields.value.status === null && searchFields.value.commit === null) {
    ElMessage.error('请至少输入一个查询条件');
    return;
  }
  if (searchFields.value.status === null) {
    ElMessage.error('请选择通过状态');
    return;
  }
  if (searchFields.value.commit === null) {
    ElMessage.error('请选择提交状态');
    return;
  }

  ElMessage.info('正在查询，请稍等...');

  const data: QueryCommitReq = {
    id_code: searchFields.value.idCard,
    name: searchFields.value.studentName,
    major: searchFields.value.major,
    status: searchFields.value.status,
    committed: searchFields.value.commit,
    paginator: {
      limit: pagination.value.limit,
      offset: pagination.value.offset,
      page: pagination.value.page,
      total: pagination.value.total,
    },
  };
  adminQueryCommits(data).then((response) => {
    const res = response.data;
    console.log(res);
    if (res.code !== 0) {
      ElMessage.error(res.msg);
      return;
    }
    if (res.data) {
      commitsList.value = res.data;
    }
    else {
      commitsList.value = [];
    }

    pagination.value.total = res.total;
    pagination.value.page = res.page;
    pagination.value.limit = res.limit;
    pagination.value.offset = res.offset;

  });
};

const handlePageChange = () => {
  fetchCommits();
};

// fetchCommits();
</script>