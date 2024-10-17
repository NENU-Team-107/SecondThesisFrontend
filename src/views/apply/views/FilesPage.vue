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
        <el-upload drag 
          :acrion="item.url" 
          :headers="headers" 
          :on-success="handleSuccess" 
          method="post"
          :limit="item.limit" :file-list="fileMap[item.index]" :auto-upload="true" :on-preview="handlePreview"
          :before-remove="beforeRemove" :on-exceed="handleExceed" :before-upload="beforeUpload" :show-file-list="true"
          class="w-full">
          <el-icon class="el-icon--upload">
            <upload-filled />
          </el-icon>
          <div class="el-upload__text">
            拖拽文件到此处，或<em>点击此处上传文件</em>
          </div>
          <!-- <template #tip>
            <div class="el-upload__tip">
              jpg/png files with a size less than 500kb
            </div>
          </template> -->
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
import { ElMessage, ElMessageBox, UploadFile, UploadProps } from 'element-plus';
import { commonFile } from '@/api/apis/common';
import { CommonFileParams } from '@/types/apis/common';
const route = useRoute();
const file_id = route.params.file_id;
const baseurl = useSiteInfoStore().getBaseUrl();
console.log(file_id);
const classTypeList = [
  {
    index: 2,
    name: '本人身份证复印件（正反面）',
    url: baseurl + '/student/uploadFile/2/' + file_id,
    limit: 2,
  },
  {
    index: 3,
    name: '本科毕业证书、学位证书复印件',
    url: baseurl + '/student/uploadFile/3/' + file_id,
    limit: 2,
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
    limit: 99,
  }
];
console.log(classTypeList);

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
    }).catch((error) => {
      console.log(error);
    });
  }
}
fetchFileList();

const headers = {
  'Authorization': useAccessTokenStore().getAccessToken()
};

const handlePreview: UploadProps['onPreview'] = (uploadFile) => {
  console.log(uploadFile)
}

const handleExceed: UploadProps['onExceed'] = (files, uploadFiles) => {
  ElMessage.warning(
    `The limit is 3, you selected ${files.length} files this time, add up to ${files.length + uploadFiles.length
    } totally`
  )
}

const beforeRemove: UploadProps['beforeRemove'] = (uploadFile, uploadFiles) => {
  return ElMessageBox.confirm(
    `Cancel the transfer of ${uploadFile.name} ?`
  ).then(
    () => true,
    () => false
  )
}

const handleSuccess: UploadProps['onSuccess'] = (response, file, fileList) => {
  console.log(response, file, fileList)
}

const beforeUpload: UploadProps['beforeUpload'] = (file) => {
  console.log(file);
  return true;
}

</script>