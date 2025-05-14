<template>
  <div class="flex flex-col items-center justify-center h-full w-full">
    <div class="w-4/5 bg-white rounded-lg shadow-md p-2">
      <div v-if="!confirm">
        <h1 class="text-2xl font-bold my-3 w-full text-center">第二学位申请</h1>
        <div>
          <el-alert title="填写须知" type="warning" :closable="false">
            <div>
              <p>
                请正确填写如下信息：姓名、性别、民族、政治面貌、身份证号、出生日期、户籍所在地、毕业年份、电子邮箱、手机号码（2个）、通讯地址、原本科学校、原本科专业所属的国家“双一流”建设学科、原本科专业所属专业类、毕业证编号（未取得毕业证书的应届生可暂不填）、学位证编号（未取得学位证书的应届生可暂不填）、第二学士学位报名专业、本人一寸证件照。
              </p>
              <p>
                所有成功新建的申请将在“我的申请”中查看，若新建过申请，请在“提交报名”或“申请记录”中提交申请或查看审核信息，如有疑问请联系招生办公室。
              </p>
              <p>
                请确保填写的信息真实有效，信息一经提交不可修改，请仔细核对后再提交。
              </p>
            </div>
          </el-alert>
        </div>
        <div>
          <StuFormUpdate :StudentData="applyForm" SubmitText="下一步" :Message="msg" v-model:Confirm="confirm" />
        </div>
      </div>
      <div v-else>
        <el-result icon="success" title="成功保存申请信息">
          <template #sub-title>
            <div class="text-gray-600">请在<span class="text-blue-500 px-1" @click="getApply">我的申请 ->
                提交报名</span>中查看本次申请的文件材料，并上传所需附件材料，确认无误后提交报名。</div>
          </template>
          <template #extra>
            <el-button type="primary" @click="getApply">点击查看</el-button>
          </template>
        </el-result>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { studentNewCommit } from "@/api/apis/student";
import StuFormUpdate from "@/components/StuFormUpdate.vue";
import { useStudentStore } from "@/store/student";
import type { ProfileDetail, studentNewCommitResp } from "@/types/apis/student";
import { ElMessage } from "element-plus";
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();

const msg = ref<string>("确认更新个人信息并保存本次提交信息吗？");

const applyForm = ref<ProfileDetail>(useStudentStore().getStudentProfile());

const confirm = ref<boolean>(false);

watch(
  () => confirm.value,
  (value) => {
    if (value) {
      applyForm.value = useStudentStore().getStudentProfile();
      submitApplication();
    }
  },
);

const file_id = ref("");
const submitApplication = () => {
  // 提交申请表
  // 提交申请
  studentNewCommit().then((response) => {
    const res = response.data as studentNewCommitResp;
    if (res.code === -1) {
      ElMessage.error(res.message);
      return;
    }
    ElMessage.success(res.message);
    file_id.value = res.file_id;
  });
};

const getApply = () => {
  // 跳转到我的申请
  router.push(`/apply/files/${file_id.value}`);
};
</script>