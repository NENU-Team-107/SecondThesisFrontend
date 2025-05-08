<template>
  <el-form :model="studentData" label-width="120px" ref="studentDataRef" :rules="rules"
    class="bg-white w-full h-fit py-8 px-16" :onchange="contentChange">
    <el-row>
      <el-col :span="24">
        <el-form-item label="个人照片">
          <div class="flex items-center w-full h-fit">
            <el-upload class="h-32 w-32 flex justify-center items-center border-dotted border-2 border-gray-200"
              :name="photoUpload.name" :action="photoUpload.url" tip="请上传JPG格式的一寸照照片，大小不超过2MB"
              :headers="photoUpload.headers" :show-file-list="false" :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <div>
                <font-awesome-icon icon="fa-solid fa-plus" />
              </div>
            </el-upload>
            <div v-if="studentData.photo" class="relative h-32 w-32 mx-3 cursor-pointer" @click="previewPhoto">
              <img :src="studentData.photo" :onerror="fetchProfile" class="h-full w-full object-cover ">
              <div
                class="absolute inset-0 bg-gray-900 bg-opacity-0 hover:bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity flex justify-center items-center">
                <font-awesome-icon icon="fa-solid fa-magnifying-glass-plus" style="color: #ffffff;" />
                <span class="text-white">查看图片</span>
              </div>
            </div>
          </div>
          <span class="text-gray-700 italic">请上传JPG格式的一寸照照片，大小不超过2MB</span>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="studentData.name" placeholder="请输入姓名" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="性别" prop="sex">
          <el-radio-group v-model="studentData.sex">
            <el-radio value="男">男</el-radio>
            <el-radio value="女">女</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="出生日期" prop="birthday">
          <el-date-picker v-model="studentData.birthday" type="date" format="YYYY/MM/DD" value-format="YYYY-MM-DD"
            placeholder="请选择日期" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="民族" prop="nation">
          <el-select v-model="studentData.nation" placeholder="请选择民族">
            <el-option v-for="item in nations" :key="item.value" :label="item.label" :value="item.value" />

            <template #footer>
              <el-button v-if="!isAdding" text bg size="small" @click="onAddOption">
                添加其他民族
              </el-button>
              <template v-else>
                <el-input v-model="optionName" placeholder="请输入民族名称" size="small" class="my-1" />
                <el-button type="primary" size="small" @click="onConfirm">
                  确认
                </el-button>
                <el-button size="small" @click="clear">取消</el-button>
              </template>
            </template>

          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="政治面貌" prop="politics">
          <el-input v-model="studentData.politics" placeholder="请输入政治面貌" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="身份证号" prop="id_code">
          <el-input v-model="studentData.id_code" placeholder="请输入身份证号" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="手机号码1" prop="major_phone_number">
          <el-input v-model="studentData.major_phone_number" placeholder="请输入手机号码1" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="手机号码2" prop="standby_phone_number">
          <el-input v-model="studentData.standby_phone_number" placeholder="请输入手机号码2" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="电子邮箱" prop="email">
          <el-input v-model="studentData.email" placeholder="请输入电子邮箱" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="毕业年份" prop="graduation_year">
          <el-input v-model="studentData.graduation_year" placeholder="请输入毕业年份" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-form-item label="户籍所在地" prop="domicile">
          <el-input v-model="studentData.domicile" placeholder="请输入户籍所在地" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-form-item label="通讯地址" prop="home_address">
          <el-input v-model="studentData.home_address" placeholder="请输入通讯地址" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="原本科学校" prop="bachelor_school">
          <el-input v-model="studentData.bachelor_school" placeholder="请输入原本科学校" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="原本科专业" prop="major">
          <el-input v-model="studentData.major" placeholder="请输入原本科专业" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item label="毕业证编号" prop="graduation_no">
      <el-input v-model="studentData.graduation_no" placeholder="请输入毕业证编号" />
    </el-form-item>
    <el-form-item label="学位证编号" prop="thesis_no">
      <el-input v-model="studentData.thesis_no" placeholder="请输入学位证编号" />
    </el-form-item>
    <el-form-item label="原本科专业所属专业类" prop="bachelor_class" label-width="190px">
      <el-input v-model="studentData.bachelor_class" placeholder="请输入原本科专业所属专业类" />
    </el-form-item>
    <el-form-item label="原本科专业所属的国家“双一流”建设学科" prop="bachelor_course" label-width="300px">
      <el-input v-model="studentData.bachelor_course" placeholder="请输入原本科专业所属的国家“双一流”建设学科" />
    </el-form-item>
  </el-form>
  <div class="w-full flex justify-end items-center px-16 pb-6">
    <el-button type="primary" @click="handleSubmit(studentDataRef)">{{ submitText }}</el-button>
  </div>

  <el-dialog v-model="visible" title="提示" width="30%" :before-close="handleClose">
    <p>{{ message }}</p>
    <div class="flex justify-end mt-4">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="submitApplyForm">确定</el-button>
    </div>
  </el-dialog>

  <el-dialog v-model="dialogVisible">
    <template #header>
      <div class="text-center text-lg">我的证件照</div>
    </template>
    <img w-full :src="dialogImageUrl" alt="证件照" />
  </el-dialog>

