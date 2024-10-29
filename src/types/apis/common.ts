interface Paginator {
  limit: number;
  offset: number;
  page: number;
  total: number;
}
interface PaginatorResp<T> {
  code: number;
  data: T[];
  message: string;
  offset: number;
  limit: number;
  page: number;
  total: number;
}

interface CommonResp {
  code: number;
  message: string;
}

interface CommonFileParams {
  class: string;
  id: string;
}

interface CommitDetail {
  commit: boolean;
  committer_name: string;
  enroll_major: string;
  file_id: string;
  id: number;
  passed: boolean;
  reason: string;
}

interface CommitResp {
  code: number;
  data: CommitDetail[];
  message: string;
  offset: number;
  limit: number;
  page: number;
  total: number;
}

export type { Paginator, PaginatorResp, CommonResp, CommonFileParams, CommitResp, CommitDetail };