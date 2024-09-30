import service from '@/api/server/service';
import type { StudentLoginReq, StudentRegisterReq,StudentVerifyMailCodeReq, StudentResetPwdReq, ProfileDetail } from '@/types/apis/student';
import servicefile from '../server/serviceFile';

export const studentLogin = (data: StudentLoginReq) => service.post('/student/login', data);
export const studentRegister = (data: StudentRegisterReq) => service.post('/student/register', data);
export const studentVerifyRegMail = (data: StudentVerifyMailCodeReq) => service.get('/student/verifyRegMail', { params: data });
export const studentVerifyMailCode = (data: StudentVerifyMailCodeReq) => service.get('/student/verifyMailCode', { params: data });
export const studentResetPwd = (data: StudentResetPwdReq) => service.post('/student/resetPwd', data);
// 导出报名表
export const studentExport = (commitID: string) => service.get(`/student/export/${ commitID }`);
export const studentGetPhoto = (commitID: string) => service.get(`/student/getPhoto/${commitID}`);
export const studentNewCommit = () => service.get('/student/newCommit');
export const studentProfile = () => service.get('/student/profile');
export const studentSaveCommit = (id: string) => service.post('/student/saveCommit', { params: id });
export const studentUpdatePhoto = (data: FormData) => servicefile.post('/student/updatePhoto', data);
export const studentUpdateProfile = (data: ProfileDetail) => service.post('/student/updateProfile', data);
