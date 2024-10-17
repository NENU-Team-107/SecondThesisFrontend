<template>
  <div class="m-2 flex justify-center items-center flex-col">
    <el-descriptions :column="2" :border="false" class="w-full">
      <template #title>
        <h1 class="text-lg font-bold my-1 w-full text-center">申请编号:{{ commitInfo.file_id }}</h1>
      </template>
      <el-descriptions-item :span="1">
        <template #label>
          <span class="font-semibold text-slate-900 truncate  text-lg">提交人：</span>
        </template>
        <span class="text-lg">
          {{ commitInfo.committer_name }}
        </span>
      </el-descriptions-item>
      <el-descriptions-item :span="1">
        <template #label>
          <span class="font-semibold text-slate-900 truncate text-lg">报读专业：</span>
        </template>
        <span class="text-lg">
          <el-input v-model="commitInfo.enroll_major" style="width: 240px" placeholder="请输入报读专业" />
        </span>
      </el-descriptions-item>
      <el-descriptions-item :span="1">
        <template #label>
          <span class="font-semibold text-slate-900 truncate text-lg">是否提交：</span>
        </template>
        <span class="text-lg">
          {{ commitInfo.Commit ? '已提交' : '未提交' }}
          <font-awesome-icon v-if="commitInfo.Commit" icon="fa-solid fa-circle-check" style="color: #63E6BE;" />
          <font-awesome-icon v-else icon="fa-solid fa-circle-xmark" style="color: #ff7070;" />
        </span>
      </el-descriptions-item>
      <el-descriptions-item :span="1">
        <template #label>
          <span class="font-semibold text-slate-900 truncate text-lg">是否通过：</span>
        </template>
        <span class="text-lg">
          {{ commitInfo.passed ? '通过' : '未通过' }}
          <font-awesome-icon v-if="commitInfo.passed" icon="fa-solid fa-circle-check" style="color: #63E6BE;" />
          <font-awesome-icon v-else icon="fa-solid fa-circle-xmark" style="color: #ff7070;" />
        </span>
      </el-descriptions-item>
      <el-descriptions-item :span="2">
        <template #label>
          <span class="font-semibold text-slate-900 truncate text-lg">审核反馈：</span>
        </template>
        <span class="text-lg">
          {{ commitInfo.reason }}
        </span>
      </el-descriptions-item>
    </el-descriptions>
    <div class="flex justify-end w-full">
      <el-button v-if="!commitInfo.Commit" type="primary" @click="submit" class="mr-5">立即申请</el-button>
      <el-button type="primary" @click="checkFiles">查看附件信息</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { CommitDetail } from '@/types/apis/common';
import { studentSaveCommit } from '@/api/apis/student';
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';
import { studentSaveCommitRes } from '@/types/apis/student';
const router = useRouter();
const commitInfo = defineModel('CommitInfo', {
  required: true,
  type: Object as () => CommitDetail,
});

const submit = () => {
  const data: studentSaveCommitRes = {
    id: commitInfo.value.id,
    enroll_major: commitInfo.value.enroll_major,
  }
  if (!data.enroll_major) {
    ElMessage.error('请填写报读专业');
    return;
  }
  studentSaveCommit(data).then((response) => {
    const res = response.data;
    if (res.code === -1) {
      ElMessage.error(res.message);
      return;
    }
    ElMessage.success('提交成功');
  });
};

const checkFiles = () => {
  router.push('/apply/files/' + commitInfo.value.file_id);
};
</script>