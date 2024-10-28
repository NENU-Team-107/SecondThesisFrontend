<template>
  <div class="m-2 flex justify-center items-center flex-col">
    <span class="text-m font-bold my-3 w-full text-left px-10 text-gray-600">申请编号：{{ commitInfo.file_id }}</span>
    <el-form class="w-full text-m px-10">
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
          <el-form-item>
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
      <el-row>
        <el-col :span="24">
          <el-form-item>
            <template #label>
              <span class="font-semibold text-slate-900 truncate text-lg">同意/驳回理由：</span>
            </template>
            <span class="text-lg">{{ commitInfo.reason }}</span>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div v-if="IsAdmin" class="flex justify-between w-full px-10">
      <div class="flex-1 mr-3">
        <el-input v-model="resson" placeholder="请输入同意/驳回理由" />
      </div>
      <div>
        <el-button type="success" @click="checkCommit(true)" class="mr-3">同意</el-button>
        <el-button type="danger" @click="checkCommit(false)" class="mr-3">驳回</el-button>
        <el-button type="primary" @click="checkFiles">查看附件信息</el-button>
      </div>
    </div>
    <div v-else-if="!IsHistory" class="flex justify-end w-full px-10">
      <el-button v-if="!commitInfo.Commit" type="success" @click="submit" class="mr-3">立即申请</el-button>
      <el-button v-if="!commitInfo.Commit" type="primary" @click="checkFiles">查看附件信息</el-button>
    </div>
    <div v-else class="flex justify-end w-full">
      <el-button type="success" @click="exportForm">导出报名表</el-button>
      <el-button type="primary" @click="checkFiles">查看附件</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { CommitDetail, CommitResp } from '@/types/apis/common';
import { studentSaveCommit } from '@/api/apis/student';
import { ElMessage, ElMessageBox } from 'element-plus';
import { useRouter } from 'vue-router';
import { studentSaveCommitRes } from '@/types/apis/student';
import { useSiteInfoStore } from '@/store/siteInfo';
import { useAccessTokenStore } from '@/store/accessToken';
import axios from 'axios';
import { adminCheckCommit } from '@/api/apis/admin';
import { CommitDetails } from '@/types/apis/admin';
const router = useRouter();
const commitInfo = defineModel('CommitInfo', {
  required: true,
  type: Object as () => CommitDetail,
});

const confirmed = ref(false);
const IsAdmin = defineModel('IsAdmin', {
  required: false,
  type: Boolean,
  default: false,
});

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

const resson = ref('');

const checkCommit = (status: boolean) => {
  const msg = status ? '确认通过该申请吗？' : '确认驳回该申请吗？';
  ElMessageBox.confirm(msg, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    submitCheck(status);
  }).catch(() => {
    ElMessage.info('已取消');
  });
};

const submitCheck = (status: boolean) => {
  const data = {
    id: commitInfo.value.id,
    committer_name: commitInfo.value.committer_name,
    commit: commitInfo.value.Commit,
    passed: status,
    reason: resson.value,
  } as CommitDetails;
  console.log(data);
  adminCheckCommit(data).then((response) => {
    const res = response.data as CommitResp;
    if (res.code === -1) {
      ElMessage.error(res.message);
      return;
    }
    ElMessage.success(res.message);
  });
}

const checkFiles = (_index: number) => {
  if (IsHistory || IsAdmin) {
    router.push('/apply/previewfiles/' + commitInfo.value.file_id);
  }
  else {
    router.push('/apply/files/' + commitInfo.value.file_id);
  }
};

const exportForm = () => {
  const apiurl = `${useSiteInfoStore().getBaseUrl()}/student/export/${commitInfo.value.id}`;
  console.log(apiurl);
  axios.get(apiurl, {
    headers: {
      'Authorization': useAccessTokenStore().getAccessToken(),
    },
    responseType: 'blob',
  }).then((response) => {
    const blob = response.data;
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = '报名表.docx';
    a.click();
    window.URL.revokeObjectURL(url); // 释放内存
  }).catch((error) => {
    console.error('下载失败', error);
    ElMessage.error('下载失败');
  });
}
</script>