<template>
  <div class="flex flex-col items-center justify-center w-full">
    <div class="w-4/5 bg-white rounded-lg shadow-md p-2">
      <h1 class="text-2xl font-bold my-3 w-full text-center">初审待处理</h1>
      <div>
        <el-alert title="提示" type="info">
          <div>请注意：报名截止时间设置后会影响报名系统的正常使用，请谨慎操作。</div>
          <div>如果需要修改报名截止时间，请联系管理员。</div>
          <div>本页进行初审审核，若需要处理初审通过状态的申请（拟录取通过或不通过），请前往初审通过页进行审核。</div>
        </el-alert>
      </div>

      <div class="flex justify-between items-center">
        <div class="flex-1 flex items-center justify-between">
          <div class="flex w-full px-5 flex-col items-start">
            <div class="flex items-center justify-between w-full">
              <span class="flex justify-center items-center">报名开始时间</span>
              <el-button @click="setStartTime" type="primary" round>确认设置</el-button>
            </div>
            <div class="flex w-full py-1">
              <el-date-picker class="min-w-full" v-model="startTime" type="date" placeholder="开始时间" size="large"
                format="YYYY/MM/DD" value-format="YYYY-MM-DD-hh-mm-ss" />
            </div>
          </div>
          <div class="flex w-full px-5 flex-col items-start">
            <div class="flex items-center justify-between w-full">
              <span class="flex justify-center items-center">报名截止时间</span>
              <el-button @click="setDeadline" type="primary" round>确认设置</el-button>
            </div>
            <div class="flex w-full py-1">
              <el-date-picker class="min-w-full" v-model="deadline" type="date" placeholder="截止时间" size="large"
                format="YYYY/MM/DD" value-format="YYYY-MM-DD-hh-mm-ss" />
            </div>
          </div>
          <div class="flex w-full px-5 flex-col items-start">
            <div class="flex items-center justify-between w-full">
              <span class="flex justify-center items-center">审核状态开放查询时间</span>
              <el-button @click="setStuDeadline" type="primary" round>确认设置</el-button>
            </div>
            <div class="flex w-full py-1">
              <el-date-picker class="min-w-full" v-model="stuDeadline" type="date" placeholder="截止时间" size="large"
                format="YYYY/MM/DD" value-format="YYYY-MM-DD-hh-mm-ss" />
            </div>
          </div>
        </div>
      </div>

      <div class="w-full flex my-3">
        <div class="ml-6 text-gray-700">查询条件：</div>
        <div class="flex-1 mx-3 flex">
          <el-input v-model="queryInfo.name" placeholder="姓名" class="mx-2" />
          <el-input v-model="queryInfo.id_code" placeholder="身份证号" class="mx-2" />
          <el-input v-model="queryInfo.major" placeholder="专业" class="mx-2" />
          <el-button class="mx-2" type="primary" @click="fetchCommits" round>
            <font-awesome-icon icon="fa-solid fa-magnifying-glass" class="px-1" />
            <span>立即查询</span>
          </el-button>
        </div>
      </div>

      <div class="my-3 flex justify-end w-full">
        <el-button @click="exportAllCommits" type="success" round>
          <font-awesome-icon icon="fa-solid fa-file-export" class="px-1" />
          导出所有申请数据
        </el-button>
      </div>
      <div class="flex items-center justify-between my-3">
        <div class="mr-2">
          <el-checkbox v-model="allSelected" @change="toggleAllSelection">全选本页提交</el-checkbox>
        </div>
        <div class="flex-1">
          <el-input v-model="batchReason" placeholder="输入批量处理原因" :disabled="selectedCommits.length === 0" />
        </div>
        <div class="ml-2">
          <el-button @click="batchBack" type="info">退回申请</el-button>
          <el-button @click="batchApprove" type="success">初审通过</el-button>
          <el-button @click="batchReject" type="danger">初审不通过</el-button>
        </div>
      </div>

      <div v-if="commitsList.length !== 0" class="font-bold my-3 w-full text-center">
        <el-checkbox-group v-model="selectedCommits">
          <div v-for="commit in commitsList" :key="commit.id" class="flex items-center">
            <el-checkbox :value="commit.id" class="mx-3" />
            <div class="flex-1">
              <CommitItem :CommitInfo="commit" :IsAdmin="isadmin" :Status="status" />
            </div>
          </div>
        </el-checkbox-group>
      </div>
      <div v-else>
        <el-empty />
      </div>

      <div class="flex justify-self-center">
        <Pagination v-model:pagination="pagination" @update:pagination="handlePageChange" />
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import {
  adminCheckCommit,
  adminRejectMultiCommit,
  adminSetDeadline,
  adminSetStartTime,
  adminSetStudentDeadline,
} from "@/api/apis/admin";
import { commonCommits, commonGetTimeConfig } from "@/api/apis/common";
import CommitItem from "@/components/CommitItem.vue";
import Pagination from "@/components/Pagination.vue";
import { useAccessTokenStore } from "@/store/accessToken";
import { useSiteInfoStore } from "@/store/siteInfo";
import type { CommitDetails } from "@/types/apis/admin";
import type {
  CommitDetail,
  CommitQuery,
  CommitResp,
  Paginator,
} from "@/types/apis/common";
import axios from "axios";
import { ElMessage, ElMessageBox } from "element-plus";
import { ref, watch } from "vue";


