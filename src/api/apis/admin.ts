import service from '@/api/server/service';
export const adminLogin =(uname:String,upswd:String)=> service.post(
    '/admin/login',
    {
        "username": uname,
        "password": upswd
    }
);