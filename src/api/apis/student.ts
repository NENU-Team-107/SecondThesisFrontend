import service from '@/api/server/service';
import type { StudentLoginReq, StudentRegisterReq, StudentResetPwdReq } from '@/types/apis/student';

export const studentLogin = (data: StudentLoginReq) => service.post('/student/login', data);
export const studentRegister = (data: StudentRegisterReq) => service.post('/student/register', data);
export const studentVerifyMail = (data: { code: string }) => service.get('/student/verifyMail', { params: data });
export const studentResetPwd = (data: StudentResetPwdReq) => service.post(
    '/student/resetPwd', data
);
