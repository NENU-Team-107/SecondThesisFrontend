import service from '@/api/server/service';
import servicefile from '../server/serviceFile';
import { Paginator, CommonFileParams, CommitQuery } from '@/types/apis/common';

export const commonCommits = (data: Paginator, committed: boolean, status: number, info?: CommitQuery) =>
  service.post('/common/commits', { ...data, committed: committed, status: status, ...info });
// 获取文件
export const commonFile = (data: CommonFileParams) => servicefile.get(
  '/common/file', { params: data, responseType: 'arraybuffer' }
);
export const commonOnline = () => service.get('/common/isOnline');