<template>
  <div class="justify-center items-center h-full m-auto w-full bg-slate-50 p-12">
    <div class="bg-white p-8 rounded-lg shadow-lg">
      <div class="flex justify-between items-center">
        <h1 class="text-2xl font-bold">个人信息</h1>
        <el-button :type="editStatus?'danger':'primary'" :icon="Edit" link @click="edit">{{editStatus?"退出编辑":"编辑"}}</el-button>
        <!-- <router-link to="/profile/edit" class="text-blue-500">编辑</router-link> -->
      </div>
      <div class="grid gap-6 grid-flow-row">
        <div class="flex h-fit flex-row justify-around items-center">
          <div class="flex items-center flex-col h-52 w-4/12 justify-around">
            <div class="ml-4 flex gap-4 w-full">
              <p class="text-lg font-bold">姓名：</p>
              <el-input v-if="editStatus" v-model="studentData.name" style="width: 240px" placeholder="请输入" />
              <p v-else class="text-gray-500 text-lg">{{ studentData.name }}</p>
            </div>
            <div class="ml-4 flex gap-4 w-full">
              <p class="text-lg font-bold">民族：</p>
              <el-input v-if="editStatus" v-model="studentData.nation" style="width: 240px" placeholder="请输入" />
              <p v-else class="text-gray-500 text-lg">{{ studentData.nation }}</p>
            </div>
            <div class="ml-4 flex gap-4 w-full">
              <p class="text-lg font-bold">身份证号：</p>
              <el-input v-if="editStatus" v-model="studentData.id_code" style="width: 240px" placeholder="请输入" />
              <p v-else class="text-gray-500 text-lg">{{ studentData.id_code }}</p>
            </div>
            <div class="ml-4 flex gap-4 w-full">
              <p class="text-lg font-bold">户籍所在地：</p>
              <el-input v-if="editStatus" v-model="studentData.domicile" style="width: 240px" placeholder="请输入" />
              <p v-else class="text-gray-500 text-lg">{{ studentData.domicile }}</p>
            </div>
          </div>
          <div class="flex items-center flex-col h-52 w-4/12 justify-around">
            <div class="ml-4 flex gap-4 w-full">
              <p class="text-lg font-bold">性别：</p>
              <el-input v-if="editStatus" v-model="studentData.sex" style="width: 240px" placeholder="请输入" />
              <p v-else class="text-gray-500 text-lg">{{ studentData.sex }}</p>
            </div>
            <div class="ml-4 flex gap-4 w-full">
              <p class="text-lg font-bold">政治面貌：</p>
              <el-input v-if="editStatus" v-model="studentData.politics" style="width: 240px" placeholder="请输入" />
              <p v-else class="text-gray-500 text-lg">{{ studentData.politics }}</p>
            </div>
            <div class="ml-4 flex gap-4 w-full">
              <p class="text-lg font-bold">出生日期：</p>
              <el-input v-if="editStatus" v-model="studentData.birthday" style="width: 240px" placeholder="请输入" />
              <p v-else class="text-gray-500 text-lg">{{ studentData.birthday }}</p>
            </div>
            <div class="ml-4 flex gap-4 w-full">
              <p class="text-lg font-bold">毕业年份：</p>
              <el-input v-if="editStatus" v-model="studentData.graduation_year" style="width: 240px" placeholder="请输入" />
              <p v-else class="text-gray-500 text-lg">{{ studentData.graduation_year }}</p>
            </div>
          </div>
          <div class="flex items-center flex-col h-52 w-4/12 justify-around">
            <img :src="studentPhoto" alt="头像" class="h-44">
          </div>
        </div>
        <div class="flex h-fit flex-row justify-around items-center">
          <div class="flex items-center flex-col w-4/12 justify-around">
            <div class="ml-4 flex gap-4 w-full">
              <p class="text-lg font-bold">电子邮箱：</p>
              <el-input v-if="editStatus" v-model="studentData.email" style="width: 240px" placeholder="请输入" />
              <p v-else class="text-gray-500 text-lg">{{ studentData.email }}</p>
            </div>
          </div>
          <div class="flex items-center flex-col w-4/12 justify-around">
            <div class="ml-4 flex gap-4 w-full">
              <p class="text-lg font-bold">手机号码1：</p>
              <el-input v-if="editStatus" v-model="studentData.major_phone_number" style="width: 240px" placeholder="请输入" />
              <p v-else class="text-gray-500 text-lg">{{ studentData.major_phone_number }}</p>
            </div>
          </div>
          <div class="flex items-center flex-col w-4/12 justify-around">
            <div class="ml-4 flex gap-4 w-full">
              <p class="text-lg font-bold">手机号码2：</p>
              <el-input v-if="editStatus" v-model="studentData.standby_phone_number" style="width: 240px" placeholder="请输入" />
              <p v-else class="text-gray-500 text-lg">{{ studentData.standby_phone_number }}</p>
            </div>
          </div>
        </div>
        <div class="flex h-fit flex-row justify-around items-center">
          <div class="flex items-center flex-col w-full justify-around">
            <div class="ml-4 flex gap-4 w-full">
              <p class="text-lg font-bold">通讯地址：</p>
              <el-input v-if="editStatus" v-model="studentData.home_address" style="width: 240px" placeholder="请输入" />
              <p v-else class="text-gray-500 text-lg flex-1">{{ studentData.home_address }}</p>
            </div>
          </div>
        </div>
        <div class="flex h-fit flex-row justify-around items-center">
          <div class="flex items-center flex-col w-6/12 justify-around">
            <div class="ml-4 flex gap-4 w-full">
              <p class="text-lg font-bold">原本科学校：</p>
              <el-input v-if="editStatus" v-model="studentData.bachelor_school" style="width: 240px" placeholder="请输入" />
              <p v-else class="text-gray-500 text-lg">{{ studentData.bachelor_school }}</p>
            </div>
          </div>
          <div class="flex items-center flex-col w-6/12 justify-around">
            <div class="ml-4 flex gap-4 w-full">
              <p class="text-lg font-bold">原本科专业：</p>
              <el-input v-if="editStatus" v-model="studentData.major" style="width: 240px" placeholder="请输入" />
              <p v-else class="text-gray-500 text-lg">{{ studentData.major }}</p>
            </div>
          </div>
        </div>
        <div class="flex h-fit flex-row justify-around items-center">
          <div class="flex items-center flex-col w-6/12 justify-around">
            <div class="ml-4 flex gap-4 w-full">
              <p class="text-lg font-bold">原本科专业所属的国家“双一流”建设学科：</p>
              <el-input v-if="editStatus" v-model="studentData.bachelor_course" style="width: 240px" placeholder="请输入" />
              <p v-else class="text-gray-500 text-lg">{{ studentData.bachelor_course }}</p>
            </div>
          </div>
          <div class="flex items-center flex-col w-6/12 justify-around">
            <div class="ml-4 flex gap-4 w-full">
              <p class="text-lg font-bold">原本科专业所属专业类：</p>
              <el-input v-if="editStatus" v-model="studentData.bachelor_class" style="width: 240px" placeholder="请输入" />
              <p v-else class="text-gray-500 text-lg">{{ studentData.bachelor_class }}</p>
            </div>
          </div>
        </div>
        <div class="flex h-fit flex-row justify-around items-center">
          <div class="flex items-center flex-col w-6/12 justify-around">
            <div class="ml-4 flex gap-4 w-full">
              <p class="text-lg font-bold">毕业证编号：</p>
              <el-input v-if="editStatus" v-model="studentData.graduation_no" style="width: 240px" placeholder="请输入" />
              <p v-else class="text-gray-500 text-lg">{{ studentData.graduation_no }}</p>
            </div>
          </div>
          <div class="flex items-center flex-col w-6/12 justify-around">
            <div class="ml-4 flex gap-4 w-full">
              <p class="text-lg font-bold">学位证编号：</p>
              <el-input v-if="editStatus" v-model="studentData.thesis_no" style="width: 240px" placeholder="请输入" />
              <p v-else class="text-gray-500 text-lg">{{ studentData.thesis_no }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import studentPhoto from '@/assets/image/avatar.png';
import { ProfileDetail } from '@/types/apis/student';
import { Edit } from '@element-plus/icons-vue';

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

const editStatus = ref(false);

const edit = () => {
  editStatus.value = !editStatus.value;
}

</script>