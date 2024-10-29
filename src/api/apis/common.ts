import service from '@/api/server/service';
import servicefile from '../server/serviceFile';
import { Paginator, CommonFileParams } from '@/types/apis/common';


export const commonCommits = (data: Paginator, status: number) => service.get('/common/commits', { params: { limit: data.limit, page: data.page, status: status } });
// 获取文件
export const commonFile = (data: CommonFileParams) => servicefile.get(
    '/common/file', { params: data }
);
export const commonOnline = () => service.get('/common/isOnline');