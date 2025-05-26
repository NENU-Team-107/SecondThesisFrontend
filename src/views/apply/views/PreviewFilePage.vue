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

    <!-- 添加文件预览对话框 -->
    <el-dialog v-model="previewDialogVisible" title="文件预览" width="80%" :close-on-click-modal="false"
      :close-on-press-escape="true" class="preview-dialog">
      <div class="w-full preview-container">
        <!-- PDF预览 -->
        <VuePdfEmbed v-if="previewType === 'pdf'" :source="previewUrl" class="pdf-preview" />
        <!-- 图片预览 -->
        <img v-else-if="previewType === 'image'" :src="previewUrl" class="image-preview" alt="预览图片" />
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { useAccessTokenStore } from "@/store/accessToken";
import { useSiteInfoStore } from "@/store/siteInfo";
import type { CommonFileParams } from "@/types/apis/common";
import axios from "axios";
import {
  ElMessage,
  type UploadProps,
  type UploadUserFile,
} from "element-plus";
import { ref, onBeforeUnmount } from "vue";
import { useRoute } from "vue-router";
import VuePdfEmbed from 'vue-pdf-embed';

const route = useRoute();
const file_id = route.params.file_id;
const baseurl = useSiteInfoStore().getBaseUrl();

const classTypeList = ref([
  {
    index: 2,
    name: "一、本人身份证扫描件（正反面）",
    url: `${baseurl}/student/uploadFile/2/${file_id}`,
    limit: 1,
  },
  {
    index: 3,
    name: "二、本科毕业证书、学位证书扫描件",
    url: `${baseurl}/student/uploadFile/3/${file_id}`,
    limit: 1,
  },
  {
    index: 4,
    name: "三、《中国高等教育学位在线验证报告》学信网扫描件（验证有效期为2025年9月30日以后，2022-2024届毕业生必填）",
    url: `${baseurl}/student/uploadFile/4/${file_id}`,
    limit: 1,
  },
  {
    index: 5,
    name: "四、《教育部学历证书电子注册备案表》学信网扫描件（验证有效期为2025年9月30日以后，2022-2024届毕业生必填）",
    url: `${baseurl}/student/uploadFile/5/${file_id}`,
    limit: 1,
  },
  {
    index: 6,
    name: "五、《教育部学籍在线验证报告》学信网扫描件（2025届毕业生必填）",
    url: `${baseurl}/student/uploadFile/6/${file_id}`,
    limit: 1,
  },
  {
    index: 7,
    name: "六、本科学习成绩单扫描件（须加盖本科教务公章）",
    url: `${baseurl}/student/uploadFile/7/${file_id}`,
    limit: 1,
  },
  {
    index: 8,
    name: "七、与所报第二学士学位专业相关的研究成果、竞赛获奖等佐证材料扫描件（近三年）",
    url: `${baseurl}/student/uploadFile/8/${file_id}`,
    limit: 1,
  },
]);

const getFileName = (key: number) => {
  return classTypeList.value[key - 2].name;
};

// 添加自定义类型定义
interface CustomUploadUserFile extends UploadUserFile {
  type?: string;
}

const fileMap = ref<Record<number, CustomUploadUserFile[]>>({
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
      id: file_id,
    } as CommonFileParams;
    axios
      .get(`${useSiteInfoStore().getBaseUrl()}/common/file`, {
        responseType: "arraybuffer",
        params: data,
        headers: {
          Authorization: useAccessTokenStore().getAccessToken(),
        },
      })
      .then((response) => {
        const blob = new Blob([response.data], {
          type: response.headers["content-type"],
        });
        const url = window.URL.createObjectURL(blob);
        const fileData = {
          name: getFileName(key),
          url: url,
          type: response.headers["content-type"], // 保存文件类型
        } as CustomUploadUserFile;
        console.log(fileData.type)
        fileMap.value[Number(key)] = [fileData];
      })
      .catch((err) => {
        console.log(err);
      });
  }
};
fetchFileList();

const previewDialogVisible = ref(false);
const previewUrl = ref('');
const previewType = ref('');

const previewFile = (index: number) => {
  const file = fileMap.value[index][0];
  if (!file || !file.url) {
    ElMessage.error('文件不存在或无法预览');
    return;
  }

  // 检查文件URL的安全性
  const url = file.url;
  if (!url.startsWith('blob:') && !url.startsWith(baseurl)) {
    ElMessage.error('无效的文件来源');
    return;
  }

  // 判断文件类型
  const fileType = file.type || '';
  if (fileType === 'application/pdf') {
    // PDF文件在对话框中预览
    previewType.value = 'pdf';
    previewUrl.value = url;
    previewDialogVisible.value = true;
  } else if (fileType.startsWith('image/')) {
    // 图片文件在对话框中预览
    previewType.value = 'image';
    previewUrl.value = url;
    previewDialogVisible.value = true;
  } else {
    ElMessage.error('不支持的文件类型');
    return;
  }
};

// 在组件卸载时清理blob URL
onBeforeUnmount(() => {
  Object.values(fileMap.value).forEach(files => {
    files.forEach(file => {
      if (file.url?.startsWith('blob:')) {
        URL.revokeObjectURL(file.url);
      }
    });
  });
});
</script>

<style scoped>
.preview-dialog :deep(.el-dialog__body) {
  padding: 10px;
  height: 80vh;
  overflow: hidden;
}

.preview-container {
  height: 100%;
  overflow: auto;
  background-color: #f5f5f5;
  border-radius: 4px;
}

.pdf-preview {
  width: 100%;
  min-height: 100%;
}

.image-preview {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
</style>