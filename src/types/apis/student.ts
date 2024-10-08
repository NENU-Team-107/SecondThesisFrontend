interface StudentLoginReq {
  email: string;
  id_code: string;
  password: string;
  phone_number: string;
}
interface StudentLoginResp {
  code: number;
  message: string;
  token: string;
}

interface StudentRegisterReq {
  email: string;
  id_code: string;
  password: string;
  phone_number: string;
}
interface StudentRegisterResp {
  code: number;
  message: string;
}

interface StudentVerifyMailCodeReq { 
  code: string;
  mail: string;
}

interface StudentResetPwdReq {
  email: string;
  phone_number: string;
  password: string;
}
interface StudentResetPwdResp {
  code: number;
  message: string;
  token: string;
}

interface ProfileDetail {
  bachelor_class: string;
  bachelor_course: string;
  bachelor_school: string;
  birthday: string;
  domicile: string;
  email: string;
  email_verify: boolean;
  graduation_no: string;
  graduation_year: string;
  home_address: string;
  id_code: string;
  major: string;
  major_phone_number: string;
  name: string;
  nation: string;
  phone_number_verify: boolean;
  photo: string;
  politics: string;
  sex: string;
  standby_phone_number: string;
  thesis_no: string;
}

interface StudentProfileResp {
  code: number;
  message: string;
  profile: ProfileDetail;
}

interface studentNewCommitResp{
  code: number;
  file_id: string;
  id: number;
  message: string;
}

export type {
  StudentLoginReq,
  StudentLoginResp,
  StudentRegisterReq,
  StudentRegisterResp,
  StudentVerifyMailCodeReq,
  StudentResetPwdReq,
  StudentResetPwdResp,
  ProfileDetail,
  StudentProfileResp,
  studentNewCommitResp,
};
