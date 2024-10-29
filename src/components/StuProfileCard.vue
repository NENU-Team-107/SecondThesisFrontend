<template>
  <div class="flex h-fit flex-row justify-around items-center">
    <div class="flex items-center flex-col h-52 w-4/12 justify-around">
      <div class="ml-4 flex gap-4 w-full">
        <p class="text-lg font-bold min-w-28">姓名：</p>
        <p class="text-gray-500 text-lg">{{ studentData.name === '' ? '暂无' : studentData.name }}</p>
      </div>
      <div class="ml-4 flex gap-4 w-full">
        <p class="text-lg font-bold min-w-28">民族：</p>
        <p class="text-gray-500 text-lg">{{ studentData.nation === '' ? '暂无' : studentData.nation }}</p>
      </div>
      <div class="ml-4 flex gap-4 w-full">
        <p class="text-lg font-bold min-w-28">身份证号：</p>
        <p class="text-gray-500 text-lg">{{ studentData.id_code === '' ? '暂无' : studentData.id_code }}</p>
      </div>
      <div class="ml-4 flex gap-4 w-full">
        <p class="text-lg font-bold min-w-28">户籍所在地：</p>
        <p class="text-gray-500 text-lg">{{ studentData.domicile === '' ? '暂无' : studentData.domicile }}
        </p>
      </div>
    </div>
    <div class="flex items-center flex-col h-52 w-4/12 justify-around">
      <div class="ml-4 flex gap-4 w-full">
        <p class="text-lg font-bold min-w-28">性别：</p>
        <p class="text-gray-500 text-lg">{{ studentData.sex === '' ? '暂无' : studentData.sex }}</p>
      </div>
      <div class="ml-4 flex gap-4 w-full">
        <p class="text-lg font-bold min-w-28">政治面貌：</p>
        <p class="text-gray-500 text-lg">{{ studentData.politics === '' ? '暂无' : studentData.politics }}
        </p>
      </div>
      <div class="ml-4 flex gap-4 w-full">
        <p class="text-lg font-bold min-w-28">出生日期：</p>
        <p class="text-gray-500 text-lg">{{ studentData.birthday === '' ? '暂无' : studentData.birthday }}
        </p>
      </div>
      <div class="ml-4 flex gap-4 w-full">
        <p class="text-lg font-bold min-w-28">毕业年份：</p>
        <p class="text-gray-500 text-lg">{{
          studentData.graduation_year === '' ? '暂无' : studentData.graduation_year }}</p>
      </div>
    </div>

    <div class="flex items-center flex-col h-52 w-4/12 justify-around">
      <div class="ml-4 flex gap-4 w-full flex-col">
        <el-avatar v-if="photoStatus" :src="studentData.photo" :size="160" fit="fill"
          class="w-48 h-48 rounded-full mx-auto" />
        <el-avatar v-else :size="160" fit="fill" class="w-48 h-48 rounded-full mx-auto">
          <span class="text-3xl">
            {{ studentData.name ? studentData.name : '暂无' }}
          </span>
        </el-avatar>
      </div>
    </div>

  </div>
  <div class="flex h-fit flex-row justify-around items-center">
    <div class="flex items-center flex-col w-4/12 justify-around">
      <div class="ml-4 flex gap-4 w-full">
        <p class="text-lg font-bold min-w-28">电子邮箱：</p>
        <p class="text-gray-500 text-lg">{{ studentData.email === '' ? '暂无' : studentData.email }}</p>
      </div>
    </div>
    <div class="flex items-center flex-col w-4/12 justify-around">
      <div class="ml-4 flex gap-4 w-full">
        <p class="text-lg font-bold min-w-28">手机号码1：</p>
        <p class="text-gray-500 text-lg">{{
          studentData.major_phone_number === '' ? '暂无' : studentData.major_phone_number }}</p>
      </div>
    </div>
    <div class="flex items-center flex-col w-4/12 justify-around">
      <div class="ml-4 flex gap-4 w-full">
        <p class="text-lg font-bold min-w-28">手机号码2：</p>
        <p class="text-gray-500 text-lg">{{
          studentData.standby_phone_number === '' ? '暂无' : studentData.standby_phone_number }}</p>
      </div>
    </div>
  </div>
  <div class="flex h-fit flex-row justify-around items-center">
    <div class="flex items-center flex-col w-full justify-around">
      <div class="ml-4 flex gap-4 w-full">
        <p class="text-lg font-bold min-w-28">通讯地址：</p>
        <p class="text-gray-500 text-lg flex-1">{{
          studentData.home_address === '' ? '暂无' : studentData.home_address }}</p>
      </div>
    </div>
  </div>
  <div class="flex h-fit flex-row justify-around items-center">
    <div class="flex items-center flex-col w-6/12 justify-around">
      <div class="ml-4 flex gap-4 w-full">
        <p class="text-lg font-bold min-w-28">原本科学校：</p>
        <p class="text-gray-500 text-lg">{{
          studentData.bachelor_school === '' ? '暂无' : studentData.bachelor_school }}</p>
      </div>
    </div>
    <div class="flex items-center flex-col w-6/12 justify-around">
      <div class="ml-4 flex gap-4 w-full">
        <p class="text-lg font-bold min-w-28">原本科专业：</p>
        <p class="text-gray-500 text-lg">{{ studentData.major === '' ? '暂无' : studentData.major }}</p>
      </div>
    </div>
    <div class="flex items-center flex-col w-6/12 justify-around">
      <div class="ml-4 flex gap-4 w-full">
        <p class="text-lg font-bold min-w-28">原本科专业所属专业类：</p>
        <p class="text-gray-500 text-lg">{{ studentData.bachelor_class === '' ? '暂无' : studentData.bachelor_class }}</p>
      </div>
    </div>
  </div>
  <div class="flex h-fit flex-row justify-around items-center">
    <div class="flex items-center flex-col w-6/12 justify-around">
      <div class="ml-4 flex gap-4 w-full">
        <p class="text-lg font-bold min-w-28">原本科专业所属的国家“双一流”建设学科：</p>
        <p class="text-gray-500 text-lg">{{
          studentData.bachelor_course === '' ? '暂无' : studentData.bachelor_course }}</p>
      </div>
    </div>
    <div class="flex items-center flex-col w-6/12 justify-around">
      <div class="ml-4 flex gap-4 w-full">
        <p class="text-lg font-bold min-w-28">原本科专业所属专业类：</p>
        <p class="text-gray-500 text-lg">{{ studentData.bachelor_class === '' ? '暂无' :
          studentData.bachelor_class
          }}</p>
      </div>
    </div>
  </div>
  <div class="flex h-fit flex-row justify-around items-center">
    <div class="flex items-center flex-col w-6/12 justify-around">
      <div class="ml-4 flex gap-4 w-full">
        <p class="text-lg font-bold min-w-28">毕业证编号：</p>
        <p class="text-gray-500 text-lg">{{ studentData.graduation_no === '' ? '暂无' :
          studentData.graduation_no
          }}</p>
      </div>
    </div>
    <div class="flex items-center flex-col w-6/12 justify-around">
      <div class="ml-4 flex gap-4 w-full">
        <p class="text-lg font-bold min-w-28">学位证编号：</p>
        <p class="text-gray-500 text-lg">{{ studentData.thesis_no === '' ? '暂无' : studentData.thesis_no }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ProfileDetail } from '@/types/apis/student';

const studentData = defineModel('StudentData', {
  required: true,
  type: Object as () => ProfileDetail,
});

const photoStatus = defineModel('PhotoStatus', {
  required: true,
  type: Boolean,
  default: false,
});

</script>