import service from '@/api/server/service';
import type { Paginator } from '@/types/apis/common';
import type { AdminLoginReq, CommitDetails, AdminAccountsReq, CommitIDs } from '@/types/apis/admin';

export const adminLogin = (data: AdminLoginReq) => service.post('/admin/login', data);
export const adminAccounts = (data: Paginator) => service.get(`/admin/accounts?limit=${data.limit}&page=${data.page}`);
export const adminCheckCommit = (data: CommitDetails) => service.post('/admin/checkCommit', data);
export const adminCreateAccounts = (data: AdminAccountsReq) => service.post('/admin/createAccounts', data);
export const adminDeleteAccounts = (data: AdminAccountsReq) => service.post('/admin/deleteAccounts', data);
export const adminDeleteCommits = (data: CommitIDs) => service.post('/admin/deleteCommits', data);
export const adminSetDeadline = (data: string) => service.get(`/admin/setDeadline?ddl=${data}`);
export const adminExportCSV = () => service.get('/admin/exportAllCommits');
export const adminAccountsSearch = (data: Paginator) => service.get(`/admin/accounts?limit=${data.limit}&page=${data.page}`);