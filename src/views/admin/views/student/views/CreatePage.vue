<template>
  <div class="flex flex-col items-center justify-center w-full">
    <el-card class="w-4/5">
      <div class="flex justify-between items-center my-2 flex-col">
        <h1 class="text-2xl font-bold w-fit">创建学生账号</h1>
        <div class="w-full mt-6 flex justify-around">
          <div class="w-1/2 flex ">
            <span class="w-44 text-lg">单次添加账号：</span>
            <el-input v-model="id_code" placeholder="请输入单个身份证号码" />
          </div>
          <div>
            <el-button type="primary" @click="addIdCode">添加</el-button>
          </div>
        </div>
        <div class="w-full mt-6 flex justify-around">
          <div class="w-1/2 flex ">
            <span class="w-44 text-lg">批量添加账号：</span>
            <el-input v-model="id_code_total" placeholder="请批量输入身份证号码，相邻账号之间用英文逗号、空格或回车分隔" type="textarea" />
          </div>
          <div>
            <el-button type="primary" @click="addIdCodeTotal">添加</el-button>
          </div>
        </div>
        <div class="w-full">
          <el-divider border-style="dashed"></el-divider>
          <div class="flex flex-col items-center justify-center">
            <h1 class="text-xl font-bold w-full text-center">本次添加账号</h1>
            <div class="flex w-4/5 items-end justify-end">
              <el-button type="danger" @click="clearAll">清空</el-button>
              <el-button type="success" @click="submitCreate">创建</el-button>
            </div>
            <div class="w-1/2 flex flex-col items-center justify-center">
              <el-tag class="mt-2" v-for="id in idCodeArray" :key="id" closable
                @close="idCodeArray.splice(idCodeArray.indexOf(id), 1)">{{ id }}</el-tag>
            </div>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { adminCreateAccounts } from "@/api/apis/admin";
import type { AdminAccountsReq } from "@/types/apis/admin";
import { ElNotification } from "element-plus";
import { ref } from "vue";

const id_code = ref<string>("");
const id_code_total = ref<string>("");
const idCodeArray = ref<string[]>([]);

const addIdCode = () => {
  if (id_code.value === "") {
    return;
  }
  if (idCodeArray.value.includes(id_code.value)) {
    ElNotification({
      title: "添加失败",
      message: "该身份证号已添加",
      type: "error",
      offset: 100,
    });
    id_code.value = "";
    return;
  }
  const pattern = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
  if (!pattern.test(id_code.value)) {
    ElNotification({
      title: "添加失败",
      message: "身份证号格式错误",
      type: "error",
      offset: 100,
    });
    return;
  }
  ElNotification({
    title: "添加成功",
    message: `已添加身份证号${id_code.value}，默认密码为 ${id_code.value.slice(-6)}`,
    type: "success",
    offset: 100,
  });
  idCodeArray.value.push(id_code.value);
  id_code.value = "";
};

const addIdCodeTotal = () => {
  if (id_code_total.value === "") {
    return;
  }
  const idList = id_code_total.value.split(/,| |\n/);
  const idListSuccess: string[] = [];
  for (const id of idList) {
    if (id === "") {
      continue;
    }
    if (idCodeArray.value.includes(id)) {
      continue;
    }
    const pattern = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    if (!pattern.test(id)) {
      continue;
    }
    idCodeArray.value.push(id);
    idListSuccess.push(id);
  }
  if (idListSuccess.length === 0) {
    ElNotification({
      title: "添加失败",
      message: "本次添加的身份证号格式错误或已添加",
      type: "error",
      offset: 100,
    });
    return;
  }
  ElNotification({
    title: "添加成功",
    message: `已添加${idListSuccess.length}个身份证号，默认密码为身份证号后 6 位`,
    type: "success",
    offset: 100,
  });
  id_code_total.value = "";
};

const clearAll = () => {
  idCodeArray.value = [];
  ElNotification({
    title: "清空成功",
    message: "已清空本次添加的身份证号",
    type: "success",
    offset: 100,
  });
};

const submitCreate = () => {
  console.log(idCodeArray.value);
  const data = {
    id_codes: idCodeArray.value,
  } as AdminAccountsReq;
  adminCreateAccounts(data).then((response) => {
    const res = response.data;
    if (res.code === -1) {
      ElNotification({
        title: "创建失败",
        message: res.message,
        type: "error",
        offset: 100,
      });
      return;
    }
    ElNotification({
      title: "创建成功",
      message: `已成功创建${idCodeArray.value.length}个账号`,
      type: "success",
      offset: 100,
    });
    idCodeArray.value = [];
  });
};
</script>