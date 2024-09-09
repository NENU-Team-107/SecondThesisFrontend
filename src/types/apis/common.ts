interface Paginator{
    limit: number;
    offset: number;
    page: number;
    total: number;
};
interface PaginatorResp { 
    code: number;
    data: string[];
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

export type { Paginator, PaginatorResp, CommonResp };