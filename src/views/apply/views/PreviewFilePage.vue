<template>
  <div class="flex flex-col items-center justify-center h-full w-full">
    <div class="w-4/5 bg-white rounded-lg shadow-md p-2 mt-10">
      <h1 class="text-2xl font-bold my-3 w-full text-center">附件信息</h1>
      <div v-for="item in classTypeList" class="w-full items-center flex justify-center flex-col my-2 px-5">
        <h1 class="text-lg font-thin my-2 w-full">
          <em class="font-bold">
            <span v-if="fileMap[item.index].length == 0" class="text-red-500">
              (未上传)
            </span>
            <span v-else class="text-green-500 underline cursor-pointer" @click="previewFile(item.index)">
              (已上传)
              <font-awesome-icon icon="fa-solid fa-file" />
            </span>
          </em>
          {{ item.name }}
        </h1>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAccessTokenStore } from '@/store/accessToken';
import { useSiteInfoStore } from '@/store/siteInfo';
import { useRoute } from 'vue-router';
import { UploadUserFile } from 'element-plus';
import { CommonFileParams } from '@/types/apis/common';
import axios from 'axios';

const route = useRoute();
const file_id = route.params.file_id;
const baseurl = useSiteInfoStore().getBaseUrl();

const classTypeList = ref([
  {
    index: 2,
    name: '一、本人身份证扫描件（正反面）',
    url: baseurl + '/student/uploadFile/2/' + file_id,
    limit: 1,
  },
  {
    index: 3,
    name: '二、本科毕业证书、学位证书扫描件',
    url: baseurl + '/student/uploadFile/3/' + file_id,
    limit: 1,
  },
  {
    index: 4,
    name: '三、《中国高等教育学位在线验证报告》学信网扫描件（日期要求）',
    url: baseurl + '/student/uploadFile/4/' + file_id,
    limit: 1,
  },
  {
    index: 5,
    name: '四、《教育部学历证书电子注册备案表》学信网扫描件（日期要求）',
    url: baseurl + '/student/uploadFile/5/' + file_id,
    limit: 1,
  },
  {
    index: 6,
    name: '五、《教育部学籍在线验证报告》学信网扫描件（仅应届生）',
    url: baseurl + '/student/uploadFile/6/' + file_id,
    limit: 1,
  },
  {
    index: 7,
    name: '六、本科学习成绩单扫描件（须加盖本科教务公章）',
    url: baseurl + '/student/uploadFile/7/' + file_id,
    limit: 1,
  },
  {
    index: 8,
    name: '七、与所报第二学士学位专业相关的研究成果、竞赛获奖等佐证材料扫描件（近三年）',
    url: baseurl + '/student/uploadFile/8/' + file_id,
    limit: 1,
  }
]);

const getFileName = (key: number) => {
  return classTypeList.value[key - 2].name;
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

const previewFile = (index: number) => {
  const url = fileMap.value[index][0].url;
  window.open(url);
}

</script>