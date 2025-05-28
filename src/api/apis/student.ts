import service from "@/api/server/service";
import type { CommonFileParams } from "@/types/apis/common";
import type {
  ProfileDetail,
  StudentLoginReq,
  StudentRegisterReq,
  StudentResetPwdReq,
  StudentVerifyMailCodeReq,
  studentSaveCommitRes,
} from "@/types/apis/student";
import serviceBlob from "../server/serviceBlob";
import servicefile from "../server/serviceFile";

export const studentLogin = (data: StudentLoginReq) =>
  service.post("/student/login", data);
export const studentRegister = (data: StudentRegisterReq) =>
  service.post("/student/register", data);
export const studentVerifyRegMail = (data: StudentVerifyMailCodeReq) =>
  service.get("/student/verifyRegMail", { params: data });
export const studentVerifyMailCode = (data: StudentVerifyMailCodeReq) =>
  service.get("/student/verifyMailCode", { params: data });
// 重置密码
export const studentSendResetPwdMailCode = (mail: string) =>
  service.get(`/student/sendResetPwdMailCode?mail=${mail}`);
export const studentResetPwd = (data: StudentResetPwdReq) =>
  service.post("/student/resetPwd", data);
export const studentChangePwd = (data: StudentResetPwdReq) =>
  service.post("/student/changePwd", data);
// 导出报名表
export const studentExport = (commitID: string) =>
  service.get(`/student/export/${commitID}`);
export const studentGetPhoto = (photo: string) =>
  serviceBlob.get(`/student/getPhoto?photo=${photo}`);
export const studentNewCommit = () => service.get("/student/newCommit");
export const studentProfile = () => service.get("/student/profile");
export const studentSaveCommit = (data: studentSaveCommitRes) =>
  service.post("/student/saveCommit", data);
export const studentUpdatePhoto = (data: FormData) =>
  servicefile.post("/student/updatePhoto", data);
export const studentUpdateProfile = (data: ProfileDetail) =>
  service.post("/student/updateProfile", data);
export const studentUploadFile = (data: FormData, url: CommonFileParams) =>
  servicefile.post(`/student/uploadFile/${url.class}/${url.id}/${url.suffix}`, data);
export const studentDeleteFile = (url: CommonFileParams) =>
  servicefile.post(`/student/deleteFile/${url.class}/${url.id}`);
