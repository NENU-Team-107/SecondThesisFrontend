
interface StudentLoginReq {
    email: string;
    id_code: string;
    password: string;
    phone_number: string;
}

interface StudentRegisterReq { 
    email: string;
    id_code: string;
    password: string;
    phone_number: string;
}

interface StudentResetPwdReq { 
    email: string;
    phone_number: string;
    password: string;
}

export type { StudentLoginReq, StudentRegisterReq, StudentResetPwdReq };

