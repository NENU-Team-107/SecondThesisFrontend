<template>
  <div class="flex flex-col items-center justify-center h-full w-full">
    <div class="w-4/5 bg-white rounded-lg shadow-md p-2">
      <h1 class="text-2xl font-bold my-3 w-full text-center">上传附件信息</h1>
      <div>
        <el-alert title="上传须知" type="warning" :closable="false">
          <p>填报完成所需个人信息并提交要求附件后，系统生成《东北师范大学第二学士学位报名表》，并在右下角预留本人签名区域与填报日期。</p>
        </el-alert>
      </div>
      <div v-for="item in classTypeList" class="w-full items-center flex justify-center flex-col my-2 px-5">
        <h1 class="text-lg font-thin my-2 w-full ">
          {{ item.name }}
        </h1>
        <el-upload drag :action="item.url" :headers="headers" :on-success="handleSuccess"
          method="post" :limit="item.limit" :file-list="fileMap[item.index]" :auto-upload="true"
          :on-preview="handlePreview" :before-remove="handleBeforeRemove" :on-exceed="handleExceed"
          :before-upload="handleBeforeUpload" :show-file-list="true" class="w-full">
          <el-icon class="el-icon--upload">
            <upload-filled />
          </el-icon>
          <div class="el-upload__text">
            拖拽文件到此处，或<em>点击此处上传文件</em>
          </div>
          <template #tip>
            已上传：{{ fileMap[item.index].length }} / {{ item.limit }}
          </template>
        </el-upload>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { UploadFilled } from '@element-plus/icons-vue'
import { useAccessTokenStore } from '@/store/accessToken';
import { useSiteInfoStore } from '@/store/siteInfo';
import { useRoute } from 'vue-router';
import { ElMessage, UploadProps, UploadUserFile } from 'element-plus';
import { CommonFileParams } from '@/types/apis/common';
import axios from 'axios';
import { studentUploadFile } from '@/api/apis/student';
const route = useRoute();
const file_id = route.params.file_id;
const baseurl = useSiteInfoStore().getBaseUrl();

const classTypeList = ref([
  {
    index: 2,
    name: '本人身份证复印件（正反面）',
    url: baseurl + '/student/uploadFile/2/' + file_id,
    limit: 1,
  },
  {
    index: 3,
    name: '本科毕业证书、学位证书复印件',
    url: baseurl + '/student/uploadFile/3/' + file_id,
    limit: 1,
  },
  {
    index: 4,
    name: '《中国高等教育学位在线验证报告》学信网打印件（日期要求）',
    url: baseurl + '/student/uploadFile/4/' + file_id,
    limit: 1,
  },
  {
    index: 5,
    name: '《教育部学历证书电子注册备案表》学信网打印件（日期要求）',
    url: baseurl + '/student/uploadFile/5/' + file_id,
    limit: 1,
  },
  {
    index: 6,
    name: '《教育部学籍在线验证报告》学信网打印件（仅应届生）',
    url: baseurl + '/student/uploadFile/6/' + file_id,
    limit: 1,
  },
  {
    index: 7,
    name: '本科学习成绩单复印件（须加盖本科教务公章）',
    url: baseurl + '/student/uploadFile/7/' + file_id,
    limit: 1,
  },
  {
    index: 8,
    name: '与所报第二学士学位专业相关的研究成果、竞赛获奖等佐证材料复印件（近三年）',
    url: baseurl + '/student/uploadFile/8/' + file_id,
    limit: 1,
  }
]);

const getFileName = (key: number) => {
  return classTypeList.value[key - 2].name;
}

const getIndex = (name: string) => {
  for (let i = 0; i < classTypeList.value.length; i++) {
    if (classTypeList.value[i].name === name) {
      return classTypeList.value[i].index;
    }
  }
  return -1;
}

const fileMap = ref<Record<number, UploadUserFile[]>>({
  2: [],
  3: [],
  4: [],
  5: [],
  6: [],
  7: [],
  8: [],
});

const fetchFileList = () => {
  for (let key = 2; key <= 8; key++) {
    const data = {
      class: key.toString(),
      id: file_id
    } as CommonFileParams;
    axios.get(`${useSiteInfoStore().getBaseUrl()}/common/file`,
      {
        responseType: 'arraybuffer',
        params: data,
        headers: {
          'Authorization': useAccessTokenStore().getAccessToken(),
        },
      }
    ).then((response) => {
      let blob = new Blob([response.data], { type: response.headers['content-type'] });
      let url = window.URL.createObjectURL(blob);
      const fileData = {
        name: getFileName(key),
        url: url,
      } as UploadUserFile;
      fileMap.value[Number(key)] = [fileData];
    }).catch(err => {
      console.log(err);
    });
  }
}
fetchFileList();

const headers = {
  'Authorization': useAccessTokenStore().getAccessToken()
};

const handleSuccess: UploadProps['onSuccess'] = (response, file, fileList) => {
  console.log(response, file, fileList)
  const res = response;
  if (res.code === -1) {
    ElMessage.error(res.message);
  } else {
    ElMessage.success('上传成功');
    fetchFileList();
  }
}

const handleBeforeUpload: UploadProps['beforeUpload'] = (file) => {
  console.log(file);
  return true;
}

const handleExceed: UploadProps['onExceed'] = (files, fileList) => {
  // 覆盖前一个文件并上传
  let key = getIndex(fileList[0].name);
  fileMap.value[key] = files.map(file => ({
    name: file.name,
    url: URL.createObjectURL(file),
  }));
  // 上传文件
  const formData = new FormData();
  files.forEach(file => {
    formData.append('file', file);
  });
  const urldata = {
    class: key.toString(),
    id: file_id
  } as CommonFileParams;
  studentUploadFile(formData, urldata).then(response => {
    const res = response.data;
    if (res.code === -1) {
      ElMessage.error(res.message);
    } else {
      ElMessage.warning('已覆盖前一个文件。');
      fetchFileList();
    }
  }).catch(err => {
    console.log(err);
  });
  return true;
}


const handlePreview: UploadProps['onPreview'] = (file) => {
  window.open(file.url, '_blank');
}

const handleBeforeRemove: UploadProps['beforeRemove'] = (file, fileList) => {
  console.log(file, fileList);
  return true;
}

const handleRemove: UploadProps['onRemove'] = (file, fileList) => {
  console.log(file, fileList);
}

</script>