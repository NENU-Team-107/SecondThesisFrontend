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
    reason: string;
}

interface AdminAccountsReq { 
    id_codes: string[];
}

interface CommitIDs { 
    ids: number[];
}

export type { AdminLoginReq, CommitDetails, AdminAccountsReq, CommitIDs, AdminLoginResq };