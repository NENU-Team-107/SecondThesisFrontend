<template>
  <div class="flex flex-col items-center justify-center w-full">
    <h1 class="text-2xl font-bold">申请表</h1>
    <el-form  :model="applyForm" class="bg-white w-3/5 h-fit">
      <el-form-item label="姓名" prop="name">
        <el-input v-model="applyForm.name" placeholder="请输入姓名"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-input v-model="applyForm.sex" placeholder="请输入性别"></el-input>
      </el-form-item>
      <el-form-item label="出生日期" prop="birthday">
        <el-input v-model="applyForm.birthday" placeholder="请输入出生日期"></el-input>
      </el-form-item>
      <el-form-item label="民族" prop="nation">
        <el-input v-model="applyForm.nation" placeholder="请输入民族"></el-input>
      </el-form-item>
      <el-form-item label="政治面貌" prop="politics">
        <el-input v-model="applyForm.politics" placeholder="请输入政治面貌"></el-input>
      </el-form-item>
      <el-form-item label="身份证号" prop="id_code">
        <el-input v-model="applyForm.id_code" placeholder="请输入身份证号"></el-input>
      </el-form-item>
      <el-form-item label="电子邮箱" prop="email">
        <el-input v-model="applyForm.email" placeholder="请输入电子邮箱"></el-input>
      </el-form-item>
      <el-form-item label="手机号码1" prop="major_phone_number">
        <el-input v-model="applyForm.major_phone_number" placeholder="请输入手机号码1"></el-input>
      </el-form-item>
      <el-form-item label="手机号码2" prop="standby_phone_number">
        <el-input v-model="applyForm.standby_phone_number" placeholder="请输入手机号码2"></el-input>
      </el-form-item>
      <el-form-item label="通讯地址" prop="home_address">
        <el-input v-model="applyForm.home_address" placeholder="请输入通讯地址"></el-input>
      </el-form-item>
      <el-form-item label="户籍所在地" prop="domicile">
        <el-input v-model="applyForm.domicile" placeholder="请输入户籍所在地"></el-input>
      </el-form-item>
      <el-form-item label="原本科学校" prop="bachelor_school">
        <el-input v-model="applyForm.bachelor_school" placeholder="请输入原本科学校"></el-input>
      </el-form-item>
      <el-form-item label="原本科专业" prop="bachelor_class">
        <el-input v-model="applyForm.bachelor_class" placeholder="请输入原本科专业"></el-input>
      </el-form-item>
      <el-form-item label="原本科专业所属的国家“双一流”建设学科" prop="bachelor_course">
        <el-input v-model="applyForm.bachelor_course" placeholder="请输入原本科专业所属的国家“双一流”建设学科"></el-input>
      </el-form-item>
      <el-form-item label="毕业年份" prop="graduation_year">
        <el-input v-model="applyForm.graduation_year" placeholder="请输入毕业年份"></el-input>
      </el-form-item>
      <el-form-item label="毕业证编号" prop="graduation_no">
        <el-input v-model="applyForm.graduation_no" placeholder="请输入毕业证编号"></el-input>
      </el-form-item>
      <el-form-item label="学位证编号" prop="thesis_no">
        <el-input v-model="applyForm.thesis_no" placeholder="请输入学位证编号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ElMessage } from 'element-plus';
import { studentGetPhoto, studentProfile, studentUpdatePhoto, studentUpdateProfile } from '@/api/apis/student';
import { ProfileDetail, StudentProfileResp } from '@/types/apis/student';

const photoStatus = ref<boolean>(false);
const studentData = ref<ProfileDetail>({
  bachelor_class: '原本科专业',
  bachelor_course: '原本科专业所属的国家“双一流”建设学科',
  bachelor_school: '原本科学校',
  birthday: '出生日期',
  domicile: '户籍所在地',
  email: '电子邮箱',
  email_verify: true,
  graduation_no: '毕业证编号',
  graduation_year: '毕业年份',
  home_address: '通讯地址',
  id_code: '身份证号',
  major: '专业',
  major_phone_number: '手机号码1',
  name: '姓名',
  nation: '民族',
  phone_number_verify: true,
  photo: '照片',
  politics: '政治面貌',
  sex: '性别',
  standby_phone_number: '手机号码2',
  thesis_no: '学位证编号',
});

const applyForm = ref<ProfileDetail>({
  bachelor_class: '原本科专业',
  bachelor_course: '原本科专业所属的国家“双一流”建设学科',
  bachelor_school: '原本科学校',
  birthday: '出生日期',
  domicile: '户籍所在地',
  email: '电子邮箱',
  email_verify: true,
  graduation_no: '毕业证编号',
  graduation_year: '毕业年份',
  home_address: '通讯地址',
  id_code: '身份证号',
  major: '专业',
  major_phone_number: '手机号码1',
  name: '姓名',
  nation: '民族',
  phone_number_verify: true,
  photo: '照片',
  politics: '政治面貌',
  sex: '性别',
  standby_phone_number: '手机号码2',
  thesis_no: '学位证编号',
});

const fetchStudentData = () => {
  studentProfile().then(response => {
    const res = response.data as StudentProfileResp;
    if (res.code === -1) {
      ElMessage.error(res.message);
      return;
    }
    studentData.value = res.profile;
    // studentGetPhoto(studentData.value.photo).then(response => {
    //   const res = response.data;
    //   if (res.code === -1) {
    //     ElMessage.error(res.message);
    //     photoStatus.value = false;
    //     return;
    //   }
    //   studentData.value.photo = res.profile.photo;
    //   photoStatus.value = true;
    // });
  });
}

fetchStudentData();
</script>