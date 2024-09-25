interface Paginator{
    limit: number;
    offset: number;
    page: number;
    total: number;
};
interface PaginatorResp<T> { 
    code: number;
    data: T[];
    message: string;
    offset: number;
    limit: number;
    page: number;
    total: number;
}

interface CommonResp{ 
    code: number;
    message: string;
}

interface CommonFileParams { 
    class: string;
    id: string;
}

interface CommitResp{
    code: number;
    file_id: string;
    id: number;
    message: string;
}




export type { Paginator, PaginatorResp, CommonResp, CommonFileParams, CommitResp};