const pagination = ref<Paginator>({
  limit: 10,
  offset: 0,
  total: 0,
  page: 1,
});

const status = ref<number>(2); // 待处理申请

const isadmin = ref<boolean>(true);
const commitsList = ref<CommitDetail[]>([]);
const selectedCommits = ref<number[]>([]);
const allSelected = ref(false);
const batchReason = ref("");

const queryInfo = ref<CommitQuery>({
  name: "",
  id_code: "",
  major: "",
});

const fetchCommits = () => {
  console.log(
    "查询条件：",
    queryInfo.value.id_code,
    queryInfo.value.name,
    queryInfo.value.major,
  );
  commonCommits(pagination.value, true, status.value, queryInfo.value).then(
    (response) => {
      const res = response.data;
      console.log(res);
      if (res.code !== 0) {
        ElMessage.error(res.msg);
        return;
      }

      if (res.data) {
        // for (let i = 0; i < res.data.length; i++) {
        //   if (res.data[i].commit) {
        //     commitsList.value.push(res.data[i]);
        //   }
        // }
        commitsList.value = res.data;
        // for (let i = 0; i < commitsList.value.length; i++) {
        //   commitsList.value[i].commit = true;
        // }
      } else {
        commitsList.value = [];
      }
      console.log("commitsList.value", commitsList.value);
      pagination.value.total = res.total;
      pagination.value.page = res.page;
      pagination.value.limit = res.limit;
      pagination.value.offset = res.offset;
    },
  );
};

const handlePageChange = () => {
  fetchCommits();
};

const toggleAllSelection = () => {
  if (allSelected.value) {
    selectedCommits.value = commitsList.value.map((commit) => commit.id);
  } else {
    selectedCommits.value = [];
  }
};

watch(selectedCommits, (newSelection) => {
  allSelected.value = newSelection.length === commitsList.value.length;
});

const batchApprove = () => {
  if (selectedCommits.value.length === 0) {
    ElMessage.warning("请先选择提交项");
    return;
  }
  for (let i = 0; i < selectedCommits.value.length; i++) {
    const commit = commitsList.value.find(
      (commit) => commit.id === selectedCommits.value[i],
    );
    if (commit) {
      checkCommit(1, commit, batchReason.value);
    }
  }
  // Handle batch approve logic here
  ElMessage.success(
    `已通过 ${selectedCommits.value.length} 项，原因: ${batchReason.value}`,
  );
  selectedCommits.value = [];
  batchReason.value = "";
  fetchCommits();
};

const batchReject = () => {
  if (selectedCommits.value.length === 0) {
    ElMessage.warning("请先选择提交项");
    return;
  }

  for (let i = 0; i < selectedCommits.value.length; i++) {
    const commit = commitsList.value.find(
      (commit) => commit.id === selectedCommits.value[i],
    );
    if (commit) {
      checkCommit(-1, commit, batchReason.value);
    }
  }
  // Handle batch reject logic here
  ElMessage.success(
    `不通过 ${selectedCommits.value.length} 项，原因: ${batchReason.value}`,
  );

  selectedCommits.value = [];
  batchReason.value = "";
  fetchCommits();
};

