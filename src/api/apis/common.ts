import service from '@/api/server/service';
import servicefile from '../server/servicefile';
import { Paginator, CommonFileParams } from '@/types/apis/common';


export const commonCommits = (data: Paginator) => service.post('/common/commits', data);
// 获取文件
export const commonFile = (data: CommonFileParams) => servicefile.get(
    '/common/file', { params: data }
);
export const commonOnline = () => service.get('/common/online');