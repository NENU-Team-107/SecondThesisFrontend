
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

export type { StudentLoginReq, StudentRegisterReq };

