<template>
  <div class="w-full h-full mt-5">
    <table v-if="studentCount !== 0" class="border-separate border border-slate-400 w-full">
      <thead>
        <tr class="text-lg">
          <td class="border border-slate-300 p-1 text-center">姓名</td>
          <td class="border border-slate-300 p-1 text-center">专业</td>
          <td class="border border-slate-300 p-1 text-center">身份证号码</td>
          <td class="border border-slate-300 p-1 text-center">毕业证编号</td>
          <td class="border border-slate-300 p-1 text-center">学位证编号</td>
          <td class="border border-slate-300 p-1 text-center">操作</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(student, index) in StudentList">
          <td class="border border-slate-300 text-center">{{ student.name }}</td>
          <td class="border border-slate-300 text-center">{{ student.major }}</td>
          <td class="border border-slate-300 text-center">{{ student.id_code }}</td>
          <td class="border border-slate-300 text-center">{{ student.graduation_no }}</td>
          <td class="border border-slate-300 text-center">{{ student.thesis_no }}</td>
          <td class="border border-slate-300 text-center">
            <el-button link type="primary" @click="showmore(index)">更多信息</el-button>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-else class="w-full">
      <el-empty description="暂无数据" />
    </div>
    <el-dialog v-model="isvisible" width="60%">
      <template #title>
        <h1 class="text-center text-2xl font-semibold text-slate-900">学生详细信息</h1>
      </template>
      <div class="flex justify-center py-3">
        <el-avatar :size="120" :src="StudentList[stuIndex].photo" />
      </div>
      <el-form label-position="right" label-width="200px">
        <el-form-item label="姓名">
          <el-input v-model="StudentList[stuIndex].name" disabled></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-input v-model="StudentList[stuIndex].sex" disabled></el-input>
        </el-form-item>
        <el-form-item label="民族">
          <el-input v-model="StudentList[stuIndex].nation" disabled></el-input>
        </el-form-item>
        <el-form-item label="专业">
          <el-input v-model="StudentList[stuIndex].major" disabled></el-input>
        </el-form-item>
        <el-form-item label="政治面貌">
          <el-input v-model="StudentList[stuIndex].politics" disabled></el-input>
        </el-form-item>
        <el-form-item label="出生日期">
          <el-input v-model="StudentList[stuIndex].birthday" disabled></el-input>
        </el-form-item>
        <el-form-item label="身份证号码">
          <el-input v-model="StudentList[stuIndex].id_code" disabled></el-input>
        </el-form-item>
        <el-form-item label="毕业证编号">
          <el-input v-model="StudentList[stuIndex].graduation_no" disabled></el-input>
        </el-form-item>
        <el-form-item label="学位证编号">
          <el-input v-model="StudentList[stuIndex].thesis_no" disabled></el-input>
        </el-form-item>
        <el-form-item label="毕业年份">
          <el-input v-model="StudentList[stuIndex].graduation_year" disabled></el-input>
        </el-form-item>
        <el-form-item label="电子邮箱">
          <el-input v-model="StudentList[stuIndex].email" disabled></el-input>
        </el-form-item>
        <el-form-item label="户籍所在地">
          <el-input v-model="StudentList[stuIndex].domicile" disabled></el-input>
        </el-form-item>
        <el-form-item label="通讯地址">
          <el-input v-model="StudentList[stuIndex].home_address" disabled></el-input>
        </el-form-item>
        <el-form-item label="手机号码">
          <el-input v-model="StudentList[stuIndex].major_phone_number" disabled></el-input>
          <el-input v-model="StudentList[stuIndex].standby_phone_number" disabled></el-input>
        </el-form-item>
        <el-form-item label="原本科学校">
          <el-input v-model="StudentList[stuIndex].bachelor_school" disabled></el-input>
        </el-form-item>
        <el-form-item label="原本科专业所属的国家“双一流”建设学科">
          <el-input v-model="StudentList[stuIndex].bachelor_course" disabled></el-input>
        </el-form-item>
        <el-form-item label="原本科专业所属专业类">
          <el-input v-model="StudentList[stuIndex].bachelor_class" disabled></el-input>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { ProfileDetail } from '@/types/apis/student';

const StudentList = defineModel({
  required: true,
  type: Array as () => ProfileDetail[],
  default: () => []
});

const studentCount = computed(() => StudentList?.value?.length ? StudentList.value.length : 0);

const isvisible = ref(false);
const stuIndex = ref(0);
const showmore = (index: number) => {
  stuIndex.value = index;
  isvisible.value = true;
};

</script>