</template>

<style>
.el-upload {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
}
</style>

<script setup lang="ts">
import { ref } from 'vue';
import type { ProfileDetail } from '@/types/apis/student';
import { studentUpdateProfile } from '@/api/apis/student';
import { ElMessage, FormInstance } from 'element-plus';
import { useAccessTokenStore } from '@/store/accessToken';
import { useSiteInfoStore } from '@/store/siteInfo';
import { useStudentStore } from '@/store/student';
import { fetchProfile } from '@/utils/profiles/profiles';
import { commonCommits } from '@/api/apis/common';

const studentDataRef = ref();
const studentData = defineModel('StudentData', {
  required: true,
  type: Object as () => ProfileDetail,
});


const message = defineModel('Message', {
  required: true,
  type: String,
});

const submitText = defineModel('SubmitText', {
  required: false,
  type: String,
  default: '提交更新',
});

const EditStatus = defineModel('EditStatus', {
  required: false,
  type: Boolean,
  default: true,
});

const props = defineProps({
  Confirm: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(['update:Confirm']);

const updateStatus = () => {

  // 检查是否已有提交
  commonCommits({ "limit": 10, "offset": 10, "total": 10, "page": 1, "committed": false, "status": 2, "name": "", "id_code": "", "major": "" }
  ).then(response => {
    const res = response.data as CommitResp;
    console.log(res);
    if (res.code === -1) {
      ElMessage.error(res.message);
      return;
    }
    if (res.data.length > 0) {
      ElMessage.error('请勿重复提交申请！');
      return;
    }
    emit('update:Confirm', true);
  });
}

const contentChange = () => {
  if (!props.Confirm)
    return;
  emit('update:Confirm', false);
}

const checkDate = (_rule: any, value: string, callback: (message?: string) => void) => {
  if (value === '') {
    callback('请选择出生日期');
  } else if (new Date(value).getTime() > new Date().getTime()) {
    callback('出生日期不能大于当前日期');
  } else {
    callback();
  }
};

const checkPhone = (_rule: any, value: string, callback: (message?: string) => void) => {
  if (value === studentData.value.major_phone_number) {
    callback('手机号码1和手机号码2不能相同');
  } else {
    callback();
  }
};

const rules = {
  name: [
    { required: true, message: '请输入姓名', trigger: 'blur' },
  ],
  nation: [
    { required: true, message: '请输入民族', trigger: 'blur' },
  ],
  politics: [
    { required: true, message: '请输入政治面貌', trigger: 'blur' },
  ],
  sex: [
    { required: true, message: '请选择性别', trigger: 'blur' },
  ],
  birthday: [
    { required: true, message: '请选择出生日期', trigger: 'blur' },
    { validator: checkDate, trigger: 'blur' },
  ],
  id_code: [
    { required: true, message: '请输入身份证号', trigger: 'blur' },
    { pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, message: '请输入正确的身份证号', trigger: 'blur' },
  ],
  major_phone_number: [
    { required: true, message: '请输入手机号码1', trigger: 'blur' },
    { pattern: /^1[3456789]\d{9}$/, message: '请输入正确的手机号码格式', trigger: 'blur' },
  ],
  standby_phone_number: [
    { required: true, message: '请输入手机号码2', trigger: 'blur' },
    { pattern: /^1[3456789]\d{9}$/, message: '请输入正确的手机号码格式', trigger: 'blur' },
    { validator: checkPhone, trigger: 'blur' },
  ],
  email: [
    { required: true, message: '请输入电子邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的电子邮箱', trigger: 'blur' },
  ],
  graduation_year: [
    { required: true, message: '请输入毕业年份', trigger: 'blur' },
    { pattern: /^\d{4}$/, message: '请输入正确的毕业年份', trigger: 'blur' },
  ],
  domicile: [
    { required: true, message: '请输入户籍所在地', trigger: 'blur' },
  ],
  home_address: [
    { required: true, message: '请输入通讯地址', trigger: 'blur' },
  ],
  bachelor_school: [
    { required: true, message: '请输入原本科学校', trigger: 'blur' },
  ],
  bachelor_class: [
    { required: true, message: '请输入原本科所属专业类', trigger: 'blur' },
  ],
  // graduation_no: [
  //   { required: true, message: '请输入毕业证编号', trigger: 'blur' },
  // ],
  // thesis_no: [
  //   { required: true, message: '请输入学位证编号', trigger: 'blur' },
  // ],
  bachelor_course: [
    { required: true, message: '请输入原本科专业所属的国家“双一流”建设学科', trigger: 'blur' },
  ],
  major: [
    { required: true, message: '请输入原本科专业', trigger: 'blur' },
  ]
};

const nations = ref([
  { value: '汉族', label: '汉族' },
  { value: '蒙古族', label: '蒙古族' },
  { value: '回族', label: '回族' },
  { value: '藏族', label: '藏族' },
  { value: '维吾尔族', label: '维吾尔族' },
  { value: '苗族', label: '苗族' },
  { value: '彝族', label: '彝族' },
  { value: '壮族', label: '壮族' },
  { value: '布依族', label: '布依族' },
  { value: '朝鲜族', label: '朝鲜族' },
  { value: '满族', label: '满族' },
  { value: '侗族', label: '侗族' },
  { value: '瑶族', label: '瑶族' },
  { value: '白族', label: '白族' },
  { value: '土家族', label: '土家族' },
  { value: '哈尼族', label: '哈尼族' },
  { value: '哈萨克族', label: '哈萨克族' },
  { value: '傣族', label: '傣族' },
  { value: '黎族', label: '黎族' },
  { value: '傈僳族', label: '傈僳族' },
  { value: '佤族', label: '佤族' },
  { value: '畲族', label: '畲族' },
  { value: '高山族', label: '高山族' },
  { value: '拉祜族', label: '拉祜族' },
  { value: '水族', label: '水族' },
  { value: '东乡族', label: '东乡族' },
  { value: '纳西族', label: '纳西族' },
  { value: '景颇族', label: '景颇族' },
  { value: '柯尔克孜族', label: '柯尔克孜族' },
  { value: '土族', label: '土族' },
  { value: '达斡尔族', label: '达斡尔族' },
  { value: '仫佬族', label: '仫佬族' },
  { value: '羌族', label: '羌族' },
  { value: '布朗族', label: '布朗族' },
  { value: '撒拉族', label: '撒拉族' },
  { value: '毛南族', label: '毛南族' },
  { value: '仡佬族', label: '仡佬族' },
  { value: '锡伯族', label: '锡伯族' },
  { value: '阿昌族', label: '阿昌族' },
  { value: '普米族', label: '普米族' },
  { value: '塔吉克族', label: '塔吉克族' },
  { value: '怒族', label: '怒族' },
  { value: '乌孜别克族', label: '乌孜别克族' },
  { value: '俄罗斯族', label: '俄罗斯族' },
  { value: '鄂温克族', label: '鄂温克族' },
  { value: '德昂族', label: '德昂族' },
  { value: '保安族', label: '保安族' },
  { value: '裕固族', label: '裕固族' },
  { value: '京族', label: '京族' },
  { value: '塔塔尔族', label: '塔塔尔族' },
  { value: '独龙族', label: '独龙族' },
  { value: '鄂伦春族', label: '鄂伦春族' },
  { value: '赫哲族', label: '赫哲族' },
  { value: '门巴族', label: '门巴族' },
  { value: '珞巴族', label: '珞巴族' },
  { value: '基诺族', label: '基诺族' },
  // { value: '其他', label: '其他' },
]);

const optionName = ref('');
const isAdding = ref(false);
const onAddOption = () => {
  isAdding.value = true;
}
const onConfirm = () => {
  if (optionName.value === '') {
    ElMessage.error('请输入民族名称');
    return;
  }
  if (nations.value.find(item => item.value === optionName.value)) {
    ElMessage.info('该民族已存在，已为您自动选择');
    studentData.value.nation = optionName.value;
    return;
  }
  nations.value.push({ value: optionName.value, label: optionName.value });
  studentData.value.nation = optionName.value;
  isAdding.value = false;
  optionName.value = '';
  ElMessage.success('添加成功');
}
const clear = () => {
  isAdding.value = false;
  optionName.value = '';
}

const visible = ref<boolean>(false);
const handleClose = () => {
  visible.value = false;
}

const handleSubmit = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid, _fields) => {
    if (!valid) {
      ElMessage.error('请检查表单填写是否正确');
      return;
    }
  });
  if (!studentData.value.photo) {
    ElMessage.error('请上传个人照片');
    return;
  }
  visible.value = true;
}

