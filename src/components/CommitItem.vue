<template>
  <div class="m-2 flex justify-center items-center flex-col">
    <el-descriptions :column="2" :border="false" title="信息" class="w-full">
      <el-descriptions-item :span="1">
        <template #label>
          <span class="font-semibold text-slate-900 truncate  text-lg">提交人：</span>
        </template>
        <span class="text-lg">
          {{ commitInfo.commiter_name }}
        </span>
      </el-descriptions-item>
      <el-descriptions-item :span="1">
        <template #label>
          <span class="font-semibold text-slate-900 truncate text-lg">报读专业：</span>
        </template>
        <span class="text-lg">
          {{ commitInfo.enroll_major }}
        </span>
      </el-descriptions-item>
      <el-descriptions-item :span="1">
        <template #label>
          <span class="font-semibold text-slate-900 truncate text-lg">是否提交：</span>
        </template>
        <span class="text-lg">
          {{ commitInfo.commit ? '已提交' : '未提交' }}
          <font-awesome-icon v-if="commitInfo.commit" icon="fa-solid fa-circle-check" style="color: #63E6BE;" />
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
    <div class="w-full justify-start items-start">
      <el-upload v-model:file-list="fileList" :action="uploadFile.url" :headers="uploadFile.headers" multiple
        :on-preview="handlePreview" :on-remove="handleRemove" :before-remove="beforeRemove" :limit="5"
        :on-exceed="handleExceed">
        <el-button type="primary">点击上传附件</el-button>
        <template #tip>
          <div>
            jpg/png files with a size less than 500KB.
          </div>
        </template>
      </el-upload>
    </div>
    <div class="flex justify-end w-full">
      <el-button v-if="!commitInfo.commit" type="primary" @click="submit" class="mr-5">立即申请</el-button>
      <el-button type="primary" @click="exportForm">导出报名表</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { CommitDetail } from '@/types/apis/common';
import { studentExport, studentSaveCommit } from '@/api/apis/student';
import { ElMessage, ElMessageBox, UploadProps, UploadUserFile } from 'element-plus';
import { useAccessTokenStore } from '@/store/accessToken';
import { useSiteInfoStore } from '@/store/siteInfo';

const commitInfo = defineModel('CommitInfo', {
  required: true,
  type: Object as () => CommitDetail,
});

const submit = () => {
  studentSaveCommit((commitInfo.value.id).toString()).then((response) => {
    const res = response.data;
    if (res.code === -1) {
      ElMessage.error(res.message);
      return;
    }
    ElMessage.success('提交成功');
  });
};

const exportForm = () => {
  studentExport(commitInfo.value.file_id).then((response) => {
    const res = response.data;
    if (res.code === -1) {
      ElMessage.error(res.message);
      return;
    }
    ElMessage.success('导出报名表成功');
  });
};

const classType = 'apply';
const uploadFile = {
  url: `${useSiteInfoStore().getBaseUrl()}/student/uploadFile/${classType}/${commitInfo.value.file_id}`,
  headers:{
    Authorization: useAccessTokenStore().getAccessToken(),
  }
}


const fileList = ref<UploadUserFile[]>([
  {
    name: 'element-plus-logo.svg',
    url: 'https://element-plus.org/images/element-plus-logo.svg',
  },
  {
    name: 'element-plus-logo2.svg',
    url: 'https://element-plus.org/images/element-plus-logo.svg',
  },
])

const handleRemove: UploadProps['onRemove'] = (file, uploadFiles) => {
  console.log(file, uploadFiles)
}

const handlePreview: UploadProps['onPreview'] = (uploadFile) => {
  console.log(uploadFile)
}

const handleExceed: UploadProps['onExceed'] = (files, uploadFiles) => {
  ElMessage.warning(
    `一次上传附件数量不能超过3个，本次将上传 ${files.length} 个附件, 总共已有 ${files.length + uploadFiles.length
    } 个附件。`
  )
}

const beforeRemove: UploadProps['beforeRemove'] = (uploadFile, _uploadFiles) => {
  return ElMessageBox.confirm(
    `确认移除文件 ${uploadFile.name} 吗?`
  ).then(
    () => true,
    () => false
  )
}

</script>