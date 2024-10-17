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
        <el-upload drag multiple :acrion="geturl(item.index)" :headers="headers" :on-success="handleSuccess"
          :limit="item.limit" :on-exceed="exceedFiles" :file-list="fileMap[item.index]" :auto-upload="false"
          :show-file-list="false" class="w-full">
          <el-icon class="el-icon--upload">
            <upload-filled />
          </el-icon>
          <div class="el-upload__text">
            拖拽文件到此处，或<em>点击此处上传文件</em>
          </div>
          <template #tip>
            <div class="el-upload__tip">
              jpg/png files with a size less than 500kb
            </div>
          </template>
        </el-upload>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { UploadFilled } from '@element-plus/icons-vue'
import { useAccessTokenStore } from '@/store/accessToken';
import { useSiteInfoStore } from '@/store/siteInfo';
import { useRoute } from 'vue-router';
import { ElMessage, UploadFile } from 'element-plus';
import { commonFile } from '@/api/apis/common';
import { CommonFileParams } from '@/types/apis/common';
const route = useRoute();
const file_id = route.params.file_id;

const classTypeList = [
  {
    index: 2,
    name: '本人身份证复印件（正反面）',
    limit: 2,
  },
  {
    index: 3,
    name: '本科毕业证书、学位证书复印件',
    limit: 2,
  },
  {
    index: 4,
    name: '《中国高等教育学位在线验证报告》学信网打印件（日期要求）',
    limit: 1,
  },
  {
    index: 5,
    name: '《教育部学历证书电子注册备案表》学信网打印件（日期要求）',
    limit: 1,
  },
  {
    index: 6,
    name: '《教育部学籍在线验证报告》学信网打印件（仅应届生）',
    limit: 1,
  },
  {
    index: 7,
    name: '本科学习成绩单复印件（须加盖本科教务公章）',
    limit: 1,
  },
  {
    index: 8,
    name: '与所报第二学士学位专业相关的研究成果、竞赛获奖等佐证材料复印件（近三年）',
    limit: 99,
  }
];

const fileMap: Record<number, UploadFile[]> = {
  2: [],
  3: [],
  4: [],
  5: [],
  6: [],
  7: [],
  8: [],
};

const fetchFileList = () => {
  for (const key in fileMap) {
    const data = {
      "class": key,
      "id": file_id,
    } as CommonFileParams;
    commonFile(data).then((response) => {
      const res = response.data;
      if (res.code === -1) {
        ElMessage.error(res.message);
      } else {
        fileMap[key] = res.data;
      }
    })
  }
}
// fetchFileList();

const exceedFiles = (files: any, fileList: any) => {
  console.log(files);
  console.log(fileList);
}

const headers = {
  'Authorization': useAccessTokenStore().getAccessToken()
};
const geturl = (classType: number) => {
  return useSiteInfoStore().getBaseUrl() + '/student/uploadFile' + classType + '/' + file_id;
}

const handleSuccess = (response: any, file: any) => {
  console.log(response);
  console.log(file);
}
</script>