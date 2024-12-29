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
              <span class="font-semibold text-slate-900 truncate text-lg">第二学士学位报名专业：</span>
            </template>
            <span class="text-lg text-start w-full">
              <span v-if="IsHistory">
                {{ commitInfo.enroll_major ? commitInfo.enroll_major : '未填写' }}
              </span>
              <span v-else class="w-1/2">
                <div v-if="!confirmed">
                  <el-select v-model="commitInfo.enroll_major" placeholder="请选择报读专业">
                    <el-option v-for="item in majorList" :key="item.value" :label="item.label" :value="item.value" />
                  </el-select>
                </div>
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
              {{ commitInfo.commit ? '已提交' : '未提交' }}
              <font-awesome-icon v-if="commitInfo.commit" icon="fa-solid fa-circle-check" style="color: #63E6BE;" />
              <font-awesome-icon v-else icon="fa-solid fa-circle-xmark" style="color: #ff7070;" />
            </span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item>
            <template #label>
              <span class="font-semibold text-slate-900 truncate text-lg">状态：</span>
            </template>
            <span class="text-lg">
              <!-- TODO:拟录取passed状态码展示 -->
              <span v-if="commitInfo.passed === 2">
                待处理
                <font-awesome-icon icon="fa-solid fa-circle-question" style="color: #FFD700;" />
              </span>
              <span v-else-if="commitInfo.passed === -1">
                未通过
                <font-awesome-icon icon="fa-solid fa-circle-xmark" style="color: #ff7070;" />
              </span>
              <span v-else>
                已通过
                <font-awesome-icon icon="fa-solid fa-circle-check" style="color: #63E6BE;" />
              </span>
            </span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item>
            <template #label>
              <span class="font-semibold text-slate-900 truncate text-lg">通过/不通过理由：</span>
            </template>
            <span class="text-lg"><em>{{ commitInfo.reason == "" ? "暂无" : commitInfo.reason }}</em></span>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div v-if="IsAdmin" class="flex justify-between w-full px-10">
      <div class="flex-1 mr-3">
        <el-input v-model="resson" placeholder="请输入拟录取/通过/不通过理由" />
      </div>
      <div>
        <el-button type="warning" @click="checkCommit(2)" class="mr-3">拟录取</el-button>
        <el-button type="success" @click="checkCommit(1)" class="mr-3">通过</el-button>
        <el-button type="danger" @click="checkCommit(-1)" class="mr-3">不通过</el-button>
        <el-button type="primary" @click="checkFiles">查看附件信息</el-button>
      </div>
    </div>
    <div v-else-if="!IsHistory" class="flex justify-end w-full px-10">
      <el-button v-if="!commitInfo.commit" type="success" @click="submit" class="mr-3">立即申请</el-button>
      <el-button v-if="!commitInfo.commit" type="primary" @click="checkFiles">上传附件信息</el-button>
    </div>
    <div v-else class="flex justify-end w-full">
      <el-button type="success" @click="exportForm">导出报名表</el-button>
      <el-button type="primary" @click="checkFiles">查看附件信息</el-button>
    </div>
    <el-divider></el-divider>
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

const majorList = ref([
  { value: '化学', label: '化学' },
  { value: '地理科学', label: '地理科学' },
  { value: '材料物理', label: '材料物理' },
  { value: '生物技术', label: '生物技术' },
  { value: '计算机科学与技术', label: '计算机科学与技术' },
  { value: '环境科学', label: '环境科学' },
  { value: '环境工程', label: '环境工程' },
  { value: '生态学', label: '生态学' },
  { value: '学前教育', label: '学前教育' },
  { value: '历史学', label: '历史学' },
  { value: '思想政治教育', label: '思想政治教育' },
  { value: '哲学', label: '哲学' },
  { value: '社会学', label: '社会学' }
]);

const testCommitInfo = () => {
  if (commitInfo.value.commit) {
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

const checkCommit = (status: number) => {
  const msg = status ? '确认通过该申请吗？' : '确认不通过该申请吗？';
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

const submitCheck = (status: number) => {
  const data = {
    id: commitInfo.value.id,
    committer_name: commitInfo.value.committer_name,
    commit: commitInfo.value.commit,
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

const checkFiles = () => {
  console.log(IsHistory.value, IsAdmin.value);
  if (IsHistory.value || IsAdmin.value) {
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
    a.download = commitInfo.value.id + '_报名表.pdf';
    a.click();
    window.URL.revokeObjectURL(url); // 释放内存
  }).catch((error) => {
    console.error('下载失败', error);
    ElMessage.error('下载失败');
  });
}
</script>