const submitApplyForm = () => {
  studentUpdateProfile(studentData.value).then(response => {
    const res = response.data;
    if (res.code === 0) {
      updateStatus();
      visible.value = false;
    } else {
      ElMessage.error(res.message);
    }
  }).catch(error => {
    console.log(error);
    ElMessage.error('提交失败');
  });
}

const photoUpload = {
  name: 'photo',
  url: `${useSiteInfoStore().getBaseUrl()}/student/updatePhoto`,
  headers: {
    Authorization: useAccessTokenStore().getAccessToken(),
  },
}

const handleAvatarSuccess = (res: { message: string; code: number }, file: any) => {
  if (res.code == 0) {
    ElMessage.success(res.message);
    const photourl = URL.createObjectURL(file.raw);
    studentData.value.photo = photourl;
    useStudentStore().setPhoto(photourl);
  }
  else {
    ElMessage.error(res.message);
  }
}

const beforeAvatarUpload = (file: any) => {
  const isJPG = file.type === 'image/jpg' || file.type === 'image/jpeg';
  const isLt2M = file.size / 1024 / 1024 < 2;

  if (!isJPG) {
    ElMessage.error('上传头像图片只能是JPG 格式!');
  }
  if (!isLt2M) {
    ElMessage.error('上传头像图片大小不能超过 2MB!');
  }

  return isJPG && isLt2M;
}

const dialogVisible = ref(false)
const dialogImageUrl = ref('')

const previewPhoto = () => {
  dialogImageUrl.value = studentData.value.photo
  dialogVisible.value = true
}
</script>