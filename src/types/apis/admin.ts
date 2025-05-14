import type { Paginator } from "@/types/apis/common";

interface AdminLoginReq {
  name: string;
  password: string;
}
interface AdminLoginResq {
  code: number;
  message: string;
  token: string;
}

interface CommitDetails {
  commit: boolean;
  committer_name: string;
  enroll_major: string;
  file_id: string;
  id: number;
  passed: number;
  reason: string;
}

interface AdminAccountsReq {
  id_codes: string[];
}

interface CommitIDs {
  ids: number[];
}

interface QueryCommitReq {
  name: string;
  id_code: string;
  major: string;
  committed: boolean;
  status: number;
  paginator: Paginator;
}

export type {
  AdminLoginReq,
  CommitDetails,
  AdminAccountsReq,
  CommitIDs,
  AdminLoginResq,
  QueryCommitReq,
};
