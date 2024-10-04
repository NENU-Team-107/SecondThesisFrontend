<template>
  <div class="justify-center items-center h-full w-full bg-slate-50 p-12">
    <div class="bg-white p-8 rounded-lg shadow-lg">
      <div class="flex justify-between items-center">
        <h1 class="text-2xl font-bold">个人信息</h1>
        <div>
          <el-button :type="editStatus ? 'danger' : 'primary'" :icon="Edit" link @click="edit">{{ editStatus ? "退出编辑" :
            "编辑" }}</el-button>
          <el-button v-show="editStatus" type="success" text bg @click="updateInfo">
            立即更新
            <el-icon class="el-icon--right">
              <Check />
            </el-icon>
          </el-button>
        </div>
      </div>
      <div class="grid gap-6 grid-flow-row">
        <div class="flex h-fit flex-row justify-around items-center">
          <div class="flex items-center flex-col h-52 w-4/12 justify-around">
            <div class="ml-4 flex gap-4 w-full">
              <p class="text-lg font-bold min-w-28">姓名：</p>
              <el-input v-if="editStatus" v-model="studentData.name" style="width: 240px" placeholder="请输入" />
              <p v-else class="text-gray-500 text-lg">{{ studentData.name === '' ? '暂无' : studentData.name }}</p>
            </div>
            <div class="ml-4 flex gap-4 w-full">
              <p class="text-lg font-bold min-w-28">民族：</p>
              <el-input v-if="editStatus" v-model="studentData.nation" style="width: 240px" placeholder="请输入" />
              <p v-else class="text-gray-500 text-lg">{{ studentData.nation === '' ? '暂无' : studentData.nation }}</p>
            </div>
            <div class="ml-4 flex gap-4 w-full">
              <p class="text-lg font-bold min-w-28">身份证号：</p>
              <el-input v-if="editStatus" v-model="studentData.id_code" style="width: 240px" placeholder="请输入" />
              <p v-else class="text-gray-500 text-lg">{{ studentData.id_code === '' ? '暂无' : studentData.id_code }}</p>
            </div>
            <div class="ml-4 flex gap-4 w-full">
              <p class="text-lg font-bold min-w-28">户籍所在地：</p>
              <el-input v-if="editStatus" v-model="studentData.domicile" style="width: 240px" placeholder="请输入" />
              <p v-else class="text-gray-500 text-lg">{{ studentData.domicile === '' ? '暂无' : studentData.domicile }}
              </p>
            </div>
          </div>
          <div class="flex items-center flex-col h-52 w-4/12 justify-around">
            <div class="ml-4 flex gap-4 w-full">
              <p class="text-lg font-bold min-w-28">性别：</p>
              <el-input v-if="editStatus" v-model="studentData.sex" style="width: 240px" placeholder="请输入" />
              <p v-else class="text-gray-500 text-lg">{{ studentData.sex === '' ? '暂无' : studentData.sex }}</p>
            </div>
            <div class="ml-4 flex gap-4 w-full">
              <p class="text-lg font-bold min-w-28">政治面貌：</p>
              <el-input v-if="editStatus" v-model="studentData.politics" style="width: 240px" placeholder="请输入" />
              <p v-else class="text-gray-500 text-lg">{{ studentData.politics === '' ? '暂无' : studentData.politics }}
              </p>
            </div>
            <div class="ml-4 flex gap-4 w-full">
              <p class="text-lg font-bold min-w-28">出生日期：</p>
              <el-input v-if="editStatus" v-model="studentData.birthday" style="width: 240px" placeholder="请输入" />
              <p v-else class="text-gray-500 text-lg">{{ studentData.birthday === '' ? '暂无' : studentData.birthday }}
              </p>
            </div>
            <div class="ml-4 flex gap-4 w-full">
              <p class="text-lg font-bold min-w-28">毕业年份：</p>
              <el-input v-if="editStatus" v-model="studentData.graduation_year" style="width: 240px"
                placeholder="请输入" />
              <p v-else class="text-gray-500 text-lg">{{
                studentData.graduation_year === '' ? '暂无' : studentData.graduation_year }}</p>
            </div>
          </div>

          <div class="flex items-center flex-col h-52 w-4/12 justify-around">
            <!-- <label for="avatar-input" class="custom-file-upload fas">
              <div class="img-wrap img-upload">
                <img v-if="photoStatus" :src="studentData.photo" />
              </div>
              <input id="avatar-input" type="file" @click="uploadAvatar" />
            </label> -->
            <div class="ml-4 flex gap-4 w-full flex-col">
              <img v-if="photoStatus" :src="studentData.photo" class="avatar" />
              <input type="file" @change="uploadAvatar" />
            </div>
          </div>

        </div>
        <div class="flex h-fit flex-row justify-around items-center">
          <div class="flex items-center flex-col w-4/12 justify-around">
            <div class="ml-4 flex gap-4 w-full">
              <p class="text-lg font-bold min-w-28">电子邮箱：</p>
              <el-input v-if="editStatus" v-model="studentData.email" style="width: 240px" placeholder="请输入" />
              <p v-else class="text-gray-500 text-lg">{{ studentData.email === '' ? '暂无' : studentData.email }}</p>
            </div>
          </div>
          <div class="flex items-center flex-col w-4/12 justify-around">
            <div class="ml-4 flex gap-4 w-full">
              <p class="text-lg font-bold min-w-28">手机号码1：</p>
              <el-input v-if="editStatus" v-model="studentData.major_phone_number" style="width: 240px"
                placeholder="请输入" />
              <p v-else class="text-gray-500 text-lg">{{
                studentData.major_phone_number === '' ? '暂无' : studentData.major_phone_number }}</p>
            </div>
          </div>
          <div class="flex items-center flex-col w-4/12 justify-around">
            <div class="ml-4 flex gap-4 w-full">
              <p class="text-lg font-bold min-w-28">手机号码2：</p>
              <el-input v-if="editStatus" v-model="studentData.standby_phone_number" style="width: 240px"
                placeholder="请输入" />
              <p v-else class="text-gray-500 text-lg">{{
                studentData.standby_phone_number === '' ? '暂无' : studentData.standby_phone_number }}</p>
            </div>
          </div>
        </div>
        <div class="flex h-fit flex-row justify-around items-center">
          <div class="flex items-center flex-col w-full justify-around">
            <div class="ml-4 flex gap-4 w-full">
              <p class="text-lg font-bold min-w-28">通讯地址：</p>
              <el-input v-if="editStatus" v-model="studentData.home_address" style="width: 960px" placeholder="请输入" />
              <p v-else class="text-gray-500 text-lg flex-1">{{
                studentData.home_address === '' ? '暂无' : studentData.home_address }}</p>
            </div>
          </div>
        </div>
        <div class="flex h-fit flex-row justify-around items-center">
          <div class="flex items-center flex-col w-6/12 justify-around">
            <div class="ml-4 flex gap-4 w-full">
              <p class="text-lg font-bold min-w-28">原本科学校：</p>
              <el-input v-if="editStatus" v-model="studentData.bachelor_school" style="width: 480px"
                placeholder="请输入" />
              <p v-else class="text-gray-500 text-lg">{{
                studentData.bachelor_school === '' ? '暂无' : studentData.bachelor_school }}</p>
            </div>
          </div>
          <div class="flex items-center flex-col w-6/12 justify-around">
            <div class="ml-4 flex gap-4 w-full">
              <p class="text-lg font-bold min-w-28">原本科专业：</p>
              <el-input v-if="editStatus" v-model="studentData.major" style="width: 480px" placeholder="请输入" />
              <p v-else class="text-gray-500 text-lg">{{ studentData.major === '' ? '暂无' : studentData.major }}</p>
            </div>
          </div>
        </div>
        <div class="flex h-fit flex-row justify-around items-center">
          <div class="flex items-center flex-col w-6/12 justify-around">
            <div class="ml-4 flex gap-4 w-full">
              <p class="text-lg font-bold min-w-28">原本科专业所属的国家“双一流”建设学科：</p>
              <el-input v-if="editStatus" v-model="studentData.bachelor_course" style="width: 240px"
                placeholder="请输入" />
              <p v-else class="text-gray-500 text-lg">{{
                studentData.bachelor_course === '' ? '暂无' : studentData.bachelor_course }}</p>
            </div>
          </div>
          <div class="flex items-center flex-col w-6/12 justify-around">
            <div class="ml-4 flex gap-4 w-full">
              <p class="text-lg font-bold min-w-28">原本科专业所属专业类：</p>
              <el-input v-if="editStatus" v-model="studentData.bachelor_class" style="width: 240px" placeholder="请输入" />
              <p v-else class="text-gray-500 text-lg">{{ studentData.bachelor_class === '' ? '暂无' :
                studentData.bachelor_class
                }}</p>
            </div>
          </div>
        </div>
        <div class="flex h-fit flex-row justify-around items-center">
          <div class="flex items-center flex-col w-6/12 justify-around">
            <div class="ml-4 flex gap-4 w-full">
              <p class="text-lg font-bold min-w-28">毕业证编号：</p>
              <el-input v-if="editStatus" v-model="studentData.graduation_no" style="width: 480px" placeholder="请输入" />
              <p v-else class="text-gray-500 text-lg">{{ studentData.graduation_no === '' ? '暂无' :
                studentData.graduation_no
                }}</p>
            </div>
          </div>
          <div class="flex items-center flex-col w-6/12 justify-around">
            <div class="ml-4 flex gap-4 w-full">
              <p class="text-lg font-bold min-w-28">学位证编号：</p>
              <el-input v-if="editStatus" v-model="studentData.thesis_no" style="width: 480px" placeholder="请输入" />
              <p v-else class="text-gray-500 text-lg">{{ studentData.thesis_no === '' ? '暂无' : studentData.thesis_no }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>

<script setup lang="ts">
import { ref } from 'vue'
// import defaultAvatar from '@/assets/image/default_avatar.png';
import { ProfileDetail, StudentProfileResp } from '@/types/apis/student';
import { Edit } from '@element-plus/icons-vue';
import { studentGetPhoto, studentProfile, studentUpdatePhoto, studentUpdateProfile } from '@/api/apis/student';
import { ElMessage } from 'element-plus';
import { Plus, Check } from '@element-plus/icons-vue';

// const defaultAvatar = 'https://empty';
const photoStatus = ref(false);
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

const fetchStudentData = () => {
  studentProfile().then(response => {
    const res = response.data as StudentProfileResp;
    if (res.code === -1) {
      ElMessage.error(res.message);
      return;
    }
    studentData.value = res.profile;
    studentGetPhoto(studentData.value.photo).then(response => {
      const res = response.data;
      if (res.code === -1) {
        ElMessage.error(res.message);
        photoStatus.value = false;
        return;
      }
      studentData.value.photo = res.profile.photo;
      photoStatus.value = true;
    });
  });
}

fetchStudentData();

const editStatus = ref(false);

const edit = () => {
  editStatus.value = !editStatus.value;
}

const uploadAvatar = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (!file) {
    return;
  }
  const formData = new FormData();
  formData.append('photo', file);
  studentUpdatePhoto(formData).then(response => {
    const res = response.data as StudentProfileResp;
    if (res.code === -1) {
      ElMessage.error(res.message);
      return;
    }
    studentData.value.photo = URL.createObjectURL(file);
    ElMessage.success('上传成功');
  });
}

const updateInfo = () => {
  studentUpdateProfile(studentData.value).then(response => {
    const res = response.data as StudentProfileResp;
    if (res.code === -1) {
      ElMessage.error(res.message);
      return;
    }
    ElMessage.success('更新成功');
    editStatus.value = false;
  });
}
</script>