const batchBack = () => {
  if (selectedCommits.value.length === 0) {
    ElMessage.warning("请先选择提交项");
    return;
  }
  for (let i = 0; i < selectedCommits.value.length; i++) {
    const commit = commitsList.value.find(
      (commit) => commit.id === selectedCommits.value[i],
    );
    if (commit) {
      checkCommit(0, commit, batchReason.value);
    }
  }
  adminRejectMultiCommit(
    { ids: selectedCommits.value },
  ).then((response) => {
    const res = response.data as CommitResp;
    if (res.code === -1) {
      ElMessage.error(res.message);
      return;
    }
    ElMessage.success(res.message);
    fetchCommits();
  })
};

const checkCommit = (
  status: number,
  commitInfo: CommitDetail,
  reason: string,
) => {
  const msg = status ? "确认通过该申请吗？" : "确认不通过该申请吗？";
  ElMessageBox.confirm(msg, "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      submitCheck(status, commitInfo, reason);
    })
    .catch(() => {
      ElMessage.info("已取消");
    });
};

const submitCheck = (
  status: number,
  commitInfo: CommitDetail,
  reason: string,
) => {
  const data = {
    id: commitInfo.id,
    committer_name: commitInfo.committer_name,
    commit: commitInfo.commit,
    passed: status,
    reason: reason,
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
};

const startTime = ref("");
const deadline = ref("");
const stuDeadline = ref("");

const setStartTime = () => {
  if (!startTime.value) {
    ElMessage.error("开始时间不能为空");
    return;
  }
  adminSetStartTime(startTime.value).then((response) => {
    const res = response.data;
    if (res.code === -1) {
      ElMessage.error(res.message);
    } else {
      ElMessage.success(`成功设置报名开始时间为${startTime.value}`);
    }
  });
};

const setDeadline = () => {
  if (!deadline.value) {
    ElMessage.error("截止时间不能为空");
    return;
  }
  adminSetDeadline(deadline.value).then((response) => {
    const res = response.data;
    if (res.code === -1) {
      ElMessage.error(res.message);
    } else {
      ElMessage.success(`成功设置报名截止时间为${deadline.value}`);
    }
  });
};

const setStuDeadline = () => {
  if (!stuDeadline.value) {
    ElMessage.error("截止时间不能为空");
    return;
  }

  adminSetStudentDeadline(stuDeadline.value).then((response) => {
    const res = response.data;
    if (res.code === -1) {
      ElMessage.error(res.message);
    } else {
      ElMessage.success(`成功设置学生查看审核截止时间为${stuDeadline.value}`);
    }
  });
};

const fetchTime = () => {
  commonGetTimeConfig().then((response) => {
    const res = response.data;
    const formatDateTime = (dateTime: string) => {
      const date = new Date(dateTime);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      const seconds = String(date.getSeconds()).padStart(2, "0");
      return `${year}-${month}-${day}-${hours}-${minutes}-${seconds}`;
    };

    res.startTime = formatDateTime(res.startTime);
    res.ddl = formatDateTime(res.ddl);
    res.student_ddl = formatDateTime(res.student_ddl);
    startTime.value = res.startTime;
    deadline.value = res.ddl;
    stuDeadline.value = res.student_ddl;
  });
}
fetchTime();

const exportAllCommits = () => {
  const apiurl = `${useSiteInfoStore().getBaseUrl()}/admin/exportCommits`;
  axios
    .get(apiurl, {
      headers: {
        Authorization: useAccessTokenStore().getAccessToken(),
      },
      responseType: "blob",
    })
    .then((response) => {
      const blob = response.data;
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "报名数据.csv";
      a.click();
      window.URL.revokeObjectURL(url); // 释放内存
    })
    .catch((error) => {
      console.error("下载失败", error);
      ElMessage.error("下载失败");
    });
};

fetchCommits();
</script>