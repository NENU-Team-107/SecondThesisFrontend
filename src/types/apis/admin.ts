interface AdminLoginReq { 
    name: string;
    password: string;
}
interface AdminLoginResq { 
    code: number;
    message: string;
    token: string;
}

interface CommitDetails{
    commit: boolean;
    committer_name: string;
    enroll_major: string;
    file_id: string;
    id: number;
    passed: true;
    resson: string;
}

interface AdminAccountReq { 
    id_code: string[];
}

interface CommitIDs { 
    ids: number[];
}

export type { AdminLoginReq, CommitDetails, AdminAccountReq, CommitIDs, AdminLoginResq };