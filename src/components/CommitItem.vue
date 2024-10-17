<template>
  <div class="m-2 flex justify-center items-center flex-col">
    <h1 class="text-m font-bold my-3 w-full text-left px-10 text-gray-600">申请编号：{{ commitInfo.file_id }}</h1>
    <el-form class="w-full text-lg px-10">
      <el-row>
        <el-col :span="12">
          <el-form-item>
            <template #label>
              <span class="font-semibold text-slate-900 truncate text-lg">提交人：</span>
            </template>
            <span class="text-lg">{{ commitInfo.committer_name }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item>
            <template #label>
              <span class="font-semibold text-slate-900 truncate text-lg">报读专业：</span>
            </template>
            <span class="text-lg">
              <span v-if="IsHistory">
                {{ commitInfo.enroll_major ? commitInfo.enroll_major : '未填写' }}
              </span>
              <span v-else class="w-1/2">
                <el-input v-if="!confirmed" v-model="commitInfo.enroll_major" placeholder="请输入报读专业" />
                <span v-else>{{ commitInfo.enroll_major }}</span>
              </span>
            </span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item >
            <template #label>
              <span class="font-semibold text-slate-900 truncate text-lg">是否提交：</span>
            </template>
            <span class="text-lg">
              {{ commitInfo.Commit ? '已提交' : '未提交' }}
              <font-awesome-icon v-if="commitInfo.Commit" icon="fa-solid fa-circle-check" style="color: #63E6BE;" />
              <font-awesome-icon v-else icon="fa-solid fa-circle-xmark" style="color: #ff7070;" />
            </span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item>
            <template #label>
              <span class="font-semibold text-slate-900 truncate text-lg">是否通过：</span>
            </template>
            <span class="text-lg">
              {{ commitInfo.passed ? '通过' : '未通过' }}
              <font-awesome-icon v-if="commitInfo.passed" icon="fa-solid fa-circle-check" style="color: #63E6BE;" />
              <font-awesome-icon v-else icon="fa-solid fa-circle-xmark" style="color: #ff7070;" />
            </span>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div v-if="IsHistory" class="flex justify-end w-full px-10">
      <el-button type="success" @click="exportForm">导出报名表</el-button>
    </div>
    <div v-else class="flex justify-end w-full">
      <el-button v-if="!commitInfo.Commit" type="success" @click="submit" class="mr-5">立即申请</el-button>
      <el-button v-if="!commitInfo.Commit" type="primary" @click="checkFiles">查看附件信息</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { CommitDetail } from '@/types/apis/common';
import { studentExport, studentSaveCommit } from '@/api/apis/student';
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';
import { studentSaveCommitRes } from '@/types/apis/student';
const router = useRouter();
const commitInfo = defineModel('CommitInfo', {
  required: true,
  type: Object as () => CommitDetail,
});

const confirmed = ref(false);

const testCommitInfo = () => {
  if (commitInfo.value.Commit) {
    confirmed.value = true;
  }
};

testCommitInfo();

const IsHistory = defineModel('IsHistory', {
  required: false,
  type: Boolean,
  default: false,
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
    confirmed.value = true;
  });
};

const checkFiles = () => {
  router.push('/apply/files/' + commitInfo.value.file_id);
};

const exportForm = () => {
  studentExport(commitInfo.value.id.toString()).then((response) => {
    console.log(response);
    // 接受数据response，并转为下载文件
    const blob = new Blob([response.data], { type: response.headers['content-type'] });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = '报名表.docx';
    a.click();
  });
}
</script>