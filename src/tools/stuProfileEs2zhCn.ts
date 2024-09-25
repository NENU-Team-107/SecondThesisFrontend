// 将ProfileDetail的字段名翻译成中文
import { ProfileDetail } from '../types/apis/student';

export const stuProfileEs2zhCn = (): ProfileDetail => {
  return {
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
  }
}