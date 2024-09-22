import service from '@/api/server/service';
import type { Paginator } from '@/types/apis/common';
import type { AdminLoginReq, CommitDetails, AdminAccountReq,CommitIDs } from '@/types/apis/admin';

export const adminLogin = (data: AdminLoginReq) => service.post('/admin/login', data);
export const adminAccounts = (data: Paginator) => service.post('/admin/accounts', data);
export const adminCheckCommit = (data: CommitDetails) => service.post('/admin/checkCommit', data);
export const adminDeleteAccounts = (data: AdminAccountReq) => service.post('/admin/deleteAccounts', data);
export const adminDeleteCommits = (data: CommitIDs) => service.post(
    '/admin/deleteCommits', data
);