import service from "@/api/server/service";
import type {
  CommitQuery,
  CommonFileParams,
  Paginator,
} from "@/types/apis/common";
import servicefile from "../server/serviceFile";

export const commonCommits = (
  data: Paginator,
  committed: boolean,
  status: number,
  info?: CommitQuery,
) =>
  service.post("/common/commits", {
    ...data,
    committed: committed,
    status: status,
    ...info,
  });
// 获取文件
export const commonFile = (data: CommonFileParams) =>
  servicefile.get("/common/file", {
    params: data,
    responseType: "arraybuffer",
  });
export const commonOnline = () => service.get("/common/isOnline");
