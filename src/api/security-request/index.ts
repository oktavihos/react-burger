import request from "..";
import refreshToken from "../refresh-token";

const securityRequest = async <T = any>(
    endpoint: string,
    method: string = 'GET',
    body?: Object
): Promise<T> => {
    try{
        const accessToken = localStorage.getItem('accessToken');
        if(!accessToken) return Promise.reject("Пользователь не авторизован");
        return await request<T>(endpoint, method, body, {authorization: accessToken});
    }catch(error: any){
        if (error.message === "jwt expired") {
            const accessToken = await refreshToken();
            return await request<T>(endpoint, method, body, {authorization: accessToken});
        }else{
            return Promise.reject(error);
        }
    }
}

export default securityRequest;