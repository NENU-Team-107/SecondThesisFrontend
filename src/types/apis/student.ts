
interface StudentLoginReq {
    email: string;
    id_code: string;
    password: string;
    phone_number: string;
}
interface StudentLoginResp { 
    code: number;
    message: string;
    token: string;
}

interface StudentRegisterReq { 
    email: string;
    id_code: string;
    password: string;
    phone_number: string;
}
interface StudentRegisterResp { 
    code: number;
    message: string;
}

interface StudentResetPwdReq { 
    email: string;
    phone_number: string;
    password: string;
}
interface StudentResetPwdResp { 
    code: number;
    message: string;
    token: string;
}

export type { StudentLoginReq, StudentLoginResp, StudentRegisterReq, StudentRegisterResp, StudentResetPwdReq, StudentResetPwdResp };

